
    const express = require('express');
    const router = express.Router();
     const db = require('../model/mysql')
//     async function getQuery(){
//         return await db.selectUserName
//     }
    router.get('/', (req, res, next)=>{
        
        (async ()=>{
            const db = require('../model/mysql')
            const user = await db.selectUserName()
            //console.log('banco de dados', user);
            res.status(200).send({
                menssage: 'ok check user',
                user
                
            });
        })();
        
    });
        router.post('/',(req, res, next)=>{
            (async ()=>{
                var logado = {username: '', nome: '', id: 0}
                var valido = false
                let userPOST = {
                    username: req.body.username,
                    password: req.body.password,
                } 
                //console.log('chegou aqui', userPOST)
                const user = await db.selectUserName()
                //console.log(user);
                user.forEach(element => {
                    if(userPOST.username == element.username){
                        if(userPOST.password == element.password){
                            //console.log('deu certo');
                            valido = true 
                            logado.username = element.username
                            logado.nome = element.nome
                            logado.id = element.id   
                            //console.log(logado);                         
                        }else{}
                    }else{}
                 });
                
                res.status(200).send({
                    menssage: 'ok check post',
                    valido,
                    logado
                    
                });
            })();
    
        });


    
    

 module.exports = router;
