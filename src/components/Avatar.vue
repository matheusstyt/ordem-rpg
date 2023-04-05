<template>
  
<div class="geral-avatar">
      <div class="modal_container" v-if="show_modal_teste == true">
        <div class="modal-modificar" >
            <h2>TESTE DE SANIDADE</h2>
            <h3>Rolagem de dado</h3>
            <!-- <h4 :style="displayTesteResultado">{{valorTeste}}</h4>
            <p :style="displayTesteTipo">{{tipoTeste}}</p> -->

            <h4 v-if="result_number_sanidade" :style="{ backgroundColor : `color_teste_sanidade` }">{{result_number_sanidade}}</h4>
            <p v-if="result_string_sanidade">{{result_string_sanidade}}</p>
        </div>
    </div>
    <div class="modal_container" v-if="show_modal_vida == true">
            <div class="modal-modificar"  >
                <h2>MODIFICAR DE VIDA</h2>
                <form @submit="salvar_vida($event)" class="formModal" id="changeLife" >
                    <div class="field-input">
                        <label for="">Atual</label>
                        <input type="number" id="vidaAtual" name="atual" min="0" v-model="vida.atual">
                    </div>
                    <div class="field-input">
                        <label for="">Máximo</label>
                        <input type="number" id="vidaMaxima" name="maxima" min="0" v-model="vida.maximo">
                    </div>
                    <input type="submit" value="Salvar">

                </form>
            </div>

    </div>
    <div class="modal_container" v-if="show_modal_sanidade == true">
        <div class="modal-modificar" >
            <h2>MODIFICAR SANIDADE</h2>
            <form @submit="salvar_sanidade($event)" class="formModal" action="">
                <div class="field-input">
                    <label for="">Atual</label>
                    <input type="number" id="vidaAutal" name="atual" v-model="sanidade_l.atual">
                </div>
                <div class="field-input">
                    <label for="">Máximo</label>
                    <input type="number" id="vidaMaxima" name="maxima" v-model="sanidade_l.maximo">
                </div>
                <input type="submit" value="Salvar">

            </form>
        </div>

    </div>
    <div class="modal_container" v-if="show_modal_ocultismo == true">
        <div class="modal-modificar" >
            <h2>MODIFICAR OCULTISMO</h2>
            <form @submit="salvar_ocultismo($event)" class="formModal" >
                <div class="field-input">
                    <label for="">Atual</label>
                    <input type="number" id="ocultismoAtual" name="atual" min="0" v-model="ocultismo_l.atual">
                </div>
                <div class="field-input">
                    <label for="">Máximo</label>
                    <input type="number" id="ocultismoMaxima" name="maxima" min="0" v-model="ocultismo_l.maximo">
                </div>
                <input type="submit" value="Salvar">

            </form>
        </div>

    </div>
    <div class="modal_container"  v-if="show_modal_esforco == true">
        <div class="modal-modificar" >
            <h2>MODIFICAR PONTOS DE ESFORÇO</h2>
            <form @submit="salvar_esforco($event)" class="formModal" >
                <div class="field-input">
                    <label for="">Atual</label>
                    <input type="number" id="esforcoAtual" name="atual" min="0" v-model="esforco_l.atual">
                </div>
                <div class="field-input">
                    <label for="">Máximo</label>
                    <input type="number" id="esforcoMaxima" name="maxima" min="0" v-model="esforco_l.maximo">
                </div>
                <input type="submit" value="Salvar">
            </form>
        </div>

    </div>
    <div class="container-avatar" >
        <table v-if="!isBuild">
            <tr> <th>Ação / Reação</th> </tr>
            <tr> <td>{{acao}}/{{reacao}}</td> </tr>
            <tr> <th>Movimento</th> </tr>
            <tr> <td>{{movimento}}</td> </tr>
        </table>

        <div @click="toggleShow" class="box-perfil">
            <img src="@/assets/img/perfil1.jpg" alt="">
        </div>

    </div>
            <!-- <div>
                <a class="btn" @click="toggleShow">set avatar</a>
                <my-upload field="img"
                    langType='pt-br'
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    method="POST"
                    v-model="show"
                    :width="300"
                    :height="300"
                    url="http://localhost:3000/upload"
                    noSquare="true"
                    :params="params"
                    :headers="headers"
                    img-format="png">

                    </my-upload>
                <img :src="imgDataUrl">
            </div> -->
    <div class="content-barra">
            <h4>Vida</h4>
            <div class="back-vida front-barra-padrao" @click="open_modal_vida">
                <div class="front-vida back-barra-padrao" :style="{ width : `${porcentagem_vida}%`}">
                    <p class="percentual_barra" >{{vida_l.atual}}/{{vida_l.maximo}}</p>
                </div>
            </div>
            <div class="container-field">
                <div class="form-field">
                    <input   type="checkbox" v-model="lesao_grave" name="vidaStatus" id="vidaStatus01">
                    <label for="vidaStatus01">Lesão Grave</label>
                </div>
                <div class="form-field">
                    <input type="checkbox" v-model="inconsciente" name="vidaStatus" id="vidaStatus02">
                    <label for="vidaStatus02">Inconsciente</label>
                </div>
                <div class="form-field">
                    <input type="checkbox" v-model="morrendo" name="vidaStatus" id="vidaStatus03">
                    <label for="vidaStatus03">Morrendo</label>
                </div>
                    
            </div>
    </div>
    <div class="content-barra">
        <h4>Sanidade</h4>
        <div id="teste-sanidade">
            <div class="back-sanidade front-barra-padrao" @click="open_modal_sanidade">
                <div class="front-sanidade back-barra-padrao" :style="{ width : `${porcentagem_sanidade}%`}">
                    <p class="percentual_barra">{{sanidade_l.atual}}/{{sanidade_l.maximo}}</p>
                </div>
            </div>
            <img src="/img/d20_2.png" @click="open_modal_teste_esforco()">
        </div>
        <div class="container-field">
            <div class="form-field">
                <input type="checkbox" v-model="traumatizado" name="vidaStatus" id="vidaStatus">
                <label for="vidaStatus">Traumatizado</label>
            </div>
            <div class="form-field">
                <input type="checkbox" v-model="enlouquecendo" name="vidaStatus" id="vidaStatus">
                <label for="vidaStatus">Enlouquecendo</label>
            </div>
            
            
        </div>
    </div>
    <div class="content-barra" >
        <h4>Ocultismo</h4>
        <div class="back-ocultismo front-barra-padrao" @click="open_modal_ocultismo">
            <div  class="front-ocultismo back-barra-padrao" :style="{ width : `${porcentagem_ocultismo}%`}">
                <p class="percentual_barra">{{ocultismo_l.atual}}/{{ocultismo_l.maximo}}</p>
            </div>
        </div>

    </div>
    <div class="content-barra">
        <h4>Esforço</h4>
        <div class="back-esforco front-barra-padrao" @click="open_modal_esforco">
            <div class="front-esforco back-barra-padrao" :style="{ width : `${porcentagem_esforco}%`}">
                <p class="percentual_barra">{{esforco_l.atual}}/{{esforco_l.maximo}}</p>
            </div>
        </div>
  
    </div>
