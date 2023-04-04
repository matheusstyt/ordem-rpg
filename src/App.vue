<template>
  <div class="header" v-if="isAuthenticated">
    <div class="header-content">
      <div class="nav-p" @click="go_inicio">
        <p>Início</p>
      </div>
      <div class="nav-p"  @click="go_sessoes">
        <p>Sessões</p>
      </div>
      <!-- <div class="nav-p"  @click="go_meu_sistema">
        <p>Meu Sistema</p>
      </div> -->
      <div class="nav-p">
        <h3 >{{ isAuthenticated }}</h3>
      </div>
      <div class="nav-p" @click="logout()">
        <logout/>
      </div>
    </div>
      
  </div>
  <div class="app-div">
    <router-view/>
  </div>


</template>
<script>
import logout from "./components/svg/logout.vue"
export default {
  components : {
    logout
  },
  data(){
    return{
      user : sessionStorage.getItem("username"),
      isAuthenticated : sessionStorage.getItem("username")
    }
  },
   methods:{
    go_inicio(){
      window.location.href = "/home"
    },
    go_sessoes(){
      window.location.href = "/painel"
    },
    go_meu_sistema(){
      window.location.href = "/sistema"

    },

    
  },
  mounted() {
    this.user = sessionStorage.getItem("username")
    setInterval(() => {
      this.isAuthenticated = sessionStorage.getItem("username")
    }, 1000);
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');


h2, p, label, button{
  color: bisque;
  font-family: 'Itim', sans-serif;
}

.header{
  width: 100%;
  position: absolute;
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
  .nav-p{
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    p{
      cursor: pointer;
    }
    p:hover{
      color: rgb(255, 188, 188);
    }
    h3{
      cursor: pointer;
      color: #fff;
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

#app{
  background: black;
  background-image: url('./img/background.webp');
  background-position: center ;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-size: contain;
  height: 100vh;
}
.app-div{
  height:100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

}
body{
  background-color: rgb(0, 0, 0);
  color: #fff;
  font-family: 'Itim', sans-serif;
  margin: 0;
  padding: 0;
}

</style>
