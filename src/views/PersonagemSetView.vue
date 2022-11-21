<template>
    <div class="container-geral">

        <div class="item pessoal-personagem">
            <Avatar :vida="vida" :sanidade="sanidade" :ocultismo="ocutismo" :esforco="esforco" :movimento="movimento" :reacao="reacao" :acao="acao"/>
        </div>
        <div class="item pessoal-detalhes">
            <form @submit="salvarDetalhes($event)" class="formDetalhes" action="">

                <h2>DETALHES PESSOAIS</h2>

                <div  >
                    <label for="nome">Nome</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="text" name="nome" id="id-nome" :value="nome">
                    </div>
                </div>
                <div>
                    <label for="jogador">Jogador</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="text" name="jogador" id="id-jogador" :value="jogador">
                    </div>
                </div>
                <div  >
                    <label for="ocupacao">Origem</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="text" name="origem" id="id-origem" :value="origem">
                    </div>
                </div>
                <div class="line-padrao">
                    <label for="idade">Idade</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="number" name="idade" id="id-idade" :value="idade">
                    </div>

                </div>
                <div>
                    <label for="sexo">Sexo</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="text" name="sexo" id="id-sexo" :value="sexo">
                    </div>

                </div>
                <div>
                    <label for="lnascimento">Local de nascimento</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="text" name="lnascimento" id="id-lnascimento" :value="lnascimento">
                    </div>

                </div>
                <div>
                    <label for="lresidencia">Local de residência</label>
                    <div>
                        <input class="input-padrao0" spellcheck="false" type="text" name="lresidencia" id="id-lresidencia" :value="lresidencia">
                    </div>

                </div>

            </form>

       </div>
        <div class="item pessoal-lateral" align="center">
            <div>
                <h2>Antecendentes</h2>
                <button @click="abrirAntescendentes" id="abrirInventario"><img src="/img/historia4.png" alt=""></button>
            </div>
            <div>
                <h2>Inventário</h2>
                <button @click="abrirInventario()" id="abrirInventario"><img src="/img/inventario3.png" alt=""></button>
            </div>
            <div>
                <h2>Rituais</h2>
                <router-link to="/rituais">
                    <button id="abrirInventario"><img src="/img/ritual1.png" alt=""></button>
                </router-link>
            </div>
            <div>
                <h2>Combate</h2>
                <button id="abrirInventario"><img src="/img/combate.png" alt=""></button>
            </div>
        </div>
        <div class="item pessoal-resistencia">
            <div class="containerResistencias">
                <h2 class="tituloP">RESISTÊNCIA A DANO</h2>
                <ul>
                    <li v-for="(resistencia, index) in resistencias" :key="index">
                        <div style="width: 100%; height: 100%; text-align:center;  ">
                            <h2>{{resistencia.nome}}</h2>
                            <p>{{resistencia.valor}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="item pessoal-atributo">

            <div class="containerAtributos">
            <h2 class="tituloP">ATRIBUTOS</h2>
            <ul>
                <li v-for="(atributo, index) in atributos" :key="index">
                    <img id="imgHover" src="/img/d20_3.png" @click="modalDado(atributo.nome, atributo.valor)" alt="">
                    <div style="width: 100%; height: 100%; text-align:center;  ">
                        <h2>{{atributo.nome}}</h2>
                        <p >{{atributo.valor}}</p>
                    </div>
                </li>
            </ul>

        </div>
        </div>
        <div class="item pessoal-pericia">

            <div class="containerPericia">
                <h2 class="tituloP">PERICIAS</h2>
                <ul>
                    <li v-for="(Pericia, index) in pericias" :key="index">
                        <img id="imgHover" src="/img/d20_4.png" @click="abrirModalDadoP(Pericia.nome, Pericia.valor, index)" alt="">
                        <div style="width: 100%; height: 100%; text-align:center;  ">
                            <h2>{{Pericia.nome}}</h2>
                            <p>{{Pericia.valor}}</p>
                       </div>
                    </li>
                </ul>

            </div>
        </div>
        <DadoP :atributos="atributos" :pericias="pericias" :displayModal="displayModal" :periciav="periciaV" :perician="periciaN" @displayModalU="displayModalU"/>
        <Antescendentes />
    </div>


</template>
<script>

import Rituais from '../views/RituaisView.vue'
import Pericias from '../components/Pericia-tipo-1.vue'
import Atributos from '../components/Atributos.vue'
import Avatar from '../components/Personagem.vue'
import Resistencias from '../components/Resistencias.vue'
import Detalhes from '../components/Detalhes.vue'
import DadoP from '../components/DadoPericia.vue';
import Antescendentes from '../components/Antescendente.vue'

export default{
    components: { Rituais, Atributos, Detalhes, Avatar, Resistencias, Pericias, DadoP, Antescendentes},
    data(){
        return{
            displayModal: 'display: none;',
            id : 0,
            nome : "a",
            jogador : "",
            origem : "",
            idade : 0,
            sexo : "",
            lnascimento : "",
            lresidencia : "",
            acao :   0,
            reacao :   0,
            movimento :   0,
            peso : {id: 0, atual: 0, maximo: 0},
            vida : {id: 0, atual: 8, maximo: 9},
            sanidade : {id: 0, atual: 6, maximo: 6},
            ocutismo : {id: 0, atual: 9, maximo: 10},
            esforco :  {id: 0, atual: 6, maximo: 14},
            esforcoA : 5,
            esforcoM : 9,
            periciaN: '',
            periciaV: '',
            pericias : [{"id" : 2, nome: "Atualidades", valor: 11 },
                        {"id" : 3, nome: "Ciência", valor: 6 },
                        {"id" : 4, nome: "Diplomacia", valor: 7 }
                       ],
            atributos : [ {id:1, nome: 'FORÇA', valor: 5}],
            resistencias : [],
            rituais :      [],
            inventario :   [],
            indexLocal: 0,
            nomeLocal: '',
            valorLocal: 0,
            displayAtributoTipo: 'display: none; transition: display 0.5s;',
            displayAtributoResultado: 'display: none; background-color: #0a0b0c;',
            displayModalA: 'display: none;',
            displayModalR: 'display: none;',
            valorDado : 0,
            tipoDado :  '',
            habilidadeValor : '',
            habilidadeTipo : '',
            displayModalD: 'display: none;'
        }
    },methods:{
        displayModalU(displayM){this.displayModal = displayM},
        abrirModalR(){

            this.displayModalR = 'display:block;'
        },
        fecharModalR(){
            this.displayModalR = 'display:none;'

        },
        abrirModalDadoP(nome, valor, index){
            this.periciaN = nome
            this.periciaV = valor
            this.displayModal = 'display:block;'
        },
        abrirInventario(){
        //  Router.RouterLink.name
        //  this.$router.push({name:"inventario"})
        },
        abrirAntescendentes(){

        },
        async getJogador(id){
        const req = await fetch(`http://localhost:3000/jogador/${id}`);
        const data = await req.json();
        this.resistenciasLocal = data.resistencias
        this.dados.jogador = data
        console.log('getJ ::',data)
        }
    }, mounted(){
        this.getJogador(this.$route.params.id)
        console.log('json: ',this.$route.params.dJson)
        let dataJson = JSON.parse(this.$route.params.dJson)
        console.log('JSON: ',dataJson)
        this.nome = dataJson.nome
        this.jogador = dataJson.jogador
        this.origem = dataJson.origem
        this.idade = dataJson.idade
        this.sexo = dataJson.sexo
        this.lnascimento = dataJson.lnascimento
        this.lresidencia = dataJson.lresidencia
        this.acao = dataJson.acao
        this.movimento = dataJson.movimento
        this.reacao = dataJson.reacao
        this.peso = dataJson.peso
        this.vida.atual = dataJson.vidaA
        this.vida.maximo = dataJson.vidaM
        this.sanidade.atual = dataJson.sanidadeA
        this.sanidade.maximo = dataJson.sanidadeM
        this.ocutismo.atual = dataJson.ocutismoA
        this.ocutismo.maximo = dataJson.ocutismoM
        this.esforco.atual = dataJson.esforcoA
        this.esforco.maximo = dataJson.esforcoM
        this.resistencias = dataJson.resistencias
        this.atributos = dataJson.atributos
        this.pericias = dataJson.pericias
        console.log('RESISTENCIA    : ',this.resistencias)
        console.log('PERICIA    : ',this.pericias)
        console.log('ATRIBUTOS    : ',this.atributos)

    },created(){

    }
}

</script>
<style>


@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

.pessoal-personagem{
    grid-area: personagem;
    width: 100%;
}
.pessoal-detalhes{
    grid-area: detalhes;
    width: 100%;
   }
.pessoal-lateral{
    grid-area: lateral;
    background-color: rgba(0  0  0 / 0.9);
}
.pessoal-resistencia{
    grid-area: resistencia;
    width: 100%;
    background-color: rgba(32  32  32 / 0.4);}
.pessoal-atributo{
    grid-area: atributo;
    margin-left: 5px;
    background-color: rgba(0  0  0 / 0.5);
    width: 100%;}
.pessoal-pericia{
    grid-area: pericia;
    background-color: rgba(0  0  0 / 0.5);
    width: 100%;}

.pessoal-lateral button{
    margin-top: -18px;
    margin-bottom: 1px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: rgb(70, 70, 70) 2px solid;
    background-color: rgb(56, 56, 56);
}
.pessoal-lateral button:hover{
    background-color: rgb(80, 80, 80);
}
.pessoal-lateral button img{
    width: 90%;
    height: 90%;
    opacity: 0.6;}
.pessoal-lateral button img:hover{
    opacity: 1;}

.pessoal-detalhes form{
    text-align: left;
    border: 1px solid #fff;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 15px;
    }

.barra-ar p, .box-movi p{
    border: none;
    width: 100%;
    border-bottom: 2px solid #a2a2a2;
    padding: 3px 4px;
    margin: 10px auto;
    background-color: #0a0b0c;
    color: #fff;
    font-family: 'Itim', sans-serif;}
    .barra-ar p:hover, .box-movi p:hover{
    border-bottom: 2px solid black;
    background-color: #fff;
    color: black;}

.container-geral div div input{
    height: 30px;}
#line03{
    display: flex;}
