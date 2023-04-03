<template>
    <div class="armamentos-session">
        <div class="armamento-sticky-content">
            <div class="content-save" >
                <h3>Personalizar armamentos</h3>
                <img src="@/assets/ico/save_ico.svg" @click="salvar_armamentos()" alt="Salvar armamento" srcset="">
                    
            </div>
            
            <div class="content-armamento">  
                <div class="input-field">
                    <label for="desc_armamento">Descrição</label>
                    <input type="text" name="desc_armamento" v-model="desc_armamento" id="desc_armamento">
                </div>
                <div class="input-field">
                    <label for="categoria_1">Categoria I</label>
                    <input type="text" name="categoria_1" v-model="categoria_1" id="categoria_1">
                </div>
                <div class="input-field">
                    <label for="categoria_2">Categoria II</label>
                    <input type="text" name="categoria_2" v-model="categoria_2" id="categoria_2">
                </div>
                <div class="input-field">
                    <label for="categoria_3">Categoria III</label>
                    <input type="text" name="categoria_3" v-model="categoria_3" id="categoria_3">
                </div>
                <div class="input-field">
                    <label for="alcance">Alcance</label>
                    <input type="text" name="alcance" v-model="alcance" id="alcance">
                </div>
                <div class="input-field">
                    <label for="dano_passivo">Dano Passivo</label>
                    <input type="text" name="dano_passivo" v-model="dano_passivo" id="dano_passivo">
                </div>
                <div class="input-field">
                    <label for="dano_ativo">Dano Ativo</label>
                    <input type="text" name="dano_ativo" v-model="dano_ativo" id="dano_ativo">
                </div>
                <div class="input-field">
                    <label for="tipo">Tipo</label>
                    <input type="text" name="tipo" v-model="tipo" id="tipo">
                </div>
                <div class="input-field">
                    <label for="espaco_armamento">Espaço</label>
                    <input type="text" name="espaco_armamento" v-model="espaco_armamento" id="espaco_armamento">
                </div>
          
            </div>
            <button @click="adicionar_armamento()">Adicionar</button>

        </div>
        <table>
            <tr>
                <th>descrição</th>
                <th>categoria I</th>
                <th>categoria II</th>
                <th>categoria III</th>
                <th>alcance</th>
                <th>dano_passivo</th>
                <th>dano_ativo</th>
                <th>tipo</th>
                <th>espaço</th>
            </tr>
            <tr v-for="(item, index) in list_acessorios" :key="item.id"> 
                <td>{{ item.descricao }}</td>
                <td>{{ item.categoria_1 }}</td>
                <td>{{ item.categoria_2 }}</td>
                <td>{{ item.categoria_3 }}</td>
                <td>{{ item.alcance }}</td>
                <td>{{ item.dano_passivo }}</td>
                <td>{{ item.dano_ativo }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.espaco }}</td>
            </tr>
        </table>
      </div>
