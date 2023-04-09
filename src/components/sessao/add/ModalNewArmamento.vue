<template>
    <div class="novo-armamento">
        <h3>cadastrar novo armamentos</h3>
        <div class="container-add-armamentos">
            <div class="input-field">
                <label for="desc_armamento">Descrição</label>
                <input type="text" name="desc_armamento" v-model="desc_armamento" id="desc_armamento">
            </div>
            <div class="input-field">
                <label for="categoria_1">Categoria I</label>
                <input type="text" name="categoria_1" v-model="categoria_1" id="categoria_1">
            </div>
            <div class="input-field">
                <label for="categoria_2">Categoria II</label>
                <input type="text" name="categoria_2" v-model="categoria_2" id="categoria_2">
            </div>
            <div class="input-field">
                <label for="categoria_3">Categoria III</label>
                <input type="text" name="categoria_3" v-model="categoria_3" id="categoria_3">
            </div>
            <div class="input-field">
                <label for="alcance">Alcance</label>
                <input type="text" name="alcance" v-model="alcance" id="alcance">
            </div>
            <div class="input-field">
                <label for="dano_passivo">Dano Passivo</label>
                <input type="text" name="dano_passivo" v-model="dano_passivo" id="dano_passivo">
            </div>
            <div class="input-field">
                <label for="dano_ativo">Dano Ativo</label>
                <input type="text" name="dano_ativo" v-model="dano_ativo" id="dano_ativo">
            </div>
            <div class="input-field">
                <label for="tipo">Tipo</label>
                <input type="text" name="tipo" v-model="tipo" id="tipo">
            </div>
            <div class="input-field">
                <label for="espaco_armamento">Espaço</label>
                <input type="text" name="espaco_armamento" v-model="espaco_armamento" id="espaco_armamento">
            </div>
        </div>

        <button @click="salvar_armamento()">Salvar</button>        
      </div>
</template>
<script>
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}}`

export default {
    components :{
 
    },
    emits : ["fecharModal"],
    data(){
        return{
            user_id : sessionStorage.getItem('user_id'),
            desc_armamento : '',
            categoria_1 : '',
            categoria_2 : '',
            categoria_3 : '',
            alcance : '',
            dano_passivo : '',
            dano_ativo : '',
            tipo : '',
            espaco_armamento : '',

            display_contact : false
        }
    }, 
    methods:{
        get_now(){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
        },
        salvar_armamento(){
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const body_armamento = {
                    descricao : this.desc_armamento,
                    categoria_1 : this.categoria_1,
                    categoria_2 : this.categoria_2,
                    categoria_3 : this.categoria_3,
                    alcance : this.alcance,
                    dano_passivo :  this.dano_passivo,
                    dano_ativo : parseInt(this.dano_ativo) ,
                    tipo : this.tipo,
                    espaco : parseInt(this.espaco_armamento) ,
            }
            console.table(body_armamento)

            const url = "http://192.168.100.52:8000/armamentoSession/";

            
            axios.post(url, body_armamento, { headers : headers })
            .then( res => {
                console.log(res)
                this.post_armamentos(res.data.id)
            })
            .catch( error => { 
                console.log(error)
            })
            
        },
        post_armamentos(id) {
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            const url = "http://192.168.100.52:8000/armamentosSession/";
            const body_atributos = {
                fk_armamento : id,
                fk_session : sessionStorage.getItem("session_id")
            }
            axios.post(url, body_atributos, { headers : headers })
            .then( res => {
                //window.location.reload()
                console.log(res)
                this.$emit("fecharModal")
            })
            .catch( error => { 
                console.log(error)
            })
        },
        salvar_armamento_user(id){
            const url = "http://192.168.100.52:8000/armamentoUser/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            const body_armamento_user = {
                fk_user : parseInt(sessionStorage.getItem('user_id')),
                fk_armamento : id,
            }
            console.table(body_armamento_user)
            axios.post(url, body_armamento_user, { headers : headers })
            .then( res => {

              

            })
            .catch( error => { 
                console.log(error)
            })

        },
        clean_input() {

            this.descricao = "";
            this.categoria_1 = "";
            this.categoria_2 = "";
            this.categoria_3 = "";
            this.alcance = "";
            this.dano_passivo = "";
            this.dano_ativo = "";
            this.espaco = "";
        },

        
    }, mounted(){
        // GET HORA ATUAL
        this.get_now()
        setInterval(() => {
          this.get_now()
        }, 1000);
    }
}

</script>
<style scoped lang="scss"> 
.novo-armamento {
    top: 8vh;
    background-color: #1b1b1b;
    padding: 0;
    border: 1px solid bisque;
    background-color: rgba(0  0  0 / 0.5);
    min-width: 50%;
    max-width: 60%;
    height: auto;
    box-shadow: 0px 0px 3px #f3eacd;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    max-height: 80%;
    overflow-y: auto;

    h3 {
        margin: 0;
        padding: 0.5em;
        position: sticky;
        top: 0;
        text-align: center;
        border-bottom: 1px dashed rgba(46, 46, 46, 0.418);
        background-color: #181818c5;
 
        color: white;
    }


    button{
        padding: 0.4em;
        margin-bottom: 2em;
        color: #1b1b1b;
    }
    button:hover{
        color: #1b1b1b;
        background-color: bisque;
        transition: ease 0.5s;
        border: 2px solid rgb(224, 184, 135);
    }
    #carregar-armamento{
        cursor: pointer;
        background-color: rgba(84, 245, 89, 0.5);
    }
    #carregar-armamento:hover{
        background-color: rgba(84, 245, 89, 0.8);
        cursor: pointer;
    }
  }
.novo-armamento:hover{
    box-shadow: 0px 0px 5px #fff;
    transition: ease 0.5s;
}
.container-add-armamentos{
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 70%;
    
    .input-field{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em 0;

        input{
            
            font-size: 1em;
            font-family: "Consolas";
            padding: 0.4em 1em;
            color: #292929;
            
        }
    }
}
  
  .input-field input[type="search"]{
    font-size: 1em;
    font-family: "Consolas";
    color: #292929;
    background-color: transparent;
    height: 95%;
    width: 90%;
    padding: 0.5em 0;
    border: none;
  }
  .input-field input[type="search"]:focus, .input-field input[type="search"]:active{
    outline: none;
    border: none;
}
  .content-ico{
    height: 1.4em;
    aspect-ratio: 1/1;
  }
  .content-ico svg{
    cursor: pointer;
    fill: #4e4e4e;
  }
  .content-ico svg:hover  {
    fill: rgba(0, 0, 0, 0.897);
  }
  .new_contact{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1em 0;
    width: 100%;


  }
  .new_contact p { 
    margin: 0;
  }
  .new_contact button { 
    margin: 0;
  }
  .new_contact:hover{
    background-color: #1b1b1b;
  }
  .check{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .check svg{
    height: 1.1em;
    aspect-ratio: 1/1;
    fill: #fff;
  }
  .check svg:hover{
    fill: #cfcfcf;
  }
</style>