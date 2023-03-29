<template>
    <div>
      <div class="modal-session" v-if="modal_contact_opened === true">
        <button class="btn-x" @click="close_modal_contact()">X</button>
        <ModalFriend />
      </div>
      
      <div class="modal-session" v-if="modal_session_opened === true">
        <button class="btn-x" @click="close_modal_session()">X</button>
        <ModalSessao />
      </div>
      <preloader v-if="loading" />
      <div class="conteiner-system" v-if="system == true">
        <System />
      </div>
    </div>
      
      
    </template>
    <script>
  
    import axios from 'axios';
    import preloader from '../components/gif/preloader.vue'
    import logout from '../components/svg/logout.vue'
    import System from '../components/sistema/ConfigSystem.vue'
    import ModalSessao from '../components/ModalNewSessao.vue'
    import ModalFriend from '../components/ModalNewFriend.vue'
    import SessaoPersonagens from '../components/SessaoPersonagens.vue'
  
    export default {
        components: {ModalSessao, ModalFriend, SessaoPersonagens, System, logout, preloader},
        props:{
            data : Object,
            vida : Object,
            sanidade : Object,
            ocultismo : Object,
            esforco : Object,
            acao : Number,
            movimento: Number,
            reacao: Number
    
        },
        data(){
          return{
            email : sessionStorage.getItem('email'),
            data_atual : null,

    
            }
        },
        methods:{
          open_modal_session(){
            this.modal_session_opened = true
          },
          open_modal_contact(){
            this.modal_contact_opened = true
          },
          close_modal_session(){
            this.modal_session_opened = false
          },
          close_modal_contact(){
            this.modal_contact_opened = false
          },
          
          async get_session(){
              const url = "http://170.10.0.50:8000/session/";
              const now = Date()
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
              axios.get(url, { headers : headers })
              .then( res => {
                
                this.list_sessions = res.data.session
                
                if(res.data.session.lenght === 0){
                  this.no_session = false;
                }else{
                  this.no_session = true;
                }
              })
              .catch( error => { 
                console.log(error)
              })
          },  
          async get_pendente(){
              const url = "http://170.10.0.50:8000/ask/";
              const now = Date()
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
              axios.get(url, { headers : headers })
              .then( res => {
                console.log(res.data)
                if(res.data.ask.length == 0){
                  this.list_pendente = null
                }else{
                  this.list_pendente = res.data.ask
                }
                
              })
              .catch( error => { 
                console.log(error)
              })
          },
          async get_contact(){
            const url = "http://170.10.0.50:8000/contact/";
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
              axios.get(url, { params : { fk_user : sessionStorage.getItem('token') }, headers : headers })
              .then( res => {
                console.log(res.data)
                this.list_contact = res.data.list_contact
              })
              .catch( error => { 
                console.log(error)
              })
          },
          logout: function() {
            this.$router.push('/login');
            axios.post('http://170.10.0.50:8000/logout/', null, {
              headers: {
                Authorization: 'Token ' + sessionStorage.getItem('token')
              }
            })
            .then(response => {
  
              sessionStorage.clear();
  
              this.$router.push('/login');
            })
            .catch(error => {
              console.log(error);
            });
          },
          aceitar_pedido(fk_origem, fk_destino, id){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
  
            if(sessionStorage.getItem("token")){
              const url = `http://170.10.0.50:8000/contact/`;
  
              const body_uni = {
                fk_user : fk_destino, 
                fk_friend : fk_origem,
                data_inicio : String(formattedDate) 
              }
              const body_bi = {
                fk_user : fk_origem, 
                fk_friend : fk_destino,
                data_inicio : String(formattedDate) 
              }
              console.table(body_uni)
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
              axios.post(url, body_uni, { headers : headers })
              .then( res => {
                axios.post(url, body_bi, { headers : headers })
                .then( res => {
                  this.excluir_pedido(id)
                })
                .catch( error => { 
                    console.log(error)
                })
              })
              .catch( error => { 
                  console.log(error)
              })
            }
          },
          excluir_pedido(id){
            const url = `http://170.10.0.50:8000/ask/${id}/`;
                const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
                axios.delete(url, { headers : headers })
                .then(res => {
                  window.location.reload()
                })
                .catch( error => {
                  console.log(error)
                })
          }
        },
        mounted(){
          setTimeout(() => {
            this.loading = false
          }, 500);
          if(!sessionStorage.getItem('token')){ this.$router.push({name:"login"}) }
  
          this.get_session();
          this.get_pendente();
          this.get_contact();
          setInterval(() => {
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
  
          }, 1000);
          
        },
        computed:{
  
        },
        watch:{
  
        created(){
  
          
        }
    }
  }
    </script>
 <style scoped lang="scss">
 /* Firefox */
 ::-moz-scrollbar {
     width: 12px;
   }
   
   ::-moz-scrollbar-track {
     background-color: #222;
   }
   
   ::-moz-scrollbar-thumb {
     background-color: #777;
     border-radius: 6px;
   }
   
   /* Chrome */
   ::-webkit-scrollbar {
     width: 12px;
   }
   
   ::-webkit-scrollbar-track {
     background-color: #222;
   }
   
   ::-webkit-scrollbar-thumb {
     background-color: #777;
     border-radius: 6px;
   }
   
 .content-system{
     position: relative;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex;
     flex-direction: row;
     .modal-system{
         width: 100%;
         height: 100%;
         background-color: rgba(0, 0, 0, 0.5);
         position: absolute;
         display: flex;
         align-items: center;
         justify-content: center;
         z-index: 3;  
         .close_modal{
             position: absolute;
             margin: 0;
             padding: 1em;
             background-color: rgba(255, 0, 0, 0.295);
             top: 0;
             right: 0;
             cursor: pointer;
         }
         .close_modal:hover{
             background-color: rgba(255, 0, 0, 0.938);
         }
     }
     .largura{
         width: 33.333%;
         table{
             width: 100%;
             text-align: center;
             tr td{
                 border-bottom: 1px solid rgba(255, 255, 255, 0.4);
                 cursor: pointer;
             }
             tr:hover{
                 background-color: rgba(80, 80, 80, 0.342);
             }
         }
     }
     .item{
         background-color: rgba(0, 255, 255, 0.0);
     }
     .armamento{
         background-color: rgba(72, 255, 0, 0.0);
     }
     .magia{
         background-color: rgba(155, 57, 194, 0.0);
     }
     .item:hover, .armamento:hover, .magia:hover{
         background-color: #2e2e2e1a;
     }
 
 }    
 .container-list-armamentos{
     width: 100%;
     .content-armamento{
         background-color: rgba(127, 255, 212, 0.281);
         p{
 
         }
     }
 }
 </style>