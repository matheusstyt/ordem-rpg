<template>
    <div class="pericias-session session-content-p">
        <div class="sticky-content">
            <div class="content-save" >
                <h3>Personalizar Perícias</h3>
                <img src="@/assets/ico/save_ico.svg" @click="salvar_pericias()" alt="Salvar pericia" srcset="">
                    
            </div>
            
            <div class="content-add">  
                <div class="input-field">
                    <label for="nome_pericia">Nome</label>
                    <input type="text" name="nome_pericia" v-model="nome_pericia"  id="nome_pericia">
                    <button @click="adicionar_pericia()">Adicionar</button>
                </div>
            </div>
        </div>
        
        <ul>
            <li v-for="(item, index) in list_pericias" :key="index">
                <p>{{item.nome}}</p>
                <div class="conteiner-ico">
                    <div class="content-ico-op" @click="delete_pericias(item.id)">
                        <img src="@/assets/ico/remove_ico.svg" alt="" >
                    </div>
                   <div class="content-ico-op">
                        <img src="@/assets/ico/edit_ico.svg" alt="">
                    </div>

                </div>
                
            </li>
        </ul>
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
            host: require("@/config/env").host,
            port: require("@/config/env").port,
            pericias_session : [],
            list_pericias : [],
            nome_pericia : ""
        }
    }, 
    methods:{
        get_now(){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
        },
        adicionar_pericia(){
            var obj = {
                nome : this.nome_pericia,
                valor : 0,
            }
            if(this.nome_pericia.length > 2){
                this.list_pericias.push(obj);
                this.clean_input()
            }
        },
        clean_input() {
            this.nome_pericia = "";
        },
        get_pericias(){
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = `${this.host}:${this.port}/pericias/`;


            axios.get(url, { params : { fk_session : sessionStorage.getItem("session_id")}, headers : headers })
            .then( res => {
                this.pericias_session = res.data
                res.data.forEach(pericias => {
                    this.get_pericia(pericias.fk_pericia);
                });
            })
            .catch( error => { 
                console.log(error)
            })
        },
        get_pericia(id) {
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = `${this.host}:${this.port}/pericia/`;

            axios.get(url, { params : { id : id}, headers : headers })
            .then( res => {
                console.log(res.data)
                this.list_pericias = this.list_pericias.concat(res.data);
            })
            .catch( error => { 
                console.log(error)
            })
        },
        salvar_pericias(){      
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            this.list_pericias.forEach(pericia => {
                post_pericia(pericia)
            });

            function post_pericia(body) {
                const url = `${this.host}:${this.port}/pericia/`;

                axios.post(url, body, { headers : headers })
                .then( res => {
                    console.log(res)
                    post_pericias(res.data.id)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            function post_pericias(id) {
                const url = `${this.host}:${this.port}/pericias/`;
                const body_pericias = {
                    fk_pericia : id,
                    fk_session : sessionStorage.getItem("session_id")
                }
                axios.post(url, body_pericias, { headers : headers })
                .then( res => {
                 //   window.location.reload()
                    console.log(res)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            
        },
        delete_pericias(id){
            console.log(id)
            this.pericias_session.forEach(pericias => {
                console.log(pericias)
                if( id === pericias.fk_pericia ){
                    const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
                    const url = `${this.host}:${this.port}/pericias/${pericias.id}/`;
                    axios.delete(url, { headers : headers })
                    .then( res => {
                        this.list_pericias = []
                        setTimeout(() => {
                            this.get_pericias()
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
        this.get_pericias();
    }

}

</script>
<style scoped lang="scss"> 

</style>