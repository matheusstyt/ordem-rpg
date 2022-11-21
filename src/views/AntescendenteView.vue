<template>
<div class="container-g">
    <div class="container-c">
        <ul>
            <li v-for="(item, index) in antescendentes" :key="index">
            <div class="caixa-A">
                <h3>{{item.nome}}</h3>
                <textarea v-model="item.descricao" spellcheck="false" rows="4" cols="50"></textarea>
            </div>
            </li>
        </ul>
    </div>
    <button id="previuos" @click="btnPrevious">Previous</button>
    <button id="save" @click="Salvar">Salvar</button>

</div>

</template>
<script>
export default {
    data(){
        return{
            dataJ: [],
            antescendentes:[{nome: "DESCRIÇÃO PESSOAL", descricao: ''},
                            {nome: "IDEOLOGIA / CRENÇAS", descricao: ''},
                            {nome: "PESSOAS SIGNIFICATIVAS", descricao: ''},
                            {nome: "LOCAIS IMPORTANTES", descricao: ''},
                            {nome: "PERTENCES QUERIDOS", descricao: ''},
                            {nome: "CARACTERÍSTICAS", descricao: ''},
                            {nome: "FERIMENTOS E CICATRIZES", descricao: ''},
                            {nome: "FOBIAS E MANIAS", descricao: ''}
            ],
            jogador: []
        }
    },
    methods:{
        async setJogador(){
            const dataj =  JSON.stringify(this.dataJ);
            const dataJson = JSON.stringify(
            {
                idsessao: this.dataJ.idSessao,
                nome: this.dataJ.nome,
                jogador: this.dataJ.jogador,
                origem: this.dataJ.origem,
                idade: this.dataJ.idade,
                classe: this.dataJ.classe,
                sexo: this.dataJ.sexo,
                NEX: this.dataJ.NEX,
                trilha: this.dataJ.trilha,
                patente: this.dataJ.patente,
                lnascimento: this.dataJ.lnascimento,
                lresidencia: this.dataJ.lresidencia,
                movimento: this.dataJ.movimento,
                acao: 1,
                reacao: 1,
                peso: this.dataJ.peso,
                vida: this.dataJ.vida,
                sanidade: this.dataJ.sanidade,
                ocultismo: this.dataJ.ocultismo,
                esforco: this.dataJ.esforco,
                atributos: this.dataJ.atributos,
                resistencias: Array.from(this.dataJ.resistencias),
                pericias: this.dataJ.pericias,
                armamentos: this.dataJ.armamentos,
                antescendentes: this.dataJ.antescendentes
            });
            // const req = await fetch("http://localhost:3000/jogador/", {
            //    method: "POST",
            //    headers: { "Content-Type": "application/json"},
            //    body: dataJson
            // });
            const req = await fetch("http://localhost:5000/setperson/", {
               method: "POST",
               headers: { "Content-Type": "application/json"},
               body: dataJson
            });

        },
        Salvar(){
            this.dataJ['antescendentes'] = this.antescendentes
            console.log('total', this.dataJ)
            this.setJogador()
            this.$router.push({name:"mestre"})

        },
        btnPrevious(){
            this.dataJ['antescendentes'] = this.antescendentes
            var dataj = JSON.stringify(this.dataJ)
            this.$router.push({name:"createarmamento", params:{dataJ: dataj}})
        }
    },
    mounted(){
       // this.getArmamentoS();
    },created(){
        this.dataJ = JSON.parse(this.$route.params.dataJ)
    }

}
</script>
<style scoped>

.container-g{
    display: grid;
    grid-template-areas: 'a a a b b b';
    width: 100%;
    gap: 1px;
    margin: 0 auto;
    background-color:rgba(0  0  0 / 0);
}
.container-c{
    overflow: hidden;
    border-top: none;
    padding-bottom: 10px;

    width: 100%;}
.container-c ul{
    padding: 0;
    padding-left: 20px;
    list-style: none;
    width: 100%;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-left: 0px;}
.container-c ul li{
    float:left;
    display: flex;
    border-radius: 24px;
    margin:5px;
    opacity: 1;
    flex-direction: column;
    text-align:center;
    width: 49%;}
.caixa-A{
    min-height: 200px;
    width: 100%;
    background-color: rgba(20  20  20 / 0.5);

}
.caixa-A h3{
    border-bottom: 1px solid #fff;
    background-color: rgba(0  0  0 / 0.7);
    margin-top: 0;;
}
textarea {
    width: 95%;
    min-height: 50%;
    background-color: rgba(20  20  20 / 0.5);
    border: 1px solid rgba(96, 96, 96, 0.5);
    padding:10px;
    color: #fff;
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
.btnPrevious, .btnNext {
    text-align: center;
    border: none;
    border-bottom: 2px solid #a2a2a2;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 3px 4px;
    background: rgba(7 7 7 / 0.5);
    color: #fff;
    font-family: 'Itim', sans-serif;}
.btnPrevious:hover, .btnNext:hover{
    background: rgba(255 255 255 / 0.5);
    color: black;
}
button{
    width: 100px;
    height:30px;
    background-color: rgba(20  20  20 / 0.5);
    color: #fff;
    position: fixed;
    margin: 0 auto;
    bottom:10px;

    font-family: 'Consolas';
    font-size: 15px;
}
button:hover{
    color:black;
    background-color: rgba(255  255  255 / 0.7);
}
#previuos{
    left: 0;
    right:150px;
}
#save{
    left: 150px;
    right:0;
}

</style>