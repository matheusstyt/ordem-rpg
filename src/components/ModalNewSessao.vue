<template>
    <div  id="modal-dado" class="modalP" :style="displaySessao">

        <div class="modal-dado" >
            <button class="btnX" @click="sair">x</button>
            <H2>INICIAR NOVA SESSÃO?</H2>
            <div>
                <h3 for="qtd">Quantidade de Jogadores</h3>
                <select name="qtd" id="qtd" v-model="qtdMaxima">
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                    <option value="6" >6</option>
                    <option value="7" >7</option>
                    <option value="8" >8</option>
                    <option value="9" >9</option>
                </select>
            </div>
                 

            <div>
                <h3 for="status">Definir status de inicio</h3>
                <select name="qtd" id="qtd" v-model="status">
                    <option value="aberto">aberto</option>
                    <option value="fechado">fechado</option>
                </select>
            </div>
                
           
            <button class="btn-criar" @click="criar">CRIAR</button>
        
        </div>
            
        </div>
</template>
<script>
export default {
    props:{
        displaySessao: String,
        id: Number
    },
    data(){
        return{
            displayModel: 'display: block;',
            qtdMaxima: 0,
            status: 'aberto',
            statusbool: 1
        }
    }, methods:{
        async postSessao(){
            console.log(this.getData())
            const dJson = JSON.stringify({
                dataInicio: this.getData(),
                
                tempoDecorrido: 1,
                qtdMaxima: Number(this.qtdMaxima),
                fk_idMestre: this.id,
                status: this.statusbool

            });
            const req = await fetch(`http://localhost:5000/newsessao`, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: dJson
            });
            console.log(dJson, this.status)
        },
        getData(){
            var date = new Date();
            var dia = String(date.getDate()).padStart(2, '0');
            var mes = String(date.getMonth() + 1).padStart(2, '0');
            var ano = date.getFullYear();
            var dataAtual = `${ano}-${mes}-${dia}`;
            return dataAtual
        },
        sair(){
            this.$emit('updateDisplayS', 'display:none;')
        },
        criar(){
            this.postSessao()
 
            this.$emit('updateDisplayS', 'display:none;')
        }
    }, mounted(){
  
    }, watch:{
        status(newValue){
            if(newValue == 'aberto'){
                this.statusbool = 1
                console.log(newValue)
            }else{
                console.log(newValue)
                this.statusbool = 0
            }
        }
    }
}

</script>
<style scoped>
.modal-dado{
    background-color: rgba(0 0 0 / 0.7);
    text-align:center;
    position:relative;
    padding: 0;
    border: 2px solid #898;
    margin: 0 auto;
    margin-top: 10%;
    width: 30%;
    height: 40%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.caixa-c{
    display: block;
}
.modal-dado p{
    display: none;
    transition: background 0.5s ;
    font-size: 30px;
    border: 2px solid rgb(277 277 277 / 52%);
    margin: 10px auto;
}

.modal-dado h2{
    font-size: 20px;
    margin: 0 auto;
    margin-top: 10px;
    color: white;}
.modal-dado h4{
    font-size: 30px;
    margin: 0 auto;
    margin-top: 10px;
    color: white;}

.conteiner-periciaD button{
    background-color: rgba(39, 39, 39, 0.5);
    border: 2px solid #1f1f1f;
    color:#fff;
    width: 40px;
    height: 40px;
    font-size: 18px;
}
.conteiner-periciaD button:hover{
    background-color: #404040;
    border:#1f1f1f;
    color:#fff;
    width: 40px;
    height: 40px;
    font-size: 18px;
}
.conteiner-periciaD h6, .conteiner-periciaD h5{
    width: 45px;
    height: 28px;
    margin: 0px;
    padding-top: 12px;
    font-size: 18px;
}
.conteiner-periciaD h5{
    color: bisque;
}
.conteiner-periciaD h6{
    color: #ffff;
}
.btnX{
    background-color: #1b1b1b;
    position:flex;
    float: right;
    border: 2px solid #1b1b1b;
}
.btnX:hover{
    background-color: #9a2525;
    color: #fff;
    border: 2px solid rgb(135, 60, 60)
}
h3{
    margin: 5px 0;
    color: bisque
}
select{
    margin: 0;
    background-color: rgba(39, 39, 39, 0.3);
    border:1px solid #141414;
    color:#fff;
    height: 25px;
    font-size: 15px;
    font-family: 'Consolas';
}
.select-atributos option{
    background-color: rgba(39, 39, 39, 0.3);
    color: #fff;
}
.btn-criar{
    background-color: rgba(255 255 255 / 0.2);
    position: relative;
    bottom: 0;
    margin-top: 20px;
    padding: 5px;
    width: 100px;
}
.btn-criar:hover{
    background-color: rgba(84, 243, 70, 0.6);
}
</style>