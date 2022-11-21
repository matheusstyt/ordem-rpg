<template>
    <div>
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
        <div @click="fecharPericiasModal" id="modal-Pericia" class="modalP" :style="displayModalP">
            <div class="modal-Pericia" >
                <h2>ADICIONAR VALOR DE {{PericiaNome}}</h2>
                <hr>
                <h2>{{int}}+{{edu}}/4 :  {{resultTreino}}</h2>
                <h4>Obs: Você pode treinar {{treinoTotal}} pericias !</h4>
                <div class="caixa-treinar" :style="displayTreino">
                    <h5>TREINAR?</h5>
                    <div>
                        <div>
                            <input type="radio" id="SIM" name="treinar" value="sim" v-model="treinarOp">
                        <label for="SIM">SIM</label>
                        </div>
                        <div>
                            <input type="radio" id="NAO" name="treinar" value="nao" v-model="treinarOp">
                            <label for="NAO">NÃO</label>
                        </div>
                    </div>
                </div>
                <div class="conteiner-periciaD">
                    <button @click="menosQtd">-</button>
                    <h6>{{dadoQtd}}</h6>
                    <button @click="maisQtd">+</button>
                    <h5>d</h5>
                    <button @click="menosSum">{{left}}</button>
                    <h6>{{dadoL}}</h6>
                    <button @click="maisSum">{{right}}</button>
                    <h5>+</h5>
                    <h6>{{treinoAtual}}</h6>
                </div>
                <div class="caixa-resultD6">
                    <button @click="resultadoD6" class="rolarD6" >ROLAR DADO'S</button>
                    <h5>Histórico:</h5>
                    <button class="resultD6" v-for="(item, index) in historico" :key="index">{{item}}</button>
                </div>
                <form @submit="SalvarPericias($event)">
                    <input id="novoValor" disabled type="number" max="20" min="0" oninput="validity.valid||(value='');" v-model="valorLocal">
                    <input type="submit" value="Salvar">
                </form>

            </div>

        </div>
        <div @click="fecharPericiasModal" id="modal-PericiaAdd" class="modalP" :style="displayModalAddP">
            <div class="modal-PericiaAdd" >
                <div>
                    <form id="PericiaFormAdd" @submit="adicionarPericiaForm($event)">
                        <h2>NOVA PERICIA</h2>
                        <hr>
                        <label for="PericiaNomeAdd">Nome</label>
                        <input type="text" name="PericiaNomeAdd" v-model="PericiaN">
                        <label for="PericiaValorAdd">Valor</label>
                        <input type="number" name="PericiaValorAdd" v-model="PericiaV">
                        <input @click="adicionarPericia" type="submit"  value="Adicionar">
                    </form>
                </div>
                <h2>TABELA PERICIAS</h2>
                <hr>
                <form @submit="SalvarPericiaAtual($event)">
                    <table >
                        <tr>
                            <th>Pericia</th>
                            <th>Valor</th>
                        </tr>
                        <tr v-for="(Pericia, index) in PericiasLocal" :key="index">

                                <td>{{PericiasLocal[index].nome}}</td>
                                <td>{{PericiasLocal[index].valor}}</td>
                                <td> <button id="btnLixeira" @click="apagarPericia(Pericia.id, index)"><img id="imgLixeira" src="../img/lixeira1.png" alt=""></button></td>
                        </tr>
                    </table>
                    <label for="att02">{{PericiaNome}}</label>
                    <button id="btnOkay" @click="fecharModalAddA">Okay</button>
                </form>

            </div>

        </div>
            <h2 class="tituloP">PERICIAS</h2>
            <div class="pericia-menu">
                <button @click="abrirModalAddA">EDITAR</button>
                <p>TOTAL :  {{totalP}}</p>
            </div>
            <div class="containerPericia">
                <ul>
                    <li v-for="(Pericia, index) in PericiasLocal" :key="index">
                        <img id="imgPericia" src="/img/d20_4.png" @click="abrirModalDado(Pericia.nome, Pericia.valor, index)" alt="">
                        <div style="width: 100%; height: 100%; text-align:center;  ">
                            <h2>{{Pericia.nome}}</h2>

                            <p @click="CarregarPericia(Pericia.valor,Pericia.nome, index)">{{Pericia.valor}}</p>

                       </div>
                    </li>
                </ul>

            </div>

    </div>
