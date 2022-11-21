<template>
    <div class="caixa-central">
        <div id="div-caixa-atributos">
            <h2 class="tituloA">ATRIBUTOS</h2>
            <Atributos :data="atributos" @atributosUpdate="atributosUpdate" :CON="CON" :DES="DES" :MOV="movimento" @updateCON="updateCON" @updateDES="updateDES" @updateMov="updateMov"/>
        </div>
        <input class="btnPrevious" @click="btnPrevious"  type="submit" value="PREVIOUS ">
        <input class="btnNext" @click="btnNext"  type="submit" value="NEXT">
        

    </div>

</template>
<script>
import Atributos from '../components/Atributos.vue'
export default {
    components:{
        Atributos
    },
    props:{

    },
    data(){
        return{
            dataJ: { nome: 'a',
                jogador: '',
                origem: '',
                classe: '',
                idade: '',
                sexo: '',
                lnascimento: '',
                lresidencia: ''},
            id: 0,
            CON :0,
            DES : 0,
            movimento : 0,
            atributos :[{id:1, nome: 'APARÊNCIA', valor: 0},
                        {id:2, nome: 'CONSTITUIÇÃO', valor: 0},
                        {id:3, nome: 'DESTREZA', valor: 0},
                        {id:4, nome: 'EDUCAÇÃO', valor: 0},
                        {id:5, nome: 'FORÇA', valor: 0},
                        {id:6, nome: 'INTELIGÊNCIA', valor: 0},
                        {id:7, nome: 'PODER', valor: 0},
                        {id:8, nome: 'SORTE', valor: 0},
                        {id:9, nome: 'TAMANHO', valor: 0}],

        }
    },
    methods:{
        updateMov(MOV){this.movimento = MOV},
        btnNext(){
           this.dataJ['atributos'] = this.atributos
           this.dataJ['movimento'] = this.movimento
           var dataj = JSON.stringify(this.dataJ)
           this.$router.push({name:"createavatar", params:{dataJ: dataj}})
        },
        btnPrevious(){
            this.dataJ['atributos'] = this.atributos
            this.dataJ['movimento'] = this.movimento
            var dataj = JSON.stringify(this.dataJ)
            this.$router.push({name:"createdetalhes", params:{dataJ: dataj}})
        }
    },
    created(){
        this.dataJ = JSON.parse(this.$route.params.dataJ)
        console.log(this.dataJ)
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
    background-color: rgba(7  7  7 / 0.5);
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
    width: 100%;
    height:auto
    }
#div-caixa-atributos{
    margin: 0 auto;
    max-width:60%;
    top: 10%;
    left:0;
    position:absolute;
    right:0;
    height:auto;
    background-color: rgba(7 7 7 / 0.8);
    border: 1px solid rgba(255  255  255 / 0.5);
    background-size:contain;
    }
.tituloA{
    margin: 0 auto;
    text-align: center;
    background-color: rgba(7  7  7 / 0.1);
    border-bottom: none;
    margin: 15px  0;
}
.containerAtributos, .containerPericia{
    overflow: hidden;
    border-top: none;
    padding-bottom: 10px;
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
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
    color: black;
    background-color: rgba(7  7  7 / 0.6);
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
</style>