</template>
<script>
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}}`

export default {
    components :{
 
    },
    data(){
        return{
            user_id : sessionStorage.getItem('user_id'),
            armamentos_session : [],
            list_armamentos : [],
            nome_armamento : ""
        }
    }, 
    methods:{
        get_now(){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
        },
        adicionar_armamento(){
            var obj = {
                nome : this.nome_armamento,
                valor : 0,
            }
            if(this.nome_armamento.length > 2){
                this.list_armamentos.push(obj);
                this.clean_input()
            }
        },
        clean_input() {
            this.nome_armamento = "";
        },
        get_armamentos(){
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = "http://192.168.100.26:8000/armamentos/";

            axios.get(url, { params : { fk_session : sessionStorage.getItem("session_id")}, headers : headers })
            .then( res => {
                this.list_armamentos = res.data
                //this.armamentos_session = res.data
                //res.data.forEach(armamentos => {
                //    this.get_armamento(armamentos.fk_armamento);
                //});
            })
            .catch( error => { 
                console.log(error)
            })
        },
        get_armamento(id) {
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = "http://192.168.100.26:8000/armamento/";

            axios.get(url, { params : { id : id}, headers : headers })
            .then( res => {
                console.log(res.data)
                this.list_armamentos = this.list_armamentos.concat(res.data);
            })
            .catch( error => { 
                console.log(error)
            })
        },
        salvar_armamentos(){      
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            this.list_armamentos.forEach(armamento => {
                post_armamento(armamento)
            });

            function post_armamento(body) {
                const url = "http://192.168.100.26:8000/armamento/";

                axios.post(url, body, { headers : headers })
                .then( res => {
                    console.log(res)
                    post_armamentos(res.data.id)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            function post_armamentos(id) {
                const url = "http://192.168.100.26:8000/armamentos/";
                const body_armamentos = {
                    fk_armamento : id,
                    fk_session : sessionStorage.getItem("session_id")
                }
                axios.post(url, body_armamentos, { headers : headers })
                .then( res => {
                    window.location.reload()
                    console.log(res)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            
        },
        delete_armamentos(id){
            console.log(id)
            this.armamentos_session.forEach(armamentos => {
                console.log(armamentos)
                if( id === armamentos.fk_armamento ){
                    const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
                    const url = `http://192.168.100.26:8000/armamentos/${armamentos.id}/`;
                    axios.delete(url, { headers : headers })
                    .then( res => {
                        this.list_armamentos = []
                        setTimeout(() => {
                            this.get_armamentos()
                        }, 100);
                    })
                    .catch( error => { 
                        console.log(error)
                    });
                }
            }); 
        }

    }, mounted(){
        // GET HORA ATUAL
        this.get_now()
        setInterval(() => {
          this.get_now()
        }, 1000);
        this.get_armamentos();
    }

}

</script>
<style scoped lang="scss"> 

.armamentos-session {
    padding: 0;
    border: 1px solid bisque;
    background-color: rgba(0  0  0 / 0.5);
    min-width: 75%;
    max-width: 80%;

    height: auto;
    box-shadow: 0px 0px 3px #f3eacd;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-height: 80%;
    overflow-y: auto;
    
    .armamento-sticky-content{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 1em 0px 5px #292929;
        position: sticky;
        top: 0;
        background-color: rgba(0  0  0 / 0.6);
        .content-save{
            width: 80%; 
            min-width: 78%;          
            border-bottom: 1px dashed rgba(46, 46, 46, 0.418);
            background-color: #1818184b;
            padding: 0.5em 0;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            h3 {
                color: white;
                margin: 0;
                
            }
            img{
                height: 1.4em;
                aspect-ratio: 1/1;
                cursor: pointer;
            }
        }
        .content-armamento{
            padding: 1em 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            min-width: 80%;
            gap: 0.5em;
            margin: 0;
            .input-field{
 
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                
                padding: 0.5em 0;
        
                input{
                    max-width: 5em;
                    font-size: 1em;
                    font-family: "Consolas";
                    padding: 0.4em 1em;
                    color: #292929;
                    
                }
                
            }
            
        }
        button{
            margin: 0 auto;
            padding: 0.5em;
        }
    }
    


    button{
        padding: 0.4em;
        margin-bottom: 2em;
        color: #1b1b1b;
    }
    button:hover{
        color: #1b1b1b;
        background-color: bisque;
        transition: ease 0.5s;
        border: 2px solid rgb(224, 184, 135);
    }
    table{
        width: 100%;
   
    }
    ul{
        width: 80%;
        padding: 0;
        li{
            width: 100%;
            display: flex;
            padding: 0.5em 0;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(46, 46, 46, 0.0);
            gap: 1em;
            p{
                font-size: 1em;
                margin: 0;
            }
            .conteiner-ico{
                display: flex;
    
                gap: 1em;
                .content-ico-op{
                    height: 1.5em;
                    aspect-ratio: 1/1;
                    cursor: pointer;

                   
                }
            }
            
        }
        li:hover{
            border-bottom: 1px solid rgba(83, 83, 83, 0.418);
        }
    }
}
.armamentos-session:hover{
    box-shadow: 0px 0px 5px #fff;
    transition: ease 0.5s;
}


</style>