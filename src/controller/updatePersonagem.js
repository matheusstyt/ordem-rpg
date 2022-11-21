
    const express = require('express');
    const router = express.Router();
    const db = require('../model/mysql')
        router.post('/',(req, res, next)=>{
            (async ()=>{
                console.log(`update`)
                const person = await db.updatePerson(
                    {   idsessao: req.body.idsessao,
                        nome_jogador: req.body.nome,
                        nome_personagem: req.body.jogador,
                        origem: req.body.origem,
                        idade: req.body.idade,
                        //classe: req.body.classe,
                        sexo: req.body.sexo,
                        lnascimento: req.body.lnascimento,
                        lresidencia: req.body.lresidencia,
                        //movimento: req.body.movimento,
                        //acao: 1,
                        //reacao: 1,
                        idVida: req.body.idVida,
                        idSanidade: req.body.idSanidade,
                        //idOcultismo: req.body.idOcultismo,
                        idEsforco: req.body.idEsforco,
                        idPersonagem: req.body.idPersonagem,
                        idAntescendentes: req.body.idAntescendentes,
                        idArmas: req.body.idArmas,
                        atual_v: req.body.vida.atual,
                        atual_s: req.body.sanidade.atual,
                        //atual_o: req.body.ocultismo.atual,
                        atual_e: req.body.esforco.atual,
                        maximo_v: req.body.vida.maximo,
                        maximo_s: req.body.sanidade.maximo,
                        //maximo_o: req.body.ocultismo.maximo_o,
                        maximo_e: req.body.esforco.maximo,
                        sanidade: req.body.sanidade,
                        ocultismo: req.body.ocultismo,
                        esforco: req.body.esforco,
                        atributos: req.body.atributos,
                        //resistencias: req.body.resistencias,
                        //pericias: req.body.pericias,
                        //armamentos: req.body.armamentos,
                        antescendentes: req.body.antescendentes},  
                        req.body.idPersonagem, 
                        req.body.idVida,
                        req.body.idSanidade, 
                        req.body.idEsforco, 
                        0, 
                        req.body.idArma, 
                        req.body.idAntescendentes);

                res.status(200).send({
                    menssage: 'ok sessao post',
                    person                    
                });
            })();
    
        });

 module.exports = router;
