<template>
    <div  id="modal-g" class="modalP" :style="displaySessao">
      <div class="conteiner-a">
            <button class="btnX" @click="sair">x</button>
            <h2>Personagens</h2>
            <div class="containerJogadores">
                <ul>
                  <li v-for="item in carregarWidth" :key="item.id"></li>
                    <li v-for="(jogador, index) in dadosa" :key="index" @click="AbrirJogador(jogador)">
                      <div class="container-avatar" align="center">
                        <div class="box-perfil">
                            <img src="/img/perfil1.jpg" alt="">
                        </div>

                      </div>
                      <div class="caixa-bar" style="width: 100%; height: 100%; text-align:center;  ">
                        <h2>{{jogador.nome_personagem}}</h2>
                        <h3>{{jogador.classe}}</h3>
                        <div id="box-barra-padrao">
                          <h6>Vida</h6>
                          <div class="barraVida barraP">
                              <div class="barra-vida barra-p" :style="listVida[index]">
                                  <p class="contagemBarra" id="contagemVida" >{{jogador.atual_v}}/{{jogador.maximo_v}}</p>
                              </div>
                          </div>
                          </div>
                        <div id="box-barra-padrao">
                            <h6>Sanidade</h6>
                            <div style="display:flex" >
                                <div class="barraSanidade barraP">
                                    <div class="barra-sanidade barra-p" :style="listSanidade[index]">
                                        <p class="contagemBarra">{{jogador.atual_s}}/{{jogador.maximo_s}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <!-- <div id="box-barra-padrao">
                                <h6>Ocultismo</h6>
                                <div class="barraOcultismo barraP">
                                    <div class="barra-ocultismo barra-p" :style="listOcultismo[index]">
                                        <p class="contagemBarra">{{jogador.atual_o}}/{{jogador.maximo_o}}</p>
                                    </div>
                                </div>

                            </div> -->
                        <div id="box-barra-padrao">
                            <h6>Esforço</h6>
                            <div class="barraEsforco barraP">
                                <div class="barra-esforco barra-p" :style="listEsforco[index]">
                                    <p class="contagemBarra">{{jogador.atual_e}}/{{jogador.maximo_e}}</p>
                                </div>
                            </div>
                        </div>
                        <h6>Movimento</h6>
                        <h3>{{jogador.movimento}}</h3>
                      </div>
                    </li>

                    <button id="btnAdd" @click="AddJogador">+</button>
                </ul>

            </div>
      </div>
      <div class="conteiner-b">
        <h2>Configurar Sessão</h2>
        <!-- <div>
          <ul class="menuMestre">
            <li>Gerenciar Itens</li>
            <li>Gerenciar Rituais</li>
            <li>Gerenciar Jogadores</li>
            <li>Configuração</li>
          </ul> 
        </div> -->
        <div class="container-chat">
          <h2>Chat</h2>
          <div class="caixa-message">
            <div class="messagem">
              <p>[00:00:00]</p>
              <h3>matheus(Joaquin):</h3>
              <p>minha mensagem</p>
            </div>
            <div class="messagem">
              <p>[00:00:00]</p>
              <!-- <h3></h3> -->
              <p>  matheus(Joaquin):   minha mensagem asdasdasdaskd  asdasdasda asdasdas vasdasdas asdasdas asdasdas asdasdas </p>
            </div>
            <div class="messagem">
              <p>[00:00:00]</p>
              <h3>matheus(Joaquin):</h3>
              <p>minha mensagem</p>
            </div>

          </div>
          <div class="caixa-input"><input type="text" ></div>
          
        </div>
        
      </div>

  </div>
</template>
<script>
export default {
    props:{
        displaySessao: String,
        idSe: String

    },
    data(){
        return{
            id: 0,
            vida : {id: 0, atual: 6, maximo: 6},
            sanidade : {id: 0, atual: 2, maximo: 10},
            ocultismo : {id: 0, atual: 7, maximo: 16},
            esforco : {id: 0, atual: 1, maximo: 12},
            displayModalT: 'display:none;',
            displayTesteTipo: 'display: none; transition: display 0.5s;',
            displayTesteResultado: 'display: none; background-color: #0a0b0c;',
            tipoTeste: '',
            valorTeste: 0,
            dados: [],
            dadosa: [],
            listVida: [],
            listSanidade: [],
            listOcultismo: [],
            listEsforco: [],

        }
    },
    methods:{
      async getJogadores(idSe){
        
            fetch("http://localhost:5000/getperson",{
              method: 'POST',
              headers: { "Content-Type" : "application/json"},
              body: JSON.stringify({ id: idSe})
            })
            .then((resposta) => resposta.json())
            .then((data) => this.dadosa = data.person)
            let i = 0
            let j = Number(this.dados.length)
            for(i;i == j;i++){
            }
             this.started(j);
          console.log('isSe get', idSe)

      },
      started(count){
        setTimeout(()=>{
            console.log('width: '+valor+'%' )
            var valor = (100 / this.vida.maximo)*this.vida.atual
            this.porcentagemVida = String('width: '+valor+'%;')

            var valor1 = (100 / this.sanidade.maximo)*this.sanidade.atual
            this.porcentagemSanidade = 'width:'+valor1+'%;'

            var valor2 = (100 / this.ocultismo.maximo)*this.ocultismo.atual
            this.porcentagemOcultismo = 'width:'+valor2+'%;'
            var valor3 = (100 / this.esforco.maximo)*this.esforco.atual
            this.porcentagemEsforco = 'width:'+valor3+'%;'
        },100)
        },
        AddJogador(){
          
          let id = JSON.stringify({idSessao: this.idSe})
          console.log('id:::', id)
          this.$router.push({name:"createdetalhes", params:{idSe: Number(this.idSe)}})
          
        },
        AbrirJogador(jogador){
          let pericias = JSON.parse(jogador.json_p)
          let atributos = JSON.parse(jogador.json_a)
          let resistencias = JSON.parse(jogador.json_r)
          let antescendentes = JSON.parse(jogador.json_an)
          let armamentos = JSON.parse(jogador.json_ar)
          console.log('RES p: ', jogador)
          //console.log('RES a: ', atributos)
          //console.log('RES r: ', resistencias)
          //console.log('RES an: ', antescendentes)
          console.log('RES ar: ', armamentos )
          const dataJson = JSON.stringify(
            {
              idVida: jogador.idVida,
              idSanidade: jogador.idSanidade,
              idOcultismo: jogador.idOcultismo,
              idEsforco: jogador.idEsforco,
              idPersonagem: jogador.idPersonagem,
              idAntescendentes: jogador.idAntescendentes,
              idArmas: jogador.idArmas,
              idSessao: jogador.idSessao,
              nome: jogador.nome_jogador,
              jogador: jogador.nome_personagem,
              origem: jogador.origem,
              idade: jogador.idade,
              sexo: jogador.sexo,
              lnascimento: jogador.lnascimento,
              lresidencia: jogador.lresidencia,
              acao: jogador.acao,
              reacao: jogador.reacao,
              movimento: jogador.movimento,
              peso: jogador.peso,
              vidaA: jogador.atual_v,
              vidaM: jogador.maximo_v,
              sanidadeA: jogador.atual_s,
              sanidadeM: jogador.maximo_s,
              ocutismoA: jogador.atual_o,
              ocutismoM: jogador.maximo_o,
              esforcoA: jogador.atual_e,
              esforcoM: jogador.maximo_e,
              pericias: JSON.parse(jogador.json_p),
              idPericia: jogador.idPericia,
              atributos: JSON.parse(jogador.json_a),
              idAtributos: jogador.idAtributos,
              resistencias: JSON.parse(jogador.json_r),
              idResistencias: jogador.id_resistencia,
              rituais: jogador.rituais,
              inventario: jogador.inventario,
              antescendentes: JSON.parse(jogador.json_an),
              idAntescendentes: jogador.idAntescendentes,
              armamentos: JSON.parse(jogador.json_ar),
              idArmas: jogador.idArmas
            });
          console.log('res 2 ', dataJson)
          this.$router.push({name:"jogador", params:{
            dJson:dataJson

          }});
        },
        sair(){
          this.$emit('updateDisplayOpenS', 'display:none;')

        }
        
    },
    mounted(){
      console.log('ID B :', this.idSe)
            
    },
    computed:{
      carregarWidth: function(){
        this.dadosa.forEach(jogador => {
          var valor = (100 / jogador.maximo_v)*jogador.atual_v
          var Valor= String('width: '+valor+'%;')
          this.listVida.push(Valor)

          valor = (100 / jogador.maximo_s)*jogador.atual_s
          Valor= String('width: '+valor+'%;')
          this.listSanidade.push(Valor)

          // valor = (100 / jogador.maximo_o)*jogador.atual_o
          // Valor= String('width: '+valor+'%;')
          // this.listOcultismo.push(Valor)

          valor = (100 / jogador.maximo_e)*jogador.atual_e
          Valor= String('width: '+valor+'%;')
          this.listEsforco.push(Valor)

        });
      }
    },
    watch:{
       idSe(newValue){
         console.log('ID C :', newValue)
         this.getJogadores(newValue);
       }
    },
    created(){
      
      try{
        let dataJson = JSON.parse(this.$route.params.dJson)
        //this.Usuario = dataJson.nome
       // this.id = dataJson.id
      }catch(error){
         this.$router.push({name:"login"});
      }
      
    }
}
</script>
<style scoped>
#app{
  background: black;
  background-image: url('../img/background.webp');
  background-position: center ;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;
}

