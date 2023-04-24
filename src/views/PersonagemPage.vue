<template>
  <div class="modal-screen" v-if="open_modal">
    <modal-dado  
      :valor="valor_to_modal" 
      :nome_atual="nome_to_modal"
      :is_pericia="is_pericia_value"
      @close_modal="close_modal"
    />
  </div>
  <div class="modal-screen" v-if="modal_inventario">
    <div class="container-inventario">
      <button @click="close_modal_inventario">Fechar</button>
      <strong>
        <h2>Inventário : 3 / 7</h2>
      </strong>
      <h3>Itens</h3>
      
      <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Espaços</th>
              <th>Quantidade</th>
              <th>Categoria</th>
            </tr>
            
          </thead>
            <tr v-for="(item, index) in inventario_list">
              <td>{{item.nome}}</td>
              <td>{{item.descricao}}</td>
              <td>{{item.espaco}}</td>
              <td>0</td>
              <td>{{item.categoria}}</td>
              <td><img src="@/assets/ico/remove_ico.svg" alt=""></td>
              <td><img src="@/assets/ico/edit_ico.svg" alt=""></td>
            </tr>
              
        </table>

        <h3>Armamentos</h3>
      
      <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Dano</th>
              <th>Ataque</th>

              <th>Crítico</th>
              <th>Alcance</th>

              <th>Categoria A</th>
              <th>Categoria B</th>
              <th>Categoria C</th>
            </tr>
            
          </thead>
            <tr v-for="(item, index) in armamentos_list">
              <td>{{item.nome}}</td>
              <td>{{item.descricao}}</td>
              <td>{{item.tipo}}</td>
              <td>{{item.dano}}</td>
              <td>{{item.ataque}}</td>
              <td>{{item.critico}}</td>
              <td>{{item.alcance}}</td>
              <td>{{item.categoria_0}}</td>
              <td>{{item.categoria_1}}</td>
              <td>{{item.categoria_2}}</td>
              <td><img src="@/assets/ico/remove_ico.svg" alt=""></td>
              <td><img src="@/assets/ico/edit_ico.svg" alt=""></td>
            </tr>
              
        </table>
    </div>
  </div>
  <div class="modal-screen" v-if="open_antescendentes">
    <div id="pergaminho-folha">
      <div class="pergaminho-container">
      <div class="pergaminho-ponta left-3"></div>
      <div class="pergaminho-obj-2 left-2"></div>
      <div class="pergaminho-obj-1"></div>
     <div id="pergaminho-main">
      <!-- <h2>Antescendentes</h2> -->
        <h2>Suas Histórias</h2>
        <img src="@/assets/ico/cancel_ico.svg" @click="close_modal_antescendentes" alt="">
     </div>
     <div class="pergaminho-obj-1"></div>
     <div class="pergaminho-obj-2 rigth-2"></div>
     <div class="pergaminho-ponta rigth-3"></div>
    </div>
    <div class="folha-antiga">
      <ul>
        <li v-for="(item, index) in antescendentes">
          <h3>{{ item.nome }}</h3>
            <textarea name="" id="" cols="30" rows="3">{{ item.descricao }}</textarea>
        </li>
      </ul>
    </div>
    </div>
    
  </div>
    <div class="personagem-container">
        <div class="main-personagem">
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
          <ul>
            <li @click="open_modal_antescendentes">
              <img src="@/assets/img/personagem/antescendentes_ico.png" alt="">
              <p>Antescendentes</p>
            </li>
            <li @click="open_modal_inventario">
              <img src="@/assets/img/personagem/inventario_ico.png" alt="">
              <p>Inventário</p>
            </li>
            <li>
              <img src="@/assets/img/personagem/energia.webp" alt="">
              <p>Rituais</p>
            </li>
          </ul>
        </div>
        
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
  
  import Avatar from "../components/Avatar.vue";
  
  import { salvar_personagem } from "@/api/personagem/post_personagem.js";
  export default {
    components: {
            "detalhes-info" : info_detalhes,
            "info-atributos" : info_atributos,
            "info-pericias" : info_pericias,
      ToastPlugin,
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
        inventario_list : [],
        antescendentes: [],
        acessorios: [],
        // dados result
        nome_to_modal : "",
        valor_to_modal : 0,
        is_pericia_value : true,
        // modals
        //antescendentes
        open_antescendentes : false,
        modal_inventario : false
      };
    },
    methods: {
      open_modal_antescendentes(){
        this.open_antescendentes = true;
      },
      close_modal_antescendentes(){
        this.open_antescendentes = false;
      },
      open_modal_inventario(){
        this.modal_inventario = true;
      },
      close_modal_inventario(){
        this.modal_inventario = false;
      },
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

            this.antescendentes = JSON.parse(this.data_personagem.antescendentes)
            console.log(this.antescendentes)
            
            this.atributos = JSON.parse(this.data_personagem.atributos)
            this.pericias = JSON.parse(this.data_personagem.pericias)
            this.resistencias = JSON.parse(this.data_personagem.resistencias)
            this.armamentos_list = JSON.parse(this.data_personagem.armamentos)
            this.acessorios_list = JSON.parse(this.data_personagem.acessorios)
            // percorrer e adicionar ao array inventario o resumo
            var temp_arr = [];
            this.armamentos_list.forEach(arma => {
              temp_arr.push({
                id: arma.id,
                nome : arma.nome,
                descricao : arma.descricao,
                espaco : arma.espaco,
                fk_personagem : arma.fk_personagem
              });
            });
            this.inventario_list = this.acessorios_list.concat(temp_arr);
            console.table(this.inventario_list)
            this.perfil_carregado = this.data_personagem.perfil_img;
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
    .main-personagem{
      display: flex;
      justify-content: center;
      ul{
        padding: 0.5em;
        list-style: none;
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: space-evenly;
        gap: 1em;
        
        li{
          width: 70px;
          //height: 70px;
          background-color: #000000be;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          opacity: 0.8;
          border: 1px solid #ffffff46;
          img{
            width: 90%;
            aspect-ratio: 1/1;
          }
          p{
            margin: 0;
            font-size: 0.7em;
          }
          &:hover{
            opacity: 1;
          }
          &:active{
            opacity: 1;
          }
        }
        
      }
    }
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

    // antescendentes folha de pergaminho protótipo
    #pergaminho-folha{
      min-width: 70%;
      
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }
    
    // objeto pergaminho em css
    .pergaminho-container{
      width: 100%;
      height: 7vmax;
      display: flex;
      align-items: center;
      justify-content: center;

      #pergaminho-main{
        height: 65%;
        width: 80%;
        background-color: rgba(41, 22, 68, 0.771);
        border-top: 2px solid rgba(49, 59, 142, 0.737);
        border-bottom: 2px solid rgba(49, 59, 142, 0.737);

        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        h2{
          color: #f2e2e2;
          
        }
        img{
          cursor: pointer;
          height: 30%;
          aspect-ratio: 1/1;
        
  
        }
      }
      .pergaminho-obj-1{
        height: 100%;
        width: 5%;
        background-color: #2a2851d9;
        border-radius: 1em;
        border-right: 2px solid rgba(40, 230, 255, 0.398);
        border-left: 2px solid rgba(40, 230, 255, 0.398);

      }
      .pergaminho-obj-2{
        height: 50%;
        width: 2%;
        background-color: #111f3bdb;
      }
      .left-2, .left-3{
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
        border-left: 2px solid rgba(40, 230, 255, 0.398);
      }
      .rigth-2, .rigth-3{
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
        border-right: 2px solid rgba(40, 230, 255, 0.398);

      }
      .pergaminho-ponta{
        height: 15%;
        width: 2%;
        background-color: #153a61c3;
      }
    }
    .folha-antiga{
      width: 80%;
      max-height: 75vh;
      aspect-ratio: 21/29;
      margin-top: -1.2vmax;
      z-index: 3;
      border-right: 2px solid rgba(40, 230, 255, 0.398);
        border-left: 2px solid rgba(40, 230, 255, 0.398);

      background-color: rgba(41, 22, 68, 0.771);
      h2, h3{
        text-align: center;
        color: #e2eef2;
      }
      ul{
        padding: 0;
        margin: 0;
        li{
          h3{
          text-align: left; 
          padding-left: 0.5em;
          box-shadow: none;
          color: #e2eef2;


          }
          textarea{
            color: #e2eef2;
            padding-left: 0.5em;
            background-color: rgba(70, 39, 113, 0.564);
            
            border-radius: 0.5em;
            border: 1px solid rgb(253, 211, 160);
            box-shadow: 0px 0px 3px rgba(75, 54, 29, 0.785);
            width: 95%;
          }
        }
      }
    }

    // inventario scss
  .container-inventario{
    position: relative;
    button{
      position: absolute;
      cursor: pointer;
      right:1%;
      top: 2%;
      background-color: #29292984;
      &:hover{
        background-color: #e94040;
        color: #ffff;
      }
    }
    width: 80vw;
    min-height: 60vh; 
    background-color: #000000be;
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
    border-top-right-radius: 1em;
    border-top-left-radius: 1em;
    border-top: 3px solid #b5b5b55d;
    border-bottom: 3px solid #b5b5b55d;
    padding-bottom: 2em;
    z-index: 3;
    h2, h3{
      text-align: center;
    }
    table{
      width: 95%;
      border: 1px solid #ffffff27;
      margin: 0 auto;
      tr:nth-child(even){
        background-color: #29292992;
      }
      th{
        text-align: left;
      }
      tr{
        img{
          cursor: pointer;
          height: 1em;
          aspect-ratio: 1/1;
        }
      }
    }
  }
  </style>
  