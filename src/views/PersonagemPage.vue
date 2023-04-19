<template>
  <div class="modal-screen" v-if="open_modal">
    <modal-dado  
      :valor="valor_to_modal" 
      :nome_atual="nome_to_modal"
      :is_pericia="is_pericia_value"
      @close_modal="close_modal"
    />
  </div>
  
    <div class="personagem-container">
      
        <Avatar
            :perfil64="perfil_carregado"
            :l_vida.sync="vida"
            :l_sanidade.sync="sanidade"
            :l_ocultismo.sync="ocultismo" 
            :l_esforco.sync="esforco"
            :l_acao.sync="acao"
            :l_movimento.sync="movimento"
            :l_reacao.sync="reacao"
            :lesao_grave="lesao_grave"
            :inconsciente="inconsciente"
            :morrendo="morrendo"
            :traumatizado="traumatizado"
            :enlouquecendo="enlouquecendo"
            @u_lesao_grave="u_lesao_grave"
            @u_inconsciente="u_inconsciente"
            @u_morrendo="u_morrendo"
            @u_traumatizado="u_traumatizado"
            @u_enlouquecendo="u_enlouquecendo"
            @u_imagem_base64="u_imagem_base64"
        />
        <detalhes-info  
        :nome="data_personagem.nome"
        :origem="data_personagem.origem"
        :classe="data_personagem.classe"
        :idade="data_personagem.idade"
        :sexo="data_personagem.sexo"
        :patente="data_personagem.patente"
        :nascimento="data_personagem.naturalidade"
        :residencia="data_personagem.residencia"
        :trilha="data_personagem.trilha"
        :NEX="data_personagem.NEX"
        />
        <info-atributos :atributos="atributos" @nome_atual="nome_atual" @valor="valor" @is_pericia="is_pericia"/>
        <info-pericias :pericias="pericias" @nome_atual="nome_atual" @valor="valor" @is_pericia="is_pericia"/>
      <template v-if="carrosel === 3">
        <div class="loop pericias">
          <h3>Perícias</h3>
          <ul>
            <li v-for="(pericia, index) in pericias" :key="index">
              <img src="/img/d20_4.png" alt="" />
              <p>{{ pericia.nome }}</p>
              <input v-model="pericia.valor" type="number" />
            </li>
          </ul>
        </div>
      </template>
 
      <template v-if="carrosel == 5">
        <!-- <div class="content-sessaormamentos">
          <div class="content-sessao">
            <table>
              <thead>
                <th colspan="7">ARMAMENTOS DISPONÍVEIS</th>
                <tr>
                  <th>arma</th>
                  <th class="hide-td">categoria</th>
                  <th>dano</th>
                  <th class="hide-td">crítico</th>
                  <th>alcance</th>
                  <th class="hide-td">tipo</th>
                  <th>espaço</th>
                </tr>
              </thead>
  
              <template v-if="armamento_simples_sessao.length > 0">
                <h3>Armas Simples</h3>
                <tr
                  v-for="(arma, index) in armamento_simples_sessao"
                  :key="index"
                  @click="add_arma_simples(arma, index)"
                >
                  <td>{{ arma.arma }}</td>
                  <td class="hide-td">{{ arma.categoria_0 }}</td>
                  <td>{{ arma.dano }}</td>
                  <td class="hide-td">{{ arma.critico }}</td>
                  <td>{{ arma.alcance }}</td>
                  <td class="hide-td">{{ arma.tipo }}</td>
                  <td>{{ arma.espaco }}</td>
                </tr>
              </template>
              <template v-if="armamento_tatico_sessao.length > 0">
                <h3>Armas Táticas</h3>
                <tr
                  v-for="(arma, index) in armamento_tatico_sessao"
                  :key="index"
                  @click="add_arma_tatica(arma, index)"
                >
                  <td>{{ arma.arma }}</td>
                  <td>{{ arma.categoria_0 }}</td>
                  <td>{{ arma.dano }}</td>
                  <td>{{ arma.critico }}</td>
                  <td>{{ arma.alcance }}</td>
                  <td>{{ arma.tipo }}</td>
                  <td>{{ arma.espaco }}</td>
                </tr>
              </template>
              <template v-if="armamento_pesado_sessao.length > 0">
                <h3>Armas Pesadas</h3>
                <tr
                  v-for="(arma, index) in armamento_pesado_sessao"
                  :key="index"
                  @click="add_arma_pesada(arma, index)"
                >
                  <td>{{ arma.arma }}</td>
                  <td>{{ arma.categoria_0 }}</td>
                  <td>{{ arma.dano }}</td>
                  <td>{{ arma.critico }}</td>
                  <td>{{ arma.alcance }}</td>
                  <td>{{ arma.tipo }}</td>
                  <td>{{ arma.espaco }}</td>
                </tr>
              </template>
            </table>
          </div>
          <div class="content-personagem">
            <table>
              <thead>
                <th colspan="7">SEUS ARMAMENTOS</th>
                <tr>
                  <th>arma</th>
                  <th>categoria</th>
                  <th>dano</th>
                  <th>crítico</th>
                  <th>alcance</th>
                  <th>tipo</th>
                  <th>espaço</th>
                </tr>
              </thead>
              <template v-if="armamento_simples_personagem.length > 0">
                <h3>Armas Simples</h3>
                <tr
                  v-for="(arma, index) in armamento_simples_personagem"
                  :key="index"
                  @click="remove_arma_simples(arma, index)"
                >
                  <td>{{ arma.arma }}</td>
                  <td>{{ arma.categoria_0 }}</td>
                  <td>{{ arma.dano }}</td>
                  <td>{{ arma.critico }}</td>
                  <td>{{ arma.alcance }}</td>
                  <td>{{ arma.tipo }}</td>
                  <td>{{ arma.espaco }}</td>
                </tr>
              </template>
              <template v-if="armamento_tatico_personagem.length > 0">
                <h3>Armas Táticas</h3>
                <tr
                  v-for="(arma, index) in armamento_tatico_personagem"
                  :key="index"
                  @click="remove_arma_tatica(arma, index)"
                >
                  <td>{{ arma.arma }}</td>
                  <td>{{ arma.categoria_0 }}</td>
                  <td>{{ arma.dano }}</td>
                  <td>{{ arma.critico }}</td>
                  <td>{{ arma.alcance }}</td>
                  <td>{{ arma.tipo }}</td>
                  <td>{{ arma.espaco }}</td>
                </tr>
              </template>
              <template v-if="armamento_pesado_personagem.length > 0">
                <h3>Armas Pesadas</h3>
                <tr
                  v-for="(arma, index) in armamento_pesado_personagem"
                  :key="index"
                  @click="remove_arma_pesada(arma, index)"
                >
                  <td>{{ arma.arma }}</td>
                  <td>{{ arma.categoria_0 }}</td>
                  <td>{{ arma.dano }}</td>
                  <td>{{ arma.critico }}</td>
                  <td>{{ arma.alcance }}</td>
                  <td>{{ arma.tipo }}</td>
                  <td>{{ arma.espaco }}</td>
                </tr>
              </template>
            </table>
          </div>
        </div> -->
      </template>
      <template v-if="carrosel == 6">
        <div class="container-armamento">
          <ul>
            <li v-for="(item, index) in antescendentes" :key="index">
              <h3>{{ item.nome }}</h3>
              <textarea
                v-model="item.descricao"
                spellcheck="false"
                rows="4"
                cols="50"
              ></textarea>
            </li>
          </ul>
        </div>
      </template>

    </div>
  </template>
  <script>
  import modal_dado from "@/components/personagem/girarDado.vue"

  import info_detalhes from "@/components/personagem/infoDetalhes.vue"
  import info_atributos from "@/components/personagem/infoAtributos.vue"
  import info_pericias from "@/components/personagem/infoPericias.vue"
  import armamentos from "@/json/armamentos";
  
  import ToastPlugin from "vue-toast-notification";
  import "vue-toast-notification/dist/theme-bootstrap.css";
  
  import Detalhes from "../components/Detalhes.vue";
  import Atributos from "../components/Atributos.vue";
  import Avatar from "../components/Avatar.vue";
  
  import { salvar_personagem } from "@/api/personagem/post_personagem.js";
  export default {
    components: {
            "detalhes-info" : info_detalhes,
            "info-atributos" : info_atributos,
            "info-pericias" : info_pericias,
      ToastPlugin,
      Detalhes,
      Atributos,
      Avatar,
      "modal-dado" : modal_dado
    },
    data() {
      return {
        open_modal : false,
        data_personagem : null,
        carrosel: 1,
        isData: [
          { detalhes: false },
          { atributos: true },
          { pericias: true },
          { avatar: false },
          { armamentos: false },
          { antescendentes: false },
        ],
  
        // dados de detalhes do personagem
        nome: "",
        origem: "Executivo",
        classe: "",
        NEX: 0,
        trilha: "",
        patente: "",
        idade: 0,
        sexo: "",
        nascimento: "",
        residencia: "",
        // fim dados detalhes
        // dados do avatar
        imagem_base64 : "",
        perfil_carregado: "",
        vida: { atual: 20, maximo: 20 },
        sanidade: { atual: 100, maximo: 100 },
        ocultismo: { atual: 10, maximo: 50 },
        esforco: { atual: 12, maximo: 12 },
        acao: 1,
        reacao: 1,
        lesao_grave: false,
        inconsciente: false,
        morrendo: false,
        traumatizado: false,
        enlouquecendo: false,
        // fim dados do avatar
  
        movimento: 0,
  
        atributos: [],
        pericias: [],
        resistencias: [],
        // dados de armamentos sessao / personagem
        movimento: 1,
        peso: 0,
        armamentos_list : [],
        acessorios_list : [],
        antescendentes: [],
        acessorios: [],
        // dados result
        nome_to_modal : "",
        valor_to_modal : 0,
        is_pericia_value : true
        
      };
    },
    methods: {
      close_modal(value){
        this.open_modal = value;
      },
      is_pericia(value){
        this.is_pericia_value = value;
      },
      nome_atual(nome){
        this.nome_to_modal = nome;
      },
      valor(valor){
        this.valor_to_modal = valor
        this.open_modal = true;
      },
      u_imagem_base64(value){
        this.imagem_base64 = value
        console.log(value)
      },
      u_lesao_grave(value) {
        this.lesao_grave = value;
      },
      u_inconsciente(value) {
        this.inconsciente = value;
      },
      u_morrendo(value) {
        this.morrendo = value;
      },
      u_traumatizado(value) {
        this.traumatizado = value;
      },
      u_enlouquecendo(value) {
        this.enlouquecendo = value;
      },

      // funcões de armamentos
      async carregar_armamentos_ordem() {
        this.armamento_simples_sessao = this.armamentos_sessao_all.filter(
          (arma) => arma.categoria_1 === "Arma Simples"
        );
        this.armamento_tatico_sessao = this.armamentos_sessao_all.filter(
          (arma) => arma.categoria_1 === "Arma Tática"
        );
        this.armamento_pesado_sessao = this.armamentos_sessao_all.filter(
          (arma) => arma.categoria_1 === "Arma Pesada"
        );
      },
      add_arma_simples(arma, index) {
        this.armamento_simples_personagem.unshift(arma);
        this.armamento_simples_sessao.splice(index, 1);
      },
      add_arma_tatica(arma, index) {
        this.armamento_tatico_personagem.unshift(arma);
        this.armamento_tatico_sessao.splice(index, 1);
      },
      add_arma_pesada(arma, index) {
        this.armamento_pesado_personagem.unshift(arma);
        this.armamento_pesado_sessao.splice(index, 1);
      },
      remove_arma_simples(arma, index) {
        this.armamento_simples_sessao.unshift(arma);
        this.armamento_simples_personagem.splice(index, 1);
      },
      remove_arma_tatica(arma, index) {
        this.armamento_tatico_sessao.unshift(arma);
        this.armamento_tatico_personagem.splice(index, 1);
      },
      remove_arma_pesada(arma, index) {
        this.armamento_pesado_sessao.unshift(arma);
        this.armamento_pesado_personagem.splice(index, 1);
      },
      // fim de armamentos
  
 
      verificar_avatar() {
        if (this.vida.maximo > 1 && this.sanidade.maximo > 1 && this.esforco.maximo > 1) {
          alert("avatar");
        }
      },
    },
    created() {
        this.armamentos_sessao_all = armamentos.armamentos;
        
        try {
            this.data_personagem = this.$route.params
        
            this.lesao_grave = Boolean(this.data_personagem.lesao_grave)
            this.inconsciente = Boolean(this.data_personagem.inconsciente)
            this.morrendo = Boolean(this.data_personagem.morrendo)
            this.traumatizado = Boolean(this.data_personagem.traumatizado)
            this.enlouquecendo = Boolean(this.data_personagem.enlouquecendo)

            this.vida = JSON.parse(this.data_personagem.vida)
            this.sanidade = JSON.parse(this.data_personagem.sanidade)
            this.ocultismo = JSON.parse(this.data_personagem.ocultismo)
            this.esforco = JSON.parse(this.data_personagem.esforco)

            this.atributos = JSON.parse(this.data_personagem.atributos)
            this.pericias = JSON.parse(this.data_personagem.pericias)
            this.resistencias = JSON.parse(this.data_personagem.resistencias)
            this.armamentos_list = JSON.parse(this.data_personagem.armamentos)
            this.acessorios_list = JSON.parse(this.data_personagem.acessorios)

            this.perfil_carregado = this.data_personagem.perfil_img
        } catch (error) {
            this.$router.go(-1);
        }
        


    },
    mounted() {
        var main = document.getElementById("header-main");
        var header = document.getElementById("header-personagem");
        main.style = "display: none;"
        header.style = "display : flex;"

        this.carregar_armamentos_ordem();
    },
    watch: {
      pericias(newValue) {
        console.log(newValue);
      },
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
  
  h1,
  h2,
  h3,
  label {
    color: #ffff;
  }
  .modal-screen{
    background-color: #00000090;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top : 0;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .personagem-container {
    background: rgba(0, 0, 0, 0);
  
    width: 100vw;
    //margin-top: 3vmax;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  
  // estilo de detalhes
  .caixa-form-detalhes {
    .detalhes-inputs {
      border: 1px solid rgba(255 255 255 / 0.5);
      padding: 20px;
      background: rgba(0, 0, 0, 0.6);
      margin: 0 auto;
      text-align: center;
    }
  }
  .input-field {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 3em;
    padding: 0.3em 0;
    @media screen and (max-width: 600px) {
      padding: 0;
    }
  }
  label {
    text-align: left;
  }
  input,
  select,
  option {
    text-align: center;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-transform: uppercase;
    padding: 3px 7px;
    background: rgba(7 7 7 / 0.5);
  
    color: #fff;
    font-family: "Itim", sans-serif;
  }
  input:hover,
  select:hover,
  option:hover {
    background: rgba(36, 36, 36, 0.5);
    border-bottom: 2px solid #f5f5f5;
  }
  select:hover,
  option:hover {
    cursor: pointer;
  }
  
  .btnNext,
  .btnPrevious {
    cursor: pointer;
  
    position: absolute;
    bottom: 50%;
  
    @media screen and (max-width: 600px) {
      bottom: 5%;
    }
  }
  .btnPrevious {
    left: 5%;
  }
  .btnNext {
    right: 5%;
  }
  .btnNext:hover,
  .btnPrevious:hover {
    color: black;
    background-color: aliceblue;
  }
  @media screen and (max-width: 600px) {
    .btnNext:hover,
    .btnPrevious:hover {
      color: black;
      background-color: aliceblue;
    }
  }
  
  .loop {
    width: 60%;
    max-height: 73vh;
    overflow-y: auto;
    h3 {
      text-align: center;
      color: bisque;
      text-transform: uppercase;
      font-size: 1.4em;
      text-shadow: 0px 0px 0.7em rgba(0, 0, 0, 0.953);
    }
    ul {
      padding: 0;
      margin: 0;
      margin: 1em 0;
      list-style: none;
      display: flex;
      flex-flow: wrap row;
      align-items: center;
      justify-content: center;
      gap: 1em;
      li {
        background-color: rgba(0, 0, 0, 0.627);
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        p {
          font-size: 1.1em;
        }
        img {
          height: 2em;
          aspect-ratio: 1/1;
          padding: 0.2em;
          cursor: pointer;
          border: 1px solid transparent;
        }
        img:hover {
          opacity: 1;
          border-radius: 50%;
          border: 1px solid rgb(201, 201, 201);
          background-color: rgba(63, 63, 63, 0.788);
          transform: none;
          transition: all 0.3s ease;
        }
  
        img:active {
          transform: rotate(360deg);
        }
      }
      li:hover {
        background-color: rgba(0, 0, 0, 0.767);
      }
    }
  }
  
  // scss de armaentos e tabelas
  .content-sessaormamentos {
    display: flex;
    width: 80%;
    gap: 1px;
    margin: 0 auto;
    background-color: rgba(0 0 0 / 0);
    @media screen and (max-width: 600px) {
      width: 100%;
      flex-direction: column;
    }
    table {
      margin: 0 auto;
      width: 100%;
      max-height: 100%;
      @media screen and (max-width: 600px) {
        max-height: 5 0%;
      }
      thead {
        background-color: rgba(0, 0, 0, 0.827);
        top: 0;
        position: sticky;
        text-align: center;
        th {
          cursor: default;
          border-bottom: 1px solid rgba(239, 239, 239, 0.7);
          padding: 0.5em 0.3em;
          font-size: 1em;
        }
      }
  
      h3 {
        font-family: "Consolas";
        width: 100%;
        font-size: 12px;
        margin: 5px 0;
        background-color: rgba(81, 81, 81, 0.5);
      }
      td {
        cursor: pointer;
        text-align: center;
        border-bottom: 1px solid rgba(91, 91, 91, 0.7);
        font-size: 13px;
      }
      tr:hover {
        color: rgba(0, 0, 0, 1);
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
    .content-sessao {
      width: 50%;
      max-height: 80vh;
      overflow-y: auto;
      background-color: rgba(0, 0, 0, 0.7);
      border-right: 1px solid rgb(137, 137, 137);
      h2 {
        text-align: center;
        color: #ffff;
        text-shadow: 2px 2px black;
      }
      @media screen and (max-width: 600px) {
        width: 100%;
        max-height: 38vh;
      }
    }
    .content-personagem {
      max-height: 80vh;
      width: 50%;
      overflow-y: auto;
      background-color: rgba(0, 0, 0, 0.7);
      @media screen and (max-width: 600px) {
        width: 100%;
        max-height: 35vh;
      }
    }
  }
  
  // fim scss armamentos
  
  // SCSS de antescendentes
  
  .container-armamento {
    width: 100%;
  
    ul {
      list-style: none;
      width: 75vw;
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      margin: 0 auto;
      gap: 0.5em;
      max-height: 80vh;
      overflow: auto;
  
      li {
        display: flex;
        border-radius: 24px;
        padding: 0;
        flex-direction: column;
        text-align: center;
        width: 48%;
  
        min-height: 200px;
  
        background-color: rgba(20 20 20 / 0.5);
  
        h3 {
          border-bottom: 1px solid #fff;
          background-color: rgba(0 0 0 / 0.7);
          margin-top: 0;
        }
        textarea {
          width: 95%;
          min-height: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(96, 96, 96, 0.5);
          padding: 10px;
          color: #fff;
        }
      }
    }
  }
  .container-armamento .container-armamento ul .caixa-A {
    min-height: 200px;
    width: 100%;
    background-color: rgba(20 20 20 / 0.5);
  }
  .geral-avatar{
    max-width: 50%;
  }
  @media screen and (max-width: 600px) {
    .geral-avatar{
        width: 100%;
        max-width: 100%;
    }
  }
    #app{
        height: auto;
    }
  </style>
  