#modal-g{
  display: grid;
  grid-template-areas:
    'ladoA ladoA ladoA ladoA ladoB'  ;
  width:100%;
}
.caixa-personagem H2{
    text-align: center;
}
.conteiner-a{
  grid-area: ladoA;
  background-color: rgba(23, 23, 23, 0.7);
  border: 1px solid rgba(23, 23, 23, 0.7);;

  width:100%;
}
.conteiner-b{
  grid-area: ladoB;
  background-color: rgba(23, 23, 23, 0.5);
  
  border: 1px solid rgba(88, 88, 88, 0.7);;
}
.conteiner-b h2, .conteiner-a h2{
  padding-bottom:20px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
}
.conteiner-c{
  grid-area: ladoC;
  background-color: rgb(181, 217, 177);
}
.caixa-personagem{
  background-color: rgba(0  0  0 / 0.6);
  border-radius: 5px;
  padding: 5px 0;
}
.containerJogadores{

  width: 100%;
  overflow: hidden;
}

.containerJogadores ul{
  padding: 0;
  padding-left: 20px;
  list-style: none;
  width: 100%;
  display:flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-left: 0px;
}
.containerJogadores ul li{
  float:left;
  display: flex;
  border-radius: 5px;
  opacity: 1;
  flex-direction: column;
  text-align:center;
  width: 200px;
  height: 470px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  background-color: rgba(0  0  0 / 0.2);
  border: 1px solid rgb(26, 26, 26);
  margin-right: 10px;
  margin-bottom: 10px;
}
.containerJogadores ul li:hover{
  background-color: rgb(43, 43, 43);
  border: 1px solid rgb(85, 85, 85)
}
#btnAdd{
  border-radius: 5px;
  height: 482px;
  width: 222px;
  padding: 10px;
  background-color: rgb(0  0  0 / 0.7);
  border: 1px solid rgb(26, 26, 26);
  color: #fff;
  margin-right: 10px;
  font-size: 50px;
}
#btnAdd:hover{
  background-color: rgb(43  43  43 / 0.7);
  border: 1px solid rgb(85, 85, 85)
}
h2{
  font-size: 20px;
  color: #ffff;
}
h6{
  font-size: 15px;
  background-color: #272727a1;
  color: #ffff;
  margin: 0 auto;

}
#imgPerfil{
  width: 120px;
  height: 120px;
}
.container-avatar{
    height:140px;
    background-color: rgb(41  41  41 / 0.6);
    border-radius: 20px;
    padding: 10px;
    }
