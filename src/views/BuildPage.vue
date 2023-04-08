<template>
    <div class="caixa-central">
        <template v-if="carrosel === 1">
            <Detalhes 
                :nome="nome" 
                :origem="origem" 
                :classe="classe" 
                :idade="idade" 
                :sexo="sexo" 
                :nascimento="nascimento" 
                :residencia="residencia" 
                :trilha="trilha" 
                :NEX="NEX" 
                :patente="patente"

                @u_nome="u_nome" 
                @u_origem="u_origem" 
                @u_classe="u_classe" 
                @u_idade="u_idade"
                @u_sexo="u_sexo" 
                @u_nascimento="u_nascimento" 
                @u_residencia="u_residencia" 
                @u_trilha="u_trilha" 
                @u_NEX="u_NEX" 
                @u_patente="u_patente" 
            />
        </template>
        <template v-if="carrosel === 2">
            <div class="loop atributos">
                <ul>
                    <li v-for="(atributo, index) in atributos" :key="index">
                        <img id="imgAtributo" src="/img/d20_3.png" @click="modalDado(atributo.nome, atributo.valor)" alt="">
                        <p>{{atributo.nome}}</p>
                        <input v-model="atributo.valor" type="number">
                    </li>
                </ul>
            </div> 
        </template>
        <template v-if="carrosel === 3">
            <div class="loop pericias">
                <ul>
                    <li v-for="(pericia, index) in pericias" :key="index">
                        <img src="/img/d20_4.png" alt="">
                        <p>{{pericia.nome}}</p>
                        <input v-model="pericia.valor" type="number">
                    </li>
                </ul>
            </div>
        </template>
        <template v-if="carrosel === 4">
            <Avatar 
                :l_vida.sync="vida" 
                :l_sanidade.sync="sanidade" 
                :l_ocultismo.sync="ocultismo" 
                :l_esforco.sync="esforco" 
                :l_acao.sync="acao" 
                :l_movimento.sync="movimento" 
                :l_reacao.sync="reacao" 

                :lesao_grave="lesao_grave" 
                :inconsciente="inconsciente" 
                :morrendo="morrendo" 
                :traumatizado="traumatizado" 
                :enlouquecendo="enlouquecendo"

                @u_lesao_grave="u_lesao_grave" 
                @u_inconsciente="u_inconsciente" 
                @u_morrendo="u_morrendo" 
                @u_traumatizado="u_traumatizado" 
                @u_enlouquecendo="u_enlouquecendo"
            />
        </template>
        <template v-if="carrosel >= 5">
            <div class="content-sessaormamentos">
                <div class="content-sessao">
                    <table>
                        <thead>
                            <th colspan="7">ARMAMENTOS DISPONÍVEIS</th>
                            <tr>
                                <th>arma</th>
                                <th class="hide-td">categoria</th>
                                <th>dano</th>
                                <th class="hide-td">crítico</th>
                                <th>alcance</th>
                                <th class="hide-td">tipo</th>
                                <th>espaço</th>
                            </tr>
                        </thead>
                        
                        <template v-if="armamento_simples_sessao.length > 0">
                            <h3>Armas Simples</h3>
                            <tr v-for="(arma, index) in armamento_simples_sessao" :key="index" @click="add_arma_simples(arma, index)">
                                <td>{{arma.arma}}</td>
                                <td class="hide-td" >{{arma.categoria_0}}</td>
                                <td>{{arma.dano}}</td>
                                <td class="hide-td">{{arma.critico}}</td>
                                <td>{{arma.alcance}}</td>
                                <td class="hide-td">{{arma.tipo}}</td>
                                <td>{{arma.espaco}}</td>
                            </tr>
                        </template>
                        <template v-if="armamento_tatico_sessao.length > 0">
                            <h3>Armas Táticas</h3>
                            <tr v-for="(arma, index) in armamento_tatico_sessao" :key="index" @click="add_arma_tatica(arma, index)">
                                <td>{{arma.arma}}</td>
                                <td>{{arma.categoria_0}}</td>
                                <td>{{arma.dano}}</td>
                                <td>{{arma.critico}}</td>
                                <td>{{arma.alcance}}</td>
                                <td>{{arma.tipo}}</td>
                                <td>{{arma.espaco}}</td>
                            </tr>
                        </template>
                        <template v-if="armamento_pesado_sessao.length > 0">
                            <h3>Armas Pesadas</h3>
                            <tr v-for="(arma, index) in armamento_pesado_sessao" :key="index" @click="add_arma_pesada(arma, index)">
                                <td>{{arma.arma}}</td>
                                <td>{{arma.categoria_0}}</td>
                                <td>{{arma.dano}}</td>
                                <td>{{arma.critico}}</td>
                                <td>{{arma.alcance}}</td>
                                <td>{{arma.tipo}}</td>
                                <td>{{arma.espaco}}</td>
                            </tr>
                        </template>
                    </table>
                </div>
                <div class="content-personagem">
                    <div>
                        <table>
                            <thead>
                                <th colspan="7">SEUS ARMAMENTOS</th>
                                <tr>
                                    <th>arma</th>
                                    <th>categoria</th>
                                    <th>dano</th>
                                    <th>crítico</th>
                                    <th>alcance</th>
                                    <th>tipo</th>
                                    <th>espaço</th>
                                </tr>
                            </thead>
                            <template v-if="armamento_simples_personagem.length > 0">
                                <h3>Armas Simples</h3>
                                <tr v-for="(arma, index) in armamento_simples_personagem" :key="index" @click="remove_arma_simples(arma, index)">
                                    <td>{{arma.arma}}</td>
                                    <td>{{arma.categoria_0}}</td>
                                    <td>{{arma.dano}}</td>
                                    <td>{{arma.critico}}</td>
                                    <td>{{arma.alcance}}</td>
                                    <td>{{arma.tipo}}</td>
                                    <td>{{arma.espaco}}</td>
                                </tr>
                            </template>
                            <template v-if="armamento_tatico_personagem.length > 0">
                                <h3>Armas Táticas</h3>
                                <tr v-for="(arma, index) in armamento_tatico_personagem" :key="index" @click="remove_arma_tatica(arma, index)">
                                    <td>{{arma.arma}}</td>
                                    <td>{{arma.categoria_0}}</td>
                                    <td>{{arma.dano}}</td>
                                    <td>{{arma.critico}}</td>
                                    <td>{{arma.alcance}}</td>
                                    <td>{{arma.tipo}}</td>
                                    <td>{{arma.espaco}}</td>
                                </tr>
                            </template>
                            <template v-if="armamento_pesado_personagem.length > 0">
                                <h3>Armas Pesadas</h3>
                                <tr v-for="(arma, index) in armamento_pesado_personagem" :key="index" @click="remove_arma_pesada(arma, index)">
                                    <td>{{arma.arma}}</td>
                                    <td>{{arma.categoria_0}}</td>
                                    <td>{{arma.dano}}</td>
                                    <td>{{arma.critico}}</td>
                                    <td>{{arma.alcance}}</td>
                                    <td>{{arma.tipo}}</td>
                                    <td>{{arma.espaco}}</td>
                                </tr>
                            </template>
                        </table>
                    </div>
            
                </div>
            </div>
        </template>

        <input class="btnPrevious" @click="btnPrev()"  type="submit" value="PREV ">
        <input class="btnNext" @click="btnNext()"  type="submit" value="NEXT">

        
        
        
        
    </div>


