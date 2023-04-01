<template>
    <div class="caixa-central">
       <Detalhes :nome="nome" :jogador="jogador" :origem="origem" :classe="classe" :idade="idade" :sexo="sexo" :lnascimento="lnascimento" :lresidencia="lresidencia" :trilha="trilha" :NEX="NEX" :patente="patente"
        @nomeUpdate="nomeUpdate" @jogadorUpdate="jogadorUpdate" @origemUpdate="origemUpdate" @classeUpdate="classeUpdate" @idadeUpdate="idadeUpdate" @sexoUpdate="sexoUpdate" @lnascimentoUpdate="lnascimentoUpdate" @lresidenciaUpdate="lresidenciaUpdate" @trilhaUpdate="trilhaUpdate" @NEXUpdate="NEXUpdate" @patenteUpdate="patenteUpdate" />
        <input class="btnPrevious" @click="teste"  type="submit" value="PREVIOUS ">
        <input class="btnNext" @click="btnNext"  type="submit" value="NEXT">
       
    </div>


</template>
<script>
import Detalhes from '../components/Detalhes.vue'
export default {
    components:{
        Detalhes
    }
    ,
    data(){
        return{
            dataJ: {},
            nome : "",
            jogador : "",
            origem : 'Executivo',
            classe: "",
            NEX: 0,
            patente: "",
            trilha: "",
            idade : "",
            sexo : "",
            lnascimento : "",
            lresidencia : "",
            dataL: ''
        }
    },
    methods:{
        btnNext(){
             this.dataJ['nome'] = this.nome.toUpperCase();
             this.dataJ['jogador'] = this.jogador.toUpperCase();
             this.dataJ['origem'] = this.origem.toUpperCase();
             this.dataJ['classe'] = this.classe.toUpperCase();
             this.dataJ['trilha'] = this.trilha
             this.dataJ['NEX'] = this.NEX
             this.dataJ['patente'] = this.patente.toUpperCase();
             this.dataJ['idade'] = this.idade
             this.dataJ['sexo'] = this.sexo.toUpperCase();
             this.dataJ['lnascimento'] = this.lnascimento.toUpperCase();
             this.dataJ['lresidencia'] = this.lresidencia.toUpperCase();

            const dataj =  JSON.stringify(this.dataJ);
            console.log(dataj)
            this.$router.push({name:"createatributos", params:{dataJ: dataj}})

        },
        nomeUpdate(nome){this.nome = nome;},
        jogadorUpdate(jogador){this.jogador = jogador;},
        origemUpdate(origem){this.origem = origem;},
        classeUpdate(classe){this.classe = classe;},
        idadeUpdate(idade){this.idade = idade;},
        sexoUpdate(sexo){this.sexo = sexo;},
        lnascimentoUpdate(lnascimento){this.lnascimento = lnascimento;},
        lresidenciaUpdate(lresidencia){this.lresidencia = lresidencia;},
        trilhaUpdate(trilha){this.trilha = trilha;},
        patenteUpdate(patente){this.patente = patente;},
        NEXUpdate(NEX){this.NEX = NEX;}
    },created(){
        console.log('id sessao',this.$route.params.id)
        try {
            this.dataJ = JSON.parse(this.$route.params.dataJ)
            this.nome = this.dataJ.nome
            this.jogador = this.dataJ.jogador,
            this.origem = this.dataJ.origem,
            this.classe = this.dataJ.classe,
            this.trilha = this.dataJ.trilha,
            this.patente = this.dataJ.patente,
            this.NEX = this.dataJ.NEX,
            this.idade = this.dataJ.idade,
            this.sexo = this.dataJ.sexo,
            this.lnascimento = this.dataJ.lnascimento,
            this.lresidencia = this.dataJ.lresidencia
        }catch (error) {       
            
        }
    }, mounted(){
        this.dataJ['idSessao'] = Number(this.$route.params.idSe)
        
        console.log(this.dataJ)
    }

}
</script>
<style lang="scss">
h1, h2, h3, label{
    color: #ffff
}
.caixa-central{
background: rgba(0, 0, 0, 0.0);
position:fixed;
top: 10%;
bottom: 0;
left:0;
right:0;
background-size:contain;}
form{
    border: 1px solid rgba(255 255 255 / 0.5);
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);
    max-width: 50%;
    margin: 0 auto;
    text-align: center;}
form h2{
        text-shadow: 2px 2px black;
    text-align: center;}
form div{
    margin: 0 auto;}
#line03{
    display: flex;}
#input-padrao2 input{
    width: 100px;}

.input-padrao0{
    width: 70%;
    float: left;
    margin: 0;
    height: 30px;
    }
input, select, option {
    text-align: justify;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-transform: uppercase;
    padding: 3px 7px;
    background: rgba(7 7 7 / 0.5);
    height: 30px;
    color: #fff;
    font-family: 'Itim', sans-serif;}
input:hover{
    background: rgba(255 255 255 / 0.5);
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
    justify-content: space-between;
    label{
        margin: 0;
        padding: 0;
    }
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
</style>