<template>
  <div class="modal-preloader">
    <div class="preloader">
      <img src="@/components/svg/spinner.svg" alt="" srcset="" />
      <!-- <div class="spinner"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  components: {},
};
</script>
<style lang="scss">
.modal-preloader {
  height: 90%;
  width: 90%;
  margin: auto 0;
  overflow: hidden;
  position: absolute;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.preloader {
  margin: auto 0;
  height: 16vmax;
  img {
    height: 100%;
    aspect-ratio: 1/1;
  }
}
</style>