</template>
<script>

import armamentos from '@/json/armamentos'


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
            carrosel: 1,

            // dados do avatar 
            vida : {atual: 23, maximo: 40},
            sanidade : {atual: 68, maximo: 100},
            ocultismo : {atual: 50, maximo: 50},
            esforco : {atual: 12, maximo: 12},
            acao : 1,
            reacao : 1,
            lesao_grave : false,
            inconsciente : false,
            morrendo : false,
            traumatizado : false,
            enlouquecendo : false,
            // fim dados do avatar

            // dados de detalhes do personagem
            nome : "",
            origem : 'Executivo',
            classe: "",
            NEX: 0,
            trilha: "",
            patente: "",
            idade : 0,
            sexo : "",
            nascimento : "",
            residencia : "",
            // fim dados detalhes

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

            // dados de armamentos sessao / personagem
            movimento : 1,
            peso : 0,
            armamentos_sessao_all: [],
            
            armamento_simples_sessao : [],
            armamento_tatico_sessao : [],
            armamento_pesado_sessao : [],

            armamento_simples_personagem : [],
            armamento_tatico_personagem : [],
            armamento_pesado_personagem : []
            
        }
    },
    methods:{
        u_lesao_grave(value){this.lesao_grave = value},
        u_inconsciente(value){this.inconsciente = value},
        u_morrendo(value){this.morrendo = value},
        u_traumatizado(value){this.traumatizado = value},
        u_enlouquecendo(value){this.enlouquecendo = value},
        btnPrev(){
            if(this.carrosel > 1){
                this.carrosel = this.carrosel - 1;
            }
            
        },
        btnNext(){
            if(this.carrosel < 5){
                this.carrosel = this.carrosel + 1;
            }
            
            // console.log(this.vida)
            // console.log(this.sanidade)
            // console.log(this.ocultismo)
            // console.log(this.esforco)
            // console.log(this.acao)
            // console.log(this.movimento)
            // console.log(this.reacao)
            // console.log(this.lesao_grave)
            // console.log(this.inconsciente)
            // console.log(this.morrendo)
            // console.log(this.traumatizado)
            // console.log(this.enlouquecendo)
            console.log(this.nome)
            console.log(this.origem)
            console.log(this.classe)
            console.log(this.NEX)
            console.log(this.trilha)
            console.log(this.patente)
            console.log(this.idade)
            console.log(this.sexo)
            console.log(this.nascimento)
            console.log(this.residencia)

        },
        u_nome(nome){this.nome = nome},
        u_origem(origem){this.origem = origem},
        u_classe(classe){this.classe = classe},
        u_NEX(NEX){this.NEX = NEX},
        u_trilha(trilha){this.trilha = trilha},
        u_patente(patente){this.patente = patente},
        u_idade(idade){this.idade = idade},
        u_sexo(sexo){this.sexo = sexo},
        u_nascimento(nascimento){this.nascimento = nascimento},
        u_residencia(residencia){this.residencia = residencia},

        // funcões de armamentos
        async carregar_armamentos_ordem(){
            this.armamento_simples_sessao = this.armamentos_sessao_all.filter(arma => arma.categoria_1 === "Arma Simples")
            this.armamento_tatico_sessao = this.armamentos_sessao_all.filter(arma  => arma.categoria_1 === "Arma Tática")
            this.armamento_pesado_sessao = this.armamentos_sessao_all.filter(arma => arma.categoria_1 === "Arma Pesada")
        },
        add_arma_simples(arma, index){
            this.armamento_simples_personagem.unshift(arma)
            this.armamento_simples_sessao.splice(index, 1)
        },
        add_arma_tatica(arma, index){
            this.armamento_tatico_personagem.unshift(arma)
            this.armamento_tatico_sessao.splice(index, 1) 
        },
        add_arma_pesada(arma, index){
            this.armamento_pesado_personagem.unshift(arma)
            this.armamento_pesado_sessao.splice(index, 1)
        },
        remove_arma_simples(arma, index){
            this.armamento_simples_sessao.unshift(arma)
            this.armamento_simples_personagem.splice(index, 1)     
        },
        remove_arma_tatica(arma, index){
            this.armamento_tatico_sessao.unshift(arma)
            this.armamento_tatico_personagem.splice(index, 1)     
        },
        remove_arma_pesada(arma, index){
            this.armamento_pesado_sessao.unshift(arma)
            this.armamento_pesado_personagem.splice(index, 1)        
        },
        // fim de armamentos 
    },created(){
        this.armamentos_sessao_all = armamentos.armamentos;
    }, mounted(){
        this.carregar_armamentos_ordem()
    },
    watch :{
        pericias(newValue){
            console.log(newValue)
        }
    }

}
</script>
<style lang="scss">
/* Estilização do Scroll */

