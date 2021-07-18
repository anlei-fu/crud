<template>
  <Button type="primary" :loading="loading" @click="click"
    ><Icon type="ios-cloud-upload-outline" size="18" /> {{ label }}</Button
  >
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "导入",
    },
    loading: Boolean,
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
