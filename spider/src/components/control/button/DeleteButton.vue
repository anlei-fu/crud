<template>
  <Button style="width: 90px;" type="error" icon="md-add" @click="click">{{ label }}</Button>
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
