<template>
  <Button style="width: 90px; margin-left: 5px;" type="error" @click="click">
    <Icon type="ios-trash-outline" size="18" />
    {{ label }}
  </Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "Delete",
      },
    },
    methods: {
      click() {
        this.$emit("click");
      },
    },
  };
</script>
