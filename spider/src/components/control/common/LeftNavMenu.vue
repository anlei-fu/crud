<!-- left nav menu
accept a module by prop 'menuGroup',
on select change emit a event 'on-changed' and pass a
string parameter 'name' of selected menu
-->
<template>
  <div>
    <!--module name and collapse button-->
    <div class="module-title">
      <Icon
        type="md-menu"
        title="click to collapse"
        class="icon-item"
        size="30"
        @click="collapseAll"
      />
      <span style="margin-left: 14px; font-size: 18px">{{
        menuGroup.label
      }}</span>
    </div>
    <!--menus max depth is 3-->
    <div class="menu-container">
      <Menu
        ref="leftMenu"
        :activeName="activeMenu"
        style="
          width: 100%;
          height: 100%;
          border: none;
          background-color: rgb(48, 65, 86);
          color: rgb(64, 158, 255);
        "
        :open-names="openNames"
        @on-select="changeMenu"
      >
        <template v-for="level1Menu in menuGroup.menus">
          <Submenu
            :key="level1Menu.path"
            :name="level1Menu.path"
            v-if="level1Menu.menus"
          >
            <template slot="title">
              <Icon :type="level1Menu.icon" size="24" />
              {{ level1Menu.label }}
            </template>
            <template v-for="level2Menu in level1Menu.menus">
              <Submenu
                :key="level2Menu.path"
                :name="level2Menu.path"
                v-if="level2Menu.menus"
                style="color: white"
              >
                <template slot="title">
                  <Icon :type="level2Menu.icon" size="24" />
                  {{ level2Menu.label }}
                </template>
                <Drag
                  v-for="level3Menu in level2Menu.menus"
                  :key="level3Menu.path"
                >
                  <MenuItem :name="level3Menu.path">
                    {{ level3Menu.label }}
                  </MenuItem>
                </Drag>
              </Submenu>
              <MenuItem
                :key="level2Menu.path"
                :name="level2Menu.path"
                class="second-level-menu"
                v-else
              >
                {{ level2Menu.label }}
              </MenuItem>
            </template>
          </Submenu>
          <MenuItem
            :key="level1Menu.path"
            :name="level1Menu.path"
            v-else
            class="top-level-menu"
          >
            {{ level1Menu.label }}
          </MenuItem>
        </template>
      </Menu>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // module
    menuGroup: Object,
    // bind selected menu through parent component
    activeMenu: String,
  },
  data() {
    return {
      openNames: [],
      menuGroup: {},
    };
  },
  methods: {
    /**
     * Callback iview menu component with a string parameter of name of menu item
     * proxy it with 'on-changed' event to parent component
     *
     * @param {string} name
     */
    changeMenu(name) {
      this.$emit("on-change", name);
    },
    /**
     * collapse all menu
     */
    collapseAll() {
      this.$nextTick(() => {
        this.$refs.leftMenu.openedNames = [];
        this.$refs.leftMenu.updateOpened();
      });
    },
  },
};
</script>
<style scoped>
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
  background-color: rgb(38, 52, 69) !important;
}
.second-level-menu {
  background-color: #1f2d3d;
  color: rgb(191, 203, 217);
  transition: 0.2s all;
}
.second-level-menu:hover {
  background-color: #001528 !important;
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