</template>
<script>
export default {
    props:{
        dados : Object,
        pericias: Array,
        atributos : Array


    },
    data(){
        return{
            resultTreino : Number,
            treinarOp: 'nao',
            treinoTotal: 4,
            treinoTemp: 0,
            treinoAtual: 0,
            PericiaNome : '',
            TotalPericia: 120,
            totalP: 120,
            Menos: 0,
            indexLocal: 0,
            valorLocal: 0,
            valorTemp: 0,
            periciaN : '',
            periciaV : 0,
            left: '<',
            right: '>',
            dadoQtd: 2,
            dadoL: 6,
            dadoSum: 0,
            dadoList: [3, 4, 6, 8, 10, 12, 20, 100, 1000],
            indexA: 6,
            dadoValor : 0,
            dadoResultado: 0,
            dadoSucesso :  '',
            historico: [],
            treino: 'DESTREINADA',
            AtributosLocal: [],
            int: 0,
            edu: 0,
            atributoAtual: 0,
            atributoValor: 0,
            PericiasLocal: [{ id:1, treino: 'DESTREINADA', tipo: 'treinada', nome: 'ATLETISMO', valor: 0},
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
                            {id:23, treino: 'DESTREINADA', tipo: 'treinada', nome: 'VONTADE', valor: 0} ],
            displayPericiaTipo: 'display: none; transition: display 0.5s;',
            displayPericiaResultado: 'display: none; background-color: #0a0b0c;',
            displayModalD: 'display:none;',
            displayModalP: 'display:none;',
            displayModalAddP : 'display:none;',
            displayModel: 'display: none;',
            displayTreino: 'display:flex'

        }
    }, methods:{
        apagarPericia(id, index){
            if(id != 1){
                this.PericiasLocal.splice(index, 1)
            }else{
                alert("NÃO É POSSIVEL EXCLUIR ESSE Pericia!")
            }
        },
        adicionarPericiaForm(e){
            e.preventDefault();
        },
        adicionarPericia(){
            if(this.PericiaV <= 0 || this.PericiaV > 20){
                alert('PREENCHA OS CAMPOS CORRETAMENTE!!')
            }else if(this.PericiaN ==  ''){
                alert('PREENCHA OS CAMPOS CORRETAMENTE!!')
            }else{
                var id = (this.PericiasLocal[this.PericiasLocal.length - 1].id +1)
                this.PericiasLocal.push({id: id, nome: this.PericiaN.toUpperCase(), valor: this.PericiaV })
                this.PericiaN = ''
                this.PericiaV = ''
            }
        },
        SalvarPericias(e){

            console.log('opico',this.treinarOp)
            this.TotalPericia
            this.historico = []
            if(this.treinarOp == 'sim'){
                this.treinarOp = 'nao'
                this.treinoTotal = this.treinoTotal - 1
            }
            if(this.treinarOp == 'nao'){
                console.log('nao 1',this.treinoTotal)
              //  this.treinoTotal = this.treinoTotal + 1
                console.log('nao 2',this.treinoTotal)
            }

            this.treinoAtual = 0
            e.preventDefault();
            this.PericiasLocal[this.indexLocal].valor = Number(this.valorLocal)
            this.checarTotal()
            this.valorLocal = 0
            this.displayModalP = 'display:none;'
        },
        CarregarPericia(valor, tipo, index){
            if(this.treinoTotal == 0){
                this.displayTreino = 'display:none'
            }
            this.displayModalP = 'display:block;'
            this.dadoQtd = 2
            this.periciaV = valor
            this.indexLocal = index
            this.PericiaNome = tipo

            this.valorTemp = this.PericiasLocal[index].valor
            //this.totalP = this.totalP + this.valorLocal
            console.log('op1',this.treinarOp)
            console.log('op1',this.treinoTotal)
        },SalvarPericiaAtual(e){
            this.displayModalP = 'display:none;'
            e.preventDefault()
        },
        checarTotal(){
            if(this.TotalPericia <= 0){
                alert('VOÇE NÃO POSSUI PONTOS O SUFICIENTE!!')
            }else{
                this.TotalPericia = this.TotalPericia - this.Menos
            }
        },
        abrirModalAddA(){
            this.displayModalAddP = 'display:block;'
        },
        fecharModalAddA(){
            this.displayModalAddP = 'display:none;'
        },
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
        },
        resultadoD6(){
           // let radio = document.getElementsByName('SIM')
            this.historico = []
            this.dadoValor = 0
            var total = 0
            var resultado = 0
            for (var i = 1; i <= this.dadoQtd; i++){
                resultado  = Math.floor(Math.random()*this.dadoL + 1);
                this.historico.push(resultado)
                total = total + resultado
            }
            total = total + this.treinoAtual
            this.valorLocal = total
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
    }, created(){

    }
}
</script>
<style scoped>

