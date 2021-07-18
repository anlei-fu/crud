<template>
  <div class="text" @dblclick="copy" :style="{ color: color }" :title="value | formatter(format)">
    {{ value | formatter(format) }}
  </div>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: {
      value: {
        type: String | Number,
        default: "",
      },
      format: {
        type: Object | String,
        default: null,
      },
    },
    data() {
      return {};
    },
    computed: {
      color() {
        if (this.format && this.format.type && this.format.type == "enum"){
          let item =utils.getSingleEnum(this.format.pattern, this.value);
          return item?item.color:"";
        }
      },
    },
    methods: {
      copy() {
        let el = document.createElement("textarea");
        el.value = this.value;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.$Message.info("set to clipboard!");
      },
    },
  };
</script>
<style scoped>
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
