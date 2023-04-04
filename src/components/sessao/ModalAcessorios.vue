<template>
    <div class="modal-session" v-if="modal_opened == true">
        <button class="btn-x" @click="close_modal()">X</button>
        <!-- <ModalNewAcessorio @fechar-modal="close_modal()" /> -->
    </div>
    <div class="acessorios-session">
        
        <div class="acessorio-sticky-content">
            <div class="content-save" >
                <h3>Personalizar Acessórios</h3>
                <h5>carregar ordem paranormal</h5>
                <img src="@/assets/ico/save_ico.svg" @click="salvar_acessorios()" alt="Salvar acessorio" srcset="">
                    
            </div>
            <div class="content-add">  
                <div class="input-field">
                    <label for="nome_acessorio">Nome</label>
                    <input type="text" name="nome_acessorio" v-model="nome_acessorio"  id="nome_acessorio">
                </div>
                <div class="input-field">
                    <label for="desc_acessorio">Descrição</label>
                    <input type="text" name="desc_acessorio" v-model="desc_acessorio"  id="desc_acessorio">
                </div>
                <div class="input-field">
                    <label for="espaco_acessorio">Espaço</label>
                    <input type="number" name="espaco_acessorio" v-model="espaco_acessorio"  id="espaco_acessorio">
                </div>
                
            </div>
            <button @click="adicionar_acessorio()">Adicionar</button>
        </div>
        <table>
            <tr>
                <th>nome</th>
                <th>descrição</th>
                <th>espaço</th>
            </tr>
            <tr v-for="(item, index) in list_acessorios" :key="item.id"> 
                <td>{{ item.nome }}</td>
                <td>{{ item.descricao }}</td>
                <td>{{ item.espaco }}</td>
                <!-- <td><img src="@/assets/ico/edit_ico.svg" alt="" srcset=""></td> -->
                <td><img src="@/assets/ico/remove_ico.svg" alt="" srcset=""></td>
            </tr>
        </table>
      </div>
</template>
<script>
import axios from 'axios';
//import ModalNewAcessorio from './add/ModalNewAcessorio'
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}}`

export default {
    components :{
     //   ModalNewAcessorio
    },
    data(){
        return{
            user_id : sessionStorage.getItem('user_id'),
            acessorios_session : [],
            list_acessorios : [],

            nome_acessorio : "",
            desc_acessorio : "",
            espaco_acessorio : "",

            modal_opened : false
        }
    }, 
    methods:{
        get_now(){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
        },
        adicionar_acessorio(){
            var obj = {
                nome : this.nome_acessorio,
                descricao : this.desc_acessorio,
                espaco : this.espaco_acessorio
            }
            if(this.nome_acessorio.length > 0){
                this.list_acessorios.push(obj);
                this.clean_input()
            }
        },
        clean_input() {
            this.nome_acessorio = "";
            this.desc_acessorio = "";
            this.espaco_acessorio = "";
        },
        get_acessorios(){
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = "http://170.10.0.50:8000/acessoriosSession/";

            axios.get(url, { params : { fk_session : sessionStorage.getItem("session_id")}, headers : headers })
            .then( res => {
             //   this.list_acessorios = res.data
                this.acessorios_session = res.data
                res.data.forEach(acessorios => {
                   this.get_acessorio(acessorios.fk_acessorio);
                });
            })
            .catch( error => { 
                console.log(error)
            })
        },
        get_acessorio(id) {
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = "http://170.10.0.50:8000/acessorioSession/";

            axios.get(url, { params : { id : id}, headers : headers })
            .then( res => {
                console.log(res.data)
                this.list_acessorios = this.list_acessorios.concat(res.data);
            })
            .catch( error => { 
                console.log(error)
            })
        },
        salvar_acessorios(){      
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            this.list_acessorios.forEach(acessorio => {
                post_acessorio(acessorio)
            });

            function post_acessorio(body) {
                const url = "http://170.10.0.50:8000/acessorioSession/";

                axios.post(url, body, { headers : headers })
                .then( res => {
                    console.log(res)
                    post_acessorios(res.data.id)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            function post_acessorios(id) {
                const url = "http://170.10.0.50:8000/acessoriosSession/";
                const body_acessorios = {
                    fk_acessorio : id,
                    fk_session : sessionStorage.getItem("session_id")
                }
                axios.post(url, body_acessorios, { headers : headers })
                .then( res => {
                    this.list_acessorios = [];
                    this.get_acessorios();
    
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            
        },
        delete_acessorios(id){
            console.log(id)
            this.acessorios_session.forEach(acessorios => {
                console.log(acessorios)
                if( id === acessorios.fk_acessorio ){
                    const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
                    const url = `http://170.10.0.50:8000/acessorios/${acessorios.id}/`;
                    axios.delete(url, { headers : headers })
                    .then( res => {
                        this.list_acessorios = []
                        setTimeout(() => {
                            this.get_acessorios()
                        }, 100);
                    })
                    .catch( error => { 
                        console.log(error)
                    });
                }
            }); 
        },
        open_modal(){
          this.modal_opened = true;
        },
        close_modal(){

          this.modal_opened = false;
          this.list_acessorios = []
          this.get_acessorios();
        },

    }, mounted(){
        // GET HORA ATUAL
        this.get_now()
        setInterval(() => {
          this.get_now()
        }, 1000);
        this.get_acessorios();
    }

}

</script>
<style scoped lang="scss"> 
.modal-session {
    background-color: rgba(0 0 0 / 0.4);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 5;
}
.acessorios-session {
    padding: 0;
    border: 1px solid bisque;
    background-color: rgba(0  0  0 / 0.5);
    
    min-width: 35%;

    height: auto;
    box-shadow: 0px 0px 3px #f3eacd;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-height: 80%;
    overflow-y: auto;
    top: 8vh;
    position: absolute;
    
    .acessorio-sticky-content{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 1em 0px 5px #292929;
        position: sticky;
        top: 0;
        background-color: rgba(0  0  0 / 0.6);
        padding-bottom: 1vmax;
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
            h5{
                cursor: pointer;
                font-size: 1em;
                padding: 0.3em;
                margin: 0;
                background-color: #292929;
                border: 1px solid #181818;
            }
            h5:hover{
                background-color: #464646;
                border: 1px solid #313131;
            }
            img{
                height: 1.4em;
                aspect-ratio: 1/1;
                cursor: pointer;
            }
        }
        .content-add{
            padding: 1em 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            min-width: 70%;
            max-width: 80%;
            margin: 0 auto;
            .input-field{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding: 0.5em 0;
                gap: 0.5em;
                input{
                    width: 40%;
                    font-size: 1em;
                    font-family: "Consolas";
                    padding: 0.4em 1em;
                    color: #292929;
                    
                }
                button{
                    margin: 0;
                    padding: 0.5em;
                    img{
                      height: 1em;
                      aspect-ratio: 1/1;
                    }
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
        min-height: 5vmax;
        text-align: center;
        tr:nth-child(even){
            background-color: rgba(46, 46, 46, 0.418);
        }
        tr:nth-child(odd){
            background-color: rgba(94, 94, 94, 0.418);
        }
        th{
            background-color: rgba(0, 0, 0, 0.747);
        }
        td{
            img{
                height: 1em;
                aspect-ratio: 1/1;
                
            }  
            img:hover{
                cursor: pointer;
            }
        }
    }

}
.acessorios-session:hover{
    box-shadow: 0px 0px 5px #fff;
    transition: ease 0.5s;
}


</style>