#input-padrao2 input{
    width: 100px;}

.input-padrao0{
    width: 100%;
    text-transform: uppercase;
    height: 70px;}
input {
    border: none;
    border-bottom: 2px solid #a2a2a2;
    padding: 3px 4px;
    margin-bottom: 10px;
    background-color: rgba(0  0  0 / 0.6);
    color: #fff;
    font-family: 'Itim', sans-serif;}
input[type="number"]:hover{

background-color: rgba(255, 255, 255, 1);
color: black;
}
input:focus {
    outline: none;}
.display-block{
    display: block;}
.modalP{
    position:fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgb(0 0 0 / 52%);}

.formModal{
    display:flex;
    flex-direction: column;
    align-content: center;}
.conteinerModal{
    background-color: #0a0b0c;
    text-align:center;
    margin: 10% 25%;
    padding: 20px;
    border: 2px solid #898;
    width: 50%;}
.conteinerModal h2{
    font-size: 30px;
    margin: 0 auto;}
.conteinerModal label{
    font-size: 25px;}
.conteinerModal input{
    font-size: 25px;
    text-align: center;
    width:93%;}
.conteinerModal h4{
    height: 30px;
    color: #fff;
    font-size: 50px;
    margin: 40px auto;}
.conteinerModal h3{
    margin: 0 auto;
    height: 56px;
    color: #fff;
    font-size: 35px;}
