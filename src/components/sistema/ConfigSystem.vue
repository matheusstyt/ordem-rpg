<template>
    <div class="content-system">
        <div class="modal-system" v-if="display_modal_armamento === true" @click="close_armamentos()">
            <h5 class="close_armamentos" @click="close_armamentos()">
                X
            </h5>
            <ModalArmamento />
        </div>
        
        <div class="item largura">
            <div  class="content-session-add flex">
                <h3>Itens Cadastrados</h3>
                <div class="btn-add-session">
                    <h4 class="flex">+</h4>
                </div>
            </div>

        </div>
        <div class="armamento largura">
            <div  class="content-session-add flex">
                <h3>Armamentos Cadastrados</h3>
                <div class="btn-add-session">
                    <h4 class="flex" @click="open_armamentos()">+</h4>
                </div>
            </div>

        </div>
        <div class="magia largura">
            <div  class="content-session-add flex">
                <h3>Rituais Cadastrados</h3>
                <div class="btn-add-session">
                    <h4 class="flex">+</h4>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import armamentos from '@/json/armamentos'
import ModalArmamento from '@/components/sistema/ModalArmamento'
export default {
    components:{
        ModalArmamento
    },
    data(){
        return{
            display_modal_armamento : false,

        }
    },
    methods:{
        close_armamentos(){
            this.display_modal_armamento = false
        },
        open_armamentos(){
            this.display_modal_armamento = true
        },
    }

}
</script>
<style scoped lang="scss">

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
        background-color: rgba(0, 0, 0, 0.8);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;  
        .close_armamentos{
            position: absolute;
            margin: 0;
            padding: 1em;
            background-color: rgba(255, 0, 0, 0.295);
            top: 0;
            right: 0;
            cursor: pointer;
        }
        .close_armamentos:hover{
            background-color: rgba(255, 0, 0, 0.938);
        }
    }
    .largura{
        width: 33.333%;
    }
    .item{
        background-color: rgba(0, 255, 255, 0.2);
    }
    .armamento{
        background-color: rgba(72, 255, 0, 0.2);
    }
    .magia{
        background-color: rgba(155, 57, 194, 0.2);
    }
}    

</style>