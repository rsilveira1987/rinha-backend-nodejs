const express = require('express');
const router = express.Router();
const { BadRequestError} = require('../errors/errors');
const PessoaService = require('../services/PessoaService');
const redis = require('redis');

// connect to cache
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

(async () => {
    // Connect to redis server
    await client.connect();
})();
// .on('error', err => console.log('Redis client error:',err))
// .connect();

//--------------------------
// api routes
//-------------------------

// POST localhost:3000/pessoas
router.post('/pessoas', async(req,res) => {
    
    // // connect to cache
    // const redis = require('redis');
    // const client = await redis.createClient({
    //     url: 'redis://cache:6379'
    // })
    // .on('error', err => console.log('Redis client error:',err))
    // .connect();

    try {

        // cache hit or cache miss?
        let blacklist = await client.get('blacklist');
        blacklist = (blacklist == null) ? [] : blacklist.split(',');
        const { nome, apelido, nascimento, stack } = req.body;
        if(blacklist.includes(apelido)) {
            throw new BadRequestError('apelido already exists');
        }

        // create person
        let pessoa = PessoaService.create(req.body);

        // add to blacklist
        blacklist.push(pessoa.getApelido());
        blacklist = blacklist.join(',');
        await client.set('blacklist',blacklist);

        // add to cache
        await client.set(pessoa.getId(),pessoa.toJSON());
        
        res.header('Location', `/pessoas/${pessoa.getId()}`)
           .status(201)
           .send({
              message: '201 - Created',
            });

    } catch (err) {
        
        if (err.name == 'InvalidRequestError') {
            // InvalidRequest
            res.status(422).send({
                message: '422 - Unprocessable Entity/Content',
            });
        }else if (err.name == 'BadRequestError') {
            // BadRequest
            res.status(400).send({
                message: '400 - Bad Request',
            });
        } else {
            // InternalServer error
            res.status(500).send({
                message: err.message,
            });
        }
            
    }

});

// GET /pessoas/b808f98d-315f-40dc-bdcd-0c9c7b6a2e4c
router.get('/pessoas/:id', async(req, res) => {
    const uuid = req.params.id;

    // cache hit or cache miss?
    let pessoa = await client.get(uuid);
    if(pessoa) {
        res.status(200).send(pessoa);
    } else {
        res.status(404).send({
            message: '404 - Not Found',
        });
    }
    
    // PessoaService.findByUuid(uuid).then( (pessoa) => {
    //     client.disconnect();
    //     res.status(200).send(pessoa.toJSON());
    // }).catch( err =>  {
    //     res.status(404).send({
    //         message: '404 - Not Found',
    //     });
    // });
    
    // try {
    //     PessoaService.findByUuid(uuid).then( (data) => {
    //         console.log(data);
    //         res.status(200).send(pessoa.toJSON());
    //     });
    // } catch(err) {
    //     res.status(404).send({
    //         message: '404 - Not Found',
    //         err: err.message
    //     });
    // }   
});

// GET /pessoas?t=teste
router.get('/pessoas', async(req, res) => {
    const t = req.query.t || null;

    PessoaService.searchByTerm(t).then( (data) => {
        res.status(200).send(data);
    }).catch( err =>  {
        res.status(400).send({
            message: '400 - Bad Request'
        });
    });
    
});

// GET /contagem-pessoas
router.get('/contagem-pessoas', async(req, res) => {
    
    PessoaService.count().then( (data) => {
        res.status(200);
        res.set('Content-Type', 'text/plain');
        res.send(data);
    }).catch( err => res.status(500).send(err.message) );
    
});

module.exports = router;