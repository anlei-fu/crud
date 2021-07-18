<template>
  <Button style="width: 90px; margin-left: 5px;" type="success" @click="click">
    <Icon type="md-add" size="18" />
    {{ label }}
  </Button>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: "Add",
      },
    },
    methods: {
      click() {
        this.$emit("click");
      },
    },
  };
</script>
