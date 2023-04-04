<template>
    <div class="modal-session" v-if="modal_contact_opened === true">
      <button class="btn-x" @click="close_modal_contact()">X</button>
      <ModalFriend />
    </div>
    
    <div class="modal-session" v-if="modal_session_opened === true">
      <button class="btn-x" @click="close_modal_session()">X</button>
      <ModalSessao />
    </div>
    <preloader v-if="loading" />
    <div class="container-home"  v-else>
          
        <div class="content-right" v-if="system == false">
          <div class="content-sessions-list">
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
                  <li v-for="(session, index) in list_sessions" :key="session.id" @click="open_session(session.id, session.descricao)" >
                  <div @click="abrirsession(session.idsession)">
                    <p>N°: {{index+1}}</p>  
                    <p>mestre: {{session.mestre}}</p>
                    <p>descrição : {{session.descricao}}</p>
                    <p>data de inicio: {{session.data_criacao}}</p>
                    <label  for="status">status: {{session.status}}</label>
                  </div>
                  </li>
                </ul>
            </div>

          </div>
          <div class="content-matches-list">
            <div class="content-session-add flex" v-if="list_matches.length === 0">
              <h3>Não há partidas ativas.</h3>
            </div>
            <div class="content-session-add flex" v-else>
              <h3>Partidas ativas</h3>
            </div>
            <div class="content-session-open" style="display: block">
              <ul>
                <li v-for="(match, index) in list_matches" :key="match.id" @click="open_match(match.id, match.fk_mestre, match.descricao)" >
                <div>
                  <p>N°: {{index+1}}</p>
                  
                  <p>mestre: {{match.mestre}}</p>
                  <p>descrição : {{match.descricao}}</p>
                  <p>data de inicio: {{match.data_criacao}}</p>
                  
                 <!-- <p>Tempo decorrido: {{match.tempoDecorrido}}</p> -->
                  <label  for="status">status: {{match.status}}</label>
                </div>
                </li>
              </ul>
          </div>
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
          <div class="content-social partida">
            <h3>Novas partidas</h3>
            <ul>
              <li v-for="(item, index) in list_partidas" >
                <p>{{item.mestre}}</p>
                <div class="pendente-container-btn">
                  <button id="contact-okay" @click="aceitar_pedido_partida(item.fk_mestre, item.fk_sessao, item.fk_destino, item.id)">Confirmar</button>
                  <button id="contact-delete" @click="excluir_pedido_partida(item.id)">Excluir</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

  </div>

