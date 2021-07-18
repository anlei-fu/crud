<template>
  <Button type="primary" :size="size" @click="click">
    <Icon type="ios-search" size="18" />
    {{ label }}
  </Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "Search",
      },
      size:String
    },
    methods: {
      click() {
        this.$emit("click");
      },
    },
  };
</script>
