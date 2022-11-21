
    const express = require('express');
    const router = express.Router();
    const db = require('../model/mysql')
        router.post('/',(req, res, next)=>{
            (async ()=>{
                let sessaoPOST = {
                    dataInicio: req.body.dataInicio,
                    tempoDecorrido: req.body.tempoDecorrido,
                    qtdMaxima: req.body.qtdMaxima,
                    fk_idMestre: req.body.fk_idMestre,
                    tempoDecorrido: req.body.tempoDecorrido,
                    status: req.body.status,
                } 
                console.log('chegou aqui', sessaoPOST)
                const sessao = await db.insertSessao({dataInicio: sessaoPOST.dataInicio, qtdMaxima: sessaoPOST.qtdMaxima, status: sessaoPOST.status, tempoDecorrido: sessaoPOST.tempoDecorrido, fk_idMestre: sessaoPOST.fk_idMestre})

                res.status(200).send({
                    menssage: 'ok sessao post',
                    sessaoPOST                    
                });
            })();
    
        });

 module.exports = router;
