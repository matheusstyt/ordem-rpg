<template>
<div class="contente-principal">
    <div class="titulo"> 
        <h2>INVENTÁRIO</h2> 
        <p>Peso Total: 172 /  19</p>
    </div>
    <div class="ladoA">
        
        <table >
            <tr>
                <th>NOME</th>
                <th>DESCRIÇÃO</th>
                <th>PESO</th>
            </tr>
            <tr v-for="item in filtrarRituais" :key="item.id">
                <td> {{item.nome}}</td>
                <td> {{item.descricao}}</td>
            </tr>
              <tr v-for="item1 in rituaisCarregados" :key="item1.id" @click="imgAtual(item1.img, item1.nome, item1)">
                <td> {{item1.nome}}</td>
                <td> {{item1.descricao}}</td>
            </tr>
   
        </table>
    </div>


</div>
</template>
<script>
export default{
    computed: {
        getTr : function(){
           // if()

        }
    },
    data(){
        return{
            a : 0,
            b : 0,
            elementos : [],
            ritualA : 'RITUAL SELECIONADO',
            imgA : 'img/rituais/simbolo_camuflagem.webp',
            rituaisUsuario: [

                ],
            rituaisCadastrados : [
            
            ],
            rituaisCarregados : [
            
            ]
        }

    },methods:{
        async getRituaisSistemas(){
            const req = await fetch("http://localhost:3000/rituais");
            const data = await req.json();
             //console.log(data)
             this.rituaisCadastrados = data


        },
        async getRituaisUsuario(){
            const req = await fetch("http://localhost:3000/personagem")
            const data = await req.json();
            //this.data.nome = data.personagem.nome
            //console.log()
            //console.log(data.data.rituais)

            this.rituaisUsuario = data.data.rituais 
        },
        compartilharData(){
            console.log("share")
            console.log(Object(this.x))
            this.$router.push({name:"ritual", ele:this.x.elementos, params:{
                id:this.x.id,
                nome:this.x.nome,
                img:this.x.img,
                descricao:this.x.descricao,
                elementos:this.x.elementos,
                efeito:this.x.efeito,
                alcance:this.x.alcance,
                requisitos:this.x.requisitos,
                custoS:this.x.custoS,
                custoO:this.x.custoO,
                efeitoPassivo:this.x.efeitoPassivo
                }})

        },
        getRitual: function(fk){
           // console.log("CARA AAUI",fk)
            //var fk = this.rituaisUsuario[]

        },
        imgAtual(imgN, nomeN, ritualS){
            this.imgA = imgN
            this.ritualA = nomeN
            this.x = ritualS
            console.log(this.x)

        },
        carregar(){
            console.log("teste" )
             this.rituaisUsuario.forEach(ritualu => {
                if(ritualu.fk == 1){
                    console.log(">>"+ritualu.id )
                }
            })
        }

    },mounted(){ 
        this.getRituaisUsuario();
        this.getRituaisSistemas();
        this.carregar();
            

    },
    computed:{
        
        filtrarRituais : function() {
            var o = []   
            this.rituaisUsuario.forEach(ritualu => {
                o.push(ritualu.fk)     
            })
            this.rituaisCadastrados.forEach(ritualc => {
                for(let i in o){
                    if(ritualc.id == o[i]){
                        this.rituaisCarregados.push(ritualc)
                        //Object.defineProperty(this.ritualS, )
                      //  this.ritualS = ritualc
                    return ritualc
                    }
                }                  
            })          
        }        
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
    grid-gap: 30px;
}
.titulo{
    grid-area: titulo;
    width: 100%;
    background-color: rgb(277 277 277 / 0%);
    text-align: center;

}
.titulo h2{
	text-align: center;
	font-size: 35px;
	border-bottom: 2px solid rgb(192, 192, 192);
	border-top: 2px solid rgb(192, 192, 192);
}
.ladoA{
    grid-area: esquerdo;
    width: 100%;
    background-color: rgb(277 277 277 / 0%)
}
.ladoB{
    grid-area: direito;
    width: 100%;
    background-color: rgb(277 277 277 / 0%)
}
.ladoB h2{
    text-align: center;
    font-size: 35px;
    border-bottom: 2px solid rgb(192, 192, 192);
    border-top: 2px solid rgb(192, 192, 192);
}
.ladoA h2{
    text-align: center;
    font-size: 35px;
    border-bottom: 2px solid rgb(192, 192, 192);
    border-top: 2px solid rgb(192, 192, 192);
}
img{
    width: 350px;
    height: 350px;
    border: 3px solid rgb(165 165 165 / 0%);
    float: right;
}
img:hover{
    width: 350px;
    height: 350px ;
    background-color: rgb(277 277 277 / 20%);
    border: 3px solid rgb(165 165 165 / 20%);
}
tr{
    height: 45px;
    font-size: 20px;
  
}
tr:hover {
    background: rgb(216, 216, 216);
    color: rgb(43, 43, 43);

}
th{
    border: 1px solid #fff
}
.btnA{
    background: rgb(212, 77, 77);
    width: 100%;
    color: #fff;

}
.btnE{
    background: rgb(71, 212, 106);
    width: 100%;
    color: #fff;
}
.btnA:hover{
    background: rgb(160, 28, 28);
    width: 100%;
    color: #fff;

}
.btnE:hover{
    background: rgb(13, 112, 38);
    width: 100%;
    color: #fff;
}

</style>