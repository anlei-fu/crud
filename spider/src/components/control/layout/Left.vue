<template>
  <div style="width: 100%; text-align: left">
    <div
      :style="{ display: 'inline-block', padding: '5', width: width }"
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
