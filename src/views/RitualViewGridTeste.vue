<template>
<div class="contente-principal">
	<div class="titulo"> 
		<h2>{{this.$route.params.nome}}</h2>
	</div>
	<div class="ladoA">
		
			
			<div class="conteiner-descricao">
				<div>
					<div class="descricao">
						<h2>Descrição</h2>
						<p id="descricao">{{this.$route.params.descricao}}</p>

					</div>
					<div class="caixaA">
						<table>
						<tr>
							<th>ELEMENTOS </th>
						</tr>
						<tr v-for="(elemento, index) in elementos" :key="index">
							<td >{{elemento}}</td>
						</tr>
						
					</table>
					<table>
						<tr>
							<th>EFEITO </th>
						</tr>
						<tr >
							<td >{{this.$route.params.efeito}}</td>
						</tr>
						
					</table>
					</div>
					<div class="caixaB">
						<div class="alcance">
					<h3>Alcance</h3>
					<p>{{getAlcance(Number(this.$route.params.alcance))}}</p>
				</div>
				<div class="custoO">
					<h3>Custo de Ocultismo</h3>
					<p>{{this.$route.params.custoO}}</p>
				</div>
				<div class="custoS">
					<h3>Custo de Sanidade</h3>
					<p>{{this.$route.params.custoS}}</p>
				</div>
						
					</div>
					<div class="conjuracao">
							<h2>Conjuração</h2>

		<div v-for="ingrediente in filtrarIngredientes" :key="ingrediente.id">
			<input type="checkbox" name="requi01" id="">
			<label for="requi01">{{ingrediente.nome}}</label>

		</div>
		<div v-for="ingrediente1 in itensC" :key="ingrediente1.id">
			<input type="checkbox" name="requi01" id="">
			<label for="requi01">{{ingrediente1.nome}}</label>

		</div>
					</div>
					
				</div>
				
			</div>
	


	</div>
	<div class="ladoB">
		<div class="conteiner-elementos" style="display:block; margin-top: 10px;">
			<div class="elemento" v-for="elemento in filtrarElementos" :key="elemento.id">
				<img  :src="elemento.img" alt="">
			</div>
			<div class="elemento" v-for="elemento1 in elementosC" :key="elemento1.id">
				<img  :src="elemento1.img" alt="">
			</div>


		</div>
		
		<img :src="imgA" alt="">
	
	</div>

