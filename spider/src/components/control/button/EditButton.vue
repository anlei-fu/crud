<template>
  <Button type="primary" icon="ios-search" @click="click">{{ label }}</Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "Search",
      },
    },
    methods: {
      _emit() {
        this.$emit("click");
      },
    },
  };
</script>
