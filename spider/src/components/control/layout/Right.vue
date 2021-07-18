<template>
  <div style="width: 100%; text-align: right">
    <div
      :style="{ display: 'inline-block', padding: '0px 20px;', width: width }"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: String,
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
