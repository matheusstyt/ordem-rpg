<template>
<div class="geral-login">
    <button class="signin" @click="cadastrar">Não tem cadastro? </button>
    <div class="caixa-login">
        <form @submit="check_user($event)">
            <h2>Login</h2>
            <div>
                <label for="user">Usuário</label>
                <input name="user" type="text" v-model="user">
            </div>
            <div>
                <label for="pass">Senha</label>
                <input type="password" name="pass" id="pass" v-model="pass">
            </div>

            <input type="submit" value="Entrar">
        </form>
        <p>Esqueceu a senha?</p>

    </div>
</div>

</template>
<script>
import axios from 'axios';

export default {
    
    data() {
        return{
            user:'',
            pass: '',
        }
    },
    methods:{
        check_user(e){ 
            this.get_token();

            e.preventDefault()
        },
        async get_token(){
            const url = "http://170.10.0.50:8000/token";
            const body = {
                username: this.user,
                password: this.pass,
            }
            axios.post(url, body)
            .then( res => {
                sessionStorage.setItem('token' , res.data.token);
                sessionStorage.setItem('user_id' , res.data.user_id);
                sessionStorage.setItem('email' , res.data.username);
                sessionStorage.setItem('username' , res.data.username);
                window.location.href = "/painel"

            })
            .catch( error => { 
                console.log(error)
            })
        },  
        async clean_input(){
            this.user = ''        
            this.pass = ''
           // const res = await req.json()
           // const dataJSON = JSON.stringify(res.logado)
            //if(res.valido){
            //    this.$router.push({name:"mestre", params:{
            //    dJson:dataJSON}});
            //}else{
           //     alert('USUÁRIO OU SENHA INVÁLIDOS!!!')
            //}
        },
        cadastrar(){
            this.$router.push({name:"registrar"});
        }
    }
}
</script>
<style scoped>
.geral-login{
    padding: 40px;

    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    text-align: center;
}
.caixa-login{
    margin-top:40px;
    width: 100%;
    height: 100%;
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
.signin{
    background-color: rgba(255, 78, 78, 0.7);
    color: #fff;
    font-size: 28px;
    border: none;
    border-radius: 5px;
    position: absolute;    
    right:10px;    
    top:10px;
}
.signin:hover{
    background-color: rgba(0  0  0 / 0.7);
}
</style>