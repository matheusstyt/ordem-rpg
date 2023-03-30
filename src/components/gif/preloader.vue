<template>
    <div class="modal-preloader">
        <div class="preloader">
          <img src="@/components/svg/spinner.svg" alt="" srcset="">
            <!-- <div class="spinner"></div> -->
        </div>
    </div>
    
  </template>
  <script>
  export default {
    components : {
       
    }
  }
</script>
  <style lang="scss">
  .modal-preloader{
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    margin: auto 0;
    overflow: hidden;
    position: relative;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .preloader {
    margin: auto 0;
    height: 7vmax;
    img{
      height: 100%;
      aspect-ratio: 1/1;

    }
  }
 
  </style>
  