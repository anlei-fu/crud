<template>
  <Button style="width: 90px; margin-left: 5px;" type="warning" @click="click">
    <Icon type="ios-create-outline" size="18" />
    {{ label }}
  </Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "Edit",
      },
    },
    methods: {
      click() {
        this.$emit("click");
      },
    },
  };
</script>
