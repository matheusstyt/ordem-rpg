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
            <div class="atributos">

                <div @click="fecharAtributosModal" id="modal-pericia" class="modalP" :style="displayModalP">
                    <div class="modal-pericia" >
                        <h2>MODIFICAR VALOR DO ATRIBUTO</h2>
                        <hr>
                        <form @submit="SalvarAtributoAtual($event)">
                            <label for="att02">{{habilidadeTipo}}</label>
                            <input type="number" :value="habilidadeValor">
                            <input type="submit" value="Salvar">
                        </form>

                    </div>

                </div>
                <div @click="fecharAtributosModal" id="modal-periciaAdd" class="modalP" :style="displayModalAddP">
                    <div class="modal-periciaAdd" >
                        <div>
                            <form id="periciaFormAdd" @submit="addPericiaForm($event)" >
                                <h2>NOVA PERÍCIA</h2>
                                <hr>
                                <label for="periciaNomeAdd">Nome</label>
                                <input type="text" name="periciaNomeAdd" v-model="periciaN">
                                <label for="periciaValorAdd">Valor</label>
                                <input type="number" name="periciaValorAdd" v-model="periciaV">
                                <button @click="addPericia($event)" >Adicionar</button>
                                <input @click="addPericia" type="submit"  value="Adicionar">
                            </form>
                        </div>
                        <h2>TABELA PERICIA</h2>
                        <hr>
                        <form @submit="SalvarPericiaAtual($event)">
                            <table >
                                <tr>
                                    <th>Pericia</th>
                                    <th>Valor</th>
                                </tr>
                                <tr v-for="(pericia, index) in data" :key="pericia.id">

                                        <td>{{data[index].nome}}</td>
                                        <td>{{data[index].valor}}</td>
                                        <td> <button id="btnLixeira" @click="apagarPericia(pericia.id, pericia.nome, index)"><img id="imgLixeira" src="../img/lixeira1.png" alt=""></button></td>
                               </tr>

                            </table>
                            <label for="att02">{{habilidadeTipo}}</label>

                                <input @click="fecharModalAddP" type="submit"  value="Okay">
                        </form>

                    </div>

                </div>
                <h2>PERÍCIA</h2>

                <hr>
                <button @click="abrirModalAddP" id="btnEditar" >EDITAR</button>
                <div class="containerPericia">
                    <ul>
                        <li v-for="pericia in data" :key="pericia.id">
                            <img id="imgPericia" src="/img/d20_4.png" @click="modalDado(pericia.nome, pericia.valor)" alt="">
                            <div style="width: 100%; height: 100%; text-align:center;  ">
                                <h2>{{pericia.nome}}</h2>
                                <p @click="abrirModalPericia(pericia.valor,pericia.nome, pericia.id)">{{pericia.valor}}</p>
                            </div>
                        </li>
                    </ul>

                </div>


        </div>
    </div>

</template>
<script>
export default {
    props :{
        data : Object
    },
    data(){
        return{
            periciaN : '',
            periciaV : 0,
            displayModalD: 'display:none;',
            displayModalP: 'display:none;',
            displayModalAddP : 'display:none;',
            displayAtributoTipo: 'display: none; transition: display 0.5s;',
            displayAtributoResultado: 'display: none; background-color: #0a0b0c;',
            displayModalA: 'display: none;',
            valorDado : 0,
            tipoDado :  '',
            habilidadeValor : '',
            habilidadeTipo : '',
            periciaAtual : 0,
        }
    },methods:{
         abrirModalPericia(resultado, tipo, id){
          this.displayModalP = 'display:block;'
          this.habilidadeTipo = tipo
          this.habilidadeValor = resultado
          console.log('id',id)
         if(this.data[id - 1] && this.data[resultado]){
             console.log('result',this.data[resultado])
              const atributoA = this.data[resultado]
         }
          const atributoB = this.data[{resultado}]
          const atributoA = this.data[id - 1]
          console.log('teste',atributoB)
          console.log('tipo',tipo)

         },SalvarPericiaAtual(e){
          this.displayModalP = 'display:none;'
          console.log(this.habilidadeValor)
          e.preventDefault()
          },
             apagarAtributo(id, nome, index){
            console.log(id)
            console.log(index)
            console.log('nome: '+ nome)
            if(id != 1){
                this.data.splice(index, 1)
            }else{
                alert("NÃO É POSSIVEL EXCLUIR ESSA PERICIA!")
            }
        },
        addPericiaForm(e){

            e.preventDefault();
        },
        addPericia(e){
            e.preventDefault()
            if(this.periciaV <= 0 || this.periciaV > 20){
                alert('PREENCHA OS CAMPOS CORRETAMENTE!!')
            }else if(this.periciaN ==  ''){
                alert('PREENCHA OS CAMPOS CORRETAMENTE!!')
            }else{
                var id = (this.data[this.data.length - 1].id +1)
                this.data.push({id: id, nome: this.periciaN.toUpperCase(), valor: this.periciaV })
                console.log(id)
                console.log(this.periciaN)
                console.log(this.periciaV)
                this.periciaN = ''
                this.periciaV = ''
            }
        },
        apagarPericia(id, nome, index){
            console.log(id)
            console.log(index)
            console.log('nome: '+ nome)
            if(id != 1){
                this.data.splice(index, 1)
            }else{
                alert("NÃO É POSSIVEL EXCLUIR ESSE ATRIBUTO!")
            }

        },
        SalvarPericiaAtual(e){
            e.preventDefault();
        },
        abrirModalAddP(){
            this.displayModalAddP = 'display:block;'
        },
        fecharModalAddP(){
            this.displayModalAddP = 'display:none;'

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
           const linha = this.atributos
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
              {normal: 1, bom: 11, extremo: 17},

          ]
          console.log(habilidade)
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
    }
}
</script>
<style scoped>
    .modal-pericia{
    background-color: #0a0b0c;
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 50%;
}
.modal-atributo{
     background-color: #0a0b0c;
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 30%;
}
.modal-pericia h2{
    font-size: 25px;
    display:block;
}
.modal-pericia form label{
    font-size: 30px;
    display:block;
}
.modal-pericia form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 110px
}

.modal-pericia form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-pericia form input[type="submit"]{
    font-size: 25px;
    color: #fff;
    display:block;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    width: 116px;
}
.modal-pericia form input[type="submit"]:hover{
    font-size: 25px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}
.modal-periciaAdd{

    background-color: #0a0b0c;
    text-align:center;
    margin: 0 auto;
    margin-top: 30px;
    padding: 20px;
    border: 2px solid #898;
    width: 70%;
}
.modal-periciaAdd h2{
    font-size: 25px;
    display:block;
}
.modal-periciaAdd form label{
    font-size: 20px;
    display:block;
}
#periciaFormAdd{
    border: 1px solid #fff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.modal-periciaAdd form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 200px;
    margin-bottom:10px;
}
.modal-periciaAdd form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-periciaAdd form input[type="text"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 200px
}
.modal-periciaAdd form input[type="text"]:hover{
    color: black;
    background-color: #ffff;
}
table{
    margin-bottom: 10px;
}
#btnOkay, .modal-periciaAdd form input[type="submit"]{
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


</style>