<template>
    <div  id="modal-dado" class="modalP" :style="displayModel">
            <div class="modal-dado" >
                <div class="caixa-treinamento">
                    <div class="treinamento">
                        <h2>TREINADA</h2>
                    </div>
                    <h2>PERICIA {{periciaN}}</h2>
                    <button @click="fecharDadoModal" class="btnX">x</button>
                </div>
                <div class="caixa-atributoV">
                    <select size="1" class="select-atributos" v-model="atributoAtual">
                        <option v-for="(atributo, index) in atributos" :key="index">{{atributo.nome}}</option>
                    </select>
                    <h2>{{atributoValor}}</h2>
                </div>

                <h3></h3>
                <div class="conteiner-periciaD">
                    <button @click="menosQtd">-</button>
                    <h6>{{dadoQtd}}</h6>
                    <button @click="maisQtd">+</button>
                    <h5>d</h5>
                    <button @click="menosSum">{{left}}</button>
                    <h6>{{dadoList[indexA]}}</h6>
                    <button @click="maisSum">{{right}}</button>
                    <h5>+</h5>
                    <h6>{{dadoSum}}</h6>
                </div>
                <div class="caixa-result">
                    <button class="resultD">{{dadoQtd}}d {{dadoList[indexA]}} + {{dadoSum}}</button>
                    <button @click="resultadoDado" class="rolarD" >ROLAR DADO'S</button>
                </div>
                <div class="caixa-historico">
                    <h6>Histórico: </h6>
                    <ul>
                        <li v-for="(item, index) in historico" :key="index" >{{item}}</li>
                    </ul>
                </div>
                <h4 :style="displayPericiaResultado">{{dadoResultado}}</h4>
                <p :style="displayPericiaTipo">{{dadoSucesso}}</p>

            </div>

        </div>
