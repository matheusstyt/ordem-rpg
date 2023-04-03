<template>
    <div class="modal-session" v-if="modal_contact_opened === true">
      <button class="btn-x" @click="close_modal_contact()">X</button>
      <ModalJogador :session_id="session_id" />
    </div>
    
    <div class="modal-session" v-if="modal_atributos_opened === true">
      <button class="btn-x" @click="close_modal_atributos()">X</button>
      <ModalAtributos />
    </div>
    <div class="modal-session" v-if="modal_pericias_opened === true">
      <button class="btn-x" @click="close_modal_pericias()">X</button>
      <ModalPericias />
    </div>
    <div class="modal-session" v-if="modal_resistencias_opened === true">
      <button class="btn-x" @click="close_modal_resistencias()">X</button>
      <ModalResistencias />
    </div>
    <div class="modal-session" v-if="modal_armamentos_opened === true">
      <button class="btn-x" @click="close_modal_armamentos()">X</button>
      <ModalArmamentos />
    </div>
    
    <preloader v-if="loading" />
    <div class="container-home"  v-else>
        
        <div class="content-right" v-if="system == false">

          <div class="content-session-add flex">
            <h3> {{ sessao_atual.mestre}}</h3>
            <h3>{{ sessao_atual.descricao}}</h3>
          </div>
          <h5 class="content-add-person">+</h5>
       
  
        </div>
        <div class="content-left" >
          <div class="content-social-btn">
            <div class="flex">
              <div class="content-ico">
                <img v-bind:src="require('@/assets/ico/meet.svg')" alt="Social_Img">
              </div> 
              <h2>Jogadores</h2>
            </div>
            <div class="btn-add-session" @click="open_modal_player()">
              <h4>+</h4>
            </div>
          </div>
          <div class="content-social ativos">
            <h3>Online</h3>
            <ul>
              <li v-for="(item, index) in sessao_atual.players">
                <p>{{item.player}}</p>
                <div class="pendente-container-btn">
                </div>
                <div id="status"></div>
              </li>
            </ul>
          </div>
          <div class="content-social config" v-if="show_config === true">
            <h3>Configurar</h3>
            <ul>
              <li @click="open_modal_atributos()">Atributos</li>
              <li @click="open_modal_pericias()">Pericias</li>
              <li @click="open_modal_resistencias()">Resistencias a dano</li>
              <li @click="open_modal_armamentos()">Armamentos</li>
              <li>Acessórios</li>
              <li>Rituais</li>
            </ul>
          </div>
        </div>
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

  import ModalResistencias from '../components/sessao/ModalResistencias.vue'
  import ModalPericias from '../components/sessao/ModalPericias.vue'
  import ModalAtributos from '../components/sessao/ModalAtributos.vue'

  import ModalArmamentos from '../components/sessao/ModalArmamento.vue'

  import ModalJogador from '../components/ModalNewJogador.vue'

  import SessaoPersonagens from '../components/SessaoPersonagens.vue'

  export default {
      components: {ModalAtributos, ModalPericias, ModalResistencias, ModalArmamentos, ModalJogador, SessaoPersonagens, System, logout, preloader},
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
          session_name : sessionStorage.getItem("session_descricao"),
          session_id : sessionStorage.getItem("session_id"),
          Usuario: sessionStorage.getItem('email'),
          email : sessionStorage.getItem('email'),
          data_atual : null,

          modal_atributos_opened : false,
          modal_pericias_opened : false,
          modal_resistencias_opened : false,

          modal_armamentos_opened : false,
          modal_acessorios_opened : false,
          modal_rituais_opened : false,

          modal_contact_opened : false,
          sessao_atual : false,
          list_pendente : null,
          list_contact : null,
          no_session : false,
          show_config : false
  
          }
      },
      methods:{
        open_modal_armamentos(){
          this.modal_armamentos_opened = true
        },
        open_modal_atributos(){
          this.modal_atributos_opened = true
        },
        open_modal_pericias(){
          this.modal_pericias_opened = true
        },
        open_modal_resistencias(){
          this.modal_resistencias_opened = true
        },
        open_modal_player(){
          this.modal_contact_opened = true
        },
        close_modal_resistencias(){
          this.modal_resistencias_opened = false
        },
        close_modal_pericias(){
          this.modal_pericias_opened = false
        },
        close_modal_atributos(){
          this.modal_atributos_opened = false
        },
        close_modal_armamentos(){
          this.modal_armamentos_opened = false
        },
        close_modal_contact(){
          this.modal_contact_opened = false
        },
        
        async get_session(){
          const url_session = `http://192.168.100.26:8000/session/${sessionStorage.getItem('session_id')}/`;
            const now = Date()
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            axios.get(url_session,{ headers : headers })
            .then( res => {
              console.log('session')
              console.log(res.data)
              this.sessao_atual = res.data.session        
              this.loading = false    
              this.showConfig() 
            })
            .catch( error => { 
              console.log(error)
            })
        },  
        aceitar_pedido(fk_origem, fk_destino, id){
          let now = new Date();
          let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
          let formattedDate = formatter.format(now);

          if(sessionStorage.getItem("token")){
            const url = `http://192.168.100.26:8000/contact/`;

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
          const url = `http://192.168.100.26:8000/ask/${id}/`;
              const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
              axios.delete(url, { headers : headers })
              .then(res => {
                window.location.reload()
              })
              .catch( error => {
                console.log(error)
              })
        },
        showConfig(){
          console.log(sessionStorage.getItem("user_id"))
          console.log(this.sessao_atual.fk_mestre)
          if(parseInt(sessionStorage.getItem("user_id")) === this.sessao_atual.fk_mestre){
            this.show_config = true
          }

        }
      },
      mounted(){

        

        if(!sessionStorage.getItem('token')){ this.$router.push({name:"login"}) }

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
  .modal-session {
    background-color: rgba(0 0 0 / 0.4);
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
}
  .flex{
    display: flex;
    justify-content: space-evenly;
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
  height: 2em;
  aspect-ratio: 1/1;
}
.content-social-btn{
  height: 5%;
}
.content-social{
  background-color: rgb(43  43  43 / 0.1);
  width: 100%;
  height: 45%;
  overflow: hidden;
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
      background-color: rgba(22, 22, 22, 0.568);
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
      background-color: rgba(5, 5, 5, 0.568);
      #status{
        background-color: #09aa31;   
 
      }
      
    }
  }
}

