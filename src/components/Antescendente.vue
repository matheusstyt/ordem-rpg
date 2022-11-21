<template>
    <div class="modalP" :style="display">
        <div  id="container-g" >
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
        <button id="save" @click="Salvar">Salvar</button>
        <button class="btnX" @click="Sair">x</button>
        </div>
    </div>
</template>
<script >
export default {
    props:{
        antescendentes : Array, display : String
    },
    data(){
        return{
            antescendentesL: Array,
            displayModel: 'display: none;'
        }
    }, methods:{
        Sair(){
            this.$emit('updateDisplayA', 'display:none;')
        },
        Salvar(){
            this.antescendentesL = this.antescedentes
            console.log('saber',this.antescendentesL)
            //this.$emit('antescedentesU', this.antescendentes)
            this.$emit('updateDisplayA', 'display:none;')
        }

    },mounted(){
        this.displayModel = this.display
        //this.antescendentesL = this.antescedentes

    },
    created(){
       // this.antescendentesL = this.antescendentes

    }
}
</script>
<style scoped>
.container-g{
    background-color: rgba(0 0 0 / 1);
    text-align:center;
    position:relative;
    padding: 0 0 10px 0;
    border: 2px solid #898;
    margin: 0 auto;
    margin-top: 10%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

}
.container-g{
    display: grid;
    grid-template-areas: 'a a a b b b';
    width: 100%;
    gap: 1px;
    margin: 0 auto;
    background-color:rgba(0  0  0 / 1);
}
.container-c{
    overflow: hidden;
    border-top: none;
    padding-bottom: 10px;
    background-color:rgba(0  0  0 / 0.9);
    width: 100%;}
.container-c ul{
    padding: 20px;
    margin: 0 auto;
    list-style: none;
    width: 95%;
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

#save{
    left: 0;
    right:0;
}
#save:active{
    background-color: rgba(65, 214, 128, 0.604);
}

.btnX{
    background-color: #1b1b1b;
    position:absolute;
    color: #fff;
    border: 2px solid #1b1b1b;
    left:0;
    right:0;
    top:0;
    bottom:0;
}
.btnX:hover{
    background-color: #9a2525;
    color: #fff;
    border: 2px solid rgb(135, 60, 60)
}
</style>