</template>
<script>
export default {
    props:{
        atributos : Object,
        pericias : Object
    },
    data(){
        return{
            treino: 'DESTREINADA',
            AtributosLocal: [],
            int: 0,
            edu: 0,
            atributoAtual: 0,
            atributoValor: 0,
            PericiaNome : '',
            periciaN : '',
            periciaV : 0,
            dadoQtd: 2,
            dadoL: 6,
            dadoSum: 0,
            dadoList: [3, 4, 6, 8, 10, 12, 20, 100, 1000],
            dadoValor : 0,
            dadoResultado: 0,
            dadoSucesso :  '',
            indexA: 6,
            displayModel: 'display: none;',
            displayPericiaTipo: 'display: none; transition: display 0.5s;',
            displayPericiaResultado: 'display: none; background-color: #0a0b0c;',
        }
    }, methods:{
        menosQtd(){
            if(this.dadoQtd <= 1){
                alert('NÃO PODE SER MENOR QUE 1!!!')

            }else{
                this.dadoQtd = this.dadoQtd - 1
            }
        },
        maisQtd(){
            this.dadoQtd = this.dadoQtd + 1
        },
        menosSum(){
            if(this.indexA <= 0){
                alert('d3 É O MINIMO!!!')

            }else{
                this.indexA = this.indexA - 1
            }
        },
        maisSum(){
            if(this.indexA > 7){
                alert('d1000 É O MÁXIMO!!!')

            }else{
                this.indexA = this.indexA + 1
            }
        },
        abrirModalDado(periciaN, periciaV, index){
            this.periciaN = periciaN
            this.periciaV = periciaV
            this.dadoSucesso = periciaN
            this.displayModel = 'display:block'

        },
        fecharDadoModal(){
            this.displayModel = 'display: none;'
            this.displayPericiaTipo = 'display: none; transition: display 0.5s;'
            this.displayPericiaResultado = 'display: none; background-color: #0a0b0c;'
            this.historico = []
        },
        resultadoDado(){
            this.historico = []
            var maiorNum = 0
            for (var i = 1; i <= this.dadoQtd; i++){
                this.dadoValor = Math.floor(Math.random()*this.dadoList[this.indexA]) + 1;
                if(this.dadoValor > maiorNum){
                    maiorNum = this.dadoValor

                }
                this.historico.push(this.dadoValor)

            }
            console.log('atributo ',this.atributoAtual)
            this.dadoResultado = maiorNum
            console.log('final ',this.dadoResultado)
            this.dadoResultado = this.dadoResultado + this.dadoSum
            if(this.periciaV < 1){
                alert('PERICIA ESTÁ ZERADA!!!')
            }else{
                this.dadoSucesso = this.tabelad20()
            }
            console.log('sucesso: ', this.dadoSucesso)
            setTimeout(()=>{
                this.displayPericiaResultado = 'display: block;'
            }, 2000)
            setTimeout(()=>{
               if(this.dadoSucesso == 'Extremo'){
                   this.displayPericiaTipo = 'display: block; background-color: #580b7f;'
               }else if(this.dadoSucesso == 'Sucesso Bom'){
                   this.displayPericiaTipo = 'display: block; background-color: #091a96;'
               }else if(this.dadoSucesso == 'Sucesso Normal'){
                    this.displayPericiaTipo = 'display: block; background-color: #298437;'
               }else if(this.dadoSucesso == 'Fracasso'){
                   this.displayPericiaTipo = 'display: block; background-color: #781c1c;'
               }else if(this.dadoSucesso == 'Desastre'){
                   this.displayPericiaTipo = 'display: block; background-color: rgb(190, 32, 32);'
               }
            }, 3000)
            setTimeout(()=>{
                //this.displayModel = 'display: none;'
                this.displayPericiaTipo = 'background-color: #0a0b0c;'
                this.displayPericiaResultado = 'display: none;'
            }, 6000)
        },
        tabelad20 : function(){
            const tabela = [
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
                {normal: 1, bom: 11, extremo: 17},]
            const tipo = tabela[this.periciaV - 1]
            this.dadoResultado
            console.log('linha: ', tipo)
            if(this.periciaN != 20 && this.dadoResultado == 1){
                console.log('Desastre')
                return 'Desastre'}
            if(this.dadoResultado >= tipo.extremo){
                console.log('Extremo')
                return 'Extremo'}
            if(this.dadoResultado >= tipo.bom && this.dadoResultado < tipo.extremo){
                console.log('Sucesso Bom')
                return 'Sucesso Bom'
            }if(this.dadoResultado >= tipo.normal && this.dadoResultado < tipo.bom){
                console.log('Sucesso Normal')
                return 'Sucesso Normal'
            }if(this.dadoResultado < tipo.normal){
                console.log('Fracasso')
                return 'Fracasso'}
        },
        retornaAtributo(atributoN){
            this.atributos.forEach(element => {
                if(element.nome == atributoN){
                    this.atributoValor = element.valor
                    if(element.valor < 1){
                       this.dadoQtd = 1
                    }else{
                        this.dadoQtd = 1 + element.valor
                    }
                }
            });
        }
    }, mounted(){
        this.PericiasLocal = this.pericias
        this.TotalPericia = this.TotalPericia - this.valorLocal
        this.AtributosLocal = this.atributos
        this.edu = this.atributos[3].valor
        this.int = this.atributos[5].valor
        this.resultTreino = Math.round((this.int+this.edu)/4)
        this.treinoTotal = this.resultTreino
        this.treinoTemp = 4

    }, watch:{
        PericiasLocal(newValue){
            console.log(newValue)
        },
        atributos(newValue){
            console.log(this.atributos[3].valor)
        },
        valorTemp(newValue){
            this.valorLocal = newValue
            this.TotalPericia = this.TotalPericia + newValue
            console.log(newValue)
        },
        valorLocal(newValue){
            this.Menos = newValue
            this.totalP = this.TotalPericia  - newValue
            console.log(newValue)
        },

        treinarOp(newValue){
            console.log(newValue)
            if(newValue == 'nao'){
                this.treinoTotal = this.treinoTotal +1
                this.treinoAtual = 0
            }else if(newValue == 'sim'){
                this.treinoTotal = this.treinoTotal -1
                this.treinoAtual = 3
                if(this.treinoTotal < 0){
                    alert('VOÇÊ NÃO POSSUI MAIS PONTOS DE TREINO!!')
                    this.treinoTotal = 0
                    this.treinarOp = 'nao'
                }
            }else if(newValue == ''){

                console.log('COMO TU FEZ ESSA PROESA')
            }

        },atributoAtual(newValue){
            if(newValue == 'APARÊNCIA'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'CONSTITUIÇÃO'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'DESTREZA'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'EDUCAÇÃO'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'FORÇA'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'INTELIGÊNCIA'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'PODER'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'SORTE'){
                this.retornaAtributo(newValue)
            }else if(newValue == 'TAMANHO'){

            }else{

            }
        }
        //PericiasLocal(newValue){this.$emit('PericiasUpdate', newValue)},
     //   localCON(newValue){this.$emit('updateCON', newValue)},
     ////   localDES(newValue){this.$emit('updateDES', newValue)},
      //  localMOV(newValue){this.$emit('updateMov', newValue)}
    }
}
</script>
<style scoped>
.modal-dado{
    background-color: rgba(0 0 0 / 0.7);
    text-align:center;
    position:relative;
    padding: 0;
    border: 2px solid #898;
    margin: 0 auto;
    margin-top: 10%;
    width: 30%;
    height: 40%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

}
.caixa-treinamento{
    display: flex;
    height: 40px;
    background-color: rgba(7 7 7 / 0.6);
    border-bottom: #1b1b1b solid 1px;
}
.caixa-historico{
    background-color: rgba(39, 39, 39, 0.7);
    width: 90%;
    height: 40px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 15px;
    display: flex;
    overflow: hidden;
}
.caixa-historico ul{
    display: flex;
    height: 100%;
    text-align: center;
}
.caixa-historico ul li{

    display: flex;
    list-style: none;
    height: 100%;
    width: 20px;
    margin-left: 5px;
    background-color:#292929
}
.caixa-historico h6{
    margin: auto;
    font-size: 18px;

}
.modal-dado p{
    display: none;
    transition: background 0.5s ;
    font-size: 30px;
    border: 2px solid rgb(277 277 277 / 52%);
    margin: 10px auto;
}