.ativos h3{
  background-color: #00f75259;
  
}
.config{
  h3{
    background-color: #5b50bb50;
    z-index: 2;
  }
  ul {
    z-index: 1;
    li{
      cursor: pointer;
      padding: 0.5em 1em;
      border-bottom: 1px solid rgba(68, 68, 68, 0.4);
      box-shadow: 0px 1px 5px #000;
    }
  }
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
  padding-top: 2vmax;
  gap: 1em;
  height: 88vh;
  width: 75vw;
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
  }
}

  .content-social-btn{
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
  .content-add-person{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    background-color: #04e04d2d;
    aspect-ratio: 9/16;
  }
  .content-add-person:hover{
    background-color: #1a4b2a4f;

  }
  .content-personagens-resumo{
    cursor: pointer;
    text-align: center;
    font-family: 'Consolas';
    width: 100%;
    
  }
  .content-personagens-resumo ul{
    padding: 0;
    margin: 0;
    list-style: none;
    display:block;
  }
  .content-personagens-resumo ul li{
    margin: 0;
    padding: 0;
    display:flex;
    background-color: rgba(0 0 0 / 0.3);
    border-bottom: 1px solid rgba( 255 255 255 / 0.7);
  }
  .content-personagens-resumo ul li div{
    margin: 0;
    padding: 0;
    display:flex;
  
  }
  .content-personagens-resumo ul li:hover{
    background-color: rgba( 255 255 255 / 0.1);
  }
  
  .content-personagens-resumo ul li p, .content-personagens-resumo ul li label{
    margin: 5px 0; 
    padding: 0 20px;
    border-right: 1px solid rgba( 255 255 255 / 0.7);
    cursor: pointer;
  }
  .content-personagens-resumo ul li label{
    border: none;
  }
  .content-personagens-resumo ul li select{
    background-color: rgba(0  0  0 / 0.4);
    color: #fff;
    font-family: "Consolas";
    font-size: 14px;
  }
  </style>