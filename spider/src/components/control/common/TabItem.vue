<template>
  <span @click="click" :class="['tab-item', { 'tab-active': selected }]">
    <span class="tab-content">{{ tab.label }}</span>
    <Icon class="tab-close" type="ios-close" @click.stop="closeTab" size="18" />
  </span>
</template>
<script>
export default {
  props: {
    tab: Object,
    selected: false,
  },
  methods: {
    closeTab() {
      this.$emit("close", this.tab);
    },
    click() {
      this.$emit("click", this.tab);
    },
  },
};
</script>
<style scoped>
.tab-active {
  color: #57a3f3;
  border: none;
}
.tab-item {
  background-color: whitesmoke;
  margin-right: 3px;
  display: inline-block;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  line-height: 31px;
  padding-left: 10px;
  width: 100px;
}
.tab-content {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
}
.tab-item:hover {
  color: #57a3f3;
  cursor: pointer;
}
.icon-item {
  transition: 0.6s;
}
.tab-close {
  float: right;
  padding-top: 7px;
  padding-right: 3px;
}
.icon-item:hover {
  color: #57a3f3;
  cursor: pointer;
}
</style>
