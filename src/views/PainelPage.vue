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
    <div class="container-g">
      <div class="header">
          <div class="header-content">
              <p>Início</p>
              <h3>{{email}}</h3>
              <p>Meu Sistema</p>
              <p>Perfil</p>
              <logout @click="logout()"/>
          </div>
      </div>
      <div class="container-home">
          
        <div class="content-right" v-if="system == false">
          <div class="content-session-add flex" v-if="list_sessions.length === 0">
            <h3>Não há sessões abertas.</h3>
            <div class="btn-add-session flex" @click="open_modal_session">
              <h4>+</h4>
            </div>
          </div>
          <div class="content-session-add flex" v-else>
            <h3>Sessões ativas</h3>
            <div class="btn-add-session" @click="open_modal_session">
              <h4 class="flex">+</h4>
            </div>
          </div>
          <div class="content-session-open" v-if="no_session === true" style="display: block">
              
              <ul>
                <li v-for="(session, index) in list_sessions" :key="session.id"  >
                <div @click="abrirsession(session.idsession)">
                  <p>N°: {{index+1}}</p>
                  
                  <p>mestre: {{Usuario}}</p>
                  <p>descrição : {{session.descricao}}</p>
                  <p>data de inicio: {{session.data_criacao}}</p>
                  
                 <!-- <p>Tempo decorrido: {{session.tempoDecorrido}}</p> -->
                  <label  for="status">status: {{session.status}}</label>
                </div>
                </li>
              </ul>
          </div>
  
        </div>
        <div class="content-left" v-if="system == false">
          <div class="caixa-btn-sessao">
            <div class="flex">
              <div class="content-ico">
                <img v-bind:src="require('@/assets/ico/social_ico.svg')" alt="Social_Img">
              </div>
              <h2>Social</h2>
            </div>

              <div class="btn-add-session" @click="open_modal_contact()">
                <h4>+</h4>
              </div>
          </div>
          <div class="content-social ativos" v-if="list_contact !== null">
            <h3>Ativos</h3>
            <ul>
              <li v-for="(item, index) in list_contact" >
                <p>{{item.fk_friend}}</p>
                <div class="pendente-container-btn">
                </div>
                <div id="status"></div>
              </li>
            </ul>
          </div>
          <div class="content-social pendentes" v-if="list_pendente !== null">
            <h3>Pendentes</h3>
            <ul>
              <li v-for="(item, index) in list_pendente" >
                <p>{{item.origem}}</p>
                <div class="pendente-container-btn">
                  <button id="contact-okay" @click="aceitar_pedido(item.fk_origem, item.fk_destino, item.id)">Confirmar</button>
                  <button id="contact-delete" @click="excluir_pedido(item.id)">Excluir</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="conteiner-system" v-if="system == true">
          <System />
        </div>
      </div>

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
          loading : true,
          system : true,
          id: 0,
          idSe: 0,
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
  <style lang="scss">
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    
  }
  .container-g{
    margin: 0 auto;
    height: 100vh;
    max-width: 75vw;
    display: block;
  }
  .header{
    width: 100%;    
    background-color: rgba(0  0  0 / 0.1);
    height: 2.5em;
    margin-bottom: 1em;
  }
  .header-content{
    background-color: rgba(0  0  0 / 0.7);
    width: 40%;
    height: 100%;
  
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom-right-radius: 2em;
    border-bottom-left-radius: 2em;
    margin: 0 auto;
    p{
      cursor: pointer;
    }
    p:hover{
      color: rgb(255, 188, 188);
    }
    h3{
      cursor: pointer;
    }
    h3:hover{
      color: rgba(177, 177, 177, 0.8);
    }
    svg{
      stroke: rgba(236, 139, 21, 0.829);
      cursor: pointer;
    }
  }
  .header-content 
  .container-new-session{
    width: 100%;
    display: flex;
    margin: 0.6em auto;
    p{
      font-size: 2vmax;
      text-align: center;
      margin: 1em;
    }
  }
  .content-session-add{
    margin: 0;
    border-bottom: 1px solid rgba( 255 255 255 / 0.7);
    position: relative;
    width: 100%;
    h3{
      margin: 0;
      padding: 0.5em 0;
    }
  }
  .btn-add-session{
    position: absolute;
    right: 2%;
    background-color: #4d4d4d83;
    border-radius: 0.5em;
    border: 1px dashed rgba(0  0  0 / 0.4);
    padding: 0 0.5em;
    cursor: pointer;

    h4{
      font-size: 2em;
      margin: 0;
      padding: 0;
    }
  }
