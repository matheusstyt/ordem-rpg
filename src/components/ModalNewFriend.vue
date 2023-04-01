<template>
    <div class="new-contact-box">
        <h3>Novo contato</h3>
        <div class="input-field">
          <input type="search" v-model="search_username" required placeholder="Nome do indivíduo" name="username" id="username" maxlength="50">
          <div class="content-ico">
            <search @click="search_user()" fill="#fff" />
          </div>
        </div>
        <div v-if="display_contact === true" class="new_contact">
            <p>{{new_contact}}</p>
            <div class="content-ico check">
                <check @click="enviar()" />
              </div>
        </div>
        <button @click="save_session()">Fechar</button>
      </div>
</template>
<script>
import axios from 'axios';
import search from './svg/search.vue'
import check from './svg/check.vue'
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}}`

export default {
    components :{
        search, check
    },
    data(){
        return{
            search_username : '',
            new_contact : '',
            id_contact : 0,
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
        search_user(){
            const url = "http://192.168.100.26:8000/users/";
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params: { username : this.search_username}, headers : headers })
            .then( res => {
                try {
                    this.display_contact = true
                    this.new_contact = res.data[0].username
                    this.id_contact = res.data[0].id
                } catch (error) {
                    this.display_contact = false
                    this.new_contact = ''
                }

                
              //  this.$router.push({name:"painel"});
            })
            .catch( error => { 
                console.log(error)
            })
        },
        enviar(){
            if(sessionStorage.getItem("token")){
                
                const url = `http://192.168.100.26:8000/ask/`;

                const body_ask = {
                    origem : parseInt(sessionStorage.getItem("user_id")), 
                    destino : this.id_contact,
                    status : false

                }
                console.table(body_ask)
                const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

                axios.post(url, body_ask, { headers : headers })
                .then( res => {
                    this.display_contact = false
                    this.search_username = ''
                    this.new_contact = ''
                    this.id_contact = 0
                    
                })
                .catch( error => { 
                    console.log(error)
                })
            }
        }
        
    }, mounted(){
        // GET HORA ATUAL
        this.get_now()
        setInterval(() => {
          this.get_now()
        }, 1000);
    }
}

</script>
<style scoped> 
::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cline x1='0' y1='10' x2='10' y2='0' stroke='red' stroke-width='2'/%3E%3Cline x1='0' y1='0' x2='10' y2='10' stroke='red' stroke-width='2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  
  .new-contact-box{
    background-color: #1b1b1b;
    padding: 1em;
    border: 1px solid bisque;
    background-color: rgba(0  0  0 / 0.7);
    min-width: 50%;
    max-width: 60%;
    height: auto;
    box-shadow: 0px 0px 3px #858585;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }.new-contact-box:hover{
  box-shadow: 0px 0px 5px #fff;
  transition: ease 0.5s;
  }
  .new-contact-box h3{
    text-align: center;
  }
  .new-contact-box button{
    margin-top: 1em;
    color: #1b1b1b;
  }
  .new-contact-box button:hover{
    color: #1b1b1b;
    background-color: #b3b3b3;
    transition: ease 1s;
    border: 2px solid #b3b3b3;
  }
  .input-field{
    
    background-color: #ffffffcc;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1em;
    padding: 0.2em 0;
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