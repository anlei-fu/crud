<template>
  <Button
    :loading="loading"
    :size="size"
    style="margin-left: 5px"
    @click="click"
  >
    <Icon type="ios-copy-outline" size="18" />
    {{ label }}
  </Button>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "复制",
    },
    loading: Boolean,
    size:String
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
