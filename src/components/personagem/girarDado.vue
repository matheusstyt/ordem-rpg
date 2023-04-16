<template>
    <div class="container-girar-dado">
        <button>x</button>
        <h3>Rolagem de dados - {{ nome_atual }}</h3>
        <div class="content-conf-dado">
            <input type="number" name="" id="" v-model="qtd_dado">
            <p>d</p>
            <input type="number" name="" id="" v-model="tipo_dado">
            <p>+</p>
            <input type="number" name="" id="" v-model="soma_extra">
        </div>
        <div class="content-img" @click="resultado_dados()">
            <template v-if="is_pericia">
                <img src="@/assets/img/dados/d20_pericia.png" alt="">
            </template>
            <template v-else>
                <img src="@/assets/img/dados/d20_atributo.png" alt="">
            </template>
        </div>
        <h4>Histórico:</h4>
        <div class="result-list">
            <template v-for="(item, index) in historico" :key="index">
                <p>{{item}}</p>
            </template>
        </div>
        <h4>Maior valor : {{maior_valor}}</h4>
        <h3>{{string_result}}</h3>
    </div>
</template>
<script>
export default {
    props : {
        valor : Number,
        nome_atual : String,
    },
    data(){
        return{
    
            is_pericia : true,
            qual : "",
            qtd_dado : 1,
            tipo_dado : 6,
            soma_extra : 0,
            historico : [],
            maior_valor : 0,

            tabela : [
                {normal: 20},
                {normal: 19, bom: 20},
                {normal: 18, bom: 20},
                {normal: 17, bom: 19},
                {normal: 16, bom: 19, extremo: 20},
                {normal: 15, bom: 18, extremo: 20},
                {normal: 14, bom: 18, extremo: 20},
                {normal: 13, bom: 17, extremo: 20},
                {normal: 12, bom: 17, extremo: 20},
                {normal: 11, bom: 16, extremo: 20},
                {normal: 10, bom: 16, extremo: 19},
                {normal: 9, bom: 16, extremo: 19},
                {normal: 8, bom: 15, extremo: 19},
                {normal: 7, bom: 14, extremo: 19},
                {normal: 6, bom: 14, extremo: 18},
                {normal: 5, bom: 13, extremo: 18},
                {normal: 4, bom: 13, extremo: 18},
                {normal: 3, bom: 12, extremo: 18},
                {normal: 2, bom: 12, extremo: 18},
                {normal: 1, bom: 11, extremo: 17},
            ],
            string_result : ""
        }
    },
    methods: {
        resultado_dados (){
            var valor_temp;

            //clean
            this.historico = [];
            valor_temp = 0;

            var maior_numero = 0;

            //rolagem de dados 
            for ( var i = 1; i <= this.qtd_dado ; i++){
                var valor_temp;
                valor_temp = Math.floor(Math.random()*this.tipo_dado)+1;
                if( valor_temp > maior_numero){
                    // pegando o maior resultado
                    maior_numero = valor_temp;
                }
                // push para o historico
                this.historico.push(valor_temp);
            }
            this.maior_valor = maior_numero;
            
            this.string_result = this.tabela_d20(maior_numero);
        },
        tabela_d20(result){
            
            const tipo = this.tabela[this.valor - 1];
            console.log(tipo)
            console.log(this.valor)
            console.log(result)
            if(this.valor != 20 && result == 1){
                console.log('Desastre')
                return 'Desastre'}
            if(result >= tipo.extremo){
                console.log('Extremo')
                return 'Extremo'}
            if(result >= tipo.bom && result < tipo.extremo){
                console.log('Sucesso Bom')
                return 'Sucesso Bom'
            }if(result >= tipo.normal && result < tipo.bom){
                console.log('Sucesso Normal')
                return 'Sucesso Normal'
            }if(result < tipo.normal){
                console.log('Fracasso')
                return 'Fracasso'}
            }

    },
}
</script>
<style lang="scss">
.container-girar-dado{
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.822);
    padding: 1em;
    position: fixed;
    z-index: 3;
    button{
        position: absolute;
        top: 0;
        right: 0;
        background-color: #00000071;
        padding: 0.5em;
        cursor: pointer;
    }
    button:hover{
        background-color: rgba(255, 0, 0, 0.479);
    }
    .content-conf-dado{
        align-items: center;
        justify-content: center;
        display: flex;
        gap: 0.5em;
        input{
            width: 3em;
        }
    }
    .content-img{
        margin-top: 1em;
        border: 1px solid transparent;
        cursor: pointer;
        width: 3em;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1/1;
        margin: 0 auto;
        img{
            width: 90%;
            height: 90%;
        }
        img:hover{
            transform: none;
            transition: all ease 0.3s;
        }
        img:active{
            transform: rotate(360deg) ;
        }
    }
    .content-img:hover{
        transition: all ease 0.3s;
        border: 1px solid #fff;
    }
    .result-list{
        display: flex;
        gap: 0.5em;
    }
    h4{
        text-align: center;
    }
}

</style>