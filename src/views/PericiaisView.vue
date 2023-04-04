<template>
    <div class="caixa-central">
        <div id="div-caixa-pericias">
            <select v-model="option" size="1" class="select-class" >
                <option value="Padrao" selected>Padrao</option>
                <option value="Distribuicao">Distribuição</option>
            </select>
            <div :style="displayP1">
                <Pericia1 :atributos="atributos" :pericias="pericias"/>

            </div>
            <div :style="displayP2">
                <Pericia2 :pericias="pericias"/>
            </div>

        </div>
        <input class="btnPrevious" @click="btnPrevious"  type="submit" value="PREVIOUS ">
        <input class="btnNext" @click="btnNext"  type="submit" value="NEXT">
    </div>

</template>
<script>
import Pericia1 from '../components/Pericia-tipo-1.vue'
import Pericia2 from '../components/Pericia.vue'

export default {
    components:{
        Pericia1, Pericia2
    },
    props:{

    },
    data(){
        return{
            dataJ: [],
            CON :0,
            DES : 0,
            movimento : 0,
            atributos: [],
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
                        {id:23, treino: 'DESTREINADA', tipo: 'treinada', nome: 'VONTADE', valor: 0} ],
        displayP1: 'display:block',
        displayP2: 'display:none',
        option: 'Padrao'
        }

    },
    methods:{
        btnNext(){
            console.log(this.pericias)
            // this.dataJ['pericias'] = this.pericias
            // var dataj = JSON.stringify(this.dataJ)
            // this.$router.push({name:"createresistencias", params:{dataJ: dataj}})
        },
        btnPrevious(){
            // this.dataJ['pericias'] = this.pericias
            // var dataj = JSON.stringify(this.dataJ)
            // this.$router.push({name:"createavatar", params:{dataJ: dataj}})
        }
    },
    created(){
       // this.dataJ = JSON.parse(this.$route.params.dataJ)
      //  this.atributos = this.dataJ.atributos
    },
    watch:{
        option(newValue){
            if(newValue == 'Padrao'){
                this.displayP1 = 'display:block'
                this.displayP2 = 'display:none'
            }else if(newValue == 'Distribuicao'){
                this.displayP1 = 'display:none'
                this.displayP2 = 'display:block'
            }
        },
        pericias(newValue){
            console.log(newValue)
        }
    }
}
</script>
<style>
h1, h2, h3, label{
    color: #ffff
}
input {
    text-align: center;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 3px 4px;
    background-color: #0a0b0c;
    color: #fff;
    font-family: 'Itim', sans-serif;}
input[type="number"]:hover{
background-color: rgba(255, 255, 255, 1);
color: black;
}
input[type="submit"]{
    height: 30px;
    font-size: 20px;
}
input:focus {
    outline: none;}

.caixa-input{
    display: flex;
}
.caixa-input label{
    margin: 0 20px;
}
.caixa-input div{
    width: 70%;
    margin: 0;
    margin-bottom: 10px;
}
.btnNext:hover, .btnPrevious:hover{
    color: black;
    background-color: aliceblue;
}
.btnPrevious{
    position: absolute;
    bottom:5%;
    left: 40%;
}
.btnNext{
    position: absolute;
    bottom:5%;
    right:40%;
}
.formModal{
    height: 400px;
}
.formModal input{
    height: 30px;
    font-size: 25px;
}
.formModal{
    height: 400px;
}
.caixa-central{
    width:100%;
}
#div-caixa-pericias{
    margin: 0 auto;
    margin-bottom: 10px;
    max-width:80%;
    background-repeat: no-repeat;
    background-color: rgba(7 7 7 / 0.8);
    border: 1px solid #fff;
    background-size:contain;
}
.tituloP{
    margin: 0 auto;
    text-align: center;
    background-color: rgba(7  7  7 / 0.1);
    text-shadow: 3px 3px black;
    border-bottom: none;
    margin: 15px  0;
}

.containerAtributos, .containerPericia{
    overflow: hidden;
    border-top: none;
    padding-bottom: 10px;
    width: 100%;}
.containerAtributos ul, .containerPericia ul{
    padding: 0;
    padding-left: 20px;
    list-style: none;
    width: 100%;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-left: 0px;}
.containerAtributos ul li, .containerPericia ul li{
    float:left;
    display: flex;
    border-radius: 24px;
    opacity: 1;
    flex-direction: column;
    text-align:center;
    width: 120px;}
.containerAtributos ul li img, .containerPericia ul li img{
    display:block;
    margin-left: auto;
    margin-right: auto;
    height: 50px;}
.containerAtributos li label, .containerPericiaul li label{
    display: block;
    text-align: center;
    font-size: 20px;}
.containerAtributos ul li input, .containerPericia ul li input{
    width: 50%;
    text-align: center;
    font-size: 18px;
    align-self: center;
}
.containerAtributos ul li h2, .containerPericia ul li h2{
    display: block;
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin: 5px auto;
    background-color: rgba(7  7  7 / 0.2);
    backdrop-filter: blur( 10px );
    -webkit-backdrop-filter: blur( 10px );
}
.containerAtributos ul li p, .containerPericia ul li p{
    width: 70%;
    height: 30px;
    display: block;
    padding-top: 5px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    color: #fff;
    align-self: center;
    background-color: rgba(7  7  7 / 0.6);
    border-bottom: 2px solid rgb(196, 196, 196);
}
.containerAtributos ul li p:hover, .containerPericia ul li p:hover{
    color: rgb(0, 0, 0);
    background-color: rgba(255  255  255 / 0.6);
    border-bottom: 2px solid rgb(196, 196, 196);
}
#btnEditar{
    width: 100%;
    text-align: left;
    background-color: rgba(7  7  7 / 0.5);
    color: #ffff;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    height: 30px;
    text-decoration: bold;
    font-size: 15px;

}
#btnEditar:hover{
    background-color: rgba(255  255  255 / 0.5);
    color: rgb(14, 14, 14);
}
.modal-atributo form input[type="submit"]:hover{
    font-size: 25px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}
#btnLixeira{
    background-color: rgb(14, 14, 14);

    border: 1px solid #ffff;
    overflow: hidden;
}
#btnLixeira:hover{
    border: 1px solid rgb(14, 14, 14);
    background-color: rgb(33, 33, 33);
}
#imgLixeira{
    background-color: rgb(14, 14, 14);
    width: 20px;
    height: 20px;
}
th{
    font-size: 20px;
    border: 1px solid #fff;
    width: 200px;
    color: #fff;

}
tr:hover{
    color:black;
    background-color: #fff;
}
td{
    color: #fff;
    font-size: 18px;
}
td:hover{
    color: black;

}
select{
    background-color: rgba(7  7  7 / 0.5);
    height: 30px;
    font-size: 20px;
    font-family: 'Consolas';
    color: #fff
}
</style>