<template>
<div class="geral-home">
    <div class="box-img">
        <img src="../img/op-logo.png" alt="">
    </div>
   
    <div class="caixa-bemvindo">
         <div class="box-button">
        <div class="sub-box-button">
            <button class="signin" @click="cadastrar">Não tem cadastro? </button>
        </div>
        <div class="sub-box-button">
            <button id="login" @click="login">Entrar</button>
        </div>
        
    </div>
        <h2>BEM VINDO AO FIXA ORDEM PARANORMAL</h2>
        <p>Ordem Paranormal é um universo de investigação paranormal criado por Rafael Lange (Cellbit), que teve seu início através de campanhas de RPG de mesa em transmissões ao vivo na Twitch.</p>
        <p>É um universo ficcional e marca criada pelo streamer brasileiro Cellbit.[1]</p>
        <p>Atualmente, sua ramificação principal são os episódios de RPG de mesa exibidos aos sábados, às 18 horas, no canal do Cellbit na Twitch. Todas as terças ocorrem as reprises, ao mesmo horário e também na Twitch, e, às quintas-feiras, o episódio é publicado no canal Lives do Cellbit no YouTube.</p>
        <p>O objetivo do desenvolvimento desse projeto FullStack, é aperfeiçoar meus conhecimentos em HTML, CSS e JavaScript, e implementar Vue.js para front-end, Node.js para back-end, Mysql como banco de dados. Vale ressaltar que foi feito apenas por mim!  </p>
        <p>Atenciosamente: Matheus Galdino</p>
    </div>
    <p id="author">author: matheus da silva galdino :D</p>
</div>

</template>
<script>
//import * as server from '../model/mysql.js';
export default {
    
    data() {
        return{
            user:'',
            pass: '',
        }
    },
    methods:{
        checkUser(e){ 
            this.checkPOST();
            e.preventDefault()
        },
        async checkPOST(){
            let dataJson = JSON.stringify({
                    username: this.user,
                    password: this.pass,
                });
            const req = await fetch("http://localhost:5000/checkuser/", {
               //mode: 'no-cors', 
               method: "POST",
               headers: { "Content-Type": "application/json"},
               body: dataJson
            });
            const res = await req.json()
            const dataJSON = JSON.stringify(res)
            if(res.valido){
                this.$router.push({name:"home", params:{
                dJson:dataJSON}});
            }
        },
        cadastrar(){
            this.$router.push({name:"cadastro"});
        },
        login(){
            this.$router.push({name:"login"});
        }
    }
}
</script>
<style scoped>
p, h2{
    color: #fff;
    text-shadow: 1px 1px 3px black;
}
h2{
    font-size:27px;
}
.geral-home{
    padding: 10px;
    height: 100%;
    background-color: rgba( 0 0 0 / 0.3);
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    text-align: center;
}
.caixa-bemvindo{
    max-width: 600px;
    text-align: justify;
    margin: 0 auto;
}
.caixa-login h2, .caixa-login p{
    text-align: center;
}
.caixa-login form{
    margin: 0 auto;
    background-color: rgba(0 0 0 / 0.6);
    border: 1px solid rgba(184, 184, 184, 0.7);
    border-radius: 10px;
    width: 300px;
    padding:20px;
    text-align: center;
}
input{
    margin: 10px 0;
    height: 35px;
    width: 90%;
    padding-left: 10px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border:none;
    background-color: rgba(68, 67, 67, 0.6);
    color: #fff;
    font-size: 15px;
    font-family: "Consolas";
}
input[type="submit"]{
    font-size: 17px;
    width: 70%;
    margin: 0 auto;
}
input[type="submit"]:hover{
    background-color: rgba(105, 105, 105, 0.6);
    color: #fff;
}
.box-button{
    width: 100%;
    display: flex;
}
.sub-box-button{
    width: 50%;
    padding: 0  10px;
}
.signin{
    background-color: rgba(255, 78, 78, 0.7);
    color: #fff;
    font-size: 28px;
    border: none;
    border-radius: 5px;
    float: left;
}
.signin:hover{
    background-color: rgba(0  0  0 / 0.7);
}
#login{
    background-color: rgba(44, 92, 248, 0.7);
    color: #fff;
    font-size: 28px;
    border: none;
    border-radius: 5px;
    right:10px;    
    top:10px;
    float: right;
}
#login:hover{
    background-color: rgba(0  0  0 / 0.7);
}
#author{
    font-family: 'Consolas';
    position: absolute;
    bottom:20px;
    right: 20px;
}
.box-img{
    margin: 0 auto;
    width: 400px;
    height: 150px;
}
.box-img img{
    width: 95%;
    height: 95%;
    shadow: 5px 5px black;

}

</style>