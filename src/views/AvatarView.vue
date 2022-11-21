<template>
    <div class="caixa-central">
        <div id="div-caixa-avatar">
            <Avatar :vida="vida" :sanidade="sanidade" :ocultismo="ocultismo" :esforco="esforco" :movimento="movimento" :reacao="reacao" :acao="acao" :classe="classe" @classe="classe"/>
        </div>
        <input class="btnPrevious" @click="btnPrevious"  type="submit" value="PREVIOUS ">
        <input class="btnNext" @click="btnNext"  type="submit" value="NEXT">
    </div>


</template>
<script>
import Avatar from '../components/Personagem.vue'
export default {
    components:{
        Avatar
    },
    props:{
        
    },
    data(){
        return{
            dataJ: [],
            id: 0,
            acao : 1,
            reacao : 1,
            CON : 0,
            DES : 0,
            movimento : 0,
            classe: 'Combatente',
            atributos: [],
            peso :      {id: 0, atual: 0, maximo: 1},
            vida :      {id: 0, atual: 0, maximo: 1},
            sanidade :  {id: 0, atual: 0, maximo: 1},
            ocultismo :  {id: 0, atual: 0, maximo: 1},
            esforco :  {id: 0, atual: 0, maximo: 1},
            esforcoA : 5,
            esforcoM : 9,
        }
    },
    methods:{
        classeUpdate(classe){this.classe = classe},
        btnNext(){
            this.dataJ['vida'] = this.vida
            this.dataJ['sanidade'] = this.sanidade
            this.dataJ['ocultismo'] = this.ocultismo
            this.dataJ['esforco'] = this.esforco
            var dataj = JSON.stringify(this.dataJ)
            this.$router.push({name:"createpericia", params:{dataJ: dataj}})
        },
        btnPrevious(){
            this.dataJ['vida'] = this.vida
            this.dataJ['sanidade'] = this.sanidade
            this.dataJ['ocultismo'] = this.ocultismo
            this.dataJ['esforco'] = this.esforco
            var dataj = JSON.stringify(this.dataJ)
            console.log(this.dataJ)
            this.$router.push({name:"createatributos", params:{dataJ: dataj}})
        }
    },created(){
        this.dataJ = JSON.parse(this.$route.params.dataJ)
        this.movimento = this.dataJ.movimento

    },
    mounted(){
        // if(this.dataJ.atributos[4].valor && this.dataJ.atributos[8].valor){
        //     let hp = (this.dataJ.atributos[4].valor + this.dataJ.atributos[8].valor) / 2
        // this.vida.maximo = Math.round(hp)
        // this.vida.atual = Math.round(hp)
        // console.log(hp)
        // }
        
    }
}
</script>
<style>
h1, h2, h3, label{
    color: #ffff
}
form{
    background-color: rgb(0  0  0 / 0.0);
    width: 60%;
    margin: 0 auto;
    text-align: center;
}
form h2{
    text-align: center;
}
form div{
    margin: 0 auto;
}
#line03{
    display: flex;}
#input-padrao2 input{
    width: 100px;}

.input-padrao0{
    width: 50%;
    float: left;
    margin: 0;
    height: 30px;}
input {
    text-align: center;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 3px 4px;
    background: rgba(7 7 7 / 0.5);
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
.caixa-central{
    width:100%;
}
#div-caixa-avatar{
    margin: 0 auto;
    max-width:60%;
    top: 10%;
    left:0%;
    right:0;
    padding: 0 20px;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    background-size:contain;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.conteinerModal{
    background-color: rgba(0  0  0 / 0.7);
    text-align:center;
    margin: 0 auto;
    height: 300px;
    position: fixed;
    top: 20px;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px solid #898;
    width: 50%;}
.conteinerModal h2{
    font-size: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6
);
    margin: 0 auto;}
.conteinerModal label{
    font-size: 25px;}
.conteinerModal input{
    font-size: 25px;
    text-align: center;
    width:93%;}
.conteinerModal p{
    height: 50px;
    color: #fff;
    font-size: 35px;
    margin: 0 auto;
    display: block;}

</style>