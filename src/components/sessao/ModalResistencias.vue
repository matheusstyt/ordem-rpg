<template>
    <div class="resistencias-session session-content-p">
        <div class="sticky-content">
            <div class="content-save" >
                <h3>Personalizar Resistências</h3>
                <img src="@/assets/ico/save_ico.svg" @click="salvar_resistencias()" alt="Salvar resistencia" srcset="">
                    
            </div>
            
            <div class="content-add">  
                <div class="input-field">
                    <label for="nome_resistencia">Nome</label>
                    <input type="text" name="nome_resistencia" v-model="nome_resistencia"  id="nome_resistencia">
                    <button @click="adicionar_resistencia()">Adicionar</button>
                </div>
            </div>
        </div>
        
        <ul>
            <li v-for="(item, index) in list_resistencias" :key="index">
                <p>{{item.nome}}</p>
                <div class="conteiner-ico">
                    <div class="content-ico-op" @click="delete_resistencias(item.id)">
                        <img src="@/assets/ico/remove_ico.svg" alt="" >
                    </div>
                   <div class="content-ico-op">
                        <img src="@/assets/ico/edit_ico.svg" alt="">
                    </div>

                </div>
                
            </li>
        </ul>
        <button @click="fechar_modal()">Fechar</button>
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
            resistencias_session : [],
            list_resistencias : [],
            nome_resistencia : ""
        }
    }, 
    methods:{
        get_now(){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
        },
        adicionar_resistencia(){
            var obj = {
                nome : this.nome_resistencia,
                valor : 0,
            }
            if(this.nome_resistencia.length > 2){
                this.list_resistencias.push(obj);
                this.clean_input()
            }
        },
        clean_input() {
            this.nome_resistencia = "";
        },
        get_resistencias(){
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = `${this.host}:${this.port}/resistencias/`;

            axios.get(url, { params : { fk_session : sessionStorage.getItem("session_id")}, headers : headers })
            .then( res => {
                this.resistencias_session = res.data
                res.data.forEach(resistencias => {
                    this.get_resistencia(resistencias.fk_resistencia);
                });
            })
            .catch( error => { 
                console.log(error)
            })
        },
        get_resistencia(id) {
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = `${this.host}:${this.port}/resistencia/`;

            axios.get(url, { params : { id : id}, headers : headers })
            .then( res => {
                console.log(res.data)
                this.list_resistencias = this.list_resistencias.concat(res.data);
            })
            .catch( error => { 
                console.log(error)
            })
        },
        salvar_resistencias(){      
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            this.list_resistencias.forEach(resistencia => {
                post_resistencia(resistencia)
            });

            function post_resistencia(body) {
                const url = `${this.host}:${this.port}/resistencia/`;
                console.log(body)
                axios.post(url, body, { headers : headers })
                .then( res => {
                    console.log(res)
                    post_resistencias(res.data.id)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            function post_resistencias(id) {
                const url = `${this.host}:${this.port}/resistencias/`;
                const body_resistencias = {
                    fk_resistencia : id,
                    fk_session : sessionStorage.getItem("session_id")
                }
                axios.post(url, body_resistencias, { headers : headers })
                .then( res => {
                    window.location.reload()
                    console.log(res)
                })
                .catch( error => { 
                    console.log(error)
                })
            }   
        },
        delete_resistencias(id){
            console.log(id)
            this.resistencias_session.forEach(resistencias => {
                console.log(resistencias)
                if( id === resistencias.fk_resistencia ){
                    const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
                    const url = `${this.host}:${this.port}/resistencias/${resistencias.id}/`;
                    axios.delete(url, { headers : headers })
                    .then( res => {
                        this.list_resistencias = []
                        setTimeout(() => {
                            this.get_resistencias()
                        }, 100);
                    })
                    .catch( error => { 
                        console.log(error)
                    });
                }
            }); 
        },
        fechar_modal(){
          this.$emit("close_modal_resistencias", false);
        }
    }, mounted(){
        // GET HORA ATUAL
        this.get_now()
        setInterval(() => {
          this.get_now()
        }, 1000);
        this.get_resistencias();
    }
}
</script>
<style scoped lang="scss"> 

</style>