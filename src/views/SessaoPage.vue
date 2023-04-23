<template>
  <div class="modal-session" v-if="modal_player_opened === true">
    <ModalJogador :session_id="session_id" @close_modal_player="close_modal_player" />
  </div>
  <div class="modal-session" v-if="modal_atributos_opened === true">
    <ModalAtributos @close_modal_atributos="close_modal_atributos"/>
  </div>
  <div class="modal-session" v-if="modal_pericias_opened === true">
    <ModalPericias @close_modal_pericias="close_modal_pericias"/>
  </div>
  <div class="modal-session" v-if="modal_resistencias_opened === true">
    <ModalResistencias @close_modal_resistencias="close_modal_resistencias"/>
  </div>
  <div class="modal-session" v-if="modal_armamentos_opened === true">
    <ModalArmamentos @close_modal_armamentos="close_modal_armamentos"/>
  </div>

  <div class="modal-session" v-if="modal_acessorios_opened === true">
    <ModalAcessorios @close_modal_acessorios="close_modal_acessorios"/>
  </div>

  <preloader v-if="loading" />
  <div class="container-home-sessao" v-else>
    <div class="content-right" v-if="system == false">
      <div class="content-session-add">
        <h3>Mestre: {{ sessao_atual.mestre }}</h3>
        <h3 class="hide-small">Descrição: {{ sessao_atual.descricao }}</h3>
        <!-- <button @click="novo_personagem()">criar novo</button> -->
      </div>
      <div class="container-personagens">
        <div id="title-personagem">
          <h3>Ficha's Personagens</h3>
          <button>+</button>
        </div>
        <ul>
          <template v-for="(item, index) in list_personagens" :key="item.id">
            <li @click="go_personagem(item)">
              <div class="detalhe-perfil-content" :style="{ border: `5px solid ${item.status_color}` }">
                <img :src="item.perfil_img" alt="">
              </div>
              <p>Nome: {{ item.nome }}</p>
              <p>Classe: {{ item.classe }}</p>
              <p>Patente: {{ item.patente }}</p>
              <p>NEX: {{ item.NEX }}</p>

              <div class="container-bar">
                <h3>Vida</h3>
                <div class="back-bar" id="back-vida">
                  <div
                    class="front-bar"
                    id="front-vida"
                    :style="{ width: `${(item.vida.atual / item.vida.maximo) * 100}%` }" >
                    <p>{{ item.vida.atual }}/{{ item.vida.maximo }}</p>
                  </div>
                </div>
              </div>
              <div class="container-bar">
                <h3>Sanidade</h3>
                <div class="back-bar" id="back-sanidade">
                  <div
                    class="front-bar"
                    id="front-sanidade"
                    :style="{ width: `${(item.sanidade.atual / item.sanidade.maximo) * 100}%` }" >
                    <p>{{ item.sanidade.atual }}/{{ item.sanidade.maximo }}</p>
                  </div>
                </div>
              </div>
              <div class="container-bar">
                <h3>Ocultismo</h3>
                <div class="back-bar" id="back-ocultismo">
                  <div
                    class="front-bar"
                    id="front-ocultismo"
                    :style="{ width: `${(item.ocultismo.atual / item.ocultismo.maximo) * 100}%` }">
                    <p>{{ item.ocultismo.atual }}/{{ item.ocultismo.maximo }}</p>
                  </div>
                </div>
              </div>
              <div class="container-bar">
                <h3>Esforço</h3>
                <div class="back-bar" id="back-esforco">
                  <div
                    class="front-bar"
                    id="front-esforco"
                    :style="{ width: `${(item.esforco.atual / item.esforco.maximo) * 100}%` }">
                    <p>{{ item.esforco.atual }}/{{ item.esforco.maximo }}</p>
                  </div>
                </div>
              </div>
              <p>Jogador: {{ item.jogador }}</p>
            </li>
          </template>
        </ul>

        <!-- <h5 class="content-add-person">+</h5> -->
      </div>
      <div class="container-npcs">
        <div id="title-npc">
          <h3>Ficha's NPC's</h3>
          <button>+</button>
        </div>
      </div>
    </div>
    <div class="content-left">
      <div class="title-lateral">
        <div class="ico-h3">
          <img
            class="ico-group"
            v-bind:src="require('@/assets/ico/meet.svg')"
            alt="Social_Img"
          />
          <h3 class="hide-small">Jogadores</h3>
        </div>

        <button @click="open_modal_player">+</button>
      </div>
      <div class="coluna-lateral">
        <div class="content-social ativos">
          <h3>Online</h3>
          <ul>
            <li v-for="(item, index) in sessao_atual.players">
              <p>{{ item.player }}</p>
              <div class="pendente-container-btn"></div>
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
            <li @click="open_modal_acessorios()">Acessórios</li>
            <li>Rituais</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import preloader from "../components/gif/preloader.vue";
