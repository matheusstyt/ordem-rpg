<template>
  <div class="geral-avatar">
    <div class="modal_container" v-if="show_modal_teste == true">
      <div class="modal-modificar">
        <h2>TESTE DE SANIDADE</h2>
        <h3>Rolagem de dado</h3>

        <h4
          v-if="result_number_sanidade"
          :style="{ backgroundColor: `color_teste_sanidade` }"
        >
          {{ result_number_sanidade }}
        </h4>
        <p v-if="result_string_sanidade">{{ result_string_sanidade }}</p>
      </div>
    </div>
    <div class="modal_container" v-if="show_modal_vida == true">
      <div class="modal-modificar">
        <h2>MODIFICAR DE VIDA</h2>
        <form @submit="salvar_vida($event)" class="formModal" id="changeLife">
          <div class="field-input">
            <label for="">Atual</label>
            <input
              type="number"
              id="vidaAtual"
              name="atual"
              min="0"
              v-model="l_vida.atual"
            />
          </div>
          <div class="field-input">
            <label for="">Máximo</label>
            <input
              type="number"
              id="vidaMaxima"
              name="maxima"
              min="0"
              v-model="l_vida.maximo"
            />
          </div>
          <input type="submit" value="Salvar" />
        </form>
      </div>
    </div>
    <div class="modal_container" v-if="show_modal_sanidade == true">
      <div class="modal-modificar">
        <h2>MODIFICAR SANIDADE</h2>
        <form @submit="salvar_sanidade($event)" class="formModal" action="">
          <div class="field-input">
            <label for="">Atual</label>
            <input type="number" id="vidaAutal" name="atual" v-model="l_sanidade.atual" />
          </div>
          <div class="field-input">
            <label for="">Máximo</label>
            <input
              type="number"
              id="vidaMaxima"
              name="maxima"
              v-model="l_sanidade.maximo"
            />
          </div>
          <input type="submit" value="Salvar" />
        </form>
      </div>
    </div>
    <div class="modal_container" v-if="show_modal_ocultismo == true">
      <div class="modal-modificar">
        <h2>MODIFICAR OCULTISMO</h2>
        <form @submit="salvar_ocultismo($event)" class="formModal">
          <div class="field-input">
            <label for="">Atual</label>
            <input
              type="number"
              id="ocultismoAtual"
              name="atual"
              min="0"
              v-model="l_ocultismo.atual"
            />
          </div>
          <div class="field-input">
            <label for="">Máximo</label>
            <input
              type="number"
              id="ocultismoMaxima"
              name="maxima"
              min="0"
              v-model="l_ocultismo.maximo"
            />
          </div>
          <input type="submit" value="Salvar" />
        </form>
      </div>
    </div>
    <div class="modal_container" v-if="show_modal_esforco == true">
      <div class="modal-modificar">
        <h2>MODIFICAR PONTOS DE ESFORÇO</h2>
        <form @submit="salvar_esforco($event)" class="formModal">
          <div class="field-input">
            <label for="">Atual</label>
            <input
              type="number"
              id="esforcoAtual"
              name="atual"
              min="0"
              v-model="l_esforco.atual"
            />
          </div>
          <div class="field-input">
            <label for="">Máximo</label>
            <input
              type="number"
              id="esforcoMaxima"
              name="maxima"
              min="0"
              v-model="l_esforco.maximo"
            />
          </div>
          <input type="submit" value="Salvar" />
        </form>
      </div>
    </div>
    <div class="container-avatar">
      <table v-if="!isBuild">
        <tr>
          <th>Ação / Reação</th>
        </tr>
        <tr>
          <td>{{ acao }}/{{ reacao }}</td>
        </tr>
        <tr>
          <th>Movimento</th>
        </tr>
        <tr>
          <td>{{ movimento }}</td>
        </tr>
      </table>
      <template v-if="perfil64">
        <div class="perfil-carregado">
          <img :src="perfil64" alt="">
        </div>
      </template>
      <template v-else>
        <perfil @u_imagem_base64="u_imagem_base64" />
      </template>
      


    </div>
  
    <div class="content-barra">
      <h4>Vida</h4>
      <div class="back-vida front-barra-padrao" @click="open_modal_vida">
        <div
          class="front-vida back-barra-padrao"
          :style="{ width: `${porcentagem_vida}%` }"
        >
          <p class="percentual_barra">{{ l_vida.atual }}/{{ l_vida.maximo }}</p>
        </div>
      </div>
      <div class="container-field">
        <div class="form-field">
          <input
            type="checkbox"
            v-model="l_lesao_grave"
            name="vidaStatus"
            id="vidaStatus01"
          />
          <label for="vidaStatus01">Lesão Grave</label>
        </div>
        <div class="form-field">
          <input
            type="checkbox"
            v-model="l_inconsciente"
            name="vidaStatus"
            id="vidaStatus02"
          />
          <label for="vidaStatus02">Inconsciente</label>
        </div>
        <div class="form-field">
          <input
            type="checkbox"
            v-model="l_morrendo"
            name="vidaStatus"
            id="vidaStatus03"
          />
          <label for="vidaStatus03">Morrendo</label>
        </div>
      </div>
    </div>
    <div class="content-barra">
      <h4>Sanidade</h4>
      <div id="teste-sanidade">
        <div class="back-sanidade front-barra-padrao" @click="open_modal_sanidade">
          <div
            class="front-sanidade back-barra-padrao"
            :style="{ width: `${porcentagem_sanidade}%` }"
          >
            <p class="percentual_barra">{{ l_sanidade.atual }}/{{ l_sanidade.maximo }}</p>
          </div>
        </div>
        <img src="/img/d20_2.png" @click="open_modal_teste_esforco()" />
      </div>
      <div class="container-field">
        <div class="form-field">
          <input
            type="checkbox"
            v-model="l_traumatizado"
            name="tramautizado_status"
            id="tramautizado_status"
          />
          <label for="tramautizado_status">Traumatizado</label>
        </div>
        <div class="form-field">
          <input
            type="checkbox"
            v-model="l_enlouquecendo"
            name="enlouquecendo_status"
            id="enlouquecendo_status"
          />
          <label for="enlouquecendo_status">Enlouquecendo</label>
        </div>
      </div>
    </div>
    <div class="content-barra">
      <h4>Ocultismo</h4>
      <div class="back-ocultismo front-barra-padrao" @click="open_modal_ocultismo">
        <div
          class="front-ocultismo back-barra-padrao"
          :style="{ width: `${porcentagem_ocultismo}%` }"
        >
          <p class="percentual_barra">{{ l_ocultismo.atual }}/{{ l_ocultismo.maximo }}</p>
        </div>
      </div>
    </div>
    <div class="content-barra">
      <h4>Esforço</h4>
      <div class="back-esforco front-barra-padrao" @click="open_modal_esforco">
        <div
          class="front-esforco back-barra-padrao"
          :style="{ width: `${porcentagem_esforco}%` }"
        >
          <p class="percentual_barra">{{ l_esforco.atual }}/{{ l_esforco.maximo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import perfil from "@/components/avatar/perfil"


export default {
  components: {
    toast, perfil
  },
  props: {
    perfil64 : {
      required : false, 
      type : String
    },
    l_vida: Object,
    l_sanidade: Object,
    l_ocultismo: Object,
    l_esforco: Object,
    l_acao: Number,
    l_movimento: Number,
    l_reacao: Number,

    lesao_grave: Boolean,
    inconsciente: Boolean,
    morrendo: Boolean,
    traumatizado: Boolean,
    enlouquecendo: Boolean,
  },
  data() {
    return {
      isBuild: true,
      acao_l: 1,
      movimento_l: 1,
      reacao_l: 1,

      imgPadrao: "/img/perfil1.jpg",

      // LÓGICA DE MODALS E BARRA DE VIDA
      show_modal_vida: false,
      show_modal_sanidade: false,
      show_modal_ocultismo: false,
      show_modal_esforco: false,

      porcentagem_vida: 100,
      porcentagem_sanidade: 100,
      porcentagem_ocultismo: 100,
      porcentagem_esforco: 100,
      // MODAL TESTE SANIDADE
      show_modal_teste: false,
      result_string_sanidade: false,
      result_number_sanidade: false,
      color_teste_sanidade: "#fff",
      isExecuting: false,
      // PERFIL AVATAR
      l_traumatizado: false,
      show: true,
      params: {
        token: "123456798",
        name: "avatar",
      },
      // CHECK BOX
      l_lesao_grave: false,
      l_inconsciente: false,
      l_morrendo: false,
      l_traumatizado: false,
      l_enlouquecendo: false,
    };
  },
  methods: {
    started() {
      setTimeout(() => {
        let percent;
        // percentual de vida
        percent = (100 / this.l_vida.maximo) * this.l_vida.atual;
        this.porcentagem_vida = percent;
        // percentual de sanidade
        percent = (100 / this.l_sanidade.maximo) * this.l_sanidade.atual;
        this.porcentagem_sanidade = percent;
        // percentual de ocultismo
        percent = (100 / this.l_ocultismo.maximo) * this.l_ocultismo.atual;
        this.porcentagem_ocultismo = percent;
        // percentual de esforço
        percent = (100 / this.l_esforco.maximo) * this.l_esforco.atual;
        this.porcentagem_esforco = percent;
      }, 100);
    },
    open_modal_vida() {
      this.show_modal_vida = true;
    },
    salvar_vida(e) {
      let percent;
      if (this.l_vida.atual > this.l_vida.maximo) {
        alert("A VIDA ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!");
        this.l_vida.atual = this.l_vida.maximo;
        percent = 100;
      } else if (this.l_vida.atual < 0) {
        percent = 0;
      } else {
        percent = (100 / this.l_vida.maximo) * this.l_vida.atual;
      }

      this.porcentagem_vida = percent;

      this.show_modal_vida = false;

      e.preventDefault();
    },
    open_modal_sanidade() {
      this.show_modal_sanidade = true;
    },
    salvar_sanidade(e) {
      let percent;
      if (this.l_sanidade.atual > this.l_sanidade.maximo) {
        alert("A SANIDADE ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!");
        this.l_sanidade.atual = this.l_sanidade.maximo;
        percent = 100;
      } else if (this.l_sanidade.atual < 0) {
        percent = 0;
      } else {
        percent = (100 / this.l_sanidade.maximo) * this.l_sanidade.atual;
      }

      this.porcentagem_sanidade = percent;

      this.show_modal_sanidade = false;
      e.preventDefault();
    },
    open_modal_ocultismo() {
      this.show_modal_ocultismo = true;
    },
    salvar_ocultismo(e) {
      let percent;
      if (this.l_ocultismo.atual > this.l_ocultismo.maximo) {
        alert("O OCULTISMO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!");
        this.l_ocultismo.atual = this.l_ocultismo.maximo;
        percent = 100;
      } else if (this.l_ocultismo.atual < 0) {
        percent = 0;
      } else {
        percent = (100 / this.l_ocultismo.maximo) * this.l_ocultismo.atual;
      }

      this.porcentagem_ocultismo = percent;

      this.show_modal_ocultismo = false;

      e.preventDefault();
    },
    open_modal_esforco() {
      this.show_modal_esforco = true;
    },
    salvar_esforco(e) {
      let percent;
      if (this.l_esforco.atual > this.l_esforco.maximo) {
        alert("PONTOS DE ESFORÇO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!");
        this.l_esforco.atual = this.l_esforco.maximo;
        percent = 100;
      } else if (this.l_esforco.atual < 0) {
        percent = 0;
      } else {
        percent = (100 / this.l_esforco.maximo) * this.l_esforco.atual;
      }
      this.porcentagem_esforco = percent;

      this.show_modal_esforco = false;

      e.preventDefault();
    },
    open_modal_teste_esforco() {
      if (this.isExecuting) {
        return;
      }
      this.isExecuting = true;

      this.show_modal_teste = true;
      var maximo = 100,
        total = 0,
        count = 1;

      setTimeout(() => {
        for (var i = 0; i < count; i++) {
          total += Math.floor(Math.random() * maximo + 1);
        }
        this.result_number_sanidade = total;
      }, 2000);
      setTimeout(() => {
        if (this.l_sanidade.atual < total) {
          this.result_string_sanidade = "Sucesso";
          this.color_teste_sanidade = "#298437";
          createToast(`Sucesso`, { type: "success", timeout: 3000 });
        }
        if (this.l_sanidade.atual >= total) {
          this.result_string_sanidade = "Fracasso";
          this.displayTesteTipo = "#781c1c";
          createToast(`Fracasso`, { type: "danger", timeout: 3000 });
        }
      }, 3000);
      setTimeout(() => {
        this.result_number_sanidade = false;
        this.result_string_sanidade = false;
        this.show_modal_teste = false;
        this.isExecuting = false;
      }, 6000);
    },
    u_imagem_base64(value){
      this.$emit("u_imagem_base64", value)
    },
    toast(msg, type) {
      createToast(msg, { type: type, timeout: 3000 });
    },
  },
  mounted() {
    this.started();
  },
  watch: {
    l_lesao_grave(value) {
      if (value) {
        createToast("Lesão Grave - ativado", { type: "warning", timeout: 3000 });
      } else {
        createToast("Lesão Grave - desativado", { type: "default", timeout: 3000 });
      }
      this.$emit("u_lesao_grave", value);
    },
    l_inconsciente(value) {
      if (value) {
        createToast("Inconsciente - ativado", { type: "danger", timeout: 3000 });
      } else {
        createToast("Inconsciente - desativado", { type: "default", timeout: 3000 });
      }
      this.$emit("u_inconsciente", value);
    },
    l_morrendo(value) {
      if (value) {
        createToast("Morrendo - ativado", { type: "danger", timeout: 3000 });
      } else {
        createToast("Morrendo - desativado", { type: "default", timeout: 3000 });
      }
      this.$emit("u_morrendo", value);
    },
    l_traumatizado(value) {
      if (value) {
        createToast("Traumatizado - ativado", { type: "warning", timeout: 3000 });
      } else {
        createToast("Traumatizado - desativado", { type: "default", timeout: 3000 });
      }
      this.$emit("u_traumatizado", value);
    },
    l_enlouquecendo(value) {
      if (value) {
        createToast("Enlouquecendo - ativado", { type: "danger", timeout: 3000 });
      } else {
        createToast("Enlouquecendo - desativado", { type: "default", timeout: 3000 });
      }
      this.$emit("u_enlouquecendo", value);
    },
  },
  created() {
    this.l_lesao_grave = this.lesao_grave;
    this.l_inconsciente = this.inconsciente;
    this.l_morrendo = this.morrendo;
    this.l_traumatizado = this.traumatizado;
    this.l_enlouquecendo = this.enlouquecendo;
  },
};
</script>
<style scoped lang="scss">
.geral-avatar {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 70vw;

}
@media screen and (max-width: 600px) {
    .geral-avatar{
      width: 95vw;
    }
  }
.container-avatar {
  background: rgba(7 7 7 / 0.7);
  border-radius: 1.8em;

  display: flex;
  justify-content: center;
  align-items: center;

  table {
    text-align: center;
  }
}

.perfil-carregado {
  cursor: pointer;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 5px solid rgba(98, 236, 60, 0.6);
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 110px;
    height: 110px;
  }
}

.perfil-carregado:hover {
  background-color: #a2a2a2;
  border: 5px solid rgba(85, 207, 51, 0.849);
}
.perfil-carregado img {
  width: 100%;
  height: 100%;
}

.percentual_barra {
  width: 100%;
  margin-left: 10px;
}
.percentual_barra {
  font-size: 20px;
}

.content-barra {
  h4 {
    margin: 0 0.5em;

    font-size: 20px;
    color: bisque;
  }
  #teste-sanidade {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    justify-content: flex-start;
    align-items: center;
    .back-sanidade {
      width: 90%;
    }
    img {
      height: 2.5em;
      aspect-ratio: 1/1;
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: 50%;
      opacity: 0.7;
      cursor: pointer;
    }
    img:hover {
      opacity: 1;
      border: 1px solid rgb(201, 201, 201);
      background-color: #1b1b1b;
      transform: none;
      transition: all ease 0.3s;
    }
    img:active {
      transform: rotate(360deg);
    }
  }
  .back-barra-padrao {
    height: 100%;
    transition: width 1.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }
  .front-barra-padrao {
    height: 1.8em;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      height: 1em;
    }
  }
  .back-vida {
    background-color: rgba(71, 18, 18, 0.575);
  }
  .front-vida {
    background-color: #940909c0;
    border-right: 2px solid #ff7777;
  }
  .back-sanidade {
    background-color: rgba(11, 14, 70, 0.63);
  }
  .front-sanidade {
    background-color: #203f9483;
    border-right: 2px solid #638cdd;
  }
  .back-ocultismo {
    background-color: rgba(70, 7, 64, 0.596);
  }
  .front-ocultismo {
    background-color: #580b7fa2;
    border-right: 2px solid #c15fce;
  }
  .back-esforco {
    background-color: rgba(15, 107, 36, 0.514);
  }
  .front-esforco {
    background-color: #3aa759ab;
    border-right: 2px solid #65b580;
  }
  .container-field {
    display: flex;
    padding: 0.5em 0.3em;
    gap: 1em;
    .form-field {
      input[type="checkbox"],
      label {
        cursor: pointer;
      }
    }
  }
}
.select-class {
  height: 40px;
  background: rgba(7 7 7 / 0.7);
  color: #fff;
  font-size: 20px;
}
.box-class {
  margin-left: 15px;
}
.box-class h2 {
  margin: 15px auto;
}
.input-padrao2 {
  background: rgba(7 7 7 / 0.5);
}

// modal modificar
.modal_container {
  background-color: rgba(0, 0, 0, 0.486);
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-modificar {
    background-color: rgba(0 0 0 / 0.7);
    text-align: center;
    border: 2px solid #898;
    padding: 1em;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 1.2em;
    }
    form {
      margin: 0;
      display: flex;
      flex-direction: column;
      .field-input {
        padding: 0.5em;
        display: flex;
        justify-content: space-between;
        label {
          font-size: 1em;
          padding-right: 0.5em;
        }
        input {
          text-align: center;
          border: none;
          border-bottom: 2px solid #a2a2a2;
          border-top-left-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 3px 4px;
          background: rgba(7 7 7 / 0.5);
          color: #fff;
          font-family: "Itim", sans-serif;
        }
        input[type="number"]:hover {
          background-color: rgba(255, 255, 255, 1);
          color: black;
        }
      }
      input[type="submit"] {
        width: 60%;
        font-size: 1em;
        font-family: "Consolas";
        margin: 1em auto;
        cursor: pointer;
      }
    }
  }
}
</style>
