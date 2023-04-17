<template>
  <div class="modal-session" v-if="modal_opened == true">
    <button class="btn-x" @click="close_modal()">X</button>
    <ModalNewArmamento @fechar-modal="close_modal()" />
  </div>
  <div class="armamentos-session">
    <div class="armamento-sticky-content">
      <div class="content-save">
        <h3>Personalizar armamentos</h3>
        <h5>carregar ordem paranormal</h5>
        <img
          src="@/assets/ico/add_white.svg"
          @click="open_modal()"
          alt="Salvar armamento"
          srcset=""
        />
      </div>
    </div>
    <table>
      <tr>
        <th>descrição</th>
        <th>categoria I</th>
        <th>categoria II</th>
        <th>categoria III</th>
        <th>alcance</th>
        <th>dano_passivo</th>
        <th>dano_ativo</th>
        <th>tipo</th>
        <th>espaço</th>
      </tr>
      <tr v-for="(item, index) in list_armamentos" :key="item.id">
        <td>{{ item.descricao }}</td>
        <td>{{ item.categoria_1 }}</td>
        <td>{{ item.categoria_2 }}</td>
        <td>{{ item.categoria_3 }}</td>
        <td>{{ item.alcance }}</td>
        <td>{{ item.dano_passivo }}</td>
        <td>{{ item.dano_ativo }}</td>
        <td>{{ item.tipo }}</td>
        <td>{{ item.espaco }}</td>
        <!-- <td><img src="@/assets/ico/edit_ico.svg" alt="" srcset=""></td> -->
        <td><img src="@/assets/ico/remove_ico.svg" alt="" srcset="" /></td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import ModalNewArmamento from "./add/ModalNewArmamento";
axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
  "token"
)}}`;

export default {
  components: {
    ModalNewArmamento,
  },
  data() {
    return {
      host: require("@/config/env").host,
      port: require("@/config/env").port,

      user_id: sessionStorage.getItem("user_id"),
      armamentos_session: [],
      list_armamentos: [],
      nome_armamento: "",
      modal_opened: false,
    };
  },
  methods: {
    get_now() {
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
    },
    adicionar_armamento() {
      var obj = {
        nome: this.nome_armamento,
        valor: 0,
      };
      if (this.nome_armamento.length > 2) {
        this.list_armamentos.push(obj);
        this.clean_input();
      }
    },
    clean_input() {
      this.nome_armamento = "";
    },
    get_armamentos() {
      const headers = { Authorization: "Token " + sessionStorage.getItem("token") };
      const url = `${this.host}:${this.port}/armamentosSession/`;

      axios
        .get(url, {
          params: { fk_session: sessionStorage.getItem("session_id") },
          headers: headers,
        })
        .then((res) => {
          //   this.list_armamentos = res.data
          this.armamentos_session = res.data;
          res.data.forEach((armamentos) => {
            this.get_armamento(armamentos.fk_armamento);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_armamento(id) {
      const headers = { Authorization: "Token " + sessionStorage.getItem("token") };
      const url = `${this.host}:${this.port}/armamentoSession/`;

      axios
        .get(url, { params: { id: id }, headers: headers })
        .then((res) => {
          console.log(res.data);
          this.list_armamentos = this.list_armamentos.concat(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    open_modal() {
      this.modal_opened = true;
    },
    close_modal() {
      this.modal_opened = false;
      this.list_armamentos = [];
      this.get_armamentos();
    },
  },
  mounted() {
    // GET HORA ATUAL
    this.get_now();
    setInterval(() => {
      this.get_now();
    }, 1000);
    this.get_armamentos();
  },
};
</script>
<style scoped lang="scss">
.modal-session {
  background-color: rgba(0 0 0 / 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 5;
}
.armamentos-session {
  padding: 0;
  border: 1px solid bisque;
  background-color: rgba(0 0 0 / 0.5);
  min-width: 75%;
  max-width: 80%;

  height: auto;
  box-shadow: 0px 0px 3px #f3eacd;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-height: 80%;
  overflow-y: auto;
  top: 8vh;
  position: absolute;

  .armamento-sticky-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1em 0px 5px #292929;
    position: sticky;
    top: 0;
    background-color: rgba(0 0 0 / 0.6);
    .content-save {
      width: 80%;
      min-height: 5vmax;
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
      h5 {
        cursor: pointer;
        font-size: 1em;
        padding: 0.3em;
        background-color: #292929;
        border: 1px solid #181818;
      }
      h5:hover {
        background-color: #464646;
        border: 1px solid #313131;
      }
      img {
        height: 1.4em;
        aspect-ratio: 1/1;
        cursor: pointer;
      }
    }
    .content-armamento {
      padding: 1em 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      min-width: 80%;
      gap: 0.5em;
      margin: 0;
      .input-field {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;

        padding: 0.5em 0;

        input {
          max-width: 5em;
          font-size: 1em;
          font-family: "Consolas";
          padding: 0.4em 1em;
          color: #292929;
        }
      }
    }
    button {
      margin: 0 auto;
      padding: 0.5em;
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
  table {
    width: 100%;
    min-height: 5vmax;
    text-align: center;
    tr:nth-child(even) {
      background-color: rgba(46, 46, 46, 0.418);
    }
    tr:nth-child(odd) {
      background-color: rgba(94, 94, 94, 0.418);
    }
    th {
      background-color: rgba(0, 0, 0, 0.747);
    }
    td {
      img {
        height: 1em;
        aspect-ratio: 1/1;
      }
      img:hover {
        cursor: pointer;
      }
    }
  }
}
.armamentos-session:hover {
  box-shadow: 0px 0px 5px #fff;
  transition: ease 0.5s;
}
</style>