</div>
</template>
<script>
export default{
	props:{
		ele : Object
	},
	data(){
		return{
			elementos: [],
			elementosC: [],
			elementosS: [],
			requisitos: [],
			itensS : [],
			itensC : [],
			ritualA : 'RITUAL SELECIONADO',
			imgA : 'img/rituais/simbolo_camuflagem.webp',
			rituaiss: [
					{id:1, nome: 'Transceder', descricao:'Aterrorize-se com as infinitas possibilidades espreitando o seu futuro', elemento: ['SANGUE', 'MEDO'], efeito:'Dano', alcance:0, conjuracao: '', sanidade: 1, img : '/img/rituais/simbolo_pavorAnormal.webp'},
					{id:2, nome: 'Almaldiçoar tecnologia', descricao:'Aterrorize-se com as infinitas possibilidades espreitando o seu futuro', elemento: ['MORTE', 'CONHECIMENTO'], efeito:'Dano', alcance:0, conjuracao: '', sanidade: 1, img : '/img/rituais/simbolo_damaSangue.webp'},
					{id:3, nome: 'Invocar névoa', descricao:'Aterrorize-se com as infinitas possibilidades espreitando o seu futuro', elemento: ['ENERGIA', 'CONHECIMENTO'], efeito:'Dano', alcance:0, conjuracao: '', sanidade: 1, img : '/img/rituais/simbolo_zumbiBestial.webp'},
				
			],
			elementos: [
				{id:1, nome: 'ENERGIA', descricao: '', img:'/img/rituais/elementos/energia.webp'},
				{id:2, nome: 'MEDO', descricao: '', img:'/img/rituais/elementos/medo.webp'},
				{id:3, nome: 'CONHECIMENTO', descricao: '', img:'/img/rituais/elementos/conhecimento.webp'},
				{id:4, nome: 'SANGUE', descricao: '', img:'/img/rituais/elementos/sangue.webp'},
				{id:5, nome: 'MORTE', descricao: '', img:'/img/rituais/elementos/morte.webp'},
			]
		}


	},
	methods:{
		async getElementos(){
            const req = await fetch("http://localhost:3000/elementos");
            const data = await req.json();
             //console.log(data)
             this.elementosS = data
        },
		async getItens(){
            const req = await fetch("http://localhost:3000/itens");
            const data = await req.json();
             //console.log(data)
             this.itensS = data
        },
		imgAtual(imgN, nomeN){
			this.imgA = imgN
			this.ritualA = nomeN
		},getAlcance : function(x){
			console.log(x)
            if(x >= 0 && x <= 2){
                return "Pessoal"
            }else if(x > 2 && x <= 9){
                return "Curto"
            }else if(x > 9 && x <= 16){
                return "Médio"
            }else if(x > 16 && x <= 25){
                return "Longo"
            }else if(x > 25){
                return "Infinito"
            }
        },

	},
	computed:{
		filtrarElementos : function() {
            var o = []   
            this.elementosS.forEach(ele => {
                for(let i in this.elementos){
                    if(ele.nome == this.elementos[i]){
                        this.elementosC.push(ele)
						console.log("1 >"+ ele.nome)
						console.log("2 >"+ this.elementos[i])
                    return ele
                    }
                }                  
            })          
        },
		filtrarIngredientes : function() {
            var o = []   
            this.itensS.forEach(item => {
                for(let i in this.elementos){
                    if(item.nome == this.requisitos[i]){
                        this.itensC.push(item)
						console.log("1 >"+ item.nome)
						console.log("2 >"+ this.requisitos[i])
                    return item
                    }
                }                  
            })          
        } 

	},
	mounted(){
		this.getElementos();
		this.getItens();
	},
	created(){
		this.requisitos = this.$route.params.requisitos
		this.elementos = this.$route.params.elementos
		this.imgA = this.$route.params.img
		this.ritualA = this.$route.params.nome 
		console.log(this.$route.ele)
		console.log(this.$route.params.id)
		console.log(this.$route.params.nome)
		console.log(this.$route.params.descricao)
		console.log(this.$route.params.efeito)
		console.log(this.$route.params.elementos)
		console.log(this.$route.params.alcance)
		console.log(this.$route.params.requisitos)
		console.log(this.$route.params.custoS)
		console.log(this.$route.params.efeitoPassivo)
	}
}
</script>
<style scoped>
.contente-principal{
	display: grid;
	grid-template-areas: 

		'titulo titulo titulo titulo'
		'esquerdo esquerdo direito direito'

	;
	grid-gap: 10px;
}
.titulo{
	grid-area: titulo;
	width: 100%;
	height: 60px;
	background-color: rgb(277 277 277 / 0%);
	margin: 0 auto;
	margin-bottom: 0px;
}
.ladoA{
	display: grid;
	grid-template-areas: 

		'descricao descricao descricao descricao descricao'
		'caixaA caixaA caixaB caixaB caixaB'
		'conjuracao conjuracao conjuracao conjuracao conjuracao'
	;
	grid-gap: 5px;
	grid-area: esquerdo;
	width: 100%;
	background-color: rgb(167, 167, 167);
}
.descricao{
	grid-area: descricao;
	width: 100%;
	background-color: rgb(277 277 277 / 100%);
	background-color: rgb(228, 159, 159);
	display:flex;
}
.caixaA{
	grid-area: caixaA;
	width: 100%;
	background-color: rgb(277 277 277 / 100%);
	background-color: rgb(163, 117, 223);
	display:flex;
}
.caixaB{
	grid-area: caixaB;
	width: 100%;
	display:flex;
	background-color: rgb(277 277 277 / 100%);
	background-color: rgb(117, 223, 140)
}
.conjuracao{
	grid-area: conjuracao;
	width: 100%;
	display:flex;
	background-color: rgb(277 277 277 / 100%);
	background-color: rgba(247, 215, 129, 0.877) 0.877) 0.877), 0.877)
}
.ladoB{
	grid-area: direito;
	width: 100%;
	background-color: rgb(277 277 277 / 0%);
	display: flex;
}

.titulo h2{
	text-align: center;
	font-size: 35px;
	border-bottom: 2px solid rgb(192, 192, 192);
	border-top: 2px solid rgb(192, 192, 192);
}

img{
	width: 450px;
	height: 450px;
	border: 3px solid rgb(165 165 165 / 0%);
	float: right;
}

tr:hover {
    background: rgb(216, 216, 216);
    color: rgb(43, 43, 43);

}
th{
    border: 1px solid #fff;
	width: 250px;
}
tr{
    height: 50px;
    font-size: 20px;
	text-align: center;
  
}
.elemento{
	width: 150px;
	height: 150px;
	overflow: hidden;
	text-align: center;
	align-content: center;
	margin:auto 0 auto;
	float:bottom;
	border-radius: 50%;
	border: 1px solid #fff;
	display: flex;
}
.elemento img{
	width: 90%;
	height: 90%;
	margin: 0 auto;
	
}
.conteiner-descricao{
	display:flex;
}
#descricao{
	border: 1px solid #fff;
	padding: 10px;
}
.conteiner-descricao h3{
	border: 1px solid #fff;
	width:150px;
	text-align: center;
	}
.conteiner-descricao p{
	border: 1px solid rgb(44, 44, 44);
	width:150px;
	text-align: center;
	font-size: 25px;
}
.conteiner-descricao p:hover{
	border: 1px solid rgb(190, 190, 190);
	background-color: rgb(39, 39, 39);

	text-align: center;
}
.alcance{
	width:100%;	
}
.alcance h3{
	width:90%;
	text-align: center;	
}
.alcance p{
	width:90%;
	text-align: center;	
}
.quebra1{
	margin: 20px;
	margin-right:35px;
}
</style>