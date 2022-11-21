<template>
    <div class="back">
        <div id="modal-vida" class="modalP" :style="displayModalV">
                <div class="conteinerModal" >

                    <h2>MODIFICAR DE VIDA</h2>
                    <form @submit="salvarVida($event)" class="formModal" id="changeLife" >
                        <label for="">Atual</label>
                        <input type="number" id="vidaAtual" name="atual" min="0" v-model="vida.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="vidaMaxima" name="maxima" min="0" v-model="vida.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>

            </div>
            <div id="modal-sanidade" class="modalP" :style="displayModalS">
                <div class="conteinerModal" >
                    <h2>MODIFICAR SANIDADE</h2>
                    <form @submit="salvarSanidade($event)" class="formModal" action="">
                        <label for="">Atual</label>
                        <input type="number" id="vidaAutal" name="atual" v-model="sanidade.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="vidaMaxima" name="maxima" v-model="sanidade.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>

            </div>
            <div :style="displayModalT"  class="modalP" >
                <div class="conteinerModal" >
                    <h2>TESTE DE SANIDADE</h2>
                    <h3>Rolagem de dado</h3>
                    <h4 :style="displayTesteResultado">{{valorTeste}}</h4>
                    <p :style="displayTesteTipo">{{tipoTeste}}</p>
                </div>
            </div>
            <div id="modal-ocultismo" class="modalP" :style="displayModalO">
                <div class="conteinerModal" >
                    <h2>MODIFICAR OCULTISMO</h2>
                    <form @submit="salvarOcultismo($event)" class="formModal" >
                        <label for="">Atual</label>
                        <input type="number" id="ocultismoAtual" name="atual" min="0" v-model="ocultismo.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="ocultismoMaxima" name="maxima" min="0" v-model="ocultismo.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>

            </div>
            <div id="modal-esforco" class="modalP" :style="displayModalE">
                <div class="conteinerModal" >
                    <h2>MODIFICAR PONTOS DE ESFORÇO</h2>
                    <form @submit="salvarEsforco($event)" class="formModal" >
                        <label for="">Atual</label>
                        <input type="number" id="esforcoAtual" name="atual" min="0" v-model="esforco.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="esforcoMaxima" name="maxima" min="0" v-model="esforco.maximo">
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
            <div id="box-barra-padrao">
                    <h4>Vida</h4>
                    <div class="barraVida barraP">
                        <div @click="modalVida" class="barra-vida barra-p" :style="porcentagemVida">
                            <p class="contagemBarra" id="contagemVida" >{{vida.atual}}/{{vida.maximo}}</p>
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
            <div id="box-barra-padrao">
                <h4>Sanidade</h4>
                <div style="display:flex" >
                    <div class="barraSanidade barraP">
                        <div @click="modalSanidade" class="barra-sanidade barra-p" :style="porcentagemSanidade">
                            <p class="contagemBarra">{{sanidade.atual}}/{{sanidade.maximo}}</p>
                        </div>
                    </div>
                    <img id="imgSanidade" style="width:40px; height:40px;" src="/img/d20_2.png" @click="abrirModalTeste()">
                </div>
                <div>
                    <input type="checkbox" name="vidaStatus" id="vidaStatus">
                    <label for="vidaStatus">Traumarizado</label>
                    <input type="checkbox" name="vidaStatus" id="vidaStatus">
                    <label for="vidaStatus">Enlouquecendo</label>
                </div>
            </div>
            <div id="box-barra-padrao" :style="displayBarraOcultismo">
                <h4>Ocultismo</h4>
                <div class="barraOcultismo barraP">
                    <div @click="modalOcultismo" class="barra-ocultismo barra-p" :style="porcentagemOcultismo">
                        <p class="contagemBarra">{{ocultismo.atual}}/{{ocultismo.maximo}}</p>
                    </div>
                </div>

            </div>
            <div id="box-barra-padrao">
                <h4>Esforço</h4>
                <div class="barraEsforco barraP">
                    <div @click="modalEsforco" class="barra-esforco barra-p" :style="porcentagemEsforco">
                        <p class="contagemBarra">{{esforco.atual}}/{{esforco.maximo}}</p>
                    </div>
                </div>
                <div>
                    <label for="dano-extra">Dano Extra</label>
                    <div id="input-padrao2">
                        <input type="number" name="dano-extra" id="dano-extra ">
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
        data : Object,
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
            imgPadrao: '/img/perfil1.jpg',
            displayBarraOcultismo: 'display:none',
            displayModalV:'display:none;',
            porcentagemVida : 'width: 0%;',
            displayModalS:'display:none;',
            porcentagemSanidade: 'width: 0%;',
            displayModalO:'display:none;',
            porcentagemOcultismo: 'width: 0%;',
            displayModalE:'display:none;',
            porcentagemEsforco: 'width: 0%;',
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
                console.log('width: '+valor+'%' )
                var valor = (100 / this.vida.maximo)*this.vida.atual
                this.porcentagemVida = String('width: '+valor+'%;')

                var valor1 = (100 / this.sanidade.maximo)*this.sanidade.atual
                this.porcentagemSanidade = 'width:'+valor1+'%;'

                var valor2 = (100 / this.ocultismo.maximo)*this.ocultismo.atual
                this.porcentagemOcultismo = 'width:'+valor2+'%;'
                var valor3 = (100 / this.esforco.maximo)*this.esforco.atual
                this.porcentagemEsforco = 'width:'+valor3+'%;'

            },100)
        },
      modalVida(){
          this.displayModalV ='display:block;'
      },salvarVida(e){

            if(this.vida.atual > this.vida.maximo){
                alert('A VIDA ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.vida.atual = this.vida.maximo
                var valor = 100
            }else if(this.vida.atual < 0){
                var valor = 0
            }else{
                var valor = (100 / this.vida.maximo)*this.vida.atual
            }
            const porcentagemV = 'width:'+valor+'%;'
            console.log(porcentagemV)
            this.porcentagemVida = porcentagemV

            this.displayModalV = 'display:none;'
            this.$emit('vidaU', {atual: this.vida.atual, maximo: this.vida.maximo})
            e.preventDefault();
      },
      modalSanidade(){
          this.displayModalS ='display:block;'
      },salvarSanidade(e){
          if(this.sanidade.atual > this.sanidade.maximo){
                alert('A SANIDADE ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.sanidade.atual = this.sanidade.maximo
                var valor = 100
            }else if(this.sanidade.atual < 0){
                var valor = 0

            }else{
                var valor = (100 / this.sanidade.maximo)*this.sanidade.atual
            }
            const porcentagemS = 'width:'+valor+'%;'
            console.log(porcentagemS)
            this.porcentagemSanidade = porcentagemS

            this.displayModalS = 'display:none;'
            this.$emit('sanidadeU', {atual: this.sanidade.atual, maximo: this.sanidade.maximo})

            e.preventDefault();
      },
      modalOcultismo(){
          this.displayModalO ='display:block;'
      },salvarOcultismo(e){
          if(this.ocultismo.atual > this.ocultismo.maximo){
                alert('O OCULTISMO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.ocultismo.atual = this.ocultismo.maximo
                var valor = 100
            }else if(this.ocultismo.atual < 0){
                var valor = 0

            }else{
                var valor = (100 / this.ocultismo.maximo)*this.ocultismo.atual
            }
            const porcentagemO = 'width:'+valor+'%;'
            console.log(porcentagemO)
            this.porcentagemOcultismo = porcentagemO

            this.displayModalO = 'display:none;'
            this.$emit('ocultismoU', {atual: this.ocultismo.atual, maximo: this.ocultismo.maximo})
            e.preventDefault();
      },
      modalEsforco(){
          this.displayModalE ='display:block;'
      },salvarEsforco(e){
          if(this.esforco.atual > this.esforco.maximo){
                alert('PONTOS DE ESFORÇO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.esforco.atual = this.esforco.maximo
                var valor = 100
            }else if(this.esforco.atual < 0){
                var valor = 0

            }else{
                var valor = (100 / this.esforco.maximo)*this.esforco.atual
            }
            const porcentagemE = 'width:'+valor+'%;'
            console.log(porcentagemE)
            this.porcentagemEsforco = porcentagemE

            this.displayModalE = 'display:none;'
            this.$emit('esforcoU', {atual: this.esforco.atual, maximo: this.esforco.maximo})

            e.preventDefault();
      },
      abrirModalTeste(){
          var maximo = 100
           var total = 0
           var count = 1
           this.displayModalT = 'display:block;'
           for (var i = 0; i < count; i++){
               total += Math.floor(Math.random()*maximo + 1)
           }

           console.log('total: ',total, this.sanidade.atual)

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
<style scoped>
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
.contagemBarra {
    width: 100%;
    margin-left: 10px;}
.contagemBarra{
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
#box-barra-padrao h4{
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
</style>