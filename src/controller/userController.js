
    const express = require('express');
    const router = express.Router();
    const db = require('../model/mysql')

    router.get('/', (req, res, next)=>{
        res.status(200).send({
            menssage: 'ok get',
        });
    });
    router.post('/',(req, res, next)=>{
        let user = {
            nome: req.body.nome,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            mestre: req.body.mestre
        }
        
        //let teste = JSON.parse(user)
        console.log('chegou aqui', user)
        const result = db.insertUser({nome: user.nome, username: user.username, email: user.email, password: user.password, mestre: user.mestre});
        res.status(201).send({
            message: 'Cadastro realizado!',
            cadastro: user
        });
        console.log('insert', result);
    });
    

module.exports = router;
