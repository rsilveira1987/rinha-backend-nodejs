const crypto = require('crypto');
const Pessoa = require('../models/Pessoa');
// const DB = require('../database/postgresql');
const DB = require('../database/mariadb');

class PessoaService {
    
    static create(data) {            
        const { nome, apelido, nascimento, stack } = data;
        const id = crypto.randomUUID();
        const skills = (stack == null) ? [] : stack;

        let pessoa = new Pessoa({});
        pessoa.id = id;
        pessoa.nome = nome;
        pessoa.apelido = apelido;
        pessoa.nascimento = nascimento;
        // add programing languages
        skills.forEach( element => {
            pessoa.addSkill( element );
        });

        let dto = pessoa.toDTO();
        // let sql = `INSERT INTO tb_pessoas (id, nome, apelido, nascimento, stack, search) VALUES($1, $2, $3, $4, $5,$6)`;
        // DB.query(sql,[
        //     dto.id,
        //     dto.nome,
        //     dto.apelido,
        //     dto.nascimento,
        //     dto.stack,
        //     dto.search
        // ]);
        let sql = `INSERT INTO tb_pessoas (id, nome, apelido, nascimento, stack, search) VALUES('${dto.id}','${dto.nome}', '${dto.apelido}', '${dto.nascimento}', '${dto.stack}', '${dto.search}')`;
        DB.query(sql);

        return pessoa;
    }

    static async findByUuid(uuid) {
        const sql = `SELECT * FROM tb_pessoas WHERE id = '${uuid}' LIMIT 1`;
        
        const res = await DB.query(sql);
        const data = res.rows || res;
        
        // pessoa not found
        if(res.rows.length == 0) {
            throw Error("pessoa not found");
        }

        // create pessoa object
        let pessoa = Pessoa.fromObject(data[0]);
      
        return pessoa;
        
    }
    
    static async searchByTerm(t) {

        if(!t) {
            throw Error('invalid term');
        }
        
        const criteria = `%${t}%`;
        const sql = `SELECT * FROM tb_pessoas WHERE search LIKE '${criteria}' LIMIT 50`;

        const res = await DB.query(sql);
        const rows = res.rows || res; // covers mysql and postgresql driver
        let pessoas = [];
        rows.forEach( element => {
            let p = Pessoa.fromObject(element);
            pessoas.push(p.toObject());
        });        
        
        return pessoas;
    }

    static async count() {
        const sql = `SELECT count(id) as total FROM tb_pessoas`;

        const res = await DB.query(sql);
        const data = res.rows || res;
        const { total } = data[0];
        return total;
    }
}

module.exports = PessoaService;