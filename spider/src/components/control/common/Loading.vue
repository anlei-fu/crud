<template>
  <div v-if="loading" class="_container">
     <div class="_content">
     <vue-loading type="spin" color="#12A4DF" :size="{ width: '50px', height: '50px' }"></vue-loading> 
     <div>正在解析数据</div>
     </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    loading: Boolean,
  },
};
</script>
<style scoped>
._container {
  z-index: 100000;
  text-align: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
}
._content {
   margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
