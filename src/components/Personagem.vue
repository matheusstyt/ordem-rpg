<template>

    
    <!-- <div class="modal_container">
        <div class="modal-modificar" >
            <h2>TESTE DE SANIDADE</h2>
            <h3>Rolagem de dado</h3>
            <h4 :style="displayTesteResultado">{{valorTeste}}</h4>
            <p :style="displayTesteTipo">{{tipoTeste}}</p>
        </div>
    </div> -->
<div class="geral-avatar">
    <div class="modal_container" v-if="show_modal_vida == true">
            <div class="modal-modificar"  >
                <h2>MODIFICAR DE VIDA</h2>
                <form @submit="salvar_vida($event)" class="formModal" id="changeLife" >
                    <div class="field-input">
                        <label for="">Atual</label>
                        <input type="number" id="vidaAtual" name="atual" min="0" v-model="vida_l.atual">
                    </div>
                    <div class="field-input">
                        <label for="">Máximo</label>
                        <input type="number" id="vidaMaxima" name="maxima" min="0" v-model="vida_l.maximo">
                    </div>
                    <input type="submit" value="Salvar">

                </form>
            </div>

    </div>
    <div class="modal_container" v-if="show_modal_sanidade == true">
        <div class="modal-modificar" >
            <h2>MODIFICAR SANIDADE</h2>
            <form @submit="salvar_sanidade($event)" class="formModal" action="">
                <label for="">Atual</label>
                <input type="number" id="vidaAutal" name="atual" v-model="sanidade_l.atual">
                <label for="">Máximo</label>
                <input type="number" id="vidaMaxima" name="maxima" v-model="sanidade_l.maximo">
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
                <label for="">Atual</label>
                <input type="number" id="esforcoAtual" name="atual" min="0" v-model="esforco_l.atual">
                <label for="">Máximo</label>
                <input type="number" id="esforcoMaxima" name="maxima" min="0" v-model="esforco_l.maximo">
                <input type="submit" value="Salvar">

            </form>
        </div>

    </div>
    <div class="container-avatar" >
        <div style="display: flex; width: auto; margin: 0 auto;">
                <div class="box-movi">
                <div >
                    <h3>Ação / Reação</h3>
                    <div class="barra-ar">
                        <p>{{acao}}/{{reacao}}</p>
                    </div>
                </div>
                <div >
                    <h3>Movimento</h3>
                    <p>{{movimento}}</p>

                </div>
            </div>
            <div @click="toggleShow" class="box-perfil">
                <img :src="imgPadrao" alt="">
            </div>
            <!-- <div class="box-classe">
                <img src="/img/runa.jpg" alt="">
            </div> -->
            <div class="box-class">

            </div>
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
    <div id="content-barra">
            <h4>Vida</h4>
            <div class="barraVida barraP" @click="open_modal_vida">
                <div class="barra-vida barra-p" :style="{ width : `${porcentagem_vida}%`}">
                    <p class="percentual_barra" id="contagemVida" >{{vida_l.atual}}/{{vida_l.maximo}}</p>
                </div>
            </div>
            <div >
                    <input   type="checkbox" name="vidaStatus" id="vidaStatus01">
                    <label for="vidaStatus01">Lesão Grave</label>
                    <input type="checkbox" name="vidaStatus" id="vidaStatus02">
                    <label for="vidaStatus02">Inconsciente</label>
                    <input type="checkbox" name="vidaStatus" id="vidaStatus03">
                    <label for="vidaStatus03">Morrendo</label>
            </div>
    </div>
    <div id="content-barra">
        <h4>Sanidade</h4>
        <div style="display:flex; align-items : center; ">
            <div class="barraSanidade barraP" @click="open_modal_sanidade">
                <div class="barra-sanidade barra-p" :style="{ width : `${porcentagem_sanidade}%`}">
                    <p class="percentual_barra">{{sanidade_l.atual}}/{{sanidade_l.maximo}}</p>
                </div>
            </div>
            <img id="imgSanidade" style="width:40px; height:40px;" src="/img/d20_2.png" @click="open_modal_teste_esforco()">
        </div>
        <div>
            <input type="checkbox" name="vidaStatus" id="vidaStatus">
            <label for="vidaStatus">Traumarizado</label>
            <input type="checkbox" name="vidaStatus" id="vidaStatus">
            <label for="vidaStatus">Enlouquecendo</label>
        </div>
    </div>
    <div id="content-barra" >
        <h4>Ocultismo</h4>
        <div class="barraOcultismo barraP" @click="open_modal_ocultismo">
            <div  class="barra-ocultismo barra-p" :style="{ width : `${porcentagem_ocultismo}%`}">
                <p class="percentual_barra">{{ocultismo_l.atual}}/{{ocultismo_l.maximo}}</p>
            </div>
        </div>

    </div>
    <div id="content-barra">
        <h4>Esforço</h4>
        <div class="barraEsforco barraP" @click="open_modal_esforco">
            <div class="barra-esforco barra-p" :style="{ width : `${porcentagem_esforco}%`}">
                <p class="percentual_barra">{{esforco_l.atual}}/{{esforco_l.maximo}}</p>
            </div>
        </div>
  
    </div>
