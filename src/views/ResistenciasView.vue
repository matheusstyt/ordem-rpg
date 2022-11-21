<template>
    <div class="caixa-central">
        <div id="div-caixa-resistencias">
            <h2>RESISTÊNCIAS A DANO</h2>
            <Resistencias :resistencias="resistencias" @resistenciasUpdate="resistenciasUpdate"/>
        </div>
        <input class="btnPrevious" @click="btnPrevious"  type="submit" value="PREVIOUS ">
        <input class="btnNext" @click="btnNext"  type="submit" value="NEXT">
    </div>

</template>
<script>
import Resistencias from '../components/Resistencias.vue'
export default {
    components:{
        Resistencias
    },
    props:{

    },
    data(){
        return{
            dataJ: [],
            resistencias : [{id:1, nome: 'FÍSICA', valor: 0},
                            {id:2, nome: 'BALÍSTICA', valor: 0},
                            {id:3, nome: 'INSANIDADE', valor: 0},
                            {id:4, nome: 'MEDO', valor: 0},
                            {id:5, nome: 'SANGUE', valor: 0},
                            {id:6, nome: 'MORTE', valor: 0},
                            {id:7, nome: 'ENERGIA', valor: 0},
                            {id:8, nome: 'CONHECIMENTO', valor: 0} ]
        }
    },
    methods:{
        btnNext(){
            this.dataJ['resistencias'] = this.resistencias
            var dataj = JSON.stringify(this.dataJ)
            this.$router.push({name:"createarmamento", params:{dataJ: dataj}})

        },
        btnPrevious(){
            this.dataJ['resistencias'] = this.resistencias
            var dataj = JSON.stringify(this.dataJ)
            this.$router.push({name:"createpericia", params:{dataJ: dataj}})
        }
    },
    created(){
        this.dataJ = JSON.parse(this.$route.params.dataJ)
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
.caixa-next{
    width: 60%;
    margin: 0 auto;
    margin-top: 10px;

}
.btnNext:hover, .btnPrevious:hover{
    color: black;
    background-color: aliceblue;
}
.btnPrevious{
    position: flex;
    float: left;
}
.btnNext{
    position: flex;
    float: right;
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
    width: 100%;
}
.caixa-central h2{
    text-align: center;
}
#div-caixa-resistencias{
    margin: 0 auto;
    max-width:60%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0  0  0  / 0.6);
    border: 1px solid rgba(255, 255, 255, 0.6);
}

</style>