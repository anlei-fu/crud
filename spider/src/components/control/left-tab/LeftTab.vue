<template>
  <div>
    <div class="_left_container">
      <AddRow @add="add" @remove="removeBatch" />
      <Menu
        ref="menu"
        width="100%"
        class="_menu_container"
        :active-name="selectedMenu"
        @on-select="changeTab"
      >
        <Drag
          v-for="(item, index) in items1"
          :key="index"
          :block="true"
          :id="index"
          @change="changePos"
        >
          <MenuItem :name="item.baseInfo.name">
            <span class="_menu_item_label">
              <MyCheckbox v-model="item.$$checked" />
            </span>

            <span class="_menu_item_label" :title="item.baseInfo.description">
              {{ item.baseInfo.name }}
            </span>
            <span
              @click="remove(item.baseInfo.name)"
              v-if="selectedMenu == item.baseInfo.name"
              class="_close"
              ><Icon type="ios-close" size="24" /></span
          ></MenuItem>
        </Drag>
      </Menu>
    </div>
    <div class="_right_container">
      <div
        v-for="item in items1"
        :key="item.baseInfo.$$guid"
        v-show="item.baseInfo.name == selectedMenu"
      >
        <slot name="content" :data="item" :updateMenu="updateSelectedMenu" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "items",
    event: "change",
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: String,
  },
  data() {
    return {
      items1: [],
      selectedMenu: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(items) {
      this.items1 = this.$utils.clone(items);

      if (this.items1 && this.items1.length != 0) {
        this.items1.forEach((x) => {
          this.$set(x, "$$checked", false);
        });
        this.selectedMenu = this.items1[0].name;
      }
    },
    changeTab(name) {
      this.selectedMenu = name;
    },
    changePos(params1, params2) {
      let targetData = this.items1.splice(params1.id, 1);
      this.items1.splice(params2.id, 0, targetData[0]);
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName();
      });
    },
    add() {
      this.$emit("add");
    },
    removeBatch() {
      let items = this.items1.filter((x) => x.$$checked);
      if (items.length == 0) return;
      this.$Modal.confirm({
        title: "删除确认",
        content: `确认删除这${items.length}个${this.title}?`,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.items1 = this.items1.filter((x) => !x.$$checked);

          if (this.items1.length != 0) {
            this.updateSelectedMenu(this.items1[0].baseInfo.name);
          }
        },
      });
    },
    remove(name) {
      this.$Modal.confirm({
        title: "删除确认",
        content: `确认删除${this.title}${name}?`,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.items1 = this.items1.filter((x) => x.baseInfo.name != name);

          if (this.items1.length != 0) {
            this.updateSelectedMenu(this.items1[0].baseInfo.name);
          }
        },
      });
    },

    updateSelectedMenu(menu) {
      this.selectedMenu = menu;
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName();
      });
    },
  },
  watch: {
    items1: {
      handler() {
        this.$emit("change", this.items1);
      },
      deep: true,
    },
    items: {
      handler() {
        // debugger;
        // if (this.items1[0].baseInfo.name != this.selectedMenu)
        //   this.selectedMenu = this.items1[0].baseInfo.name;
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
._left_container {
  width: 17%;
  display: inline-block;
  vertical-align: top;
  /* padding: 32px 0px; */
  background-color: #f7f7f7;
  padding-top: 14px;
  padding-bottom: 50px;
  height: 900px;
  /* margin-left: 8px; */
  margin-right: 5px;
}
._right_container {
  width: 81%;
  text-align: center;
  background-color: #f8f8f9;
  height: 900px;
  padding: 20px;
  display: inline-block;
}
._close {
  float: right;
  color: #8fc0f2;
  transition: ease 0.5s;
}
._close :hover {
  color: red;
}
._menu_item_label {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 155px;
  font-size: 12px;
}
._menu_container {
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  border-top: 1px solid #d8d8d8;
  background-color: #f8f8f9;
  padding-top: 5px;
}
/************************* */
.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 7px 32px;
  padding-right: 16px;
  position: relative;
  cursor: pointer;
  z-index: 1;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #2d8cf0;
  background: #f2f2f2;
  z-index: 2;
}
.module-title {
  background-color: rgb(48, 65, 86);
  width: 100%;
  height: 8%;
  font-size: 16px;
  padding: 8px;
  display: flex;
  align-items: center;
  color: rgb(191, 203, 217);
}
.top-level-menu {
  color: rgb(191, 203, 217);
  transition: all 0.5s;
}
.top-level-menu:hover {
  color: #57a3f3;
  background-color: #263445;
}
.ivu-menu-item-selected {
  color: #57a3f3 !important;
  /* background-color: rgb(38, 52, 69) !important; */
}
.second-level-menu {
  background-color: #1f2d3d;
  color: rgb(191, 203, 217);
  transition: 0.2s all;
}
.second-level-menu:hover {
  /* background-color: #001528 !important; */
}
/* iview style override */
.ivu-menu-horizontal.ivu-menu-light:after {
  content: "";
  display: block;
  width: 100%;
  height: 0px;
  background: #dcdee2;
  position: absolute;
  bottom: 0;
  left: 0;
}
.ivu-menu-vertical.ivu-menu-light:after {
  content: "";
  display: block;
  width: 0px;
  height: 100%;
  background: #dcdee2;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: "";
  display: block;
  /* width: 2px; */
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #2d8cf0;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: "";
  display: block;
  width: 0px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #2d8cf0;
}
.menu-container {
  overflow-y: auto;
  height: 92%;
  background-color: rgb(48, 65, 86);
}
.icon-item {
  transition: 0.6s;
}
.icon-item:hover {
  color: #57a3f3;
  cursor: pointer;
}
</style>
