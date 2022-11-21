<template>
  <div class="home">
    <div class="conteiner-a">
      <div class="caixa-sessoes-open">
          <h3>Suas sessões em aberto</h3>
          <ul>
            <li :style="styleStatusM" v-for="(sessao, index) in sessoeCarregadas" :key="index"  >
            <div @click="abrirSessao(sessao.idSessao)">
              <p>N°: {{index+1}}</p>
              
              <p>mestre: {{Usuario}}</p>
              
              <p>Jogadores ativos: 0/{{sessao.qtdMaxima}}</p>
              
              <p>data de inicio: {{sessao.dataInicio}}</p>
              
              <p>Tempo decorrido: {{sessao.tempoDecorrido}}</p>
              <label  for="status">status:</label>
            </div>
              
              <select v-if="sessao.status === 0" name="status" id="status">
                <option value="aberto" >aberto</option>
                <option value="fechado" select>fechado</option>
              </select>
              <select v-if="sessao.status === 1" name="status" id="status">
                <option value="aberto" select>aberto</option>
                <option value="fechado" >fechado</option>
              </select>
            </li>
          </ul>
      </div>
      <div class="caixa-sessoes-open">
          <h3>Suas missões</h3>
          <ul>
            <li :style="styleStatusM" v-for="(sessao, index) in missoes" :key="index">
              <p>N°: {{index+1}}</p>
              
              <p>mestre: {{nome}}</p>
              
              <p>Jogadores ativos: 0/{{sessao.qtdMaxima}}</p>
              
              <p>data de inicio: {{sessao.dataInicio}}</p>
              
              <p>Tempo decorrido: {{sessao.tempoDecorrido}}</p>
              <p v-if="sessao.status == 1">status: aberto</p>
              <p v-else>status: fechado</p>
    
            </li>
          </ul>
      </div>
      <div class="caixa-personagem-demo">
        <h2>CRIAÇÃO DE PERSONAGEM DEMO</h2>

            <div class="containerJogadores">
                <ul>
                  <li v-for="item in carregarWidth" :key="item.id"></li>
                    <li v-for="(jogador, index) in dados" :key="index" @click="AbrirJogador(jogador)">
                      <div class="container-avatar" align="center">
                        <div class="box-perfil">
                            <img src="/img/perfil1.jpg" alt="">
                        </div>

                      </div>
                      <div class="caixa-bar" style="width: 100%; height: 100%; text-align:center;  ">
                        <h2>{{jogador.jogador}}</h2>
                        <h3>{{jogador.classe}}</h3>
                        <div id="box-barra-padrao">
                          <h6>Vida</h6>
                          <div class="barraVida barraP">
                              <div class="barra-vida barra-p" :style="listVida[index]">
                                  <p class="contagemBarra" id="contagemVida" >{{jogador.vida.atual}}/{{jogador.vida.maximo}}</p>
                              </div>
                          </div>
                          </div>
                        <div id="box-barra-padrao">
                            <h6>Sanidade</h6>
                            <div style="display:flex" >
                                <div class="barraSanidade barraP">
                                    <div class="barra-sanidade barra-p" :style="listSanidade[index]">
                                        <p class="contagemBarra">{{jogador.sanidade.atual}}/{{jogador.sanidade.maximo}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <!-- <div id="box-barra-padrao">
                                <h6>Ocultismo</h6>
                                <div class="barraOcultismo barraP">
                                    <div class="barra-ocultismo barra-p" :style="listOcultismo[index]">
                                        <p class="contagemBarra">{{jogador.ocutismo.atual}}/{{jogador.ocutismo.maximo}}</p>
                                    </div>
                                </div>

                            </div> -->
                        <div id="box-barra-padrao">
                            <h6>Esforço</h6>
                            <div class="barraEsforco barraP">
                                <div class="barra-esforco barra-p" :style="listEsforco[index]">
                                    <p class="contagemBarra">{{jogador.esforco.atual}}/{{jogador.esforco.maximo}}</p>
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

    </div>
    <div class="conteiner-b">
      <h2>{{Usuario}}</h2>
      <div class="caixa-btn-sessao">
         <button id="btn-sessao" @click="newSessao">CRIAR NOVA SESSÃO</button>
      </div>
      
      <!-- <ul class="menuMestre">
        <li>Gerenciar Itens</li>
        <li>Gerenciar Rituais</li>
        <li>Gerenciar Jogadores</li>
        <li>Configuração</li>
      </ul> -->
      <div>
        <h2>CONTATOS</h2>
      </div>
    </div>
      <NewSessao :displaySessao="displaySessao" @updateDisplayS="updateDisplayS" :id="id"/>
    <div class="conteiner-c"></div>

  <SessaoPersonagens :idSe="idSe" :displaySessao="displaySessaoP" @updateDisplayOpenS="updateDisplayOpenS" />
  </div>
</template>
<script>
import NewSessao from '../components/ModalNewSessao.vue'
import SessaoPersonagens from '../components/SessaoPersonagens.vue'
export default {
    components: {NewSessao, SessaoPersonagens},
    props:{
        data : Object,
        vida : Object,
        sanidade : Object,
        ocultismo : Object,
        esforco : Object,
        acao : Number,
        movimento: Number,
        reacao: Number

    },
    data(){
        return{
            id: 0,
            idSe: 0,
            Usuario: 'Fulano',
            sessoeCarregadas : [],
            statusCarregados: [],
            status_sessao: '',
            styleStatus: 'background-color: rgba( 255 255 255 / 0.3);',
            displaySessao: 'display:none;',
            displaySessaoP: 'display:none;',
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
            listVida: [],
            listSanidade: [],
            listOcultismo: [],
            listEsforco: [],

        }
    },
    methods:{
      updateDisplayOpenS(display){this.displaySessaoP = display; this.getSessoes()},
      updateDisplayS(display){this.displaySessao = display; this.getSessoes()},
      async getSessoes(){
        fetch(`http://localhost:5000/getsessao`, {
           method: 'POST',
           headers: { "Content-Type": "application/json"},
           body:  JSON.stringify({id: this.id})
        })
        .then((response)=>response.json())
        .then((data)=> this.sessoeCarregadas = data.getsessao);
         
         
         
      },
      async getJogadores(){
            fetch("http://localhost:3000/jogador")
            .then((resposta) => resposta.json())
            .then((data) => this.dados = data)
             let i = 0
             let j = Number(this.dados.length)
             for(i;i == j;i++){
            }
             this.started(j);

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
          this.$router.push({name:"createdetalhes"})
        },
        AbrirJogador(jogador){
          console.log('RES: ',jogador)
          const dataJson = JSON.stringify(
            {
              id: jogador.id,
              nome: jogador.nome,
              jogador: jogador.jogador,
              origem: jogador.origem,
              idade: 22,
              sexo: jogador.sexo,
              lnascimento: jogador.lnascimento,
              lresidencia: jogador.lresidencia,
              acao: jogador.acao,
              reacao: jogador.reacao,
              movimento: jogador.movimento,
              peso: jogador.peso,
              vidaA: jogador.vida.atual,
              vidaM: jogador.vida.maximo,
              sanidadeA: jogador.sanidade.atual,
              sanidadeM: jogador.sanidade.maximo,
              ocutismoA: jogador.ocultismo.atual,
              ocutismoM: jogador.ocultismo.maximo,
              esforcoA: jogador.esforco.atual,
              esforcoM: jogador.esforco.maximo,
              pericias: jogador.pericias,
              atributos: jogador.atributos,
              resistencias: jogador.resistencias,
              rituais: jogador.rituais,
              inventario: jogador.inventario,
              antescendentes: jogador.antescendentes,
              armamentos: jogador.armamentos
            });

          this.$router.push({name:"jogador", params:{
            dJson:dataJson

          }});
        },
        newSessao(){
          this.displaySessao = 'display:block;'
        },
        abrirSessao(id){
          this.displaySessaoP = 'display:block;'
          
          this.idSe = id
        }
    },
    mounted(){
      //this.getJogadores();
      this.getSessoes();
      
    },
    computed:{
      carregarWidth: function(){
        this.dados.forEach(jogador => {
          var valor = (100 / jogador.vida.maximo)*jogador.vida.atual
          var Valor= String('width: '+valor+'%;')
          this.listVida.push(Valor)

          valor = (100 / jogador.sanidade.maximo)*jogador.sanidade.atual
          Valor= String('width: '+valor+'%;')
          this.listSanidade.push(Valor)

          // valor = (100 / jogador.ocutismo.maximo)*jogador.ocutismo.atual
          // Valor= String('width: '+valor+'%;')
          // this.listOcultismo.push(Valor)

          valor = (100 / jogador.esforco.maximo)*jogador.esforco.atual
          Valor= String('width: '+valor+'%;')
          this.listEsforco.push(Valor)

        });
      },
      carregarStatus(){
        this.sessoeCarregadas.forEach(element =>{
          consoloe.log(element)
        })
      }
    },
    watch:{
      status_sessao(newValue){
        
        if(newValue == 'aberto'){
          console.log(newValue)
          this.styleStatus ='background-color: rgba(87, 221, 60, 0.3);'
        }else{
          console.log(newValue)
          this.styleStatus ='background-color: rgba(243, 63, 56, 0.3);'
        }
      }
    },
    created(){
      try{
        let dataJson = JSON.parse(this.$route.params.dJson)
        this.Usuario = dataJson.nome
        this.id = dataJson.id
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
.home{
  /* background-image: url('../img/background.webp'); */
  background-color: rgba(0  0  0 / 0.5);
  background-position: center ;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-size: contain;
  display: grid;
  grid-template-areas:
    'ladoA ladoA ladoA ladoB ladoB'
    'ladoA ladoA ladoA ladoB ladoB'
  ;
  height: 100vh;

}



.conteiner-a{
  grid-area: ladoA;
  background-color: rgba(23, 23, 23, 0.7);
  border: 1px solid rgba(23, 23, 23, 0.7);;
  height: 100vh;
  width:100%;
}
.conteiner-b{
  grid-area: ladoB;
  background-color: rgba(23, 23, 23, 0.5);
  height: 100vh;
  width:100%;
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
.caixa-personagem-demo{
  background-color: rgba(217  217  217 / 0.2);
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
.caixa-btn-sessao{
  display: block;
  text-align: center;
  width: 100%;
}
#btn-sessao{
    background-color: rgba(87, 241, 151, 0.7);
    color: #fff;
    font-size: 16px;
    border: none;
    margin: 0 auto;
    border-radius: 5px;

    right:10px;    
    top:10px;
}
#btn-sessao:hover{
    background-color: rgba(19, 82, 29, 0.7);
}
.caixa-sessoes-open{
  text-align: center;
  font-family: 'Consolas';
  width: 100%;
  
  

}
.caixa-sessoes-open ul{
  padding: 0;
  margin: 0;
  list-style: none;
  display:block;
}
.caixa-sessoes-open ul li{
  margin: 0;
  padding: 0;
  display:flex;
  background-color: rgba(0 0 0 / 0.3);
  border-bottom: 1px solid rgba( 255 255 255 / 0.7);
  border-top: 1px solid rgba( 255 255 255 / 0.7)
}
.caixa-sessoes-open ul li div{
  margin: 0;
  padding: 0;
  display:flex;

}
.caixa-sessoes-open ul li:hover{
  background-color: rgba( 255 255 255 / 0.1);
}

.caixa-sessoes-open ul li p, .caixa-sessoes-open ul li label{
  margin: 5px 0; 
  padding: 0 20px;
  border-right: 1px solid rgba( 255 255 255 / 0.7);

}
.caixa-sessoes-open ul li label{
  border: none;
}
.caixa-sessoes-open ul li select{
  background-color: rgba(0  0  0 / 0.4);
  color: #fff;
  font-family: "Consolas";
  font-size: 14px;
}
</style>