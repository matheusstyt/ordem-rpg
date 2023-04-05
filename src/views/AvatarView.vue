<template>
    <div class="caixa-central">
        <div id="div-caixa-avatar">
            <Avatar :vida="vida" :sanidade="sanidade" :ocultismo="ocultismo" :esforco="esforco" :movimento="movimento" :reacao="reacao" :acao="acao" :classe="classe" @classe="classe"/>
        </div>
        <input class="btn previous" @click="btnPrevious"  type="submit" value="PREVIOUS ">
        <input class="btn next" @click="btnNext"  type="submit" value="NEXT">
    </div>


</template>
<script>
import Avatar from '../components/Avatar.vue'
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
        // this.dataJ = JSON.parse(this.$route.params.dataJ)
        // this.movimento = this.dataJ.movimento

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

input:focus {
    outline: none;}

.btn:hover{
    color: black;
    background-color: aliceblue;
}
.previous{
    position: absolute;
    bottom:5%;
    left: 40%;
}
.next{
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

    background: rgba(0, 0, 0, 0.5);
    background-size:contain;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}


</style>