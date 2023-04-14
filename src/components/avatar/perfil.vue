<template>
    <div>
        <div @click="toggleShow" class="box-perfil">
            <template v-if="!imgDataUrl">
                <img src="@/assets/img/perfil1.jpg" alt="" />
            </template>
            <template v-else>
                <img :src="imgDataUrl" alt="" />
            </template>
            
        </div>
        <Upload field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="250"
            :height="250"
            url=""
            langType="pt"
            :params="params"
            :headers="headers"
            img-format="png">
        </Upload>
    </div>
</template>
<script>
import axios from 'axios';
import Upload from 'vue-image-crop-upload';

export default {

  
    components:{
        Upload
    },
    data() {
        return{
            
        show: false,
        params : {
            token: '12321',
            name: 'avatar'
        },
        headers : {
            smail : '*_~'
        },
        imgDataUrl : null
        }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
          /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      console.log(field)
      this.imgDataUrl = imgDataUrl;
      const formData = new FormData();
    


      this.$emit("u_imagem_base64", imgDataUrl)

        
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }
  }
    
}
</script>
<style lang="scss">
.box-perfil {
    cursor: pointer;
    background-color: #ffffff;
    background-image: url("@/assets/ico/upload_ico.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size:auto;

    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid rgba(190, 190, 190, 0.6);
    overflow: hidden;

    @media screen and (max-width: 600px) {
        width: 110px;
        height: 110px;
    }
}

.box-perfil:hover {
  background-color: #a2a2a2;
  border: 2px solid rgb(233, 233, 233);
  img{
    opacity: 0.4;
    transform: display ease 1s;
  }
}
.box-perfil img {
  width: 100%;
  height: 100%;
}
</style>