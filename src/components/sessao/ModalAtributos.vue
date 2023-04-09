<template>
    <div class="atributos-session session-content-p">
        <div class="sticky-content">
            <div class="content-save" >
                <h3>Personalizar Atributos</h3>
                <img src="@/assets/ico/save_ico.svg" @click="salvar_atributos()" alt="Salvar atributo" srcset="">
                    
            </div>
            
            <div class="content-add">  
                <div class="input-field">
                    <label for="nome_atributo">Nome</label>
                    <input type="text" name="nome_atributo" v-model="nome_atributo"  id="nome_atributo">
                    <button @click="adicionar_atributo()"><img src="@/assets/ico/add_ico.svg" alt="" srcset=""></button>
                </div>
            </div>
        </div>
        
        <ul>
            <li v-for="(item, index) in list_atributos" :key="index">
                <p>{{item.nome}}</p>
                <div class="conteiner-ico">
                    <div class="content-ico-op" @click="delete_atributos(item.id)">
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
            atributos_session : [],
            list_atributos : [],
            nome_atributo : ""
        }
    }, 
    methods:{
        get_now(){
            let now = new Date();
            let formatter = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'});
            let formattedDate = formatter.format(now);
            this.data_atual = formattedDate;
        },
        adicionar_atributo(){
            var obj = {
                nome : this.nome_atributo,
                valor : 0,
            }
            if(this.nome_atributo.length > 2){
                this.list_atributos.push(obj);
                this.clean_input()
            }
        },
        clean_input() {
            this.nome_atributo = "";
        },
        get_atributos(){
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = "http://192.168.100.52:8000/atributos/";

            axios.get(url, { params : { fk_session : sessionStorage.getItem("session_id")}, headers : headers })
            .then( res => {
                this.atributos_session = res.data
                res.data.forEach(atributos => {
                    this.get_atributo(atributos.fk_atributo);
                });
            })
            .catch( error => { 
                console.log(error)
            })
        },
        get_atributo(id) {
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            const url = "http://192.168.100.52:8000/atributo/";

            axios.get(url, { params : { id : id}, headers : headers })
            .then( res => {
                console.log(res.data)
                this.list_atributos = this.list_atributos.concat(res.data);
            })
            .catch( error => { 
                console.log(error)
            })
        },
        salvar_atributos(){      
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
            
            this.list_atributos.forEach(atributo => {
                post_atributo(atributo)
            });

            function post_atributo(body) {
                const url = "http://192.168.100.52:8000/atributo/";

                axios.post(url, body, { headers : headers })
                .then( res => {
                    console.log(res)
                    post_atributos(res.data.id)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            function post_atributos(id) {
                const url = "http://192.168.100.52:8000/atributos/";
                const body_atributos = {
                    fk_atributo : id,
                    fk_session : sessionStorage.getItem("session_id")
                }
                axios.post(url, body_atributos, { headers : headers })
                .then( res => {
                    window.location.reload()
                    console.log(res)
                })
                .catch( error => { 
                    console.log(error)
                })
            }
            
        },
        delete_atributos(id){
            console.log(id)
            this.atributos_session.forEach(atributos => {
                console.log(atributos)
                if( id === atributos.fk_atributo ){
                    const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };
                    const url = `http://192.168.100.52:8000/atributos/${atributos.id}/`;
                    axios.delete(url, { headers : headers })
                    .then( res => {
                        this.list_atributos = []
                        setTimeout(() => {
                            this.get_atributos()
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
        this.get_atributos();
    }

}

</script>
<style scoped lang="scss"> 



</style>