</template>
<script>

  import axios from 'axios';
  import preloader from '../components/gif/preloader.vue'
  import logout from '../components/svg/logout.vue'
  import System from '../components/sistema/ConfigSystem.vue'
  import ModalSessao from '@/components/painel/ModalNewSessao.vue'
  import ModalFriend from '@/components/painel/ModalNewFriend.vue'
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
          system : false,
          user_id : sessionStorage.getItem('user_id'),
          Usuario: sessionStorage.getItem('email'),
          email : sessionStorage.getItem('email'),
          data_atual : null,
          modal_session_opened : false,
          modal_contact_opened : false,
          list_sessions : false,
          list_matches : [],
          list_partidas : false,
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
        async list_match(){
          const url_session = "http://170.10.0.50:8000/session/";
          const url_players = "http://170.10.0.50:8000/players/";
          const now = Date()
          const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
        
          axios.get(`http://170.10.0.50:8000/players/`, { params : { fk_user : this.user_id }, headers : headers })
          .then( res => {
            console.log('players')
            console
            .log(res.data)
            
            res.data.players.forEach(element => {
              axios.get(`http://170.10.0.50:8000/session/${element.fk_session}/`, { headers : headers })
              .then(res => { 
                console.log('match list')
                console.log(res.data)

                this.list_matches.push(res.data.session)

              })
              .catch(error => {

              })
            });
      
          })
          .catch( error => { 
            console.log(error)
          })
        },
        async get_session(){
            const url_session = "http://170.10.0.50:8000/session/";
            const now = Date()
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            axios.get(url_session, { params : { fk_mestre : this.user_id }, headers : headers })
            .then( res => {
              console.log(res.data)
              this.list_sessions = res.data.session
              
              if(res.data.session.lenght === 0){
                this.no_session = false;
              }else{
                this.no_session = true;
              }
              this.get_partida();
        
            })
            .catch( error => { 
              console.log(error)
            })

        },  
        async get_partida(){
            const url = "http://170.10.0.50:8000/askplayer/";
            const now = Date()
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
          
            axios.get(url, { headers : headers })
            .then( res => {
              console.log(res.data)

              if(res.data.askplayer.length == 0){
                this.list_partidas = null
              }else{
                this.list_partidas = res.data.askplayer
              }
              this.get_pendente();
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
              this.get_contact();
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
              
              this.loading = false
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
        },
        aceitar_pedido_partida(fk_mestre, fk_sessao, fk_destino, id){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);

            if(sessionStorage.getItem("token")){
              const url = `http://170.10.0.50:8000/players/`;

              const body_uni = {
                fk_user : fk_destino, 
                fk_session : fk_sessao,
                data_inicio : String(formattedDate) ,
          
              }
              console.table(body_uni)
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
              axios.post(url, body_uni, { headers : headers })
              .then( res => {
                this.excluir_pedido_partida(id);
              })
              .catch( error => { 
                  console.log(error)
              })
            }
        },
        excluir_pedido_partida(id){
          const url = `http://170.10.0.50:8000/askplayer/${id}/`;
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
              axios.delete(url, { headers : headers })
              .then(res => {
                window.location.reload()
              })
              .catch( error => {
                console.log(error)
              })
        },
        open_session(id, descricao){
          sessionStorage.setItem("session_id", id);
          sessionStorage.setItem("session_descricao", descricao);
          window.location.href = "/sessao"
        },
        open_match(id, fk_mestre, descricao){
          sessionStorage.setItem("session_id", id);
          sessionStorage.setItem("fk_mestre_ativo", fk_mestre);
          sessionStorage.setItem("session_descricao", descricao);
          window.location.href = "/sessao"
        }
      },
      mounted(){

        if(!sessionStorage.getItem('token')){ this.$router.push({name:"login"}) }
        this.list_match()
        this.get_session();
        
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
  
  .header{
    width: 100%;    
    background-color: rgba(0  0  0 / 0.1);
    height: 2.5em;
    margin-bottom: 1em;
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
      margin: 0;
    }
    p:hover{
      color: rgb(255, 188, 188);
    }
    h3{
      cursor: pointer;
      margin: 0;
    }
    h3:hover{
      color: rgba(177, 177, 177, 0.8);
    }
    svg{
      stroke: rgba(236, 139, 21, 0.829);
      cursor: pointer;
    }
  }
  }
  
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
    padding: 0;
    display: flex;
    flex-direction: column;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.726);
    li{
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 1em;
      background-color: rgba(3, 3, 3, 0.26);
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
      background-color: rgba(0, 0, 0, 0.568);
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
.partida h3{
  background-color: #f8750a4f;
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
  display: flex;

  padding-top: 2vmax;
  gap: 1em;
  height: 88vh;
  width: 80vw;
  .conteiner-system{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .content-left, .content-right{
    box-shadow: 0px 0px 5px rgba(15, 15, 15, 0.61);
    background-color: rgba(23, 23, 23, 0.5);
    border: 1px solid rgba(99, 99, 99, 0.877);
    height: 100%;
    h2{
      text-align: center;
    }  
  }
  .content-left{
    width:30%;
  }
  .content-right{
    width:70%;
    .content-matches-list{
      height: 50%;
      border-top: 1px solid rgba(70, 70, 70, 0.7);
    } 
    .content-sessions-list{
      height: 50%;
    }
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