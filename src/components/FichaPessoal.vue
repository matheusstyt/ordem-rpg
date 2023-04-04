<template>
    <div class="container-geral">
    
        <div class="item pessoal-detalhes">
            <form class="formDetalhes" action="">

                        <h2>DETALHES PESSOAIS</h2>

                        <div  >
                            <label for="nome">Nome</label>
                            <div>
                                <input class="input-padrao0" type="text" name="nome" id="nome" :value="data.nome">
                            </div> 
                        </div>
                        <div>
                            <label for="jogador">Jogador</label>
                            <div>
                                <input class="input-padrao0" type="text" name="jogador" id="jogador" :value="data.jogador" spellcheck="false">
                            </div>                            
                        </div>
                        <div  >
                            <label for="ocupacao">Origem</label>
                            <div>
                                <input class="input-padrao0" type="text" name="origem" id="origem" :value="data.origem">
                            </div>
                        </div>
                        <div class="line-padrao"> 
                            <label for="idade">Idade</label>
                            <div>
                                <input class="input-padrao0" type="text" name="idade" id="idade" :value="data.idade">
                            </div>
                            
                        </div>
                        <div>
                            <label for="sexo">Sexo</label>
                            <div>
                                <input class="input-padrao0" type="text" name="sexo" id="sexo input-padrao0" :value="data.sexo">
                            </div>
                            
                        </div>
                        <div>
                            <label for="lnascimento">Local de nascimento</label>
                            <div>
                                <input class="input-padrao0" type="text" name="lnascimento" id="lnascimento" :value="data.lnascimento">
                            </div>
                            
                        </div>
                        <div>
                            <label for="lresidencia">Local de residência</label>
                            <div>
                                <input class="input-padrao0" type="text" name="lresidencia" id="lresidencia" :value="data.lresidencia"> 
                            </div>
                            
                        </div>


            </form>
        </div>
        <div class="item pessoal-personagem">
            <div id="modal-vida" class="modalP" :style="displayModalV">
                <div class="conteinerModal" >
                    <hr>
                    <h2>MODIFICAR DE VIDA</h2>
                    <hr>
                    <form @submit="salvarVida($event)" class="formModal" id="changeLife" >
                        <label for="">Atual</label>
                        <input type="number" id="vidaAtual" name="atual" min="0" v-model="data.vida.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="vidaMaxima" name="maxima" min="0" v-model="data.vida.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>
                
            </div>
            <div id="modal-sanidade" class="modalP" :style="displayModalS">
                <div class="conteinerModal" >
                    <hr>
                    <h2>MODIFICAR SANIDADE</h2>
                    <hr>
                    <form @submit="salvarSanidade($event)" class="formModal" action="">
                        <label for="">Atual</label>
                        <input type="number" id="vidaAutal" name="atual" v-model="data.sanidade.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="vidaMaxima" name="maxima" v-model="data.sanidade.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>
                
            </div>
            <div :style="displayModalT"  class="modalP" >
                <div class="conteinerModal" >
                    <h2>TESTE DE SANIDADE</h2>
                    <hr>
                    <h3>Rolagem de dado</h3>
                    <hr>
                    <h4 :style="displayTesteResultado">{{valorTeste}}</h4>
                    <p :style="displayTesteTipo">{{tipoTeste}}</p>
                </div>
            </div>
            <div id="modal-ocultismo" class="modalP" :style="displayModalO">
                <div class="conteinerModal" >
                    <hr>
                    <h2>MODIFICAR OCULTISMO</h2>
                    <hr>
                    <form @submit="salvarOcultismo($event)" class="formModal" >
                        <label for="">Atual</label>
                        <input type="number" id="ocultismoAtual" name="atual" min="0" v-model="data.ocultismo.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="ocultismoMaxima" name="maxima" min="0" v-model="data.ocultismo.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>
                
            </div>
            <div id="modal-esforco" class="modalP" :style="displayModalE">
                <div class="conteinerModal" >
                    <hr>
                    <h2>MODIFICAR PONTOS DE ESFORÇO</h2>
                    <hr>
                    <form @submit="salvarEsforco($event)" class="formModal" >
                        <label for="">Atual</label>
                        <input type="number" id="esforcoAtual" name="atual" min="0" v-model="data.esforco.atual">
                        <label for="">Máximo</label>
                        <input type="number" id="esforcoMaxima" name="maxima" min="0" v-model="data.esforco.maximo">
                        <input type="submit" value="Salvar">

                    </form>
                </div>
                
            </div>
            <div class="container-avatar">
                <div class="box-movi">
                    <div >
                        <h3>Ação / Reação</h3>
                        <div class="barra-ar">
                            <p>{{data.acao}}/{{data.reacao}}</p>
                        </div>

                    </div>
                    <div >
                        <h3>Movimento</h3>
                        <p>{{data.movimento}}</p>

                    </div>


                </div>
                <div class="box-perfil">
                    <img src="/img/perfil.jpg" alt="">

                </div>
                <div class="box-classe">
 
                    <img src="/img/runa.jpg" alt="">

                </div>
            
            </div>

            <div id="box-barra-padrao">
                    <h4>Vida</h4>
                    <div class="barraVida barraP">
                        <div @click="modalVida" class="barra-vida barra-p" :style="porcentagemVida">
                            <p class="contagemBarra" id="contagemVida" >{{data.vida.atual}}/{{data.vida.maximo}}</p>
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
                            <p class="contagemBarra">{{data.sanidade.atual}}/{{data.sanidade.maximo}}</p>
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
            <div id="box-barra-padrao">
                <h4>Ocultismo</h4>
                <div class="barraOcultismo barraP">
                    <div @click="modalOcultismo" class="barra-ocultismo barra-p" :style="porcentagemOcultismo">
                        <p class="contagemBarra">{{data.ocultismo.atual}}/{{data.ocultismo.maximo}}</p>
                    </div>
                </div>
                
            </div>
            <div id="box-barra-padrao">
                <h4>Esforço</h4>
                <div class="barraEsforco barraP">
                    <div @click="modalEsforco" class="barra-esforco barra-p" :style="porcentagemEsforco">
                        <p class="contagemBarra">{{data.esforco.atual}}/{{data.esforco.maximo}}</p>
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
        <div class="item pessoal-lateral" align="center">
            <h2>Antecendentes</h2>
            <button id="abrirInventario"><img src="/img/historia4.png" alt=""></button>
            <h2>Inventário</h2>
                <button @click="abrirInventario()" id="abrirInventario"><img src="/img/inventario3.png" alt=""></button>
            <h2>Rituais</h2>
            <router-link to="/rituais">
                <button id="abrirInventario"><img src="/img/ritual1.png" alt=""></button>
            </router-link>
            <h2>Combate</h2>
            <button id="abrirInventario"><img src="/img/combate.png" alt=""></button>
            
        </div>
        <div class="item pessoal-resistencia">
            <h2>RESISTÊNCIA A DANO</h2>
            <hr>
                <div v-for="resistencia in data.resistencias" :key="resistencia.id">
                    <h3>{{resistencia.nome}}</h3>
                    <input type="number" :value="resistencia.resultado" name="" id="">
                </div>
        </div>
        <div class="item pessoal-atributo">
            <div @click="fecharDadoModal" id="modal-dado" class="modalP" :style="displayModalD">
                <div class="modal-dado" >
                    <h2>Rolagem de dado</h2>
                    <hr>
                    <h4 :style="displayAtributoResultado">{{valorDado}}</h4>
                    <p :style="displayAtributoTipo">{{tipoDado}}</p>
                </div>
                
            </div>
            
            <div class="atributos">
                
                <div @click="fecharAtributosModal" id="modal-atributo" class="modalP" :style="displayModalA">
                <div class="modal-atributo" >
                    <h2>MODIFICAR VALOR DO ATRIBUTO</h2>
                    <hr>
                    <form @submit="SalvarAtributoAtual($event)">
                        <label for="att02">{{habilidadeTipo}}</label>
                        <input type="number" :value="habilidadeValor">
                        <input type="submit" value="Salvar">
                    </form>

                </div>
                
            </div>
                <h2>ATRIBUTOS</h2>
                <hr>    
         
                <div class="containerAtributos">
                    <ul>
                        <li v-for="atributo in data.atributos" :key="atributo.id">
                            <img id="imgAtributo" src="/img/d20_3.png" @click="modalDado(atributo.tipo, atributo.resultado)" alt="">
                            <div style="width: 100%; height: 100%; text-align:center;  ">
                                <h2>{{atributo.tipo}}</h2>
                                <p @click="abrirModalAtributo(atributo.resultado,atributo.tipo, atributo.id)">{{atributo.resultado}}</p>
                            </div>
                        </li>
                    </ul>

                </div>

               
        </div>

        </div>
        <div class="item pessoal-pericia">
            <div @click="fecharDadoModal" id="modal-dado" class="modalP" :style="displayModalD">
                <div class="modal-dado" >
                    <h2>Rolagem de dado</h2>
                    <hr>
                    <h4 :style="displayAtributoResultado">{{valorDado}}</h4>
                    <p :style="displayAtributoTipo">{{tipoDado}}</p>
                </div>
                
            </div>
            <div class="pericia">
                <div @click="fecharAtributosModal" id="modal-pericia" class="modalP" :style="displayModalP">
                <div class="modal-atributo" >
                    <h2>MODIFICAR VALOR DA PERICIA</h2>
                    <hr>
                    <div>
                        <h3>Rolar dados automáticos? </h3>
                        </div>
                    <form @submit="SalvarPericiaAtual($event)">
                        <label for="att02">{{habilidadeTipo}}</label>
                        <input type="number" :v-model="habilidadeValor" :value="habilidadeValor">
                        <input type="submit" value="Salvar">
                    </form>

                </div>
                
            </div>
                <h2>PERÍCIAS</h2>
                <hr>    
         
                <div class="containerPericia">
                    <ul>
                        <li v-for="pericia in pericias" :key="pericia.id">
                            <img id="imgAtributo" src="/img/d20_4.png" @click="modalDado(pericia.tipo, pericia.resultado)" alt="">
                            <div style="width: 100%; height: 100%; text-align:center;  ">
                                <h2>{{pericia.tipo}}</h2>
                                <p @click="abrirModalPericia(pericia.resultado,pericia.tipo, pericia.id)">{{pericia.resultado}}</p>
                            </div>
                        </li>
                    </ul>

                </div>

               
        </div>

        </div>
    </div>