.btn-add-session:hover{
  background-color: #88888883;
  border: 1px dashed rgba(82, 82, 82, 0.4);
}
.content-ico{
  height: 1.5em;
  aspect-ratio: 1/1;
}

.content-social{
  background-color: rgb(43  43  43 / 0.7);
  width: 100%;
  h3{
    padding-bottom: 5px;
    margin: 0;
    text-align: center;
    border-bottom: 1px dashed rgba(0  0  0 / 0.4);
  }
  ul{
    margin: 0;
    display: flex;
    flex-direction: column;
    li{
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      #status{
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background-color: #04e04e;   
        margin: 0;
        margin-right: 1em;
      }
    }
    li:hover{
      background-color: rgb(43  43  43 / 0.7);
      #status{
        background-color: #09aa31;   
 
      }
      
    }
  }
}

.ativos h3{
  background-color: #00f75259;
}
.pendentes h3{
  background-color: #f80a0a3a;

}

.pendente-container-btn{
  display: flex;
  gap: 1em;
  padding-right: 2em;
}
.pendente-container-btn button{
  background-color: rgb(0  0  0 / 0.7);
  padding: 0.4em 1em;
}
.pendente-container-btn button:hover{
  background-color: rgba(59, 59, 59, 0.7);
}
#contact-okay:active{
  background-color: rgba(35, 231, 78, 0.486);
}
#contact-delete:active{
  background-color: rgba(231, 35, 35, 0.486);
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
  
  .container-home{
    /* background-image: url('../img/background.webp'); */
    background-color: rgba(0  0  0 / 0.0);
    background-position: center ;
    background-repeat: repeat-x;
    background-attachment: fixed;
    background-size: contain;
    display: flex;
    gap: 1em;
    height: 88vh;
    .conteiner-system{
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .content-left, .content-right{
      h2{
        text-align: center;
      }  
    }
    .content-left{
      background-color: rgba(23, 23, 23, 0.5);
      height: 100%;
      width:70%;
      border: 1px solid rgba(88, 88, 88, 0.7);;
    }
    
    .content-right{
      border: 1px solid rgba(110, 110, 110, 0.918);
      background-color: rgba(23, 23, 23, 0.7);
      height: 100%;
      width:100%;
    }
  }
  
  .caixa-btn-sessao{
    position: relative;
    display: flex;
    padding: 0.6em 0;
    align-items: center;
    justify-content: center ;
    gap: 0.6em;
    border-top: 1px solid rgba(190, 190, 190, 0.6);
    border-bottom: 1px solid rgba(190, 190, 190, 0.6);
    width: 100%;
    h2{
      margin: 0;
    }
  }
 
  #btn-sessao{
      background-color: rgba(87, 241, 151, 0.7);
      color: #fff;
      font-size: 16px;
      border: none;
      border-radius: 5px;
 
  }
  #btn-sessao:hover{
      background-color: rgba(19, 82, 29, 0.7);
  }
  .content-session-open{
    cursor: pointer;
    text-align: center;
    font-family: 'Consolas';
    width: 100%;
  }
  .content-session-open ul{
    padding: 0;
    margin: 0;
    list-style: none;
    display:block;
  }
  .content-session-open ul li{
    margin: 0;
    padding: 0;
    display:flex;
    background-color: rgba(0 0 0 / 0.3);
    border-bottom: 1px solid rgba( 255 255 255 / 0.7);
  }
  .content-session-open ul li div{
    margin: 0;
    padding: 0;
    display:flex;
  
  }
  .content-session-open ul li:hover{
    background-color: rgba( 255 255 255 / 0.1);
  }
  
  .content-session-open ul li p, .content-session-open ul li label{
    margin: 5px 0; 
    padding: 0 20px;
    border-right: 1px solid rgba( 255 255 255 / 0.7);
    cursor: pointer;
  }
  .content-session-open ul li label{
    border: none;
  }
  .content-session-open ul li select{
    background-color: rgba(0  0  0 / 0.4);
    color: #fff;
    font-family: "Consolas";
    font-size: 14px;
  }
  </style>