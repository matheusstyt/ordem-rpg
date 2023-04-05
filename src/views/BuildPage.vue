<template>
    <div class="caixa-central">
       <!-- <Detalhes 
       :nome="nome" 
       :jogador="jogador" 
       :origem="origem" 
       :classe="classe" 
       :idade="idade" 
       :sexo="sexo" 
       :lnascimento="lnascimento" 
       :lresidencia="lresidencia" 
       :trilha="trilha" 
       :NEX="NEX" 
       :patente="patente"
        @nomeUpdate="nomeUpdate" 
        @jogadorUpdate="jogadorUpdate" 
        @origemUpdate="origemUpdate" 
        @classeUpdate="classeUpdate" 
        @idadeUpdate="idadeUpdate"
        @sexoUpdate="sexoUpdate" 
        @lnascimentoUpdate="lnascimentoUpdate" 
        @lresidenciaUpdate="lresidenciaUpdate" 
        @trilhaUpdate="trilhaUpdate" 
        @NEXUpdate="NEXUpdate" 
        @patenteUpdate="patenteUpdate" />
         -->
        <input class="btnPrevious" @click="teste"  type="submit" value="PREVIOUS ">
        <input class="btnNext" @click="btnNext()"  type="submit" value="NEXT">
        
        <!-- <Atributos :data="atributos" 
        @atributosUpdate="atributosUpdate" 
        :CON="CON" 
        :DES="DES" 
        :MOV="movimento"
        @updateCON="updateCON"
        @updateDES="updateDES" 
        @updateMov="updateMov"/> -->

        <!-- <div class="loop atributos">
            <ul>
                <li v-for="(atributo, index) in atributos" :key="index">
                    <img id="imgAtributo" src="/img/d20_3.png" @click="modalDado(atributo.nome, atributo.valor)" alt="">
                    <p>{{atributo.nome}}</p>
                    <input v-model="atributo.valor" type="number">
                </li>
            </ul>
        </div> -->
        <!-- <div class="loop atributos">
            <ul>
                <li v-for="(pericia, index) in pericias" :key="index">
                    <img src="/img/d20_4.png" alt="">
                    <p>{{pericia.nome}}</p>
                    <input v-model="pericia.valor" type="number">
                </li>
            </ul>
        </div> -->
        <Avatar 
            :vida.sync="vida" 
            :sanidade.sync="sanidade" 
            :ocultismo.sync="ocultismo" 
            :esforco.sync="esforco" 
            :acao.sync="acao" 
            :movimento.sync="movimento" 
            :reacao.sync="reacao" 
            :lesao_grave.sync="lesao_grave" 
            :inconsciente.sync="inconsciente" 
            :morrendo.sync="morrendo" 
            :traumatizado.sync="traumatizado" 
            :enlouquecendo.sync="enlouquecendo" 
        />
    </div>


