<template>
    <div class="pericias-session">
        <div class="pericia-sticky-content">
            <div class="content-save" >
                <h3>Personalizar Perícias</h3>
                <img src="@/assets/ico/save_ico.svg" @click="salvar_pericias()" alt="Salvar pericia" srcset="">
                    
            </div>
            
            <div class="content-pericia">  
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
            const url = "http://192.168.100.26:8000/pericias/";

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
            const url = "http://192.168.100.26:8000/pericia/";

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
                const url = "http://192.168.100.26:8000/pericia/";

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
                const url = "http://192.168.100.26:8000/pericias/";
                const body_pericias = {
                    fk_pericia : id,
                    fk_session : sessionStorage.getItem("session_id")
                }
                axios.post(url, body_pericias, { headers : headers })
                .then( res => {
                    window.location.reload()
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
                    const url = `http://192.168.100.26:8000/pericias/${pericias.id}/`;
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

.pericias-session {
    padding: 0;
    border: 1px solid bisque;
    background-color: rgba(0  0  0 / 0.5);
    min-width: 28%;
    max-width: 47%;
    height: auto;
    box-shadow: 0px 0px 3px #f3eacd;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-height: 80%;
    overflow-y: auto;
    
    .pericia-sticky-content{
        width: 100%;
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
        .content-pericia{
            padding: 1em 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            min-width: 70%;
            max-width: 80%;
            margin: 0 auto;
            .input-field{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5em 0;
        
                input{
                    
                    font-size: 1em;
                    font-family: "Consolas";
                    padding: 0.4em 1em;
                    color: #292929;
                    
                }
                button{
                    margin: 0;
                    padding: 0.5em;
                }
            }
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
.pericias-session:hover{
    box-shadow: 0px 0px 5px #fff;
    transition: ease 0.5s;
}


</style>