.container-avatar img{
    width: 120px;
    height: 120px;}
.box-perfil{
    margin: 0 auto;
    background-color: #a2a2a2;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid rgba(190, 190, 190, 0.6);
    overflow:hidden;

}
.box-perfil:hover{
    background-color: #a2a2a2;
     border: 2px solid rgb(233, 233, 233);
}
.caixa-bar h3{
  color: bisque;
  font-family: "Consolas";
  margin: 10px 0;
}
.contagemBarra {
    width: 100%;
    margin-left: 10px;}
.contagemBarra{
    font-size: 20px;}
.barra-p{
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
    transition: width 2s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;}

.barraP{
    margin-top: 0;
    margin-bottom: 7px;
    width: 100%;
    height: 20px;}
.barraVida{
    background-color: rgb(71, 18, 18);}
.barra-vida{
    background-color: #940909;
    border-right: 2px solid #ff7777;}
.barraSanidade{
    background-color: rgb(11, 14, 70);

    display:block;}
.barra-sanidade{
    background-color: #203f94;
    border-right: 2px solid #638cdd;}
.barraOcultismo{
    background-color: rgb(24, 2, 22);}
.barra-ocultismo{
    background-color: #580b7f;
    border-right: 2px solid #ab65b5;}
.barraEsforco{
    background-color: rgb(2, 24, 7);}
.barra-esforco{
    background-color: #296e3d;
    border-right: 2px solid #65b580;}
#box-barra-padrao h4{
    margin: 0 auto;
    font-size: 20px;
    color: bisque;
}
.conteiner-b h2, .conteiner-a h2 {
  text-align: center;
  margin: 20px auto;
}
.menuMestre{
  list-style: none;
}
.menuMestre li{
  font-size: 20px;
  height: 40px;
  width: 200px;
  margin-top:5px;
  border-bottom: 1px solid rgba(190, 190, 190, 0.6)
}
.menuMestre li:hover{
  background-color: rgba(61, 114, 17, 0.3)
}
.btnX{
    background-color: #1b1b1b;
    position:absolute;
    top:10px;
    right:10px;
    border: 2px solid #1b1b1b;
    width: 25px;
    height: 25px;
    font-size: 16px;
}
.btnX:hover{
    background-color: #9a2525;
    color: #fff;
    border: 2px solid rgb(135, 60, 60)
}
/* CHAT  */
.container-chat{
  background-color: #9a2525;  
  display: block;
  max-height: 500px;
}
.caixa-message{
  padding: 0 10px;
  min-height: 300px;
}
.messagem{
  display: inline-flex;
}
.messagem h3{
  margin: 0 5px;
  font-size: 14px;
}
.messagem p{
  margin: 0;
  color: #ffff;
  font-size: 14px;
  margin:0 5px;
}
.caixa-input{
  text-align: center;
}
.caixa-input input{
  width: 100%;
  margin: 0 auto;
}
</style>