<template>
  <AutoComplete
    icon="ios-search"
    :placeholder="placeHolder"
    style="width: 400px; border-radius: 5px;"
  ></AutoComplete>
</template>
<script>
  export default {
    props: {
      options: {
        type: Array,
        default: () => [],
      },
      placeHolder: {
        type: String,
      },
    },
  };
</script>
