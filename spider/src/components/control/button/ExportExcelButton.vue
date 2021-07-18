<template>
  <Button :size="size" :loading="loading" style="margin-left: 5px;" type="success" @click="click">
    <Icon type="md-download" size="18" />
    {{ label }}
  </Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "下载",
      },
      loading:Boolean,
      size:String

    },
    methods: {
      click() {
        this.$emit("click");
      },
    },
  };
</script>
