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
    <div class="container-g">
      
      <div class="header">
          <div class="header-content">
              <p>Início</p>
              <h3>{{email}}</h3>
              <p>Ferramentas</p>
              <p>Perfil</p>
              <logout @click="logout()"/>
          </div>
      </div>
      
      <div class="home">
          
        <div class="content-right">
          <div class="container-new-session">
            <div class="content-new-session btn-large" @click="open_modal_session">
              <h4>+</h4>
            </div>
          </div>
          <div class="text-nao-sessao" v-if="no_session === false">
            <p>Não há sessões abertas.</p>
          </div>
          <div class="content-session-open" v-else style="display: block">
              <h3>Sessões ativas</h3>
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
        <div class="conteiner-b">
          <div class="caixa-btn-sessao">
            <div class="flex">
              <div class="content-ico">
                <img v-bind:src="require('@/assets/ico/social_ico.svg')" alt="Social_Img">
              </div>
              <h2>Social</h2>
            </div>

              <div class="content-new-session btn-small" @click="open_modal_contact()">
                <h4>+</h4>
              </div>
          </div>
          <div class="content-social ativos">
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
          <div class="content-social pendentes" v-if="list_pendente === null">
            <h3>Pendente</h3>
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
        <div class="conteiner-c"></div>
      </div>

  </div>
  </div>
    
    
  </template>
  <script>

  import axios from 'axios';
  import logout from '../components/svg/logout.vue'
  import ModalSessao from '../components/ModalNewSessao.vue'
  import ModalFriend from '../components/ModalNewFriend.vue'
  import SessaoPersonagens from '../components/SessaoPersonagens.vue'

  export default {
      components: {ModalSessao, ModalFriend, SessaoPersonagens, logout},
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
              list_sessions : [],
              list_pendente : null,
              list_contact : [],
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
              this.no_session = true;
  
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
              this.list_pendente = res.data.ask
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
  <style scoped>
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
  }
  .header-content svg{
    stroke: rgba(236, 139, 21, 0.829);
  }
  .container-new-session{
    width: 100%;
    margin: 0.6em auto;
    
    
  }
  .container-new-session p{
    font-size: 2vmax;
    text-align: center;
    margin: 1em;

  }
  .btn-large{
    width: 60%;
    margin: 0 auto; 
  }
  .btn-small{
    width: 10%;
    position: absolute;
    right: 0;
    margin: 0 1em; 
  }
  .content-new-session{
    background-color: #4d4d4d83;
    border-radius: 0.5em;
    border: 1px dashed rgba(0  0  0 / 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
   
    cursor: pointer;
    
  }
.content-new-session h4{
  font-size: 2em;
  margin: 0;
  padding: 0;
}
.text-nao-sessao p{
  font-size: 1.5em;
  text-align: center;
  margin: 0;
  padding: 0;
}
.content-new-session:hover{
  background-color: #88888883;
  border: 1px dashed rgba(82, 82, 82, 0.4);
}
.content-ico{
  height: 2em;
  aspect-ratio: 1/1;
}

.content-social{
  background-color: rgb(43  43  43 / 0.7);
  width: 100%;
}
.content-social h3{
  padding-bottom: 5px;
  margin: 0;
  text-align: center;
  border-bottom: 1px dashed rgba(0  0  0 / 0.4);
  
}
.content-social ul{
  margin: 0;
  display: flex;
  flex-direction: column;
}
.content-social ul li{
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-social ul li:hover{
  background-color: rgb(43  43  43 / 0.7);

}
#status{
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #04e04e;
  
  margin: 0;
  margin-right: 1em;
}
.ativos h3{
  background-color: #00f7528e;
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


  #app{
    background: black;
    background-image: url('../img/background.webp');
    background-position: center ;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: contain;
  }
  .home{
    /* background-image: url('../img/background.webp'); */
    background-color: rgba(0  0  0 / 0.5);
    background-position: center ;
    background-repeat: repeat-x;
    background-attachment: fixed;
    background-size: contain;
    display: flex;

    height: 100vh;
  
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
  
  .content-right{
    border: 1px solid rgba(110, 110, 110, 0.918);
    background-color: rgba(23, 23, 23, 0.7);
    height: 100vh;
    width:100%;
  }
  .conteiner-b{
    background-color: rgba(23, 23, 23, 0.5);
    height: 100vh;
    width:70%;
    border: 1px solid rgba(88, 88, 88, 0.7);;
  }

  .conteiner-c{
    grid-area: ladoC;
    background-color: rgb(181, 217, 177);
  }
  .caixa-personagem-demo{
    background-color: rgba(217  217  217 / 0.2);
    border-radius: 5px;
    padding: 5px 0;
  }
  .containerJogadores{
  
    width: 100%;
    overflow: hidden;
  }
  
  .containerJogadores ul{
    padding: 0;
    padding-left: 20px;
    list-style: none;
    width: 100%;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-left: 0px;
  }
  .containerJogadores ul li{
    float:left;
    display: flex;
    border-radius: 5px;
    opacity: 1;
    flex-direction: column;
    text-align:center;
    width: 200px;
    height: 470px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    background-color: rgba(0  0  0 / 0.2);
    border: 1px solid rgb(26, 26, 26);
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .containerJogadores ul li:hover{
    background-color: rgb(43, 43, 43);
    border: 1px solid rgb(85, 85, 85)
  }
  #btnAdd{
    border-radius: 5px;
    height: 482px;
    width: 222px;
    padding: 10px;
    background-color: rgb(0  0  0 / 0.7);
    border: 1px solid rgb(26, 26, 26);
    color: #fff;
    margin-right: 10px;
    font-size: 50px;
  }
  #btnAdd:hover{
    background-color: rgb(43  43  43 / 0.7);
    border: 1px solid rgb(85, 85, 85)
  }
  h2{
    font-size: 20px;
    color: #ffff;
  }
  h6{
    font-size: 15px;
    background-color: #272727a1;
    color: #ffff;
    margin: 0 auto;
  
  }
  #imgPerfil{
    width: 120px;
    height: 120px;
  }
  .container-avatar{
      height:140px;
      background-color: rgb(41  41  41 / 0.6);
      border-radius: 20px;
      padding: 10px;
      }
  .container-avatar img{
      width: 120px;
      height: 120px;}
  .box-perfil{
      margin: 0 auto;
      background-color: #a2a2a2;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 2px solid rgba(190, 190, 190, 0.6);
      overflow:hidden;
  
  }
  .box-perfil:hover{
      background-color: #a2a2a2;
       border: 2px solid rgb(233, 233, 233);
  }
  .caixa-bar h3{
    color: bisque;
    font-family: "Consolas";
    margin: 10px 0;
  }
  .contagemBarra {
      width: 100%;
      margin-left: 10px;}
  .contagemBarra{
      font-size: 20px;}
  .barra-p{
      margin-top: 0;
      margin-bottom: 0;
      height: 100%;
      transition: width 2s;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;}
  
  .barraP{
      margin-top: 0;
      margin-bottom: 7px;
      width: 100%;
      height: 20px;}
  .barraVida{
      background-color: rgb(71, 18, 18);}
  .barra-vida{
      background-color: #940909;
      border-right: 2px solid #ff7777;}
  .barraSanidade{
      background-color: rgb(11, 14, 70);
  
      display:block;}
  .barra-sanidade{
      background-color: #203f94;
      border-right: 2px solid #638cdd;}
  .barraOcultismo{
      background-color: rgb(24, 2, 22);}
  .barra-ocultismo{
      background-color: #580b7f;
      border-right: 2px solid #ab65b5;}
  .barraEsforco{
      background-color: rgb(2, 24, 7);}
  .barra-esforco{
      background-color: #296e3d;
      border-right: 2px solid #65b580;}
  #box-barra-padrao h4{
      margin: 0 auto;
      font-size: 20px;
      color: bisque;
  }
  .conteiner-b h2, .content-right h2 {
    text-align: center;
    margin: 20px auto;
  }
  .menuMestre{
    list-style: none;
  }
  .menuMestre li{
    font-size: 20px;
    height: 40px;
    width: 200px;
    margin-top:5px;
    border-bottom: 1px solid rgba(190, 190, 190, 0.6)
  }
  .menuMestre li:hover{
    background-color: rgba(61, 114, 17, 0.3)
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
  }
  .caixa-btn-sessao h2{
    margin: 0;
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
    border-top: 1px solid rgba( 255 255 255 / 0.7)
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