import logout from "../components/svg/logout.vue";

import ModalResistencias from "@/components/sessao/ModalResistencias.vue";
import ModalPericias from "@/components/sessao/ModalPericias.vue";
import ModalAtributos from "@/components/sessao/ModalAtributos.vue";

import ModalArmamentos from "@/components/sessao/ModalArmamento.vue";

import ModalAcessorios from "@/components/sessao/ModalAcessorios.vue";

import ModalJogador from "@/components/sessao/add/ModalNewJogador.vue";


import { carregar_personagem } from "@/api/personagem/get_personagem.js";

export default {
  components: {
    ModalAtributos,
    ModalPericias,
    ModalResistencias,
    ModalArmamentos,
    ModalAcessorios,
    ModalJogador,
    logout,
    preloader,
  },
  props: {
    data: Object,
    vida: Object,
    sanidade: Object,
    ocultismo: Object,
    esforco: Object,
    acao: Number,
    movimento: Number,
    reacao: Number,
  },
  data() {
    return {
      loading: true,
      system: false,
      
      host: require("@/config/env").host,
      port: require("@/config/env").port,

      session_name: sessionStorage.getItem("session_descricao"),
      session_id: sessionStorage.getItem("session_id"),
      Usuario: sessionStorage.getItem("email"),
      email: sessionStorage.getItem("email"),
      data_atual: null,

      modal_atributos_opened: false,
      modal_pericias_opened: false,
      modal_resistencias_opened: false,

      modal_armamentos_opened: false,
      modal_acessorios_opened: false,
      modal_rituais_opened: false,

      modal_player_opened: false,
      sessao_atual: false,
      list_pendente: null,
      list_contact: null,
      no_session: false,
      show_config: false,
      list_personagens: [],
    };
  },
  methods: {
    fechar_personagem_modal(value){
      this.modal_player_opened = value;
    },
    open_modal_acessorios() {
      this.modal_acessorios_opened = true;
    },
    open_modal_armamentos() {
      this.modal_armamentos_opened = true;
    },
    open_modal_atributos() {
      this.modal_atributos_opened = true;
    },
    open_modal_pericias() {
      this.modal_pericias_opened = true;
    },
    open_modal_resistencias() {
      this.modal_resistencias_opened = true;
    },
    open_modal_player() {
      this.modal_player_opened = true;
    },
    close_modal_resistencias() {
      this.modal_resistencias_opened = false;
    },
    close_modal_pericias() {
      this.modal_pericias_opened = false;
    },
    close_modal_atributos() {
      this.modal_atributos_opened = false;
    },
    close_modal_armamentos() {
      this.modal_armamentos_opened = false;
    },
    close_modal_acessorios() {
      this.modal_acessorios_opened = false;
    },
    close_modal_player() {
      this.modal_player_opened = false;
    },
    novo_personagem() {
      window.location.href = "/build";
    },
    async get_session() {
      const url_session = `${this.host}:${this.port}/session/${sessionStorage.getItem( "session_id" )}/`;
      const now = Date();
      const headers = { Authorization: "Token " + sessionStorage.getItem("token") };

      axios
        .get(url_session, { headers: headers })
        .then((res) => {
          console.log("session");
          console.log(res.data);
          this.sessao_atual = res.data.session;
          this.loading = false;
          this.showConfig();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    go_personagem(personagem){
      this.$router.push({
        name: 'personagem',
        params: { 

          "id" : parseInt(personagem.id),
          "nome" : personagem.nome,
          "origem" : personagem.origem,
          "idade" : personagem.idade,
          "sexo" : personagem.sexo,
          "naturalidade" : personagem.naturalidade,
          "residencia" : personagem.residencia,
          "classe" : personagem.classe,
          "NEX" : personagem.NEX,
          "trilha" : personagem.trilha,
          "patente" : personagem.patente,

          "lesao_grave" : Boolean(personagem.lesao_grave) ,
          "inconsciente" : Boolean(personagem.inconsciente),
          "morrendo" : Boolean(personagem.morrendo),
          "traumatizado" : Boolean(personagem.traumatizado),
          "enlouquecendo" : Boolean(personagem.enlouquecendo),

          "perfil_img" : personagem.perfil_img,

          "acessorios" : JSON.stringify(personagem.acessorios.acessorio),
          "armamentos" : JSON.stringify(personagem.armamentos.armamento),

          "atributos" : personagem.atributos,
          "pericias" : personagem.pericias,
          "resistencias" : personagem.resistencias,

          "antescendentes" : personagem.antescendentes,

          "esforco" : JSON.stringify(personagem.esforco),
          "ocultismo" : JSON.stringify(personagem.ocultismo),
          "sanidade" : JSON.stringify(personagem.sanidade),
          "vida" : JSON.stringify(personagem.vida) 


      }
      })
    },
    showConfig() {
      if (parseInt(sessionStorage.getItem("user_id")) === this.sessao_atual.fk_mestre) {
        this.show_config = true;
      }
    },
  },
  mounted() {
    // ativando header principal
    var main = document.getElementById("header-main");
    var header = document.getElementById("header-personagem");
    //main.style = "display: flex;"
   // header.style = "display : none;"

    
    carregar_personagem(this.session_id).then((dados) => {
      this.list_personagens = dados.personagem;
      console.log(this.list_personagens);
    });

    if (!sessionStorage.getItem("token")) {
      this.$router.push({ name: "login" });
    }

    this.get_session();

    setInterval(() => {
      let now = new Date();
      let formatter = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      });
      let formattedDate = formatter.format(now);
      this.data_atual = formattedDate;
    }, 1000);
  },
  computed: {},
  watch: {
    created() {},
  },
};
</script>
<style lang="scss">

/* Estilização do Scroll */

/* Cor da barra de rolagem */
::-webkit-scrollbar {
  width: 8px;
  background-color: #1a1a1a;
}

/* Cor do indicador do scroll */
::-webkit-scrollbar-thumb {
  background-color: #666666;
}

/* Cor do indicador do scroll quando está em hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #999999;
}
.modal-session {
  background-color: rgba(0 0 0 / 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  top: 0vh;
  align-items: flex-start;
  justify-content: center;
  z-index: 3;
}
.flex {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5em;
}



.container-new-session {
  width: 100%;
  display: flex;
  margin: 0.6em auto;
  p {
    font-size: 2vmax;
    text-align: center;
    margin: 1em;
  }
}
.content-session-add {
  margin: 0;
  background-color: #000000c8;
  border-bottom: 1px solid rgba(255 255 255 / 0.7);
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-around;

  width: 100%;
  h3 {
    margin: 0;
    padding: 0.2em 0;
    font-size: 1em;
    font-weight: 500;
  }
  h3:before {
    content: "";
  }
  button {
    background-color: #ffffffb4;
    color: rgb(42, 42, 42);
    border-radius: 0.5em;
    border: 1px dashed rgba(0 0 0 / 0.4);
    padding: 0.2em;
    margin: 0.2em 0;
    cursor: pointer;
  }
  button:hover {
    background-color: #ffffffe3;
    color: rgb(0, 0, 0);
  }
  button:active {
    background-color: #c9fcc28c;
    color: white;
  }
}
.btn-add-session {
  position: absolute;
  right: 2%;
  background-color: #4d4d4d83;
  border-radius: 0.5em;
  border: 1px dashed rgba(0 0 0 / 0.4);
  padding: 0 0.5em;
  cursor: pointer;

  h4 {
    font-size: 2em;
    margin: 0;
    padding: 0;
  }
}
.btn-add-session:hover {
  background-color: #88888883;
  border: 1px dashed rgba(82, 82, 82, 0.4);
}

.title-lateral {
  width: 100%;
  position: relative;
  display: flex;

  align-items: center;
  justify-content: center;
  gap: 0.6em;
  background-color: rgb(0 0 0 / 0.8);
  border-top: 1px solid rgba(190, 190, 190, 0.6);
  border-bottom: 1px solid rgba(190, 190, 190, 0.6);
  .ico-h3 {
    display: flex;
    gap: 0.5em;
    img {
      height: 1.5em;
      aspect-ratio: 1/1;
    }
    h3 {
      font-size: 1em;
      font-weight: 400;
      padding: 0.3em 0;
      color: bisque;
      margin: 0;
    }
  }
  button {
    background-color: #ffffffb4;
    color: rgb(42, 42, 42);
    border-radius: 0.5em;
    border: 1px dashed rgba(0 0 0 / 0.4);
    margin: 0.2em 0;
    cursor: pointer;
    position: absolute;
    right: 0.5em;
  }
  button:hover {
    background-color: #ffffffe3;
    color: rgb(0, 0, 0);
  }
  button:active {
    background-color: #c9fcc28c;
    color: white;
  }
}
.coluna-lateral {
  height: auto;
  .content-social {
    background-color: rgb(43 43 43 / 0.1);
    width: 100%;
 
    max-height: 50%;
    overflow-y: auto;
    h3 {
      top: 0;
      position: sticky;
      margin: 0;
      text-align: center;
      font-size: 1em;
      font-weight: 400;
      padding: 0.3em 0;
      color: bisque;
      border-bottom: 1px dashed rgba(0 0 0 / 0.4);
    }
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.726);
      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 1em;
        background-color: rgba(22, 22, 22, 0.568);
        p {
          margin: 0;
        }
        #status {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background-color: #04e04e;
          margin: 0;
          margin-right: 1em;
        }
      }
      li:hover {
        background-color: rgba(5, 5, 5, 0.568);
        #status {
          background-color: #09aa31;
        }
      }
    }
  }
}
.ativos h3 {
  background-color: #00f75259;
}
.config h3 {
  background-color: #000000ea;
}
ul {
  overflow-y: auto;
  height: 100%;

  li {
    cursor: pointer;
    padding: 0.5em 1em;
    border-bottom: 1px solid rgba(68, 68, 68, 0.4);
  }
}

.pendente-container-btn {
  display: flex;
  gap: 1em;
  padding-right: 2em;
  button {
    background-color: rgb(0 0 0 / 0.7);
    padding: 0.4em 1em;
  }
  button:hover {
    background-color: rgba(59, 59, 59, 0.7);
  }
}
#contact-okay:active {
  background-color: rgba(35, 231, 78, 0.486);
}
#contact-delete:active {
  background-color: rgba(231, 35, 35, 0.486);
}

.btn-x {
  background-color: rgb(0 0 0 / 0);
  top: 1%;
  right: 1%;
  position: absolute;
  z-index: 3;
}
.btn-x:hover {
  background-color: rgba(223, 17, 17, 0.7);
}

.container-home-sessao {
  display: flex;
  padding-top: 2vmax;
  gap: 1em;

  //width: 75vw;

  .content-left,
  .content-right {
    box-shadow: 0px 0px 5px rgba(15, 15, 15, 0.61);
   // border: 1px solid rgba(99, 99, 99, 0.877);
    
    h2 {
      text-align: center;
    }
  }
  .content-left {
  //  width: 20vw;
  }
  .content-right {
    width: 50vw;
  }
}

#btn-sessao {
  background-color: rgba(87, 241, 151, 0.7);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
}
#btn-sessao:hover {
  background-color: rgba(19, 82, 29, 0.7);
}
.container-personagens {
  background-color: rgba(0, 0, 0, 0.393);
  margin: 1em 0;
  padding: 0;
  overflow-y: auto;
  border: 1px solid #ffffff7f;
  border-radius: 0.3em;
  height: auto;
  min-height: 380px;
  #title-personagem{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff7f;
    h3{
      margin: 0.5em;
      padding: 0;
      padding-left: 1em;
    }
    button{
      cursor: pointer;
      background-color: #3fd52541;
      margin: 0.5em;
    }
    button:hover{
      background-color: #3fd525be;
      color: #fff;
      margin: 0.5em;
    }
  }
  h5 {
    width: 20%;
    aspect-ratio: 9/16;
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #080808ab;
    font-size: 2em;
    cursor: pointer;
  }
  h5:hover {
    background-color: #0000008e;
  }
  ul {
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    width: auto;
    background-color: transparent;
    list-style: none;
    gap: 1em;
    max-height: 390px;
    overflow-y: auto;
    li {
      cursor: pointer;
      padding: 0.4em;
      background-color: rgba(0 0 0 / 0.7);
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @media screen and (max-width: 738px) {
        width: 100%;
      }
      .detalhe-perfil-content{
        margin: 0 auto;
        border-radius: 50%;
        width: 120px;
        overflow: hidden;
        aspect-ratio: 1/1;
        img{
          height: 100%;
          width: 100%;
        }
      }
      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.8em;
        margin: 0.3em 0;
      }
      .container-bar {
        width: 100%;
        h3 {
          margin: 0;
          padding: 0;
          font-size: 0.9em;
        }
        .back-bar {
          position: relative;
          width: 100%;
          height: 1em;
          overflow: hidden;
          .front-bar {
            position: static;
            height: 100%;

            p {
              font-size: 0.8em;
              margin: 0;

              position: absolute;
              left: 40%;
            }
          }
        }
        #back-vida {
          background-color: rgb(97, 12, 12);
          #front-vida {
            background-color: red;
          }
        }
        #back-sanidade {
          background-color: rgb(12, 52, 97);
          #front-sanidade {
            background-color: rgb(48, 121, 181);
          }
        }
        #back-ocultismo {
          background-color: rgb(28, 12, 97);
          #front-ocultismo {
            background-color: rgb(111, 71, 203);
          }
        }
        #back-esforco {
          background-color: rgb(11, 73, 16);
          #front-esforco {
            background-color: rgb(61, 170, 86);
          }
        }
      }
    }
    li:hover {
      background-color: rgba(0 0 0 / 0.9);
    }
  }
}
.container-npcs{
  background-color: rgba(0, 0, 0, 0.393);
  margin: 1em 0;
  padding: 0;
  overflow-y: auto;
  border: 1px solid #ffffff7f;
  border-radius: 0.3em;
  height: auto;
  min-height: 380px;
  #title-npc{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff7f;
    h3{
      margin: 0.5em;
      padding: 0;
      padding-left: 1em;
    }
    button{
      background-color: #00000080;
      margin: 0.5em;
    }
  }
}
//MODAL PARDRÃO
.session-content-p {
  top: 4vmax;
  padding: 0;
  border: 1px solid bisque;
  background-color: rgba(0 0 0 / 0.5);
  //min-width: 34vw;
  //max-width: 36vw;
  //width: 35vw;
  height: auto;
  box-shadow: 0px 0px 3px #f3eacd;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-height: 80%;
  overflow-y: auto;

  .sticky-content {
    width: 100%;
    box-shadow: 1em 0px 5px #292929;
    position: sticky;
    top: 0;
    background-color: rgba(0 0 0 / 0.6);
    .content-save {
      width: 80%;
      min-width: 78%;
      border-bottom: 1px dashed rgba(46, 46, 46, 0.418);
      background-color: #1818184b;
      padding: 0.5em 0;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: white;
        margin: 0;
      }
      img {
        height: 1.4em;
        aspect-ratio: 1/1;
        cursor: pointer;
      }
    }
    .content-add {
      padding: 1em 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      min-width: 70%;
      max-width: 80%;
      margin: 0 auto;
      .input-field {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em 0;

        input {
          width: 40%;
          font-size: 1em;
          font-family: "Consolas";
          padding: 0.4em 1em;
          color: #292929;
        }
        button {
          margin: 0;
          padding: 0.5em;
          img {
            height: 1em;
            aspect-ratio: 1/1;
          }
        }
      }
    }
  }

  button {
    padding: 0.4em;
    margin-bottom: 2em;
    color: #1b1b1b;
  }
  button:hover {
    color: #1b1b1b;
    background-color: bisque;
    transition: ease 0.5s;
    border: 2px solid rgb(224, 184, 135);
  }
  ul {
    width: 80%;
    padding: 0;
    li {
      width: 100%;
      display: flex;
      padding: 0.5em 0;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(46, 46, 46, 0);
      gap: 1em;
      p {
        font-size: 1em;
        margin: 0;
      }
      .conteiner-ico {
        display: flex;

        gap: 1em;
        .content-ico-op {
          height: 1.5em;
          aspect-ratio: 1/1;
          cursor: pointer;
        }
      }
    }
    li:hover {
      border-bottom: 1px solid rgba(83, 83, 83, 0.418);
    }
  }
}
.session-content-p:hover {
  box-shadow: 0px 0px 5px #fff;
  transition: ease 0.5s;
}
@media screen and (max-width: 600px) {
  .hide-small {
    display: none;
  }
  .container-home-sessao {
    width: 99%;
    gap: 5px;
  }
}


</style>