.conteinerModal p{
    height: 50px;
    color: #fff;
    font-size: 35px;
    margin: 0 auto;
    display: block;}
.conteinerModal input[type=submit]{
    margin:  0 auto;
    border: 2px solid;
    width:80%;
    padding: 1px 20px 1px;
    color: #fff;
    height: 50px;
    font-size: 35px;}
.conteinerModal input[type=submit]:hover{
    margin:  0 auto;
    border: 2px solid;
    width:80%;
    padding: 1px 20px 1px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}

.tituloP{
    margin: 0 auto;
    text-align: center;
    background-color: rgba(0  0  0 / 0.0);
    text-shadow: 2px 2px black;
    border-bottom: none;
    margin: 15px  0;
    color: #fff;
}
#imgHover{
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    opacity: 0.7;

}
#imgHover:hover{
    opacity: 1;
    border: 1px solid rgb(201, 201, 201);
    background-color: rgba(32  32  32 / 0.4);
}
.containerAtributos, .containerPericia, .containerResistencias{
    overflow: hidden;
    border: 1px solid rgba(255  255  255 / 0.7);
    padding-bottom: 10px;
    width: 100%;}
.containerAtributos ul, .containerPericia ul, .containerResistencias ul{
    padding: 0;
    padding-left: 20px;
    list-style: none;
    width: 100%;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-left: 0px;}
.containerAtributos ul li, .containerPericia ul li, .containerResistencias ul li{
    float:left;
    display: flex;
    border-radius: 24px;
    opacity: 1;
    flex-direction: column;
    text-align:center;
    width: 120px;}
.containerAtributos ul li img, .containerPericia ul li img, .containerResistencias ul li img{
    display:block;
    margin-left: auto;
    margin-right: auto;
    height: 50px;}
.containerAtributos ul li h2, .containerPericia ul li h2, .containerResistencias ul li h2{
    display: block;
    text-align: center;
    font-size: 18px;
    margin: 5px auto;
}
.containerAtributos ul li p, .containerPericia ul li p, .containerResistencias ul li p{
    width: 70%;
    height: 30px;
    display: block;
    padding-top: 5px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    color: #fff;
    align-self: center;
    background-color: rgba(0  0  0 / 0.6);
    border-bottom: 2px solid rgb(196, 196, 196);
}
.containerAtributos ul li p:hover, .containerPericia ul li p:hover, .containerResistencias ul li p:hover{
    color: black;
    background-color: rgba(255  255  255 / 0.7);
    border-bottom: 2px solid rgb(196, 196, 196);
}

