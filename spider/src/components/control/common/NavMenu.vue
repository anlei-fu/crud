<template>
  <Menu
    mode="horizontal"
    class="nav-left-menu"
    style
    :activeName="activeMenu"
    @on-select="changeModule"
  >
    <template v-for="item in modules">
      <MenuItem :key="item._name" :name="item._name" class="nav-left-menu-item">
        {{ item.label }}
      </MenuItem>
    </template>
  </Menu>
</template>
<script>
  export default {
    props: {
      modules: Array,
      activeMenu: String,
    },
    methods: {
      /**
       * Proxy iview menu component 'on-select' by emitting a 'on-changed' event
       * to parent component
       *
       * @param {String} moduleName
       */
      changeModule(moduleName) {
        this.$emit("on-changed", moduleName);
      },
    },
  };
</script>
<style scoped>
  .nav-left-menu {
    margin: 0px;
    margin-left: 30px;
    margin-right: 30px;
    display: inline;
    float: none;
    background-color: inherit;
  }
  .nav-left-menu a {
    color: white;
  }
  .nav-right-menu {
    margin-right: 50px;
    margin-top: 20px;
    display: inherit;
    float: right;
    font-size: 13px;
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
    height: inherit;
    line-height: inherit;
    border-bottom: 2px solid transparent;
    color: rgb(191, 203, 217);
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
    color: #57a3f3;
    border-bottom: 2px solid;
  }
  .ivu-menu-item-selected {
    color: #57a3f3 !important;
    border-bottom: 2px solid !important;
  }
  .nav-left-menu-item {
    padding: 14px 0px;
    margin: 13px;
    font-size: 16px;
    display: inline;
    float: none;
    color: orange;
    font-weight: 400;
  }
</style>
