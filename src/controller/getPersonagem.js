
    const express = require('express');
    const router = express.Router();
    const db = require('../model/mysql')
        router.post('/',(req, res, next)=>{
            (async ()=>{    
                const person = await db.selectPerson(req.body.id);
                //const vida = {atual: person, maximo: 0}
                console.log('chegou aqui', person)
                res.status(201).send({
                    menssage: 'ok person postaasd',
                    person                    
                });
            })();
    
        });

 module.exports = router;
