
    const express = require('express');
    const router = express.Router();
    const db = require('../model/mysql')
        router.post('/',(req, res, next)=>{
            (async ()=>{
                const person = await db.insertPerson(
                    {   idsessao: req.body.idsessao,
                        nome: req.body.nome,
                        jogador: req.body.jogador,
                        origem: req.body.origem,
                        idade: req.body.idade,
                        classe: req.body.classe,
                        sexo: req.body.sexo,
                        lnascimento: req.body.lnascimento,
                        lresidencia: req.body.lresidencia,
                        movimento: req.body.movimento,
                        acao: 1,
                        reacao: 1,
                        vida: req.body.vida,
                        sanidade: req.body.sanidade,
                        ocultismo: req.body.ocultismo,
                        esforco: req.body.esforco,
                        atributos: req.body.atributos,
                        resistencias: req.body.resistencias,
                        pericias: req.body.pericias,
                        armamentos: JSON.stringify(req.body.armamentos),
                        antescendentes: req.body.antescendentes
                    });

                res.status(200).send({
                    menssage: 'ok sessao post',
                    person                    
                });
            })();
    
        });

 module.exports = router;
