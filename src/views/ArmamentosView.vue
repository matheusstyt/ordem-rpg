<template>
<div class="container-g">
    <div class="container-a">
        <h2>ARMAMENTOS DISPONIVEIS</h2>
        <hr>
        <table>
            <tr>
                <th>ARMA</th>
                <th>CATEGORIA</th>
                <th>DANO</th>
                <th>CRÍTICO</th>
                <th>ALCANCE</th>
                <th>TIPO</th>
                <th>ESPAÇO</th>

            </tr>
            <h3>Armas Simples</h3>
            <tr v-for="(arma, index) in armamentoSistema" :key="index" @click="adicionarArma(arma.id, index)">
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.arma}}</td>
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.categoria_0}}</td>
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.dano}}</td>
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.critico}}</td>
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.alcance}}</td>
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.tipo}}</td>
                <td v-if="arma.categoria_1 == 'Armas Simples'">{{arma.espaco}}</td>
            </tr>
            <h3>Armas Táticas</h3>
            <tr v-for="(arma, index) in armamentoSistema" :key="index" @click="adicionarArma(arma.id, index)">
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.arma}}</td>
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.categoria_0}}</td>
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.dano}}</td>
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.critico}}</td>
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.alcance}}</td>
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.tipo}}</td>
                <td v-if="arma.categoria_1 == 'Armas Táticas'">{{arma.espaco}}</td>
            </tr>
            <h3>Armas Pesadas</h3>
            <tr v-for="(arma, index) in armamentoSistema" :key="index" @click="adicionarArma(arma.id, index)">
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.arma}}</td>
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.categoria_0}}</td>
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.dano}}</td>
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.critico}}</td>
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.alcance}}</td>
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.tipo}}</td>
                <td v-if="arma.categoria_1 == 'Armas Pesada'">{{arma.espaco}}</td>
            </tr>
        </table>
    </div>
    <div class="container-b">
        <form @submit="salvarArma($event)" style="display: none;">
            <div>
                <label for="arma">Arma</label>
                <input type="text" name="arma" v-model="arma">
            </div>
            <div>
                <label for="arma">Categoria 1</label>
                <input type="text" v-model="categoria1">
            </div>
            <div>
                <label for="arma">Categoria 2</label>
                <input type="text" v-model="categoria2">
            </div>
            <div>
                <label for="arma">Categoria 3</label>
                <input type="text" v-model="categoria3">
            </div>
            <div>
                <label for="arma">Dano</label>
                <input type="text" v-model="dano">

            </div>
            <div>
                <label for="arma">Crítico</label>
                 <input type="text" v-model="critico">
            </div>
            <div>
                <label for="arma">Alcance</label>
                <input type="text" v-model="alcance">
            </div>
            <div>
                <label for="arma">Tipo</label>
                <input type="text" v-model="tipo">
            </div>
            <div>
                <label for="arma">Espaço</label>
                <input type="number" v-model="espaco">
            </div>
            <div>
                <input type="submit" value="Salvar">
            </div>


        </form>
        <div>
            <h2>SEUS ARMAMENTOS</h2>
            <hr>
            <div>
                <h3>Peso: {{peso}}</h3>
                <h3>Movimento: {{movimento}}</h3>
            </div>
            <table>
                <tr>
                    <th>ARMA</th>
                    <th>CATEGORIA</th>
                    <th>DANO</th>
                    <th>CRÍTICO</th>
                    <th>ALCANCE</th>
                    <th>TIPO</th>
                    <th>ESPAÇO</th>

                </tr>
                <tr v-for="(arma, index) in armamentosUsuario" :key="arma.id" @click="removerArma(arma.id, index)">
                    <td>{{arma.arma}}</td>
                    <td>{{arma.categoria_0}}</td>
                    <td>{{arma.dano}}</td>
                    <td>{{arma.critico}}</td>
                    <td>{{arma.alcance}}</td>
                    <td>{{arma.tipo}}</td>
                    <td>{{arma.espaco}}</td>
                </tr>
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
            armamentoSistema: [],
            armamentosUsuario: [],
        }
    },
    methods:{
        // async setArma(){
        //     const dataJ =  JSON.stringify(
        //     {
        //         arma:this.arma,
        //         categoria_0:this.categoria1,
        //         categoria_1:this.categoria2,
        //         categoria_2:this.categoria3,
        //         dano:this.dano,
        //         critico:this.critico,
        //         alcance:this.alcance,
        //         tipo:this.tipo,
        //         espaco:this.espaco
        //     });
        //     const req = await fetch(`http://localhost:3000/armamento/`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json"},
        //         body: dataJ
        //     });
        //     const res = await req.json();
        //     //this.id = res.id
        // },
        async getArmamentoS(){
            const req = await fetch("http://localhost:3000/armamento");
            const data = await req.json();
             this.armamentoSistema = data
        },
        adicionarArma(id, index){
            var item = {}
            this.armamentoSistema.forEach(element => {
                if(id == element.id){
                    this.armamentosUsuario.unshift(element)
                    this.armamentoSistema.splice(index, 1)
                    item = element
                    this.peso = this.peso + element.espaco
                }
            });
        },
        removerArma(id, index){
            var item = {}
            this.armamentosUsuario.forEach(element => {
                if(id == element.id){
                    item = element
                }
            });
            this.peso = this.peso - item.espaco
            this.armamentoSistema.unshift(item)
            this.armamentosUsuario.splice(index, 1)

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
        this.getArmamentoS();
    },created(){
        this.dataJ = JSON.parse(this.$route.params.dataJ)
        this.movimento = this.dataJ.movimento
    }
}
</script>
<style scoped>

.container-g{
    display: grid;
    grid-template-areas: 'a a a b b b';
    width: 70%;
    gap: 1px;
    margin: 0 auto;
    background-color:rgba(0  0  0 / 0);
}
.container-a{
    grid-area: a;
   background-color: rgba(0, 0, 0, 0.7);
    border-right: 1px solid rgb(137, 137, 137);
}
.container-b{
    grid-area: b;
    background-color: rgba(0, 0, 0, 0.7);
}
table{
    padding: 10px;
    margin: 0 auto;
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
h2{
    text-align: center;
    color: #ffff;
    text-shadow: 2px 2px black;
}
h3{
    font-family: 'Consolas';
    width: 100%;
    font-size: 12px;
    margin: 5px 0;
    background-color: rgba(81, 81, 81, 0.5);
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