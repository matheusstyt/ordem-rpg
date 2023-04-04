<template>
    <div>
        <div @click="fecharDadoModal" id="modal-dado" class="modalP" :style="displayModalD">
            <div class="modal-dado" >
                <h2>Rolagem de dado</h2>
                <hr>
                <h4 :style="displayAtributoResultado">{{valorDado}}</h4>
                <p :style="displayAtributoTipo">{{tipoDado}}</p>
            </div>

        </div>
        <div @click="fecharAtributosModal" id="modal-atributo" class="modalP" :style="displayModalA">
            <div class="modal-atributo" >
                <h2>MODIFICAR VALOR DE {{atributoNome}}</h2>
                <hr>
                <form @submit="SalvarAtributos($event)">
                    <input id="novoValor" type="number" min="0" oninput="validity.valid||(value='');" v-model="valorLocal">
                    <input type="submit" value="Salvar">
                </form>

            </div>

        </div>
        <!-- <div @click="fecharAtributosModal" id="modal-atributoAdd" class="modalP" :style="displayModalAddA">
            <div class="modal-atributoAdd" >
                <div>
                    <form id="atributoFormAdd" @submit="addATributoForm($event)">
                        <h2>NOVO ATRIBUTO</h2>
                        <hr>
                        <label for="atributoNomeAdd">Nome</label>
                        <input type="text" name="atributoNomeAdd" v-model="atributoN">
                        <label for="atributoValorAdd">Valor</label>
                        <input type="number" name="atributoValorAdd" v-model="atributoV">
                        <input @click="addAtributo" type="submit"  value="Adicionar">
                    </form>
                </div>
                <h2>TABELA ATRIBUTOS</h2>
                <hr>
                <form @submit="SalvarAtributoAtual($event)">
                    <table >
                        <tr>
                            <th>Atributo</th>
                            <th>Valor</th>
                        </tr>
                        <tr v-for="(atributo, index) in atributosLocal" :key="atributo.id">

                                <td>{{data[index].nome}}</td>
                                <td>{{data[index].valor}}</td>
                                <td> <button id="btnLixeira" @click="apagarAtributo(atributo.id, atributo.nome, index)"><img id="imgLixeira" src="../img/lixeira1.png" alt=""></button></td>
                        </tr>

                    </table>
                    <label for="att02">{{atributoNome}}</label>
                    <button id="btnOkay" @click="fecharModalAddA">Okay</button>
                </form>

            </div>

        </div> -->
        <div class="containerAtributos">
            <!-- <button id="btnEditar" @click="abrirModalAddA">EDITAR</button> -->

            <ul>
                <li v-for="(atributo, index) in atributosLocal" :key="index">
                    <img id="imgAtributo" src="/img/d20_3.png" @click="modalDado(atributo.nome, atributo.valor)" alt="">
                    <div style="width: 100%; height: 100%; text-align:center;  ">
                        <h2>{{atributo.nome}}</h2>
                        <p @click="CarregarAtributo(atributo.valor,atributo.nome, index)">{{atributo.valor}}</p>
                    </div>
                </li>
            </ul>

        </div>

    </div>