.modal-dado h2{
    font-size: 20px;
    margin: 0 auto;
    margin-top: 10px;
    color: white;}
.modal-dado h4{
    font-size: 30px;
    margin: 0 auto;
    margin-top: 10px;
    color: white;}
.conteiner-periciaD{
    background-color: rgba(0 0 0 / 0.4);

    margin: 0 auto;
    margin-top: 20px;
    width: 380px;
    display: flex;

}
.conteiner-periciaD button{
    background-color: rgba(39, 39, 39, 0.5);
    border: 2px solid #1f1f1f;
    color:#fff;
    width: 40px;
    height: 40px;
    font-size: 18px;
}
.conteiner-periciaD button:hover{
    background-color: #404040;
    border:#1f1f1f;
    color:#fff;
    width: 40px;
    height: 40px;
    font-size: 18px;
}
.conteiner-periciaD h6, .conteiner-periciaD h5{
    width: 45px;
    height: 28px;
    margin: 0px;
    padding-top: 12px;
    font-size: 18px;
}
.conteiner-periciaD h5{
    color: bisque;
}
.conteiner-periciaD h6{
    color: #ffff;
}
.btnX{
    background-color: #1b1b1b;
    position:flex;
    float: right;
    border: 2px solid #1b1b1b;
}
.btnX:hover{
    background-color: #9a2525;
    color: #fff;
    border: 2px solid rgb(135, 60, 60)
}
.caixa-result{
    background-color: rgba(39, 39, 39, 0.6);
    width: 90%;
    height: 40px;
    border-radius: 10px;
    overflow:hidden;
    margin: 0 auto;
    margin-top: 15px;
}
.rolarD{
    background-color: #1b1b1b;
    border:1px solid #141414;
    position:flex;
    float:right;
    font-size: 18px;
    height: 40px;
}
.rolarD:hover{
    background-color: #404040;
    border:1px solid #1f1f1f;
    color:#fff;
}
.resultD{
    margin-left: 70px;;
    font-size: 20px;
    background-color: rgba(39, 39, 39, 0.5);
    border:1px solid #1d1d1d;
    height: 100%;
    float:left;
    color:bisque;
}
.treinamento{
    height: 100%;
    width: 162px;
    background-color: rgba(39, 39, 39, 0.4);
    position:flex;
    float: left;
}
.treinamento h4{
    margin: 10px;
}
.caixa-atributoV{
    display: flex;
    margin-top: 15px;
}
.caixa-atributoV h2{
    font-size: 25px;
    color: bisque
}
.select-atributos{
    background-color: rgba(39, 39, 39, 0.3);
    border:1px solid #141414;
    color:#fff;
    height: 40px;
    font-size: 18px
}
.select-atributos option{
    background-color: rgba(39, 39, 39, 0.3);
    color: #fff;
}
</style>