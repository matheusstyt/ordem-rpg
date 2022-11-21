const express = require('express');
const app = express();
const rotaUser = require('./userController');
const rotaCheckUser = require('./checkUser');
const rotaNewSessao = require('./newSessao');
const rotaGetSessao = require('./getSessao');
const rotaSetPersonagem = require('./setPersonagem');
const rotaGetPersonagem = require('./getPersonagem');
const rotaUpdatePersonagem = require('./updatePersonagem');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use('/user', rotaUser);
app.use('/checkuser', rotaCheckUser);
app.use('/newsessao', rotaNewSessao);
app.use('/getsessao', rotaGetSessao);
app.use('/setperson', rotaSetPersonagem);
app.use('/getperson', rotaGetPersonagem);
app.use('/updateperson', rotaUpdatePersonagem);

app.get('/teste',(req, res, next)=>{
    res.status(200).send({
        message: 'ok'
    });
});
module.exports = app;   