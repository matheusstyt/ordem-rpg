<template>
<div class="content-sessaormamentos">
    <div class="content-sessao">
        <h2>ARMAMENTOS DISPONÍVEIS</h2>
        <hr>
        <table>
            <tr>
                <th>arma</th>
                <th>categoria</th>
                <th>dano</th>
                <th>crítico</th>
                <th>alcance</th>
                <th>tipo</th>
                <th>espaço</th>
            </tr>
            <template v-if="armamento_simples_sessao.length > 0">
                <h3>Armas Simples</h3>
                <tr v-for="(arma, index) in armamento_simples_sessao" :key="index" @click="add_arma_simples(arma, index)">
                    <td>{{arma.arma}}</td>
                    <td>{{arma.categoria_0}}</td>
                    <td>{{arma.dano}}</td>
                    <td>{{arma.critico}}</td>
                    <td>{{arma.alcance}}</td>
                    <td>{{arma.tipo}}</td>
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
            <h2>SEUS ARMAMENTOS</h2>
            <hr>
            <div>
                <h3>Peso: {{peso}}</h3>
                <h3>Movimento: {{movimento}}</h3>
            </div>
            <table>
                <tr>
                    <th>arma</th>
                    <th>categoria</th>
                    <th>dano</th>
                    <th>crítico</th>
                    <th>alcance</th>
                    <th>tipo</th>
                    <th>espaço</th>
                </tr>
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

        <div class="caixa-next">
            <button @click="btnPrevious" class="btnPrevious">PREVIOUS</button>
            <button @click="btnNext" class="btnNext">NEXT</button>
        </div>
    </div>
</div>

</template>
<script>
import armamentos from '@/json/armamentos'
export default {
    data(){
        return{
            dataJ: [],
            peso:0,
            movimento:0,
            arma: '',
            categoria1: '',
            categoria2: '',
            categoria3: '',
            dano: '',
            critico: '',
            alcance: '',
            tipo: '',
            espaco: '',
            new: [],
            
            armamentosUsuario: [],

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
        btnNext(){
          this.dataJ['armamentos'] = this.armamentosUsuario
          this.dataJ['peso'] = this.peso
          var dataj = JSON.stringify(this.dataJ)
          this.$router.push({name:"createantescendente", params:{dataJ: dataj}})


        },
        btnPrevious(){
            this.dataJ['armamentos'] = this.armamentosUsuario
            this.dataJ['peso'] = this.peso
            var dataj = JSON.stringify(this.dataJ)
            this.$router.push({name:"createresistencias", params:{dataJ: dataj}})
        }
    },
    mounted(){
        this.carregar_armamentos_ordem()
    },created(){
        this.armamentos_sessao_all = armamentos.armamentos;
        console.log(this.armamentos_sessao_all)
    }
}
</script>
<style scoped lang="scss">

.content-sessaormamentos{
    display: flex;
    
    width: 80%;
    gap: 1px;
    margin: 0 auto;
    background-color:rgba(0  0  0 / 0);

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
    }
    .content-personagem{
        max-height: 80vh;
        width: 50%;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.7);
        h2{
            text-align: center;
            color: #ffff;
            text-shadow: 2px 2px black;
        }
    }
    table{
        padding: 10px;
        margin: 0 auto;
        h3{
            font-family: 'Consolas';
            width: 100%;
            font-size: 12px;
            margin: 5px 0;
            background-color: rgba(81, 81, 81, 0.5);
        }
        th{
            border: 1px solid rgba(239, 239, 239, 0.7);
            padding: 0 10px;
            font-size: 14px;
        }
        td{
            text-align: center;
            border-bottom:1px solid rgba(91, 91, 91, 0.7);
            font-size: 13px;
        }
        tr:hover{
            color: rgba(0, 0, 0, 1);
            background-color: rgba(255, 255, 255, 0.9);
        
        }
    }
}





.caixa-next{
    width: 60%;
    margin: 0 auto;
    margin-top: 10px;

}
.btnNext:hover, .btnPrevious:hover{
    color: black;
    background-color: aliceblue;
}
.btnPrevious{
    position: flex;
    float: left;
}
.btnNext{
    position: flex;
    float: right;
}
.btnPrevious, .btnNext {
    text-align: center;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 3px 4px;
    background: rgba(7 7 7 / 0.5);
    color: #fff;
    font-family: 'Itim', sans-serif;}
.btnPrevious:hover, .btnNext:hover{
    background: rgba(255 255 255 / 0.5);
    color: black;
}
</style>