<template>
    <div class="content-system">
        <div class="modal-system" v-if="display_modal_armamento === true">
            <h5 class="close_modal" @click="close_armamentos()">
                X
            </h5>
            <ModalArmamento />
        </div>

        <div class="modal-system" v-if="display_modal_acessorio === true">
            <h5 class="close_modal" @click="close_acessorio()">
                X
            </h5>
            <ModalAcessorio />
        </div>

        <div class="modal-system" v-if="display_modal_ritual === true">
            <h5 class="close_modal" @click="close_ritual()">
                X
            </h5>
            <ModalRitual />
        </div>

        <div class="item largura">
            <div  class="content-session-add flex">
                <img src="" alt="">
                <h3>acessórios</h3>
                <div class="btn-add-session" @click="open_acessorio()">
                    <h4 class="flex">+</h4>
                </div>
            </div>
            <table>
                <tr>
                    <th>descrição</th>
                    <th>observação</th>
                    <th>espaco</th>
                </tr>
                <tr v-for="(item, index) in list_acessorios" :key="item.id"> 
                    <td>{{ item.descricao }}</td>
                    <td>{{ item.obs }}</td>
                    <td>{{ item.espaco }}</td>
                </tr>
            </table>
        </div>
        <div class="armamento largura">
            <div  class="content-session-add flex">
                <h3>armamentos</h3>
                <div class="btn-add-session">
                    <h4 class="flex" @click="open_armamentos()">+</h4>
                </div>
            </div>
            <table>
                <tr>
                    <th>descrição</th>
                    <th>dano</th>
                    <th>alcance</th>
                    <th>espaco</th>
                </tr>
                <tr v-for="(item, index) in list_armamentos" :key="item.id"> 
                    <td>{{ item.descricao }}</td>
                    <td>{{ item.dano_passivo }}</td>
                    <td>{{ item.alcance }}</td>
                    <td>{{ item.espaco }}</td>
                </tr>
            </table>

        </div>
        <div class="magia largura">
            <div  class="content-session-add flex">
                <h3>rituais</h3>
                <div class="btn-add-session" @click="open_ritual()">
                    <h4 class="flex">+</h4>
                </div>
            </div>
            <table>
                <tr>
                    <th>descrição</th>
                    <th>dano</th>
                    <th>ocultismo</th>
                    <th>alcance</th>
                </tr>
                <tr v-for="(item, index) in list_rituais" :key="item.id"> 
                    <td>{{ item.descricao }}</td>
                    <td>{{ item.dano_passivo }}</td>
                    <td>{{ item.ocultismo }}</td>
                    <td>{{ item.alcance }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import armamentos from '@/json/armamentos'

import ModalArmamento from '@/components/sistema/ModalArmamento'
import ModalAcessorio from '@/components/sistema/ModalAcessorio'
import ModalRitual from '@/components/sistema/ModalRitual'

export default {
    components:{
        ModalArmamento, ModalAcessorio, ModalRitual
    },
    data(){
        return{
            display_modal_armamento : false,
            display_modal_acessorio: false,
            display_modal_ritual : false,
            list_armamentos : null,
            list_acessorios : null,
            list_rituais : null,
        }
    },
    methods:{
        close_armamentos(){
            this.display_modal_armamento = false
        },
        open_armamentos(){
            this.display_modal_armamento = true
        },
        close_acessorio(){
            this.display_modal_acessorio = false
        },
        open_acessorio(){
            this.display_modal_acessorio = true
        },
        close_ritual(){
            this.display_modal_ritual = false
        },
        open_ritual(){
            this.display_modal_ritual = true
        },

        get_list_armamentos(){
            const url = "http://170.10.0.50:8000/armamento/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params : { fk_user : parseInt( sessionStorage.getItem("user_id") ) }, headers : headers })
            .then( res => {
                this.list_armamentos = res.data
                console.log(res.data)
            })
            .catch( error => { 
                console.log(error)
            })

        },
        get_list_acessorios(){
            const url = "http://170.10.0.50:8000/acessorios/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params : { fk_user : parseInt( sessionStorage.getItem("user_id") ) }, headers : headers })
            .then( res => {
                this.list_acessorios = res.data
                console.log('acessorios')
                console.log(res.data)
            })
            .catch( error => { 
                console.log(error)
            })

        },
        get_list_rituais(){
            const url = "http://170.10.0.50:8000/rituais/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params : { fk_user : parseInt( sessionStorage.getItem("user_id") ) }, headers : headers })
            .then( res => {
                this.list_rituais = res.data
                console.log(res.data)
            })
            .catch( error => { 
                console.log(error)
            })

        },
    },
    mounted(){
        this.get_list_armamentos();
        this.get_list_acessorios();
        this.get_list_rituais();
    }

}
</script>
<style scoped lang="scss">
/* Firefox */
::-moz-scrollbar {
    width: 12px;
  }
  
  ::-moz-scrollbar-track {
    background-color: #222;
  }
  
  ::-moz-scrollbar-thumb {
    background-color: #777;
    border-radius: 6px;
  }
  
  /* Chrome */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: #222;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #777;
    border-radius: 6px;
  }
  
.content-system{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    .modal-system{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;  
        .close_modal{
            position: absolute;
            margin: 0;
            padding: 1em;
            background-color: rgba(255, 0, 0, 0.295);
            top: 0;
            right: 0;
            cursor: pointer;
        }
        .close_modal:hover{
            background-color: rgba(255, 0, 0, 0.938);
        }
    }
    .largura{
        width: 33.333%;
        table{
            width: 100%;
            text-align: center;
            tr td{
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
                cursor: pointer;
            }
            tr:hover{
                background-color: rgba(80, 80, 80, 0.342);
            }
        }
    }
    .item{
        background-color: rgba(0, 255, 255, 0.0);
    }
    .armamento{
        background-color: rgba(72, 255, 0, 0.0);
    }
    .magia{
        background-color: rgba(155, 57, 194, 0.0);
    }
    .item:hover, .armamento:hover, .magia:hover{
        background-color: #2e2e2e1a;
    }

}    
.container-list-armamentos{
    width: 100%;
    .content-armamento{
        background-color: rgba(127, 255, 212, 0.281);
        p{

        }
    }
}
</style>