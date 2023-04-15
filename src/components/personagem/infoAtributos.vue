<template>
 
    <div class="loop atributos">
        <h3>Atributos</h3>
        <ul>
          <li v-for="(atributo, index) in atributos" :key="index">
            <img
              id="imgAtributo"
              src="/img/d20_3.png"
              @click="modalDado(atributo.nome, atributo.valor)"
              alt=""
            />
            <p>{{ atributo.nome }}</p>
            <h5>{{ atributo.valor }}</h5>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        atributos : Object,
    },
    methods:{
    },
    data(){
        return{

        }
    }
}

</script>
<style scoped lang="scss">

.loop {
    width: 60%;
    max-height: 73vh;
    overflow-y: auto;
    @media screen and (max-width: 700px) {
        width: 95%;
    }
  h3 {
    position: sticky;
    top: 0;
    text-align: center;
    color: bisque;
    text-transform: uppercase;
    font-size: 1.4em;
    text-shadow: 0px 0px 0.7em rgba(0, 0, 0, 0.953);

    background-color: #000000d5;
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
    @media screen and (max-width: 600px) {
    
    }
    li {
      background-color: rgba(0, 0, 0, 0.627);
      border-radius: 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      
      p {
        font-size: 0.9em;
        margin: 0.3em 0;
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
      h5{
        width: 100%;
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

      img:active {
        transform: rotate(360deg);
      }
    }
    li:hover {
      background-color: rgba(0, 0, 0, 0.767);
    }
  }
}
</style>