</template>
<script>
  import Avatar from 'vue-avatar-component'
  import Rituais from '../views/RituaisView.vue'
  export default {
    components: { Avatar, Rituais },
   
    data(){
        
        return{
            data : {
                nome: '',
                jogador: '',
                origem: '',
                idade: 0,
                sexo: '',
                lnascimento: '',
                lresidencia: '',
                acao: 0,
                reacao: 0,
                movimento: 0, 
                vida: {
                    atual: 12,
                    maximo: 20
                },
                sanidade: {
                    atual: 45,
                    maximo: 70
                },
                ocultismo: {
                    atual: 44,
                    maximo: 60
                },
                esforco: {
                    atual: 9,
                    maximo: 12
                },
                resistencias: [
                    {id:1, nome: 'R. FÍSICA', resultado: 2},
                    {id:2, nome: 'R. BALÍSTICA', resultado: 3},
                    {id:3, nome: 'R. INSANIDADE', resultado: 2},
                    {id:4, nome: 'R. MEDO', resultado: 9},
                    {id:5, nome: 'R. SANGUE', resultado: 5},
                    {id:6, nome: 'R. MORTE', resultado: 6},
                    {id:6, nome: 'R. ENERGIA', resultado: 7},
                    {id:6, nome: 'R. CONHECIMEN', resultado: 2},
                ],
                atributos:[
                    {id : 1, tipo: 'Aparência', resultado: 10 },
                    {id : 2, tipo: 'Constituição', resultado: 10 },
                    {id : 3, tipo: 'Destreza', resultado: 10 },
                    {id : 4, tipo: 'Educação', resultado: 10 },
                    {id : 5, tipo: 'Força', resultado: 10 },
                    {id : 6, tipo: 'Inteligência', resultado: 10 },
                    {id : 7, tipo: 'Poder', resultado: 10 },
                    {id : 8, tipo: 'Sorte', resultado: 10 },
                    {id : 9, tipo: 'Movimento', resultado: 10 },

                ],
                pericias: [],
                rituias: []
                    
            },    
      
            barLife: {
                'barra-vida': true,
            
            },
            modalLife: ['modal-vida', ],
            displayModalV:'display:none;',
            porcentagemVida : 'width: 0%;',
            displayModalS:'display:none;',
            porcentagemSanidade: 'width: 0%;',
            displayModalO:'display:none;',
            porcentagemOcultismo: 'width: 0%;',
            displayModalE:'display:none;',
            porcentagemEsforco: 'width: 0%;',
            displayModalD: 'display: none;',
            displayAtributoTipo: 'display: none; transition: display 0.5s;',
            displayAtributoResultado: 'display: none; background-color: #0a0b0c;',
            displayModalA: 'display: none;',
            valorDado : 0,
            tipoDado :  '',
            habilidadeValor : '',
            habilidadeTipo : '',
            displayModalT: 'display:none;',
            displayTesteTipo: 'display: none; transition: display 0.5s;',
            displayTesteResultado: 'display: none; background-color: #0a0b0c;',
            tipoTeste: '',
            valorTeste: 0,
            displayModalP: 'display:none;',
            periciaAtual : 0

        }
    
    },
    methods:{
       async updatePericia(){
            const dataJson = JSON.stringify({nome: "Marcos"})
            const req = await fetch(`http://localhost:3000/personagem/${id}`,{
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: dataJson
            });

       },
        async getDados(){
            const req = await fetch("http://localhost:3000/personagem")
            const data = await req.json();
            //this.data.nome = data.personagem.nome
            
            this.pericias = data.pericias
            console.log(this.pericias)
            this.data.nome = data.nome
            this.data.jogador = data.jogador
            this.data.origem = data.origem
            this.data.idade = data.idade
            this.data.sexo = data.sexo
            this.data.lnascimento = data.lnascimento
            this.data.lresidencia = data.lresidencia

            this.data.acao = data.data.acao
            this.data.reacao = data.data.reacao
            this.data.movimento = data.data.movimento

            this.data.vida.atual = data.data.vida.atual
            this.data.vida.maximo = data.data.vida.maximo

            this.data.sanidade.atual = data.data.sanidade.atual
            this.data.sanidade.maximo = data.data.sanidade.maximo

            this.data.ocultismo.atual = data.data.ocultismo.atual
            this.data.ocultismo.maximo = data.data.ocultismo.maximo

           this.data.esforco.atual = data.data.esforco.atual
            this.data.esforco.maximo = data.data.esforco.maximo
            
            

        },
        async setDados(){
            const data = {
                
            }

        },
        started(){
            setTimeout(()=>{
                console.log('width: '+valor+'%' )
                var valor = (100 / this.data.vida.maximo)*this.data.vida.atual
                this.porcentagemVida = String('width: '+valor+'%;')   
                
                var valor1 = (100 / this.data.sanidade.maximo)*this.data.sanidade.atual      
                this.porcentagemSanidade = 'width:'+valor1+'%;'    

                var valor2 = (100 / this.data.ocultismo.maximo)*this.data.ocultismo.atual      
                this.porcentagemOcultismo = 'width:'+valor2+'%;'    
                var valor3 = (100 / this.data.esforco.maximo)*this.data.esforco.atual      
                this.porcentagemEsforco = 'width:'+valor3+'%;'  

            },100)
        },
        abrirInventario: function(){
            this.$router.push({name:"inventario"})
        },
        setResistencia(){
            this.data.resistencias.resultado 

        },
        calcularVida: function(){
            if(this.data.vida.atual > this.data.vida.maximo){
                return 100
            }else if(this.data.vida.atual < 0){
                return 0
            }else{
                const valor = (100 / this.data.vida.maximo)*this.data.vida.atual
                const porcentagem = 'width: '+valor+'%'    
                return porcentagem
            }

        },
      modalVida(){
          this.displayModalV ='display:block;'
      },salvarVida(e){
         
            if(this.data.vida.atual > this.data.vida.maximo){
                alert('A VIDA ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.data.vida.atual = this.data.vida.maximo
                var valor = 100
            }else if(this.data.vida.atual < 0){
                var valor = 0
            }else{
                var valor = (100 / this.data.vida.maximo)*this.data.vida.atual      
            }
            const porcentagemV = 'width:'+valor+'%;'    
            console.log(porcentagemV)
            this.porcentagemVida = porcentagemV
            
            this.displayModalV = 'display:none;'
            e.preventDefault();    
      },
      modalSanidade(){
          this.displayModalS ='display:block;'
      },salvarSanidade(e){
          if(this.data.sanidade.atual > this.data.sanidade.maximo){
                alert('A SANIDADE ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.data.sanidade.atual = this.data.sanidade.maximo
                var valor = 100
            }else if(this.data.sanidade.atual < 0){
                var valor = 0

            }else{
                var valor = (100 / this.data.sanidade.maximo)*this.data.sanidade.atual      
            }    
            const porcentagemS = 'width:'+valor+'%;'    
            console.log(porcentagemS)
            this.porcentagemSanidade = porcentagemS

            this.displayModalS = 'display:none;'
            e.preventDefault();    
      },
      modalOcultismo(){
          this.displayModalO ='display:block;'
      },salvarOcultismo(e){
          if(this.data.ocultismo.atual > this.data.ocultismo.maximo){
                alert('O OCULTISMO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.data.ocultismo.atual = this.data.ocultismo.maximo
                var valor = 100
            }else if(this.data.ocultismo.atual < 0){
                var valor = 0

            }else{
                var valor = (100 / this.data.ocultismo.maximo)*this.data.ocultismo.atual      
            }    
            const porcentagemO = 'width:'+valor+'%;'    
            console.log(porcentagemO)
            this.porcentagemOcultismo = porcentagemO

            this.displayModalO = 'display:none;'
            e.preventDefault();    
      },
      modalEsforco(){
          this.displayModalE ='display:block;'
      },salvarEsforco(e){
          if(this.data.esforco.atual > this.data.esforco.maximo){
                alert('PONTOS DE ESFORÇO ATUAL NÃO PODE SER MAIOR QUE A MÁXIMA!!')
                this.data.esforco.atual = this.data.esforco.maximo
                var valor = 100
            }else if(this.data.esforco.atual < 0){
                var valor = 0

            }else{
                var valor = (100 / this.data.esforco.maximo)*this.data.esforco.atual      
            }    
            const porcentagemE = 'width:'+valor+'%;'    
            console.log(porcentagemE)
            this.porcentagemEsforco = porcentagemE

            this.displayModalE = 'display:none;'
            e.preventDefault();    
      },
      modalDado(habilidade, resultado){
           var maximo = 20
           var total = 0
           var count = 1
           this.tipoDado = habilidade
           this.displayModalD = 'display:block'
           for (var i = 0; i < count; i++){
               total += Math.floor(Math.random()*maximo + 1)
           }
           const linha = this.data.atributos
           console.log('total: ',total, maximo)
           this.valorDado = total
           this.tipoDado = this.tabelad20(resultado)
           setTimeout(()=>{
               this.displayAtributoResultado = 'display: block;'
           }, 2000)
           setTimeout(()=>{
               if(this.tipoDado == 'Extremo'){
                   this.displayAtributoTipo = 'display: block; background-color: #580b7f;'
               }else if(this.tipoDado == 'Sucesso Bom'){
                   this.displayAtributoTipo = 'display: block; background-color: #091a96;'
               }else if(this.tipoDado == 'Sucesso Normal'){
                    this.displayAtributoTipo = 'display: block; background-color: #298437;'
               }else if(this.tipoDado == 'Fracasso'){
                   this.displayAtributoTipo = 'display: block; background-color: #781c1c;'
               }else if(this.tipoDado == 'Desastre'){
                   this.displayAtributoTipo = 'display: block; background-color: rgb(190, 32, 32);'
               }
               
           }, 3000)
           setTimeout(()=>{
               
               this.displayModalD = 'display: none;'
               this.displayAtributoTipo = 'background-color: #0a0b0c;'
               this.displayAtributoResultado = 'display: none;'
           }, 6000)

      },fecharDadoModal(){
          this.displayModalD = 'display: none;'
          this.displayAtributoTipo = 'display: none; transition: display 0.5s;'
          this.displayAtributoResultado = 'display: none; background-color: #0a0b0c;'
      },
      abrirModalAtributo(resultado, tipo, id){
          this.displayModalA = 'display:block;'
          this.habilidadeTipo = tipo
          this.habilidadeValor = resultado
          console.log('id',id)
         if(this.data.atributos[id - 1] && this.data.atributos[resultado]){
             console.log('result',this.data.atributos[resultado])
              const atributoA = this.data.atributos[resultado] 
         }
          const atributoB = this.data.atributos[{resultado}] 
          const atributoA = this.data.atributos[id - 1]     
          console.log('teste',atributoB)
          console.log('tipo',tipo)
          
      },SalvarAtributoAtual(e){
          this.displayModalA = 'display:none;'
          e.preventDefault()
          },

        abrirModalPericia(resultado, tipo, id){
          this.displayModalP = 'display:block;'
          this.habilidadeTipo = tipo
          this.habilidadeValor = resultado
          console.log('id',id)
         if(this.data.atributos[id - 1] && this.data.atributos[resultado]){
             console.log('result',this.data.atributos[resultado])
              const atributoA = this.data.atributos[resultado] 
         }
          const atributoB = this.data.atributos[{resultado}] 
          const atributoA = this.data.atributos[id - 1]     
          console.log('teste',atributoB)
          console.log('tipo',tipo)
          
      },SalvarPericiaAtual(e){
          this.displayModalP = 'display:none;'
          console.log(this.habilidadeValor)
          e.preventDefault()
          }
      ,
      abrirModalTeste(){
          var maximo = 100
           var total = 0
           var count = 1
           this.displayModalT = 'display:block;'
           for (var i = 0; i < count; i++){
               total += Math.floor(Math.random()*maximo + 1)
           }
            
           console.log('total: ',total, this.data.sanidade.atual)
        
           setTimeout(()=>{
               this.valorTeste = total
               this.displayTesteResultado = 'display: block;'
                
          }, 2000)
           setTimeout(()=>{
           if(this.data.sanidade.atual < total){
              this.tipoTeste = 'Sucesso'
              this.displayTesteTipo = 'display: block; background-color: #298437;'
           }
           if(this.data.sanidade.atual >= total){
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
      tabelad20 : function(habilidade){
          const tabela = [
              {normal: 20},
              {normal: 19, bom: 20},
              {normal: 18, bom: 20},
              {normal: 17, bom: 19},
              {normal: 16, bom: 19, extremo: 20},
              {normal: 15, bom: 18, extremo: 20},
              {normal: 14, bom: 18, extremo: 20},
              {normal: 13, bom: 17, extremo: 20},
              {normal: 12, bom: 17, extremo: 20},
              {normal: 11, bom: 16, extremo: 20},
              {normal: 10, bom: 16, extremo: 19},
              {normal: 9, bom: 16, extremo: 19},
              {normal: 8, bom: 15, extremo: 19},
              {normal: 7, bom: 14, extremo: 19},
              {normal: 6, bom: 14, extremo: 18},
              {normal: 5, bom: 13, extremo: 18},
              {normal: 4, bom: 13, extremo: 18},
              {normal: 3, bom: 12, extremo: 18},
              {normal: 2, bom: 12, extremo: 18},
              {normal: 1, bom: 11, extremo: 17},

          ]
          console.log(habilidade)
          const tipo = tabela[habilidade - 1]
          if(habilidade != 20 && this.valorDado == 1){
              console.log('Desastre') 
              return 'Desastre'
          }
          if(this.valorDado >= tipo.extremo){
              console.log('Extremo') 
              return 'Extremo'
          }if(this.valorDado >= tipo.bom && this.valorDado < tipo.extremo){
              console.log('Sucesso Bom')
              return 'Sucesso Bom'
          }if(this.valorDado >= tipo.normal && this.valorDado < tipo.bom){
              console.log('Sucesso Normal')
              return 'Sucesso Normal'
          }if(this.valorDado < tipo.normal){
              console.log('Fracasso')
              return 'Fracasso'
          }

      }
    },
    mounted(){
        this.getDados();
        this.started();
        

  },computed:{
        

  },
  
  }
  
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
.container-geral{
    display: grid;
    grid-template-areas: 
        'detalhes detalhes personagem personagem lateral'
        'resistencia resistencia resistencia resistencia resistencia'
        'atributo atributo pericia pericia pericia'
    ;
    grid-gap: 30px;
}
.pessoal-personagem{
    grid-area: personagem;
    width: 100%;}
.pessoal-detalhes{
    grid-area: detalhes;
    width: 100%;   }
.pessoal-lateral{
    grid-area: lateral;
    width: 92%;
    background-color: rgb(56, 56, 56);
}
.pessoal-resistencia{
    grid-area: resistencia;
    width: 100%;
    background-color: rgb(32, 32, 32);}
.pessoal-atributo{
    grid-area: atributo;
    margin-left: 5px;
    width: 100%;}
.pessoal-pericia{
    grid-area: pericia;

    width: 100%;}
.container-geral div {
    margin-right: 20px;}
.pessoal-lateral button{
    margin-top: -18px;
    margin-bottom: 1px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: rgb(70, 70, 70) 2px solid;
    background-color: rgb(56, 56, 56);
}
.pessoal-lateral button:hover{
    background-color: rgb(80, 80, 80);
}
.pessoal-lateral button img{
    width: 90%;
    height: 90%;
    opacity: 0.6;}
.pessoal-lateral button img:hover{
    opacity: 1;}

.pessoal-detalhes form{
    text-align: left;
    border: 1px solid #fff;
    border-radius: 5px;
    padding-left: 30px;}
.box-movi{
 
    height: 100%;

}
.box-movi div{
    text-align: center;

}
.box-movi div h3{
    margin: 0 auto;
    color: bisque;
}
.barra-ar p, .box-movi p{
    border: none;
    width: 100%;
    border-bottom: 2px solid #a2a2a2;
    padding: 3px 4px;
    margin: 10px auto;
    background-color: #0a0b0c;
    color: #fff;
    font-family: 'Itim', sans-serif;}
    .barra-ar p:hover, .box-movi p:hover{
    border-bottom: 2px solid black;
    background-color: #fff;
    color: black;}

.container-geral div div input{
    height: 30px;}
#line03{
    display: flex;}
#input-padrao2 input{
    width: 100px;}

.input-padrao0{
    width: 100%;
    height: 70px;}
input {
    border: none;
    border-bottom: 2px solid #a2a2a2;
    padding: 3px 4px;
    margin-bottom: 10px;
    background-color: #0a0b0c;
    color: #fff;
    font-family: 'Itim', sans-serif;}
input[type="number"]:hover{

background-color: rgba(255, 255, 255, 1);
color: black;
}
input:focus {
    outline: none;}
.display-block{
    display: block;}
.contagemBarra {
    
    width: 100%;
    margin-left: 10px;}
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
.modalP{
    position:fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgb(0 0 0 / 52%);}

.formModal{
    display:flex;
    flex-direction: column;
    align-content: center;}
.conteinerModal{
    background-color: #0a0b0c;
    text-align:center; 
    margin: 10% 25%;
    padding: 20px;
    border: 2px solid #898;
    width: 50%;}
.conteinerModal h2{
    font-size: 30px;
    margin: 0 auto;}
.conteinerModal label{
    font-size: 25px;}
.conteinerModal input{
    font-size: 25px;
    text-align: center;
    width:93%;}
.conteinerModal h4{
    height: 30px;
    color: #fff;
    font-size: 50px;
    margin: 40px auto;}
.conteinerModal h3{
    margin: 0 auto;
    height: 56px;
    color: #fff;
    font-size: 35px;}
.conteinerModal p{
    height: 50px;
    color: #fff;
    font-size: 35px;
    margin: 0 auto;
    display: block;}
.conteinerModal input[type=submit]{ 
    margin:  0 auto;
    border: 2px solid;
    width:80%;
    padding: 1px 20px 1px;
    color: #fff;    
    height: 50px;
    font-size: 35px;}
.conteinerModal input[type=submit]:hover{ 
    margin:  0 auto;
    border: 2px solid;
    width:80%;
    padding: 1px 20px 1px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}
.modal-atributo form input[type="submit"]:hover{
    font-size: 35px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 116px
}
.container-avatar{
    height:140px;
    background-color: rgb(41, 41, 41);
    border-radius: 20px;
    padding: 30px;
    display: grid;
     grid-template-areas: 
        'none none d20 d20';}
.container-avatar img{
    width: 150px;
    height: 150px;
    grid-area: d20;}
.avatar{
    grid-area: avatar;
    width: 151px;}
.contagemBarra{
    font-size: 20px;}
.pessoal-resistencia {
    padding-top: 0px;
    text-align: center;
    display:flex;
    border: 1px solid rgb(175, 175, 175);
    max-width: 98.5%;

}
.pessoal-resistencia h2{
    display:flex;
    align-content: center;
    margin:20px auto;
    height:50px;
    font-size: 20px;

}
.pessoal-resistencia div{

}
.pessoal-resistencia div h3{
    font-size: 15px;    
    margin:10px 5px auto;   
    border: 1px solid rgb(175 175 175/40%);
    border-bottom: 1px solid rgb(175 175 175/80%);

}
.pessoal-resistencia div input[type="number"]{
    margin:5px auto;
    font-size: 25px;
    text-align: center;
    width: 100px;
 
}
.pessoal-resistencia div input[type="number"]:hover{
    
    background-color: rgba(255, 255, 255, 1);
    color: black;
}
.resistencias{
    background-color: rgb(60, 60, 60);   
    display: block;}
.resistencias div{
    background-color: rgb(132, 132, 132);
    width: 130px;
    text-align: center;

    margin:0;}
.resistencias div p {
    font-size: 15px;
    margin:0 auto;}
.resistencias div h3 {
    font-size: 16px;
    margin:0 auto;}



.atributos{
    width: 100%;}
.atributos .atributosLista{
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-left: 0px;}

.containerAtributos, .containerPericia{
    overflow: hidden;
    border: 1px solid #fff;
    border-top: none;
    padding-bottom: 10px;
    width: 100%;}
.containerAtributos ul{
    padding: 0;
    margin: 0 auto;
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
    font-size: 20px;
    margin: 5px auto;
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
    background-color: #0a0b0c;
    border-bottom: 2px solid rgb(196, 196, 196);
}
.containerAtributos ul li p:hover, .containerPericia ul li p:hover{
    color: black;
    background-color: #ffff;
    border-bottom: 2px solid rgb(196, 196, 196);
}
.modal-dado{
     background-color: #0a0b0c;
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 30%;  
}
.modal-dado p{
    display: none;
    transition: background 0.5s ;
    font-size: 30px;
    border: 2px solid rgb(277 277 277 / 52%);
    margin: 10px auto;
}
.modal-dado h2{
    font-size: 30px;}
.modal-dado h4{ 
    font-size: 40px;
    margin: 0 auto;}
.modal-atributo{
     background-color: #0a0b0c;
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 30%;  
}
.modal-atributo h2{
    font-size: 25px;
    display:block;
}
.modal-atributo form label{
    font-size: 30px;
    display:block;
}
.modal-atributo form input[type="number"]{
    font-size: 25px;
    color: #fff;
    background-color: rgb(14, 14, 14);
    display:block;
    text-align: center;
    margin: 0 auto;
    width: 110px
}

.modal-atributo form input[type="number"]:hover{
    color: black;
    background-color: #ffff;    
}
.modal-atributo form input[type="submit"]{
    font-size: 25px;
    color: #fff;
    display:block;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    width: 116px;
}
.modal-atributo form input[type="submit"]:hover{
    font-size: 25px;
    color: rgb(0, 0, 0);
    background-color: #fff;
    border-left: 2px solid rgb(134, 134, 134);
    border-right: 2px solid rgb(134, 134, 134);
}
.modal-pericia{
    background-color: #0a0b0c;
    text-align:center;
    margin: 10% 30%;
    padding: 20px;
    border: 2px solid #898;
    width: 50%;  
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
#imgAtributo{
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    opacity: 0.7;

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
    </style>
