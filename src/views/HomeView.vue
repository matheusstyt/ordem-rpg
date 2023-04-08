<template>
<div class="geral-home">
    <div class="box-img">
        <img src="../img/op-logo.png" alt="">
    </div>
   
    <div class="caixa-bemvindo">
         <div class="caixa-button">
            <button class="btn signin" @click="cadastrar">Não tem cadastro? </button>
            <button class="btn login" @click="login">Entrar</button>
        </div>
        <h2>BEM VINDO AO FIXA ORDEM PARANORMAL</h2>
        <p>Ordem Paranormal é um universo de investigação paranormal criado por Rafael Lange (Cellbit), que teve seu início através de campanhas de RPG de mesa em transmissões ao vivo na Twitch.</p>
        <p>É um universo ficcional e marca criada pelo streamer brasileiro Cellbit.[1]</p>
        <p>Atualmente, sua ramificação principal são os episódios de RPG de mesa exibidos aos sábados, às 18 horas, no canal do Cellbit na Twitch. Todas as terças ocorrem as reprises, ao mesmo horário e também na Twitch, e, às quintas-feiras, o episódio é publicado no canal Lives do Cellbit no YouTube.</p>
        <p>O objetivo do desenvolvimento desse projeto FullStack, é aperfeiçoar meus conhecimentos em HTML, CSS e JavaScript, e implementar Vue.js para front-end, Node.js para back-end, Mysql como banco de dados. Vale ressaltar que foi feito apenas por mim!  </p>
    </div>
    <p id="author">author: matheus da silva galdino :D</p>
    <div>

    </div>
</div>

</template>
<script>
export default {
    
    data() {
        return{
            user:'',
            pass: '',
        }
    },
    methods:{

        cadastrar(){
          
            this.$router.push({name:"registrar"});
        },
        login(){
            this.$router.push({name:"login"});
        }
    }
}
</script>
<style scoped lang="scss">
p, h2{
    color: #fff;
    text-shadow: 1px 1px 3px black;
}
h2{
    font-size:27px;
    
}
@media screen and (max-width: 400px)    {
    h2{
        font-size: 1.2em;
        text-align: center;
    }
}
.geral-home{
    position: absolute;
    top: 0;
    height: 100%;
    background-color: rgba( 0 0 0 / 0.3);
    text-align: center;
    @media screen and (max-width: 400px)    {
        top: 8vmax;
    }
    .caixa-bemvindo{
        max-width: 90vw;
        text-align: justify;
        margin: 0 auto;
        .caixa-button{
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        @media screen and (max-width: 400px)    {
            max-width: 100vw;
        }
    }
    #author{
        font-family: 'Consolas';
        position: absolute;
        bottom:1em;
        right: 1em;
    }
}
.btn{
    color: #fff;
    font-size: 1.5em;
}
.signin{
    background-color: rgba(255, 78, 78, 0.7);
}
.signin:hover{
    background-color: rgba(0  0  0 / 0.7);
}
.login{
    background-color: rgba(44, 92, 248, 0.7);
}
.login:hover{
    background-color: rgba(0  0  0 / 0.7);
}

.box-img{
    margin: 0 auto;
    padding-top: 4vmax;
    width: 30%;
    aspect-ratio: 16/7;
    img{
        width: 95%;
        height: 95%;
    }
    @media screen and (max-width: 400px)    {
        width: 60%;
      }
}
</style>