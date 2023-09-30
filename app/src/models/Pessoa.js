const { InvalidRequestError, BadRequestError } = require('../errors/errors');
class Pessoa {
    
    _id = null;
    _nome = null;
    _apelido = null;
    _nascimento = null;
    _stack = [];
    _search = null;

    constructor(body) {
        this._id = body.id || null;
        this._nome = body.nome || null;
        this._apelido = body.apelido || null;
        this._nascimento = body.nascimento || null;
        this._stack = body.stack || [];
        this._search = null;
    }

    getId() {
        return this._id;
    }

    getNome() {
        return this._nome;
    }

    getApelido() {
        return this._apelido;
    }

    getNascimento() {
        return this._nascimento;
    }

    getStack() {
        return this._stack || [];
    }

    set id(value) {
        this._id = value;
    }

    set nome(value) {
        if(value == null) {
            throw new InvalidRequestError('nome is null');
        }
        if(typeof value !== 'string') {
            throw new BadRequestError('nome is not string');
        }
        if(value.length > 100) {
            throw new InvalidRequestError('nome is bigger than 100');
        }
        this._nome = value;
    }

    set apelido(value) {
        if(value == null) {
            throw new InvalidRequestError('apelido is null');
        }
        if(typeof value !== 'string') {
            throw new BadRequestError('apelido is not string');
        }
        if(value.length > 32) {
            throw new InvalidRequestError('apelido is bigger than 32');
        }
        this._apelido = value;
    }

    set nascimento(value) {
        this._nascimento = value;
    }

    set stack(value) {
        let arr = value || [];
        arr.forEach((value, index) => {
            if(typeof value !== 'string') {
                throw new BadRequestError('stack item is not string');
            }
            if(value.length > 32) {
                throw new InvalidRequestError('stack item is bigger than 32');
            }
        });

        this._stack = value;
    }

    addSkill(value) {
        if(typeof value !== 'string') {
            throw new BadRequestError('stack item is not string');
        }
        if(value.length > 32) {
            throw new InvalidRequestError('stack item is bigger than 32');
        }
        this._stack.push(value);
    }

    toJSON() {
        // fix array
        let _stack = this.getStack();
        if (_stack.length == 0) {
            _stack = null;
        }

        return JSON.stringify({
            id: this.getId(),
            nome: this.getNome(),
            apelido: this.getApelido(),
            nascimento: this.getNascimento(),
            stack: _stack
        });
    }

    toObject() {
        // fix array
        let _stack = this.getStack();
        if (_stack.length == 0) {
            _stack = null;
        }

        return {
            id: this.getId(),
            nome: this.getNome(),
            apelido: this.getApelido(),
            nascimento: this.getNascimento(),
            stack: _stack
        };
    }

    toDTO() {
        let stackAsString = this.getStack().join(',');
        let searchAsString = [].concat([this.getNome(),this.getApelido()],this.getStack()).join(',');
        return {
            id: this.getId(),
            nome: this.getNome(),
            apelido: this.getApelido(),
            nascimento: this.getNascimento(),
            stack: stackAsString,
            search: searchAsString
        };
    }

    static fromObject(data) {
        const { id, nome, apelido, nascimento, stack } = data;
        
        let pessoa = new Pessoa({});
        let _stack = stack || null;
        let skills = (_stack == null) ? [] : _stack.split(',');
                
        pessoa.id = id;
        pessoa.nome = nome;
        pessoa.apelido = apelido;
        pessoa.nascimento = nascimento;
        // add programing languages
        skills.forEach( element => {
            pessoa.addSkill( element );
        });
        
        return pessoa;
    }

}

module.exports = Pessoa;