#imgPericia{
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    opacity: 0.7;

}
#imgPericia:hover{
    opacity: 1;
    border: 1px solid rgb(201, 201, 201);
    background-color: #1b1b1b;

}
.modal-Pericia{
    background-color: rgba(0  0  0 / 0.7);
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 30%;
}
.modal-Pericia h2{
    font-size: 25px;
    display:block;
}
.modal-Pericia h4{
    font-family: 'Consolas';
    font-size: 20px
}
.modal-Pericia button{
    background-color: #1b1b1b;
    color:#fff;
    height: 40px;
    font-size: 18px;
}
.modal-Pericia button:hover{
    background-color: #404040;
    border:#1f1f1f;
    color:#fff;

}
.modal-Pericia button:active{
  background-color: #989898;
    border:#1f1f1f;
    color:rgb(27, 27, 27);
}
.modal-Pericia form label{
    font-size: 30px;
    display:block;
}
.modal-Pericia form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgba(0  0  0 / 0.5);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 110px;
    margin-top: 10px;
}

.modal-Pericia form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-Pericia form input[type="submit"]{
    font-size: 25px;
    color: #fff;
    display:block;
    text-align: center;
    background-color: rgba(7 7 7 / 0.5);
    margin: 0 auto;
    height: 50px;
    width: 116px;
}
.modal-Pericia form input[type="submit"]:hover{
    font-size: 25px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}

.modal-PericiaAdd{

    background-color: #0a0b0c;
    text-align:center;
    margin: 0 auto;
    margin-top: 30px;;
    padding: 20px;
    border: 2px solid #898;
    width: 70%;

}
.modal-PericiaAdd h2{
    font-size: 25px;
    display:block;
}
.modal-PericiaAdd form label{
    font-size: 20px;
    display:block;
}
#PericiaFormAdd{
    border: 1px solid #fff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.modal-PericiaAdd form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 200px;
    margin-bottom:10px;
}
.modal-PericiaAdd form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-PericiaAdd form input[type="text"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 200px
}
.modal-PericiaAdd form input[type="text"]:hover{
    color: black;
    background-color: #ffff;
}
#btnOkay, .modal-PericiaAdd form input[type="submit"]{
    font-size: 20px;
    background-color: #ffff;
    color: black;
    display:block;
    text-align: center;
    margin: 0 auto;
    height: 30px;
    width: 200px;
    border: 1px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
#btnOkay:hover, .modal-PericiaAdd form input[type="submit"]:hover{
    background-color: rgb(14, 14, 14);;
    color: #ffff;
    border: 1px solid #ffff;
}
table{
    margin-bottom: 10px;
}
.pericia-menu{
    display:flex;

}
.pericia-menu button{
    width: 70%;
    background-color: rgba(7  7  7 / 0.5);
    color: #ffff;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    border-right: none;
    height: 40px;
    text-decoration: bold;
    font-size: 18px;

}
.pericia-menu button:hover{
    background-color: rgba(255  255  255 / 0.5);
    color: rgb(14, 14, 14);
}
.pericia-menu p {
    width: 29%;
    text-align: center;
    font-size: 20px;
    margin: 10px auto;
}
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
.caixa-treinar{
    display: flex;
    width: 80%
}
.caixa-treinar h5{
    font-size: 18px;
    margin: 0 auto;
}
.caixa-treinar div{
    display: flex;
}
.caixa-treinar div input[type='radio'] {
  display: none;
}

.caixa-treinar div input[type='radio']:checked + label::before{
  color: #ffffff;
  content: "✓";
  font-size: 30px;
  font-weight: bold;
  line-height: 10px;
}
.caixa-treinar div input[type='radio']:checked ~ .group-radio-message {
  opacity: 1;
}

.caixa-treinar div label,  .caixa-treinar div label::before{
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
}

.caixa-treinar div label::before {
  border-radius: 5px;
  border: 1px solid #333;
  content: '';
  height: 20px;
  width: 20px;
}
.caixa-resultD6{
    background-color: #1d1d1d;
    width: 90%;
    height: 40px;
    border-radius: 10px;
    overflow:hidden;
    margin: 0 auto;
    margin-top: 15px;
    display: flex;
}
.caixa-resultD6 h5{
    font-family: 'Consolas';
    font-size: 18px;
    margin: 10px auto;
}
.rolarD6{
    background-color: rgba(7 7 7 / 0.5);
    border:1px solid #141414;
    position:flex;
    float:right;
    font-size: 18px;
    height: 40px;
    width: 50%;
}
.rolarD6:hover{
    background-color: #404040;
    border:1px solid #1f1f1f;
    color:#fff;
}
.resultD6{
    margin-left: 5px;
    font-size: 20px;
    background-color: rgba(7 7 7 / 0.9);
    border:1px solid #1d1d1d;
    height: 100%;
    float:left;
    color:bisque;
}
</style>