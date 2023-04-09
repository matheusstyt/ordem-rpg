<template>
    <preloader v-if="loading" />
    <div class="content-system" v-else>
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
            <div  class="content-add flex">
                <img src="" alt="">
                <h3>acessórios</h3>
                <div class="btn-add" @click="open_acessorio()">
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
            <div  class="content-add flex">
                <h3>armamentos</h3>
                <div class="btn-add">
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
            <div  class="content-add flex">
                <h3>rituais</h3>
                <div class="btn-add" @click="open_ritual()">
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
import preloader from '../gif/preloader.vue'
export default {
    components:{
        ModalArmamento, ModalAcessorio, ModalRitual, preloader
    },
    data(){
        return{
            display_modal_armamento : false,
            display_modal_acessorio: false,
            display_modal_ritual : false,
            list_armamentos : null,
            list_acessorios : null,
            list_rituais : null,
            loading : true
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
        get_list_acessorios(){
            const url = "http://192.168.100.52:8000/acessorios/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params : { fk_user : parseInt( sessionStorage.getItem("user_id") ) }, headers : headers })
            .then( res => {
                this.list_acessorios = res.data
                console.log('acessorios')
                console.log(res.data)

                this.get_list_armamentos();

            })
            .catch( error => { 
                console.log(error)
            })

        },
        get_list_armamentos(){
            const url = "http://192.168.100.52:8000/armamento/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params : { fk_user : parseInt( sessionStorage.getItem("user_id") ) }, headers : headers })
            .then( res => {
                this.list_armamentos = res.data
                console.log(res.data)
                this.get_list_rituais();
            })
            .catch( error => { 
                console.log(error)
            })

        },
        get_list_rituais(){
            const url = "http://192.168.100.52:8000/rituais/";
            
            const headers = {'Authorization': 'Token ' + sessionStorage.getItem('token') };

            axios.get(url, { params : { fk_user : parseInt( sessionStorage.getItem("user_id") ) }, headers : headers })
            .then( res => {
                this.list_rituais = res.data
                console.log(res.data)
                this.loading = false
            })
            .catch( error => { 
                console.log(error)
            })

        },
    },
    mounted(){
        
        this.get_list_acessorios();
        
        
        
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

  .container-new{
    width: 100%;
    display: flex;
    margin: 0.6em auto;
    p{
      font-size: 2vmax;
      text-align: center;
      margin: 1em;
    }
  }
  .content-add{
    margin: 0;
    border-bottom: 1px solid rgba( 255 255 255 / 0.7);
    position: relative;
    width: 100%;
    h3{
      margin: 0;
      padding: 0.5em 0;
    }
  }
  .btn-add{
    position: absolute;
    right: 2%;
    background-color: #4d4d4d83;
    border-radius: 0.5em;
    border: 1px dashed rgba(0  0  0 / 0.4);
    padding: 0 0.5em;
    cursor: pointer;

    h4{
      font-size: 2em;
      margin: 0;
      padding: 0;
    }
  }
  .btn-add:hover{
    background-color: #88888883;
    border: 1px dashed rgba(82, 82, 82, 0.4);
  }
.content-system{
    position: relative;
    width: 75vw;
    height: 90vh;

    display: flex;
    flex-direction: row;
    padding-top: 2.4vmax;
    gap: 0.3em;
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
        background-color: rgba(0, 0, 0, 0.63);
        border: 0.5px solid rgba(134, 134, 134, 0.185);
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
    .largura:hover{
        background-color: rgba(0, 0, 0, 0.774);
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