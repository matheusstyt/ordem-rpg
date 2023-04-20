<template>
  <div class="header" v-if="isAuthenticated">
    <div class="header-content" id="header-main">
      <div class="nav-p" @click="go_inicio">
        <p>Início</p>
      </div>
      <div class="nav-p" @click="go_sessoes">
        <p>Sessões</p>
      </div>
      <div class="nav-p">
        <h3>{{ isAuthenticated }}</h3>
      </div>
      
      <div class="nav-p" @click="logout()">
        <logout />
      </div>
    </div>
    <div class="dropdown">
        <div class="dropdown-toggle" @click="toggleMenu">
          <img src="@/assets/ico/gear_ico.svg" alt="engrenagem" />
          <span>Configurar</span>
        </div>
        <ul>
          <li>Atributos</li>
          <li>Perícias</li>
          <li>Resistências</li>
          <li>Acessórios</li>
          <li>Armamentos</li>
          <li>Rituais</li>
        </ul>
      </div>
    <div class="header-content" id="header-personagem">
      <div class="nav-p" @click="go_back">
      <img src="@/assets/ico/back_ico.svg" alt="">
      </div>
      <!-- <div class="nav-p" @click="go_sessoes">
        <p>Inventário</p>
      </div>
      <div class="nav-p" @click="go_sessoes">
        <p>Rituais</p>
      </div>
      <div class="nav-p" @click="go_sessoes">
        <p>Antescendentes</p>
      </div> -->
      <div class="nav-p">
        <h3>{{ isAuthenticated }}</h3>
      </div>
    </div>
  </div>
  <div class="app-div">
    <router-view />
  </div>
</template>
<script>
import logout from "./components/svg/logout.vue";
export default {
  components: {
    logout,
  },
  data() {
    return {
      user: sessionStorage.getItem("username"),
      isAuthenticated: sessionStorage.getItem("username"),
    };
  },
  methods: {
    go_inicio() {
      window.location.href = "/";
    },
    go_sessoes() {
      window.location.href = "/painel";
    },
    go_meu_sistema() {
      window.location.href = "/sistema";
    },

    go_back(){
      this.$router.go(-1);
    }
  },
  mounted() {
    this.user = sessionStorage.getItem("username");
    setInterval(() => {
      this.isAuthenticated = sessionStorage.getItem("username");
    }, 1000);
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");

h2,
p,
label,
button {
  color: bisque;
  font-family: "Itim", sans-serif;
}
@media screen and (max-width: 600px) {
  .header {
    justify-content: flex-start;
    align-items: center;
  
  }
  p{
    font-size: 2vmax;
  }
}
.header {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  min-height: 2.3em;
  
}
.header-content {
  background-color: rgba(0 0 0 / 0.7);
  gap: 1em;
  padding: 0 1em;

  position: relative;
  display: flex;
  align-items: center;
 // justify-content: space-evenly;
  border-radius: 0.7em;
  
  .nav-p {
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    p, h3 {
      cursor: pointer;
      margin: 0;
      
    }
    p:hover {
      color: rgb(255, 188, 188);
    }
    h3 {
      cursor: pointer;
      color: #fff;
    }
    h3:hover {
      color: rgba(177, 177, 177, 0.8);
    }
    svg {
      stroke: #ec8b15d3;
      cursor: pointer;
    }
  }
}
#header-personagem{
  display: none;
}
#app {
  background: black;
  background-image: url("./img/background.webp");
  background-position: center;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-size: contain;
  min-height: 100vh;
  @media screen and (max-width: 600px) {
    background-size: cover;
  }
}
.app-div {
 
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
body {
  background-color: rgb(0, 0, 0);
  color: #fff;
  font-family: "Itim", sans-serif;
  margin: 0;
  padding: 0;
 
}
.dropdown {
  z-index: 3;
  position: absolute;
  top: 0.5vmax;
  right: 1vmax;
  flex-direction: column;
  display: flex;

  transition: height 1s;

  ul{
    display: none;
    padding: 0;
    list-style: none;
  }
  &:hover{

    ul{
      display: block;
      li{
        background-color:#48484859;
        &:hover{
          background-color: #00000059;
        }
      }
    }
    .dropdown-toggle{
      img{
        transform: rotate(360deg);
      }
    }
  }
}

.dropdown-toggle {
  background-color: #0000009a;
  padding: 0.3em 0.8em;
  border-radius: 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    transform: none;
    transition: all ease 1s;
  }
}

.dropdown-menu {
  position: absolute;
  z-index: 1;
}
</style>
