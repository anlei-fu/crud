<template>
  <div>
    <p class="footer-lable" v-for="item in items" :key="item">{{ item }}</p>
  </div>
</template>
<script>
  export default {
    props: {
      items: Array,
    },
  };
</script>
<style scoped>
  .footer-lable {
    font-size: 15px;
    line-height: 21px;
    text-align: center;
    color: #999999;
  }
</style>
