<template>
  <a class="_card">
    <div :style="style">
      <slot />
    </div>
  </a>
</template>
<script>
export default {
  props: {
    style: String,
  },
};
</script>
<style scoped>
._card {
  color: inherit;
  margin: 10px 10px;
  padding: 10px;
  background-color: white;
  text-align: center;
}
._card :hover {
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
}
</style>
