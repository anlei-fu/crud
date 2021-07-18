<template>
  <div>
    <span style="float: right;">
      <Icon type="md-settings" size="20" @click="onclick" />
    </span>
  </div>
</template>
<script>
  export default {
    methods: {
      onclick() {
        this.$emit("click");
      },
    },
  };
</script>
