<template>
<div class="geral-login">
    <div class="caixa-login">
        <button id="login" @click="login">Entrar</button>
        <form @submit="checkUser($event)">
            <h2>Sign in</h2>
            <div>
                <label for="user">Seu nome</label>
                <input name="nome" type="text" v-model="name">
            </div>
            <div>
                <label for="pass">Nome de usuário</label>
                <input type="text" name="user" id="nome" v-model="user">
            </div>
            <div>
                <label for="pass">Email</label>
                <input type="text" name="email" id="email" v-model="email">
            </div>
            <div>
                <label for="pass">Senha</label>
                <input type="password" name="pass" id="pass" v-model="pass1" :style="passErr">
            </div>
            <div>
                <label for="pass">Confirmar senha</label>
                <input type="password" name="pass" id="pass" v-model="pass2" :style="passErr">
            </div>
            
            <div id="box-entrar">
                <input type="submit" value="Entrar">
            </div>
            
        </form>
    </div>
</div>

</template>
<script>
export default {
    
    data() {
        return{
            user:'',
            pass1: '',
            pass2: '',
            name: '',
            email: '',
            passErr: 'background-color: rgba(0  0  0 / 0.6);'
        }
    },
    methods:{
        checkUser(e){
            if(this.pass1 == this.pass2){
                this.cadastrar();
                this.user = '';
                this.pass1 = '';
                this.pass2 = '';
                this.name = '';
                this.email = '';
                this.$router.push({name:"login"});
            }else{
                alert('SENHA NÃO CONFERE!!')
                this.passErr = 'background-color: rgba(238, 30, 30, 0.7);'
            }
            e.preventDefault()
        },
        async cadastrar(){
            let dataJson = JSON.stringify(
                {
                    nome: this.name,
                    username: this.user,
                    email: this.email,
                    password: this.pass1,
                    mestre: 0
                });
            const req = await fetch("http://localhost:5000/user/", {
               //mode: 'no-cors', 
               method: "POST",
               headers: { "Content-Type": "application/json"},
               body: dataJson
            });
        },
        login(){
            this.$router.push({name:"login"});
        }
    }
}
</script>
<style scoped>
.geral-login{
    padding: 40px;
    height: 100%;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
}
.caixa-login{
    margin-top:0px;
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
#box-entrar{
    text-align: center;
    width: 100%;
    display:block;
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
#login{
    background-color: rgba(44, 92, 248, 0.7);
    color: #fff;
    font-size: 28px;
    border: none;
    border-radius: 5px;
    position: absolute;    
    right:10px;    
    top:10px;
}
#login:hover{
    background-color: rgba(0  0  0 / 0.7);
}
</style>