</template>
<script>

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import Detalhes from '../components/Detalhes.vue'
import Atributos from '../components/Atributos.vue'
import Avatar from '../components/Avatar.vue'
export default {
    components:{
        ToastPlugin, Detalhes, Atributos, Avatar
    }
    ,
    data(){
        return{
            dataJ: {},

            // dados do avatar 
            vida : {atual: 56, maximo: 50},
            sanidade : {atual: 68, maximo: 50},
            ocultismo : {atual: 50, maximo: 50},
            esforco : {atual: 12, maximo: 12},
            acao : 1,
            movimento : 1,
            reacao : 1,
            lesao_grave : false,
            inconsciente : false,
            morrendo : false,
            traumatizado : false,
            enlouquecendo : false,
            // fim dados do avatar

            nome : "",
            jogador : "",
            origem : 'Executivo',
            classe: "",
            NEX: 0,
            patente: "",
            trilha: "",
            idade : "",
            sexo : "",
            lnascimento : "",
            lresidencia : "",
            dataL: '',
            CON :0,
            DES : 0,
            movimento : 0,
            atributos :[{id:1, nome: 'APARÊNCIA', valor: 0},
                        {id:2, nome: 'CONSTITUIÇÃO', valor: 0},
                        {id:3, nome: 'DESTREZA', valor: 0},
                        {id:4, nome: 'EDUCAÇÃO', valor: 0},
                        {id:5, nome: 'FORÇA', valor: 0},
                        {id:6, nome: 'INTELIGÊNCIA', valor: 0},
                        {id:7, nome: 'PODER', valor: 0},
                        {id:8, nome: 'SORTE', valor: 0},
                        {id:9, nome: 'TAMANHO', valor: 0}
                    ],
            pericias: [ { id:1, treino: 'DESTREINADA', tipo: 'treinada', nome: 'ATLETISMO', valor: 0},
                {id:2, treino: 'DESTREINADA', tipo: 'treinada', nome: 'ATUALIDADES', valor: 0},
                {id:3, treino: 'DESTREINADA', tipo: 'treinada', nome: 'CIÊNCIAS', valor: 0},
                {id:4, treino: 'DESTREINADA', tipo: 'treinada', nome: 'DIPLOMACIA', valor: 0},
                {id:5, treino: 'DESTREINADA', tipo: 'treinada', nome: 'ENGANAÇÃO', valor: 0},
                {id:6, treino: 'DESTREINADA', tipo: 'treinada', nome: 'FORTITUDE', valor: 0},
                {id:7, treino: 'DESTREINADA', tipo: 'treinada', nome: 'FURTIVIDADE', valor: 0},
                {id:8, treino: 'DESTREINADA', tipo: 'treinada', nome: 'INTIMIDAÇÃO', valor: 0},
                {id:9, treino: 'DESTREINADA', tipo: 'treinada', nome: 'INTUIÇÃO', valor: 0},
                {id:10, treino: 'DESTREINADA', tipo: 'treinada', nome: 'INVESTIGAÇÃO', valor: 0},
                {id:11, treino: 'DESTREINADA', tipo: 'treinada', nome: 'LUTA', valor: 0},
                {id:12, treino: 'DESTREINADA', tipo: 'treinada', nome: 'MEDICINA', valor: 0},
                {id:13, treino: 'DESTREINADA', tipo: 'treinada', nome: 'OCULTISMO', valor: 0},
                {id:14, treino: 'DESTREINADA', tipo: 'treinada', nome: 'PERCEPÇÃO', valor: 0},
                {id:15, treino: 'DESTREINADA', tipo: 'treinada', nome: 'PILOTAGEM', valor: 0},
                {id:16, treino: 'DESTREINADA', tipo: 'treinada', nome: 'PONTARIA', valor: 0},
                {id:17, treino: 'DESTREINADA', tipo: 'treinada', nome: 'PRESTIDIGITAÇÃO', valor: 0},
                {id:18, treino: 'DESTREINADA', tipo: 'treinada', nome: 'PROFISSÃO', valor: 0},
                {id:19, treino: 'DESTREINADA', tipo: 'treinada', nome: 'REFLEXOS', valor: 0},
                {id:20, treino: 'DESTREINADA', tipo: 'treinada', nome: 'RELIGIÃO', valor: 0},
                {id:21, treino: 'DESTREINADA', tipo: 'treinada', nome: 'TÁTICA', valor: 0},
                {id:22, treino: 'DESTREINADA', tipo: 'treinada', nome: 'TECNOLOGIA', valor: 0},
                {id:23, treino: 'DESTREINADA', tipo: 'treinada', nome: 'VONTADE', valor: 0} 
            ],

        }
    },
    methods:{
        btnNext(){
 
            //  this.dataJ['nome'] = this.nome.toUpperCase();
            //  this.dataJ['jogador'] = this.jogador.toUpperCase();
            //  this.dataJ['origem'] = this.origem.toUpperCase();
            //  this.dataJ['classe'] = this.classe.toUpperCase();
            //  this.dataJ['trilha'] = this.trilha
            //  this.dataJ['NEX'] = this.NEX
            //  this.dataJ['patente'] = this.patente.toUpperCase();
            //  this.dataJ['idade'] = this.idade
            //  this.dataJ['sexo'] = this.sexo.toUpperCase();
            //  this.dataJ['lnascimento'] = this.lnascimento.toUpperCase();
            //  this.dataJ['lresidencia'] = this.lresidencia.toUpperCase();

            // const dataj =  JSON.stringify(this.dataJ);
           // console.log(dataj)
         //   this.$router.push({name:"createatributos", params:{dataJ: dataj}})

        },
        nomeUpdate(nome){this.nome = nome;},
        jogadorUpdate(jogador){this.jogador = jogador;},
        origemUpdate(origem){this.origem = origem;},
        classeUpdate(classe){this.classe = classe;},
        idadeUpdate(idade){this.idade = idade;},
        sexoUpdate(sexo){this.sexo = sexo;},
        lnascimentoUpdate(lnascimento){this.lnascimento = lnascimento;},
        lresidenciaUpdate(lresidencia){this.lresidencia = lresidencia;},
        trilhaUpdate(trilha){this.trilha = trilha;},
        patenteUpdate(patente){this.patente = patente;},
        NEXUpdate(NEX){this.NEX = NEX;}
    },created(){
        console.log('id sessao',this.$route.params.id)
        try {
            this.dataJ = JSON.parse(this.$route.params.dataJ)
            this.nome = this.dataJ.nome
            this.jogador = this.dataJ.jogador,
            this.origem = this.dataJ.origem,
            this.classe = this.dataJ.classe,
            this.trilha = this.dataJ.trilha,
            this.patente = this.dataJ.patente,
            this.NEX = this.dataJ.NEX,
            this.idade = this.dataJ.idade,
            this.sexo = this.dataJ.sexo,
            this.lnascimento = this.dataJ.lnascimento,
            this.lresidencia = this.dataJ.lresidencia
        }catch (error) {       
            
        }
    }, mounted(){
     //   this.dataJ['idSessao'] = Number(this.$route.params.idSe)
        
        console.log(this.dataJ)
    },
    watch :{
        pericias(newValue){
            console.log(newValue)
        }
    }

}
</script>
<style lang="scss">
h1, h2, h3, label{
    color: #ffff
}
.caixa-central{
background: rgba(0, 0, 0, 0.0);

width: 100vw;
height: 100vh;

display: flex;
align-items: center;
justify-content: center;
}
.caixa-form-detalhes{
    .detalhes-inputs{
        border: 1px solid rgba(255 255 255 / 0.5);
        padding: 20px;
        background: rgba(0, 0, 0, 0.6);
        margin: 0 auto;
        text-align: center;
    } 
}
.input-field{
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 3em;
}
input, select, option {
    text-align: center;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-transform: uppercase;
    padding: 3px 7px;
    background: rgba(7 7 7 / 0.5);

    color: #fff;
    font-family: 'Itim', sans-serif;
}
input:hover, select:hover, option:hover {
    background: rgba(36, 36, 36, 0.5);
    border-bottom: 2px solid #f5f5f5;
}
select:hover, option:hover{
    cursor: pointer;
}
.btnNext:hover, .btnPrevious:hover{
    color: black;
    background-color: aliceblue;
}
.btnPrevious{
    cursor: pointer;
    position: absolute;
    bottom:50%;
    left: 5%;
}
.btnNext{
    cursor: pointer;
    position: absolute;
    bottom:50%;
    right:5%;
}


.loop{
    width: 60%;
    max-height: 75vh;
    overflow-y: auto;
    ul{
        padding: 0;
        margin: 1em 0;
        list-style: none;
        display: flex;
        flex-flow: wrap row;
        align-items: center;
        justify-content: center;
        gap: 1em;
        li{
            background-color: rgba(0, 0, 0, 0.627);
            border-radius: 10px;
            display: flex;
            align-items: center;
            flex-direction: column;
            p{
                font-size: 1.1em;
            }
            img{
                height: 2em;
                aspect-ratio: 1/1;
                padding: 0.2em;
                cursor: pointer;
                border: 1px solid transparent;
              }          
              img:hover{
                opacity: 1;
                border-radius: 50%;
                border: 1px solid rgb(201, 201, 201);
                background-color: rgba(63, 63, 63, 0.788);
                transform: none;
                transition: all 0.3s ease;
              }
              
              img:active{
                transform: rotate(360deg);
              }
        }
        li:hover{
            background-color: rgba(0, 0, 0, 0.767);
        }
    }
}
</style>