</div>

</template>
<script>
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
export default {

    setup () {
        const toast = () => {
            createToast('Wow, easy')
        }
        return { toast }
    },
    components:{
        ToastPlugin
    },
    props:{
        vida : Object,
        sanidade : Object,
        ocultismo : Object,
        esforco : Object,
        acao : Number,
        movimento: Number,
        reacao: Number,

        lesao_grave : Boolean,
        inconsciente : Boolean,
        morrendo : Boolean,
        traumatizado : Boolean,
        enlouquecendo : Boolean,

    },
    data(){
        return{
            isBuild : true,
            vida_l : {atual: 5, maximo: 50},
            sanidade_l : {atual: 5, maximo: 50},
            ocultismo_l : {atual: 5, maximo: 50},
            esforco_l : {atual: 5, maximo: 50},
            acao_l : 1,
            movimento_l : 1,
            reacao_l : 1,

            imgPadrao: '/img/perfil1.jpg',

            // LÓGICA DE MODALS E BARRA DE VIDA
            show_modal_vida : false,
            show_modal_sanidade : false,
            show_modal_ocultismo : false,
            show_modal_esforco : false,

            porcentagem_vida : 100,
            porcentagem_sanidade: 100,
            porcentagem_ocultismo: 100,
            porcentagem_esforco: 100,
            // MODAL TESTE SANIDADE
            show_modal_teste :  false,
            result_string_sanidade : false,
            result_number_sanidade : false,
            color_teste_sanidade : "#fff",
            isExecuting : false,
            // PERFIL AVATAR
            show: true,
			params: {
				token: '123456798',
				name: 'avatar'
			},

			imgDataUrl: '', // the datebase64 url of created image,
            // CHECK BOX
            lesao_grave : false,
            inconsciente : false,
            morrendo : false,
            traumatizado : false,
            enlouquecendo : false
        }
    },
    methods:{
        started(){
            setTimeout(()=>{
                let percent;
                // percentual de vida
                percent = (100 / this.vida_l.maximo)*this.vida_l.atual
                this.porcentagem_vida = percent;
                // percentual de sanidade
                percent = (100 / this.sanidade_l.maximo)*this.sanidade_l.atual
                this.porcentagem_sanidade = percent;
                // percentual de ocultismo
                percent = (100 / this.ocultismo_l.maximo)*this.ocultismo_l.atual
                this.porcentagem_ocultismo = percent;
                // percentual de esforço
                percent = (100 / this.esforco_l.maximo)*this.esforco_l.atual
                this.porcentagem_esforco = percent;

            },100)
        },
      open_modal_vida(){
          this.show_modal_vida = true
      },salvar_vida(e){
            let percent;
            if(this.vida_l.atual > this.vida_l.maximo){
                alert('A VIDA ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.vida_l.atual = this.vida_l.maximo
                percent = 100
            }else if(this.vida_l.atual < 0){
                percent = 0
            }else{
                percent = (100 / this.vida_l.maximo)*this.vida_l.atual
            }
 
            this.porcentagem_vida = percent

            this.show_modal_vida = false

            e.preventDefault();
        },
        open_modal_sanidade(){
            this.show_modal_sanidade = true;
        },
        salvar_sanidade(e){
            let percent;
            if(this.sanidade_l.atual > this.sanidade_l.maximo){
                alert('A SANIDADE ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.sanidade_l.atual = this.sanidade_l.maximo
                percent = 100
            }else if(this.sanidade_l.atual < 0){
                percent = 0

            }else{
                percent = (100 / this.sanidade_l.maximo)*this.sanidade_l.atual
            }

            this.porcentagem_sanidade = percent

            this.show_modal_sanidade = false;
            e.preventDefault();
        },
        open_modal_ocultismo(){
            this.show_modal_ocultismo = true
        },
        salvar_ocultismo(e){
            let percent;
            if(this.ocultismo_l.atual > this.ocultismo_l.maximo){
                alert('O OCULTISMO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.ocultismo_l.atual = this.ocultismo_l.maximo
                percent = 100
            }else if(this.ocultismo_l.atual < 0){
                percent = 0

            }else{
                percent = (100 / this.ocultismo_l.maximo)*this.ocultismo_l.atual
            }

            this.porcentagem_ocultismo = percent

            this.show_modal_ocultismo = false

            e.preventDefault();
      },
      open_modal_esforco(){
          this.show_modal_esforco = true
      },
      salvar_esforco(e){
        let percent;
          if(this.esforco_l.atual > this.esforco_l.maximo){
                alert('PONTOS DE ESFORÇO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.esforco_l.atual = this.esforco_l.maximo
                percent = 100
            }else if(this.esforco_l.atual < 0){
                percent = 0

            }else{
                percent = (100 / this.esforco_l.maximo)*this.esforco_l.atual
            }
            this.porcentagem_esforco = percent

            this.show_modal_esforco = false
  
            e.preventDefault();
      },
      open_modal_teste_esforco(){

        if(this.isExecuting){ return}
        this.isExecuting = true;

            this.show_modal_teste = true
            var maximo = 100, total = 0, count = 1;

            setTimeout(()=>{
                for (var i = 0; i < count; i++){ total += Math.floor(Math.random()*maximo + 1) }
                this.result_number_sanidade = total
                }, 2000)
            setTimeout(()=>{
                if(this.sanidade_l.atual < total){
                    this.result_string_sanidade = 'Sucesso';
                    this.color_teste_sanidade = '#298437';
                    createToast(`Sucesso`, { type : 'success', timeout : 3000 } )
                }
                if(this.sanidade_l.atual >= total){
                    this.result_string_sanidade = 'Fracasso'
                    this.displayTesteTipo = '#781c1c';
                    createToast(`Fracasso`, { type : 'danger', timeout : 3000 } )
                }
            }, 3000)
            setTimeout(()=>{
                this.result_number_sanidade = false
                this.result_string_sanidade = false
                this.show_modal_teste = false
                this.isExecuting = false;
            }, 6000)

      },
      // perfil avatar
      toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
                console.log(imgDataUrl)
			},
			/**
			 * upload success
			 *
			 * [param] jsonData  server api return data, already json encode
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			},
            toast(msg, type){ createToast(msg, { type : type, timeout : 3000 } ) }
    },
    mounted(){
        this.started();
    },
    watch:{
        lesao_grave(value){  
            if(value){ createToast('Lesão Grave - ativado', { type : 'warning', timeout : 3000 } ) }
            else { createToast('Lesão Grave - desativado', { type : 'default', timeout : 3000 } ) }
            this.$emit("update:lesao_grave", value)
        },
        inconsciente(value){  
            if(value){ createToast('Inconsciente - ativado', { type : 'danger', timeout : 3000 } ) }
            else { createToast('Inconsciente - desativado', { type : 'default', timeout : 3000 } ) }
            this.$emit("update:inconsciente", value)
        },
        morrendo(value){  
            if(value){ createToast('Morrendo - ativado', { type : 'danger', timeout : 3000 } ) }
            else { createToast('Morrendo - desativado', { type : 'default', timeout : 3000 } ) }
            this.$emit("update:morrendo", value)
        },
        traumatizado(value){  
            if(value){ createToast('Traumatizado - ativado', { type : 'warning', timeout : 3000 } ) }
            else { createToast('Traumatizado - desativado', { type : 'default', timeout : 3000 } ) }
            this.$emit("update:traumatizado", value)
        },
        enlouquecendo(value){  
            if(value){ createToast('Enlouquecendo - ativado', { type : 'danger', timeout : 3000 } ) }
            else { createToast('Enlouquecendo - desativado', { type : 'default', timeout : 3000 } ) }
            this.$emit("update:enlouquecendo", value)
        },

        vida(value){ this.vida_l = this.$emit("update:vida_u", value) },
        sanidade(value){ this.sanidade_l = this.$emit("update:sanidade_u", value) },
        ocultismo(value){ this.ocultismo_l = this.$emit("update:ocultismo_u", value) },
        esforco(value){ this.esforco_l = this.$emit("update:esforco_u", value) },
        acao(value){ this.acao_l = this.$emit("update:acao_u", value) },
        movimento(value){ this.movimento_l = this.$emit("update:movimento_u", value) },
        reacao(value){ this.reacao_l = this.$emit("update:reacao_u", value) },
    }

}
</script>
<style scoped lang="scss">
.geral-avatar{
    position: relative;
    display: flex;
    flex-flow: column;
    width: 70vw;
}

.container-avatar{
    background: rgba(7 7 7 / 0.7);
    border-radius: 1.8em;

    display: flex;
    justify-content: center;
    align-items: center;

    table{
        text-align: center;
    }
}

.box-perfil{
    background-color: #a2a2a2;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid rgba(190, 190, 190, 0.6);
    overflow:hidden;
}
.box-perfil:hover{
    background-color: #a2a2a2;
    border: 2px solid rgb(233, 233, 233);
}
.box-perfil img{

    width: 100%;
    height: 100%
}

.percentual_barra {
    width: 100%;
    margin-left: 10px;}
.percentual_barra{
    font-size: 20px;}


.content-barra {
    h4{
        margin: 0 0.5em;

        font-size: 20px;
        color: bisque;
    }
    #teste-sanidade{
        width: 100%;
        display:flex; 
        flex-direction: row;
        gap: 0.5em;
        justify-content: flex-start;
        align-items: center;
        .back-sanidade{
            width: 90%;
        }
        img{
            height: 2.5em;
            aspect-ratio: 1/1;
            border: 1px solid rgba(255, 255, 255, 0);
            border-radius: 50%;
            opacity: 0.7;
            cursor: pointer;
        }
        img:hover{
            opacity: 1;
            border: 1px solid rgb(201, 201, 201);
            background-color: #1b1b1b;
            transform: none;
            transition: all ease 0.3s;
        }
        img:active{
            transform: rotate(360deg);
        }
    }
    .back-barra-padrao{
        height: 100%;
        transition: width 1.5s;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
    }
    .front-barra-padrao{
        height: 1.8em;
        cursor: pointer;
    }
    .back-vida{
        background-color: rgba(71, 18, 18, 0.575);}
    .front-vida{
        background-color: #940909c0;
        border-right: 2px solid #ff7777;}
    .back-sanidade{
        background-color: rgba(11, 14, 70, 0.63);
    }
    .front-sanidade{
        background-color: #203f9483;
        border-right: 2px solid #638cdd;}
    .back-ocultismo{
        background-color: rgba(70, 7, 64, 0.596);}
    .front-ocultismo{
        background-color: #580b7fa2;
        border-right: 2px solid #c15fce;}
    .back-esforco{
        background-color: rgba(15, 107, 36, 0.514);}
    .front-esforco{
        background-color: #3aa759ab;
        border-right: 2px solid #65b580;}
    .container-field{
        display: flex;
        padding: 0.5em 0.3em;
        gap: 1em;
        .form-field{
            input[type="checkbox"], label{
                cursor: pointer;
            }
        }
    }
}
.select-class{
    height: 40px;
    background: rgba(7 7 7 / 0.7);
    color: #fff;
    font-size: 20px;

}
.box-class{
    margin-left: 15px;
}
.box-class h2{
    margin: 15px auto;
}
.input-padrao2{
    background: rgba(7 7 7 / 0.5);
}

// modal modificar 
.modal_container{
    background-color: rgba(0, 0, 0, 0.486);
    width: 100%;
    height: 100%;
    
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-modificar{
        background-color: rgba(0  0  0 / 0.7);
        text-align:center;
        border: 2px solid #898;
        padding: 1em;
        display: flex;
        flex-direction: column;
        
        h2{
            font-size: 1.2em;
           
        }
        form{
            margin: 0;
            display: flex;
            flex-direction: column;
            .field-input{
                padding: 0.5em;
                display: flex;
                justify-content: space-between;
                label{
                    font-size: 1em;
                    padding-right: 0.5em ;
                }
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
            }
            input[type="submit"]{
                width: 60%;
                font-size: 1em;
                font-family: "Consolas";
                margin: 1em auto;
                cursor: pointer;
            }
        }
    }
}
</style>