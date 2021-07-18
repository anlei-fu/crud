<template>
  <div class="scroll" :style="{ 'max-height': maxHeight }">
    <slot />
  </div>
</template>
<script>
  export default {
    props: {
      maxHeight: {
        type: String,
        // default: "400px",
      },
      height: {
        type: String,
        default: "",
      },
    },
  };
</script>
<style scoped>
  .scroll {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
