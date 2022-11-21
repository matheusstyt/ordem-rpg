
    const express = require('express');
    const router = express.Router();
    const db = require('../model/mysql')
        router.post('/',(req, res, next)=>{
            (async ()=>{
                let idPOST = {
                    id: req.body.id
                }
                const getsessao = await db.selectSessao(idPOST.id)
                const sessao = await db.selectSessao(req.body.id)
                res.status(200).send({
                    menssage: 'ok sessao post',
                    getsessao                    
                });
            })();
    
        });

 module.exports = router;