.back{
    background-color: rgba(0  0  0 / 0.6);
    border-radius: 10px;
}

/* For Desktop View */
@media screen
  and (min-width: 1024px){
    .container-geral{
        width: 90%;
        margin: 0 auto;
        display: grid;
        grid-template-areas:
            'detalhes detalhes personagem personagem lateral'
            'resistencia resistencia resistencia resistencia resistencia'
            'atributo atributo pericia pericia pericia'
        ;
        grid-gap: 30px;
    }
    .pessoal-lateral{
        display: block;
    }
    .modal-atributoAdd, .modal-periciaAdd{
        width:30%;
    }
}

/* For Tablet View */
@media screen
  and (min-device-width: 768px)
  and (max-device-width: 1024px){
    .container-geral{
      width: 100%;
      background-color: orange;
      color: black;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'lateral lateral lateral lateral lateral'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia';

    }
    .container-geral div{
        width: 90%;
    }
    .pessoal-lateral{
        display: flex;
    }
    .container-avatar{
    width: 80%;
    }

}

/* For Mobile Portrait View */
@media screen
  and (max-device-width: 480px)
  and (orientation: portrait){
    .container-geral{
      width: 100%;
      background-color: red;
      color: #fff;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia'
        'lateral lateral lateral lateral lateral';

    }
    .container-geral div{
        width: 90%;
    }
    .pessoal-lateral{
        display: inline-flex;
    }
    .container-avatar{
    width: 80%;
    }
}
/* For Mobile Landscape View */
@media screen
  and (max-device-width: 640px)
  and (orientation: landscape){
    .container-geral{
      width: 100%;
      background-color: cyan;
      color: black;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia'
        'lateral lateral lateral lateral lateral';
    }
    .container-geral div{
        width: 90%;
    }
    .pessoal-lateral{
        display: flex;
    }
    .container-avatar{
    width: 80%;
    }

}

/* For Mobile Phones Portrait or Landscape View */
@media screen
  and (max-device-width: 640px){
    .container-geral{
      width: 100vw;
      background-color: chartreuse;
      color: black;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia'
        'lateral lateral lateral lateral lateral';
    }
    .container-geral div{
        width: 90%;
    }
    .pessoal-lateral{
        display: flex;
    }
    .box-classe{
        display:none;
    }

}

/* For iPhone 4 Portrait or Landscape View */
@media screen
  and (min-device-width: 320px)
  and (-webkit-min-device-pixel-ratio: 2){
    h2{
        color: white;
        font-size: 15px;
    }
    .container-geral{
      width: 100vw;
      background-color:brown;
      color: black;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia'
        'lateral lateral lateral lateral lateral';
    }
    .container-geral{
        margin-left: -11px;
        padding: 0px;

    }
    .container-geral div{
        margin-left: 2px;
        width: 99%;
        padding: 0px;

    }
    .pessoal-lateral{
        display: flex;
    }
    .pessoal-lateral button{
        width: 60px;
        height: 60px;
        margin-top: 1px;
    }
    .box-classe{
        display:none;
    }


}

/* For iPhone 5 Portrait or Landscape View */
@media (device-height: 568px)
  and (device-width: 320px)
  and (-webkit-min-device-pixel-ratio: 2){
    .container-geral{
      width: 100%;
      background-color:cornflowerblue;
      color: black;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia'
        'lateral lateral lateral lateral lateral';
    }
    .container-geral div{
        width: 90%;
    }
    .pessoal-lateral{
        display: flex;
    }

}

/* For iPhone 6 and 6 plus Portrait or Landscape View */
@media (min-device-height: 667px)
  and (min-device-width: 375px)
  and (-webkit-min-device-pixel-ratio: 3){
    .container-geral{
      width: 100%;
      background-color:darkgoldenrod;
      color: black;
      grid-template-areas:
        'personagem personagem personagem personagem personagem'
        'detalhes detalhes detalhes detalhes detalhes'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo atributo atributo atributo'
        'pericia pericia pericia pericia pericia'
        'lateral lateral lateral lateral lateral';
    }
    .container-geral div{
        width: 100%;
    }
    .pessoal-lateral{
        display: flex;
    }

}

.modal-atributo{
     background-color: #0a0b0c;
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 30%;
}
.modal-atributo h2{
    font-size: 25px;
    display:block;
}
.modal-atributo form label{
    font-size: 30px;
    display:block;
}
.modal-atributo form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 110px
}

.modal-atributo form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-atributo form input[type="submit"]{
    font-size: 25px;
    color: #fff;
    display:block;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    width: 116px;
}
.modal-atributo form input[type="submit"]:hover{
    font-size: 25px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}
    </style>
