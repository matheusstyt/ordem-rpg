<template>
<div class="modalP" :style="display">
    <div class="container-i">
        <div class="container-t">
            <div class="titulo">
                <button class="btnX" @click="Sair">x</button>

                <div>
                    <h3>INVENTÁRIO</h3>
                </div>
                <p>Peso Total: {{peso}} /  {{peso}}</p>
            </div>
            <div class="tabela-a">
                <h3>ARMAMENTOS</h3>
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
                    <tr v-for="(arma, index) in armamentos" :key="arma.id" @click="removerArma(arma.id, index)">
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
            <div class="tabela-i">
                <h3>ITENS</h3>
                <table >
                    <tr>
                        <th>NOME</th>
                        <th>DESCRIÇÃO</th>
                        <th>PESO</th>
                    </tr>
                    <tr v-for="item in itens" :key="item.id">
                        <td> {{item.nome}}</td>
                        <td> {{item.descricao}}</td>
                    </tr>


                </table>
            </div>
        </div>

    </div>



</div>
</template>
<script>
export default{
    props: {
        armamentos: Array, display : String, peso: Object
    },
    data(){
        return{
            a : 0,
            b : 0,
            itens : [],
            armamentosUsuario: [],
        }

    },methods:{
        async setAntescendentes(){
            const dataJ =  JSON.stringify(
            {
                antescendentes: this.antescendentes,
            });
            const req = await fetch(`http://localhost:3000/newJogador/${this.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: dataJ
            });
            const data = await req.json();
        },
        Sair(){
            this.$emit('updateDisplayI', 'display:none;')
        }
    },mounted(){

    }
}
</script>
<style scoped>
.container-i{
    background: rgba(0  0  0 / 0.8);
    text-align:center;
    position:relative;
    padding: 0 0 10px 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

}

.tabela-a, .tabela-i{
     background: rgba(0  0  0 / 0.8);
}
table{
    margin: 0 auto;
}
.container-t{
    overflow: hidden;
    border-top: none;
    width: 80%;
    margin: 20px auto;
    padding-bottom: 10px;
    background-color:rgba(0  0  0 / 0.7);
    border: 1px solid rgba(255  255  255 / 0.5);
    width: 90%;}
.titulo{
    width: 100%;
    background-color: rgb(0 0 0 / 70%);
    text-align: center;
     overflow: hidden;
     border: none;
}
.titulo div{

    width: 100%;
    overflow: hidden;
}
.titulo h3{
	text-align: center;
	font-size: 25px;
    border-bottom: 1px solid rgba(255  255  255 / 0.5);
	border-top: 1px solid rgba(255  255  255 / 0.5);
    padding-top: 0;
    margin: 0;


}
.btnX{
    background-color: #1b1b1b;
    position:flex;
    float: right;
    color: #fff;
    height: 40px;
    width: 40px;
    border: 2px solid #1b1b1b;
    margin: 0;
    right:0;
    top:0;

}
.btnX:hover{
    background-color: #9a2525;
    color: #fff;
    border: 2px solid rgb(135, 60, 60)
}
.container-i{
    grid-area: esquerdo;
    width: 100%;
    background-color: rgb(277 277 277 / 0%)
}
.ladoB{
    grid-area: direito;
    width: 100%;
    background-color: rgb(277 277 277 / 0%)
}
.ladoB h2{
    text-align: center;
    font-size: 35px;
    border-bottom: 2px solid rgb(192, 192, 192);
    border-top: 2px solid rgb(192, 192, 192);
}
.container-i h2{
    text-align: center;
    font-size: 35px;
    border-bottom: 2px solid rgb(192, 192, 192);
    border-top: 2px solid rgb(192, 192, 192);
}
img{
    width: 350px;
    height: 350px;
    border: 3px solid rgb(165 165 165 / 0%);
    float: right;
}
img:hover{
    width: 350px;
    height: 350px ;
    background-color: rgb(277 277 277 / 20%);
    border: 3px solid rgb(165 165 165 / 20%);
}
tr{
    height: 35px;
    font-size: 15px;

}
tr:hover {
    background: rgb(216, 216, 216);
    color: rgb(43, 43, 43);

}
th{
    border: 1px solid rgbA(255  255  255 / 0.5);
    padding-left: 10px;
}
.btnA{
    background: rgb(212, 77, 77);
    width: 100%;
    color: #fff;

}
.btnE{
    background: rgb(71, 212, 106);
    width: 100%;
    color: #fff;
}
.btnA:hover{
    background: rgb(160, 28, 28);
    width: 100%;
    color: #fff;

}
.btnE:hover{
    background: rgb(13, 112, 38);
    width: 100%;
    color: #fff;
}

</style>