/* Cor da barra de rolagem */
::-webkit-scrollbar {
    width: 8px;
    background-color: #1a1a1a;
}

/* Cor do indicador do scroll */
::-webkit-scrollbar-thumb {
    background-color: #666666;
}

/* Cor do indicador do scroll quando está em hover */
::-webkit-scrollbar-thumb:hover {
    background-color: #999999;
}

h1, h2, h3, label{
    color: #ffff
}
.caixa-central{
background: rgba(0, 0, 0, 0.0);

width: 100vw;
height: 100vh;

margin-top: 3vmax;
display: flex;
align-items: flex-start;
justify-content: center;
@media screen and (max-width: 400px)    {
    max-height: 70vh;
}
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
    padding: 0.3    em 0;
}
label{
    text-align: left;
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
    bottom:5%;
    left: 5%;
}
.btnNext{
    cursor: pointer;
    position: absolute;
    bottom:5%;
    right:5%;
}


.loop{
    width: 60%;
    max-height: 73vh;
    overflow-y: auto;
    ul{
        padding: 0;
        margin: 0;
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

// scss de armaentos e tabelas
.content-sessaormamentos{
    display: flex;
    width: 80%;
    gap: 1px;
    margin: 0 auto;
    background-color:rgba(0  0  0 / 0);
    @media screen and (max-width: 400px)    {
        width: 100%;
        flex-direction: column;
    }
    table{
        margin: 0 auto;
        width: 100%;
        max-height: 100%;
        @media screen and (max-width: 400px)    {
            max-height: 5   0%;
        }
        thead{
            background-color: rgba(0, 0, 0, 0.827);
            top: 0;
            position: sticky;
            text-align: center;
            th{
                cursor:default;
                border-bottom: 1px solid rgba(239, 239, 239, 0.7);
                padding: 0.5em 0.3em;
                font-size: 1em;
            }
        }
        
        h3{
            font-family: 'Consolas';
            width: 100%;
            font-size: 12px;
            margin: 5px 0;
            background-color: rgba(81, 81, 81, 0.5);
        }
        td{
            cursor: pointer;
            text-align: center;
            border-bottom:1px solid rgba(91, 91, 91, 0.7);
            font-size: 13px;
        }
        tr:hover{
            color: rgba(0, 0, 0, 1);
            background-color: rgba(255, 255, 255, 0.9);
        
        }
    }
    .content-sessao{
        width: 50%;
        max-height: 80vh;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.7);
        border-right: 1px solid rgb(137, 137, 137);
        h2{
            text-align: center;
            color: #ffff;
            text-shadow: 2px 2px black;
        }
        @media screen and (max-width: 400px)    {
            width: 100%;
            max-height: 38vh;
        }
    }
    .content-personagem{
        max-height: 80vh;
        width: 50%;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.7);
        @media screen and (max-width: 400px)    {
            width: 100%;
            max-height: 35vh;
        }
    }
    
}


// fim scss armamentos
</style>