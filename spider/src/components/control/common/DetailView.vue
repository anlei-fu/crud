<template></template>
<script>
  export default {
    props: {
      columnConfig: {
        type: Array,
        default: () => {},
      },
      data: {
        type: Object,
        default: {},
      },
      columns: {
        type: Number,
        default: 2,
      },
    },
    data() {
      return {
        items: [],
      };
    },
    created() {},
    watch: {
      data() {},
    },
  };
</script>
