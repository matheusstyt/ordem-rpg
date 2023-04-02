<template>
    <div class="atributos-session">
        <div class="atributo-sticky-content">
            <div class="content-save" >
                <h3>Personalizar Atributos</h3>
                <img src="@/assets/ico/save_ico.svg" alt="" srcset="">
                
            </div>
            
            <div class="content-atributo">  
                <div class="input-field">
                    <label for="nome_atributo">Nome</label>
                    <input type="text" name="nome_atributo" v-model="nome_atributo"  id="nome_atributo">
                    <button @click="adicionar_atributo()">Adicionar</button>
                </div>
            </div>
        </div>
        
        <ul>
            <li v-for="(item, index) in list_atributos" :key="index">
                <p>{{item.nome}}</p>
                <div class="conteiner-ico">
                    <div class="content-ico-op">
                        <img src="@/assets/ico/remove_ico.svg" alt="">
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
                session_id : sessionStorage.getItem("session_id")
            }
            this.list_atributos.push(obj);
            this.clean_input()
        },
        clean_input() {
            this.nome_atributo = "";
        },

        
    }, mounted(){
        // GET HORA ATUAL
        this.get_now()
        setInterval(() => {
          this.get_now()
        }, 1000);
    }
}

</script>
<style scoped lang="scss"> 

.atributos-session {
    padding: 0;
    border: 1px solid bisque;
    background-color: rgba(0  0  0 / 0.5);
    min-width: 50%;
    max-width: 60%;
    height: auto;
    box-shadow: 0px 0px 3px #f3eacd;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-height: 80%;
    overflow-y: auto;
    
    .atributo-sticky-content{
        width: 100%;
        box-shadow: 1em 0px 5px #292929;
        position: sticky;
        top: 0;
        background-color: rgba(0  0  0 / 0.6);
        .content-save{
            width: 100%;          
            border-bottom: 1px dashed rgba(46, 46, 46, 0.418);
            background-color: #1818184b;
            padding: 0.5em 0;
            margin: 0;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            img{
                height: 1.4em;
                aspect-ratio: 1/1;
                cursor: pointer;
            }
            h3 {
                color: white;
                margin: 0;
                
            }
            
        }
        .content-atributo{
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
        width: 90%;
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
.atributos-session:hover{
    box-shadow: 0px 0px 5px #fff;
    transition: ease 0.5s;
}


</style>