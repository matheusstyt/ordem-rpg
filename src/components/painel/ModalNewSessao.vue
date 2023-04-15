<template>
  <div class="new-session-box">
    <h3>Iniciar nova sesão</h3>
    <div class="input-field">
      <label for="max">Data de criação:</label>
      <p>{{ data_atual }}</p>
    </div>
    <div class="input-field">
      <label for="desc">Descrição da sessão:</label>
      <input
        type="text"
        v-model="desc_session"
        required
        placeholder="Descrição da sessão"
        name="desc"
        id="desc"
        maxlength="50"
      />
    </div>
    <div class="input-field">
      <label for="max">Quantidade máxima de jogadores: </label>
      <input
        type="number"
        v-model="qtd_session"
        placeholder="0"
        name="max"
        id="desc"
        max="10"
        min="3"
      />
    </div>
    <button @click="save_session()">Salvar</button>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
  "token"
)}}`;

export default {
  data() {
    return {
      data_atual: null,
      qtd_session: 3,
      desc_session: "",
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
    save_session() {
      if (sessionStorage.getItem("token")) {
        const url = `http://192.168.100.26:8000/session/?fk_mestre=${sessionStorage.getItem(
          "user_id"
        )}`;

        const body_session = {
          fk_mestre: parseInt(sessionStorage.getItem("user_id")),
          data_criacao: this.data_atual,
          qtd_max: this.qtd_session,
          descricao: this.desc_session,
          status: true,
        };
        console.table(body_session);
        const headers = { Authorization: "Token " + sessionStorage.getItem("token") };

        axios
          .post(url, body_session, { headers: headers })
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    // GET HORA ATUAL
    this.get_now();
    setInterval(() => {
      this.get_now();
    }, 1000);
  },
};
</script>
<style lang="scss">
.modal-session {
  background-color: rgba(0 0 0 / 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.new-session-box {
  background-color: #1b1b1b;
  padding: 1em;
  border: 1px solid bisque;
  background-color: rgba(0 0 0 / 0.7);
  width: auto;
  height: auto;
  box-shadow: 0px 0px 3px #858585;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}
.new-session-box:hover {
  box-shadow: 0px 0px 5px #fff;
  transition: ease 0.5s;
}
.new-session-box h3 {
  text-align: center;
}
.new-session-box button {
  color: #1b1b1b;
}
.new-session-box button:hover {
  color: #1b1b1b;
  background-color: #b3b3b3;
  transition: ease 1s;
  border: 2px solid #b3b3b3;
}
.input-field {
  width: 100%;
  display: flex;
  gap: 1em;
  padding: 0.5em 0;
  input {
    color: white;
  }
}
.input-field label {
  color: #fff;
}
.input-field p {
  margin: 0;
}
</style>