</template>
<script>
import Person from '../model/personagem'
export default {
    props:{
        data : Object,
        CON: Number,
        DES: Number,
        MOV: Number
    },
    data(){
        return{
            localCON: 0,
            localDES: 0,
            localMOV: 0,
            indexLocal: 0,
            valorLocal: 0,
            valorTemp: 0,
            atributosLocal: [],
            displayAtributoTipo: 'display: none; transition: display 0.5s;',
            displayAtributoResultado: 'display: none; background-color: #0a0b0c;',
            displayModalA: 'display: none;',
            displayModalAddA: 'display: none;',
            valorDado : 0,
            tipoDado :  '',
            atributoValor : 0,
            atributoNome : '',
            displayModalD: 'display: none;'

        }
    },methods:{
        apagarAtributo(id, index){
            if(id != 1){
                this.data.splice(index, 1)
            }else{
                alert("NÃO É POSSIVEL EXCLUIR ESSE ATRIBUTO!")
            }
        },
        addATributoForm(e){
            e.preventDefault();
        },
        addAtributo(){
            if(this.atributoV <= 0 || this.atributoV > 20){
                alert('PREENCHA OS CAMPOS CORRETAMENTE!!')
            }else if(this.atributoN ==  ''){
                alert('PREENCHA OS CAMPOS CORRETAMENTE!!')
            }else{
                var id = (this.data[this.data.length - 1].id +1)
                this.data.push({id: id, nome: this.atributoN.toUpperCase(), valor: this.atributoV })
                this.atributoN = ''
                this.atributoV = ''
            }
        },
        SalvarAtributos(e){
            e.preventDefault();
            this.atributosLocal[this.indexLocal].valor = Number(this.valorLocal)
            this.checarMov(this.indexLocal)
            this.valorLocal = 0
            console.log(this.data)
            this.displayModalA = 'display:none;'
        },
        abrirModalAddA(){
            this.displayModalAddA = 'display:block;'
        },
        fecharModalAddA(){
            this.displayModalAddA = 'display:none;'
        },
         modalDado(habilidade, resultado){
           var maximo = 20
           var total = 0
           var count = 1
           this.tipoDado = habilidade
           this.displayModalD = 'display:block'
           for (var i = 0; i < count; i++){
               total += Math.floor(Math.random()*maximo + 1)
           }
           const linha = this.data
           console.log('total: ',total, maximo)
           this.valorDado = total
           this.tipoDado = this.tabelad20(resultado)
           setTimeout(()=>{
               this.displayAtributoResultado = 'display: block;'
           }, 2000)
           setTimeout(()=>{
               if(this.tipoDado == 'Extremo'){
                   this.displayAtributoTipo = 'display: block; background-color: #580b7f;'
               }else if(this.tipoDado == 'Sucesso Bom'){
                   this.displayAtributoTipo = 'display: block; background-color: #091a96;'
               }else if(this.tipoDado == 'Sucesso Normal'){
                    this.displayAtributoTipo = 'display: block; background-color: #298437;'
               }else if(this.tipoDado == 'Fracasso'){
                   this.displayAtributoTipo = 'display: block; background-color: #781c1c;'
               }else if(this.tipoDado == 'Desastre'){
                   this.displayAtributoTipo = 'display: block; background-color: rgb(190, 32, 32);'
               }

           }, 3000)
           setTimeout(()=>{
               this.displayModalD = 'display: none;'
               this.displayAtributoTipo = 'background-color: #0a0b0c;'
               this.displayAtributoResultado = 'display: none;'
           }, 6000)

      },fecharDadoModal(){
          this.displayModalD = 'display: none;'
          this.displayAtributoTipo = 'display: none; transition: display 0.5s;'
          this.displayAtributoResultado = 'display: none; background-color: #0a0b0c;'
      },
      CarregarAtributo(valor, tipo, index){
          this.displayModalA = 'display:block;'
          this.atributoNome = tipo
          this.atributoValor = valor
          this.indexLocal = index
          this.valorTemp = this.atributosLocal[index].valor
          document.getElementById('novoValor').value = this.valorLocal
      },SalvarAtributoAtual(e){
          this.displayModalA = 'display:none;'
          e.preventDefault()
      },
      checarMov(index){
        if(index == 1){
            this.localCON = this.atributosLocal[index].valor
            console.log (this.atributosLocal[index].valor)
        }
        if(index == 2){
            this.localDES = this.atributosLocal[index].valor
            console.log (this.atributosLocal[index].valor)
        }
        this.localMOV = this.localCON + this.localDES / 2
        console.log (this.localMOV)
      },
      tabelad20 : function(habilidade){
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
          const tipo = tabela[habilidade - 1]
          if(habilidade != 20 && this.valorDado == 1){
              console.log('Desastre')
              return 'Desastre'
          }
          if(this.valorDado >= tipo.extremo){
              console.log('Extremo')
              return 'Extremo'
          }if(this.valorDado >= tipo.bom && this.valorDado < tipo.extremo){
              console.log('Sucesso Bom')
              return 'Sucesso Bom'
          }if(this.valorDado >= tipo.normal && this.valorDado < tipo.bom){
              console.log('Sucesso Normal')
              return 'Sucesso Normal'
          }if(this.valorDado < tipo.normal){
              console.log('Fracasso')
              return 'Fracasso'
          }
        }
    }, mounted(){
        this.atributosLocal = this.data
        this.localCON = this.CON
        this.localDES = this.DES
        this.localMOV = this.MOV
    },watch:{
        valorTemp(newValue){
            this.valorLocal = newValue
            this.TotalPericia = this.TotalPericia + newValue
        },
        valorLocal(newValue){
            this.Menos = newValue
            this.totalP = this.TotalPericia  - newValue
        },
        atributosLocal(newValue){this.$emit('atributosUpdate', newValue)},
        localCON(newValue){this.$emit('updateCON', newValue)},
        localDES(newValue){this.$emit('updateDES', newValue)},
        localMOV(newValue){this.$emit('updateMov', newValue)}
    }
}
</script>
<style >

#imgAtributo{
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    opacity: 0.7;

}
.modal-atributo{
    background-color: rgba(0  0  0 / 0.7);
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
    background-color: rgba(0  0  0 / 0.5);
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
.modal-atributoAdd{

    background-color: #0a0b0c;
    text-align:center;
    margin: 0 auto;
    margin-top: 30px;;
    padding: 20px;
    border: 2px solid #898;
    width: 70%;

}
.modal-atributoAdd h2{
    font-size: 25px;
    display:block;
}
.modal-atributoAdd form label{
    font-size: 20px;
    display:block;
}
#atributoFormAdd{
    border: 1px solid #fff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.modal-atributoAdd form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 200px;
    margin-bottom:10px;
}
.modal-atributoAdd form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-atributoAdd form input[type="text"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 200px
}
.modal-atributoAdd form input[type="text"]:hover{
    color: black;
    background-color: #ffff;
}
#btnOkay, .modal-atributoAdd form input[type="submit"]{
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
#btnOkay:hover, .modal-atributoAdd form input[type="submit"]:hover{
    background-color: rgb(14, 14, 14);;
    color: #ffff;
    border: 1px solid #ffff;
}
table{
    margin-bottom: 10px;
}
</style>