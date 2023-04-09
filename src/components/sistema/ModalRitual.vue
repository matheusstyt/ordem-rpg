<template>
    <div class="novo-armamento">
        <h3>cadastrar novo ritual</h3>
        <div class="container-add-armamentos">
            <div class="input-field">
                <label for="desc_ritual">Descrição</label>
                <input type="text" name="desc_ritual" v-model="desc_ritual" id="desc_ritual">
            </div>
            <div class="input-field">
                <label for="obs_ritual">Observação</label>
                <input type="text" name="obs_ritual" v-model="obs_ritual" id="obs_ritual">
            </div>
            <div class="input-field">
                <label for="alcance_ritual">Alcance</label>
                <input type="text" name="alcance_ritual" v-model="alcance_ritual" id="alcance_ritual">
            </div>
            <div class="input-field">
                <label for="dano_passivo_ritual">Dano Passivo</label>
                <input type="text" name="dano_passivo_ritual" v-model="dano_passivo_ritual" id="dano_passivo_ritual">
            </div>
            <div class="input-field">
                <label for="dano_ativo_ritual">Dano Ativo</label>
                <input type="text" name="dano_ativo_ritual" v-model="dano_ativo_ritual" id="dano_ativo_ritual">
            </div>
            
            <div class="input-field">
                <label for="tipo">Tipo</label>
                <input type="text" name="tipo" v-model="tipo" id="tipo">
            </div>

            <div class="input-field">
                <label for="ocultismo">Ocultismo</label>
                <input type="text" name="ocultismo" v-model="ocultismo" id="ocultismo">
            </div>
            <div class="input-field">
                <label for="categoria">Categoria</label>
                <input type="text" name="categoria" v-model="categoria" id="categoria">
            </div>
        </div>

        <button @click="salvar_ritual()">Salvar</button>
        <h3 id="carregar-armamento">carregar rituais - ordem paranormal</h3>
        
      </div>
</template>
<script>
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}}`

export default {
    components :{
 
    },
    data(){
        return{
            user_id : sessionStorage.getItem('user_id'),
            desc_ritual : '',
            obs_ritual : '',
            alcance_ritual : '',
            ocultismo : '',
            alcance : '',
            dano_passivo_ritual : '',
            dano_ativo_ritual : '',
            tipo : '',
            categoria : '',

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
        salvar_ritual(){
            
            const url = "http://192.168.100.52:8000/rituais/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            const body_ritual = {
                descricao : this.desc_ritual,
                obs : this.obs_ritual,
                alcance : this.alcance_ritual,
                dano_passivo :  this.dano_passivo_ritual,
                dano_ativo : parseInt(this.dano_ativo_ritual) ,
                tipo : this.tipo,
                ocultismo : parseInt(this.ocultismo),
                categoria : this.categoria,
                fk_user : parseInt(this.user_id)


            }
            console.table(body_ritual)
            axios.post(url, body_ritual, { headers : headers })
            .then( res => {
                this.clean_input()
                window.location.reload()
            })
            .catch( error => { 
                console.log(error)
            })
        },
        clean_input() {

            this.desc_ritual = "";
            this.obs_ritual = "";
            this.alcance_ritual = "";
            this.dano_passivo_ritual = "";
            this.dano_ativo_ritual = "";
            this.tipo = "";
            this.ocultismo = "";
            this.categoria = "";
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