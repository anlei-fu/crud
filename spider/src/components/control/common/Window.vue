<template>
  <div v-show="show_" class="_container" :style="containerStyle">
    <div class="_header" :style="style">
      <span class="_title">{{ title }} </span>
      <span class="_close" @click="close">
        <Icon type="md-close" size="16" />
      </span>
    </div>
    <div :style="scrollStyle">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    maxHeight: {
      type: String,
      default: "200px",
    },
    color: {
      type: String,
      default: "steelBlue",
    },
    maxWidth: {
      type: String,
      default: "100%",
    },
    minWidth: {
      type: String,
    },
  },
  data() {
    return {
      show_: true,
    };
  },
  methods: {
    close() {
      this.show_ = false;
      this.$emit("close");
    },
    show() {
      this.show_ = true;
    },
  },
  computed: {
    style() {
      return {
        "background-color": this.color,
      };
    },
    containerStyle() {
      return {
        "min-width": this.minWidth,
        "max-Width": this.maxWidth,
        margin: "20px",
        display: "inline-block",
        "vertical-align": "top",
      };
    },
    scrollStyle() {
      return {
        maxHeight: this.maxHeight,
        "overflow-y": "scroll",
      };
    },
  },
};
</script>
<style scoped>
._header {
  background-color: #00a2ff;
  color: whitesmoke;
}
._close {
  float: right;
  margin-right: 11px;
  margin-top: 5px;
}
._close :hover {
  color: red;
}
._title {
  font-size: 12px;
  line-height: 34px;
  margin-left: 14px;
}
._list_preview {
  height: 200px;
  background-color: rosybrown;
}
._container {
  box-shadow: 0px 0px 6px 4px rgb(80 80 80 / 20%);
}
</style>