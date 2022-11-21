<template>
    <div class="geral-resistencia">
        <div  id="modal-resistencia" class="modalP" :style="displayModalR">
            <div class="modal-resistencia" >
                <h2>MODIFICAR VALOR DE {{habilidadeTipo}}</h2>
                <hr>
                <form @submit="SalvarAResistenciaAtual($event)">
                    <input id="novoValor" type="number" :value="habilidadeValor">
                    <input type="submit" value="Salvar">
                </form>

            </div>

        </div>

            <div class="containerResistencias">
                <ul>
                    <li v-for="(resistencia, index) in resistencias" :key="index">
                        <div style="width: 100%; height: 100%; text-align:center;  ">
                            <h2>{{resistencia.nome}}</h2>
                            <p @click="carregarResistencia(resistencia.valor,resistencia.nome, index)">{{resistencia.valor}}</p>
                        </div>
                    </li>
                </ul>

            </div>

    </div>
</template>
<script>
export default {
    props:{
        resistencias : Array
    },
    data(){
        return{
            resistenciasLocal: [],
            indexLocal: 0,
            nomeLocal: '',
            valorLocal: 0,
            displayAtributoTipo: 'display: none; transition: display 0.5s;',
            displayAtributoResultado: 'display: none; background-color: #0a0b0c;',
            displayModalA: 'display: none;',
            displayModalR: 'display: none;',
            valorDado : 0,
            tipoDado :  '',
            habilidadeValor : '',
            habilidadeTipo : '',
            displayModalD: 'display: none;'

        }
    },methods:{
        carregarResistencia(resultado, tipo, index){
          this.abrirModalR()
          this.habilidadeTipo = tipo
          this.habilidadeValor = resultado
          this.indexLocal = index

      },
        SalvarAResistenciaAtual(e){
            this.fecharModalR();
            e.preventDefault();
            this.valorLocal = document.getElementById('novoValor').value
            this.resistenciasLocal[this.indexLocal].valor = this.valorLocal
        },
        abrirModalR(){
            this.displayModalR = 'display:block;'
        },
        fecharModalR(){
            this.displayModalR = 'display:none;'

        },

    },
    mounted(){
        this.resistenciasLocal = this.resistencias
    },
    watch:{
        resistenciasLocal(newValue){this.$emit('resistenciasUpdate', newValue)}
    }
}
</script>
<style scoped>
.geral-resistencia{
    widows: 100%;
}
.containerResistencias{
    overflow: hidden;
    background-color: rgba(0 0 0 / 0.7);
    border: 1px solid rgb(154  154  154 / 0.3);

    margin-right: 0px;
    padding-bottom: 10px;
    width: 100%;}
.containerResistencias ul{
    padding: 0;
    padding-left: 20px;
    list-style: none;
    width: 100%;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-left: 0px;}
.containerResistencias ul li{
    float:left;
    display: flex;
    border-radius: 24px;
    opacity: 1;
    flex-direction: column;
    text-align:center;
    width: 120px;}
.containerResistencias ul li h2{
    display: block;
    text-align: center;
    font-size: 20px;
    margin: 5px auto;
}
.containerResistencias ul li p{
    width: 70%;
    height: 30px;
    display: block;
    padding-top: 5px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    color: #fff;
    align-self: center;
    background-color: rgba(0  0  0 / 0.5);
    border-bottom: 2px solid rgb(196, 196, 196);
}
.containerResistencias ul li p:hover{
    color: black;
    background-color: #ffff;
    border-bottom: 2px solid rgb(196, 196, 196);
}

.modal-resistencia{
    background-color: rgba(0  0  0 / 0.7);
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 30%;
}
.modal-resistencia h2{
    font-size: 25px;
    display:block;
}

.modal-resistencia form {
    background-color: rgba(0 0 0 / 0.0);
}
.modal-resistencia form label{
    font-size: 30px;
    display:block;
}
.modal-resistencia form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgba(0  0  0 / 0.5);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 110px
}

.modal-resistencia form input[type="number"]:hover{
    color: black;
    background-color: #ffff;
}
.modal-resistencia form input[type="submit"]{
    font-size: 25px;
    background-color: rgba(0  0  0 / 0.7);
    color: #fff;
    display:block;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    width: 116px;
}
.modal-resistencia form input[type="submit"]:hover{
    font-size: 25px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}

</style>