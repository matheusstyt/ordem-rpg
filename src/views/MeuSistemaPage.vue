<template>
    <div class="modal-session" v-if="modal_contact_opened === true">
      <button class="btn-x" @click="close_modal_contact()">X</button>
      <ModalFriend />
    </div>
    
    <div class="modal-session" v-if="modal_session_opened === true">
      <button class="btn-x" @click="close_modal_session()">X</button>
      <ModalSessao />
    </div>
    <System />

        
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
            loading : true,
            system : true,
            Usuario: sessionStorage.getItem('email'),
            sessoeCarregadas : [],
            statusCarregados: [],
            status_sessao: '',
            styleStatus: 'background-color: rgba( 255 255 255 / 0.3);',
            displaySessao: 'display:none;',
            displaySessaoP: 'display:none;',
            vida : {id: 0, atual: 6, maximo: 6},
            sanidade : {id: 0, atual: 2, maximo: 10},
            ocultismo : {id: 0, atual: 7, maximo: 16},
            esforco : {id: 0, atual: 1, maximo: 12},
            displayModalT: 'display:none;',
            displayTesteTipo: 'display: none; transition: display 0.5s;',
            displayTesteResultado: 'display: none; background-color: #0a0b0c;',
            tipoTeste: '',
            valorTeste: 0,
            dados: [],
            listVida: [],
            listSanidade: [],
            listOcultismo: [],
            listEsforco: [],
  
            email : sessionStorage.getItem('email'),
            data_atual : null,
            modal_session_opened : false,
            modal_contact_opened : false,
            list_sessions : false,
            list_pendente : null,
            list_contact : null,
            no_session : false
    
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
   
        },
        mounted(){
          setTimeout(() => {
           // this.loading = false
          }, 500);
          if(!sessionStorage.getItem('token')){ this.$router.push({name:"login"}) }

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
    <style lang="scss">
    .sistema-geral{
      position: relative;
      max-width: 80vw;
      height: 90vh;
      margin: 0 auto;
      background-color: rgb(0  0  0 / 0.1);
    }
    .flex{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
      
    }

    .header{
      width: 100%;    
      background-color: rgba(0  0  0 / 0.1);
      height: 2.5em;
      margin-bottom: 1em;
    }
  .btn-x{
    background-color: rgb(0  0  0 / 0.0);
    top: 1%;
    right: 1%;
    position: absolute;
    z-index: 3;
  }
  .btn-x:hover{
    background-color: rgba(223, 17, 17, 0.7);
  }
  .conteiner-system{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

    </style>