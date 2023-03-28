<template>
  <div class="app-div">
      <!-- <div class="img-box" @click="inicio">
        <img src="/img/home1.png" alt="">
      </div> -->

    <router-view/>
    <div class="status">
      <p>usuário: matheus</p>
      <hr>
      <p>jogadores na sessão: 4</p>
      <hr>
      <p></p>
    </div>
  </div>


</template>
<script>
export default {
   methods:{
    inicio(){
      this.$router.push({name:"home"})
    }

  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

.modalP{
    position:fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7  7  7 / 0.7);}


h2, p, label, button{
  color: bisque;
  font-family: 'Itim', sans-serif;
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
}
body{
  background-color: rgb(0, 0, 0);
  color: #fff;
  font-family: 'Itim', sans-serif;
  margin: 0;
  padding: 0;
}

.img-box{
  border-radius: 50%;
  border: 1px solid rgb(194, 194, 194);
  width: 40px;
  height: 40px;
  text-align: center;
  position: fixed;
  top: 10px;
  bottom: 0;
  left: 10px;
  right: 0;
}
.img-box img{
  width: 80%;
  height: 80%;
  margin: 10% auto;
  }
  .img-box:hover{
    background-color: rgb(90, 90, 90) ;
    border: 1px solid #fff;

  }
  .img-box.router-link-exact-active{
    background-color: #fff ;
  }
  a:-webkit-any-link{

    width: 30px;
    height: 30px;
  }

  .status{
    width: 100%;
    background-color: rgba(211, 211, 211, 0.7);
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    display: none;
    padding: 0 10px;
  }
  .status p{
    margin: 0;

  }
</style>