</div>

</template>
<script>
export default {
    components:{
        
    },
    props:{
        vida : Object,
        sanidade : Object,
        ocultismo : Object,
        esforco : Object,
        acao : Number,
        movimento: Number,
        reacao: Number

    },
    data(){
        return{
            vida_l : {atual: 5, maximo: 50},
            sanidade_l : {atual: 5, maximo: 50},
            ocultismo_l : {atual: 5, maximo: 50},
            esforco_l : {atual: 5, maximo: 50},
            acao_l : 1,
            movimento_l : 1,
            reacao_l : 1,

            imgPadrao: '/img/perfil1.jpg',

            show_modal_vida : false,
            show_modal_sanidade : false,
            show_modal_ocultismo : false,
            show_modal_esforco : false,

            porcentagem_vida : 100,
            porcentagem_sanidade: 100,
            porcentagem_ocultismo: 100,
            porcentagem_esforco: 100,
            displayModalT: 'display:none;',
            displayTesteTipo: 'display: none; transition: display 0.5s;',
            displayTesteResultado: 'display: none; background-color: #0a0b0c;',
            tipoTeste: '',
            valorTeste: 0,
            classe: 'Combatente',
            // PERFIL AVATAR
            show: true,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: { "Content-Type": "application/json"},
			imgDataUrl: '' // the datebase64 url of created image
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
           var maximo = 100
           var total = 0
           var count = 1
           this.displayModalT = 'display:block;'
           for (var i = 0; i < count; i++){
               total += Math.floor(Math.random()*maximo + 1)
           }

           setTimeout(()=>{
               this.valorTeste = total
               this.displayTesteResultado = 'display: block;'
            }, 2000)
           setTimeout(()=>{
           if(this.sanidade.atual < total){
              this.tipoTeste = 'Sucesso'
              this.displayTesteTipo = 'display: block; background-color: #298437;'
           }
           if(this.sanidade.atual >= total){
               this.tipoTeste = 'Fracasso'
               this.displayTesteTipo = 'display: block; background-color: #781c1c;'
           }


           }, 3000)
           setTimeout(()=>{

               this.displayModalT = 'display: none;'
               this.displayTesteTipo = 'display: none; background-color: #0a0b0c;'
               this.displayTesteResultado = 'display: none;'
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
			}
    },
    mounted(){
        this.started();
    },
    watch:{}

}
</script>
<style scoped lang="scss">
.geral-avatar{
    position: relative;
}
#imgSanidade{
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    opacity: 0.7;

}
#imgSanidade:hover{
    opacity: 1;
    border: 1px solid rgb(201, 201, 201);
    background-color: #1b1b1b;

}

.container-avatar{
    text-align: center;
    margin: 0 auto;
    width: 80%;
    height:140px;
    background: rgba(7 7 7 / 0.7);
    border-radius: 20px;
    padding: 10px;
    display: flex;}
.box-movi{
    height: 100%;
    width: 120px;
}
.box-movi div{
    text-align: center;
}
.box-movi div h3{
    margin: 0 auto;
    color: bisque;
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
.box-classe{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid rgba(190, 190, 190, 0.6);
    overflow:hidden;

    text-align: center;
}
.box-classe:hover{
     border: 2px solid rgb(233, 233, 233);
     background-color: rgb(173, 172, 172);

}
.box-classe img{
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
.percentual_barra {
    width: 100%;
    margin-left: 10px;}
.percentual_barra{
    font-size: 20px;}
.barra-p{
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
    transition: width 2s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;}

.barraP{
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
    height: 25px;}
.barraVida{
    background-color: rgb(71, 18, 18);}
.barra-vida{
    background-color: #940909;
    border-right: 2px solid #ff7777;}
.barraSanidade{
    background-color: rgb(11, 14, 70);

    display:block;}
.barra-sanidade{
    background-color: #203f94;
    border-right: 2px solid #638cdd;}
.barraOcultismo{
    background-color: rgb(24, 2, 22);}
.barra-ocultismo{
    background-color: #580b7f;
    border-right: 2px solid #ab65b5;}
.barraEsforco{
    background-color: rgb(2, 24, 7);}
.barra-esforco{
    background-color: #296e3d;
    border-right: 2px solid #65b580;}
#content-barra h4{
    margin: 0 auto;
    font-size: 20px;
    color: bisque;
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