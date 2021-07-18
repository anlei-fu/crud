<template>
  <div class="container">
    <!--header-->
    <div class="header">
      <!--logo-->
      <span>
        <img
          class="logo"
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        />
      </span>
      <!--nav menus-->
      <span>
        <NavMenu
          :modules="modules"
          :activeMenu="selectedModule._name"
          @on-changed="changeModule"
        />
      </span>
      <!-- nav search box-->
      <span class="nav-search">
        <SearchBox />
      </span>
      <!--user dropdown menu-->
      <span class="user-dropdown-menu-container">
        <DropdownMenu title="hello,admin" />
      </span>
    </div>
    <!--body-->
    <div class="body">
      <!--left nave menu -->
      <div class="body-left-menu-container">
        <transition name="fade-transform" mode="out-in">
          <LeftNavMenu
            :menuGroup="selectedModule"
            :activeMenu="selectedModule.activeMenuName"
            @on-change="changeMenu"
          />
        </transition>
      </div>
      <!--body content -->
      <div class="body-right-container">
        <!-- tab nav-->
        <div class="body-right-tab-nav-container">
          <NavTab ref="tab" @on-change="changeTab" />
        </div>
        <!--router view page container-->
        <div v-if="ready" class="body-right-page-container">
          <transition name="fade-transform" mode="out-in">
            <Index />
          </transition>
        </div>
        <!--footer-->
        <div class="footer">
          <Footer :items="footers" />
        </div>
      </div>
    </div>
    <MyContextMenu ref="menu" :items="menuOptions" @closeRight="closeRight" />
  </div>
</template>
<script>
import { modules } from "./../../config/modules";
import utils from "./../../common";
import Api from "./../../api/index";
import Index from "./index";
import { mapMutations } from "vuex";
import common from "./../../common";
import api from "./../../api/index";
export default {
  name: "home",
  components: { Index },
  data: () => {
    return {
      moduleMenus: [
        { label: "添加", event: "addModule" },
        { label: "删除", event: "removeModule" },
      ],
      subMenumMenus: [],
      menuMenus: [],
      ready: false,
      //  mark current module
      selectedModule: {},
      // all modules
      modules: [],
      // footers
      footers: [
        "jasmine code generator ",
        "all rights reserved by fuanlei since 2019",
      ],
      // use to cache all menus
      moduleMenuMap: new Map(),
      pathMenuMap: new Map(),
    };
  },
  methods: {
    /**
     * Callack for module menu changed @see leftMenu
     * add menu to tab
     *
     * @param {String} menuName
     */
    changeMenu(menuName) {
      let menu = this.findMenuByName(this.selectedModule._name, menuName);
      if (menu) {
        this.selectedModule.activeMenuName = menuName;
        this.$refs.tab.addTab(menu);
        this.toPage(menu);
      }
    },
    /**
     * Callback of tab changed @see navTab
     * goto target module if module changed
     * set active menu of left menu
     *
     * @param {Menu} menu
     */
    changeTab(menu) {
      this.selectedModule = menu.module;
      this.selectedModule.activeMenuName = menu.path;
      this.toPage(menu);
    },
    /**
     * Callback for module changed @see nav
     * add active menu to tab control
     * and set left menu
     *
     * @param {String} moduleName
     */
    changeModule(moduleName) {
      let m = this.modules.filter((x) => x._name == moduleName);
      m = m[0] || null;
      if (m) {
        this.selectedModule = m;
        let activeMenu = this.findMenuByName(
          moduleName,
          this.selectedModule.activeMenuName
        );
        if (activeMenu) {
          this.$refs.tab.addTab(activeMenu);
          this.toPage(activeMenu);
          this.selectedModule.activeMenuName = activeMenu.path;
        }
      }
    },
    /**
     * find menu in moduleMenuMap
     *
     * @param {string} moduleName
     * @param {string} menuName
     * @returns {Menu}
     */
    findMenuByName(moduleName, menuName) {
      let module = this.moduleMenuMap.get(moduleName);
      let menu = module.get(menuName);
      return menu;
    },
    /**
     * route to target page
     *
     * @param {Menu} menu
     */
    toPage(menu) {
      this.$router.push({ path: menu.path });
    },
    /**
     * initia all module by imports or override if needed
     */
    initModules() {
      // this.modules = modules;
      // this.selectedModule = modules[0];
      // this.moduleMenuMap = new Map();
      // this.modules.forEach((item) => {
      //   let map = new Map();
      //   if (item.menus)
      //     item.menus.forEach((menu) => {
      //       this.cacheMenu(menu, map, item);
      //     });
      //   this.moduleMenuMap.set(item._name, map);
      // });
      // // go to default menu
      // let menu = this.findMenuByName(
      //   this.selectedModule._name,
      //   this.selectedModule.activeMenuName
      // );
      // if (menu) {
      //   this.$refs.tab.addTab(menu);
      //   this.toPage(menu);
      // }
    },
    /**
     * Cache menu
     *
     * @param {Menu} menu
     * @param {Map} map
     */
    cacheMenu(menu, map, module) {
      menu.module = module;
      this.pathMenuMap.set(menu.path, menu);
      map.set(menu.path, menu);
      // recursive all submenu
      if (menu.menus) {
        menu.menus.forEach((subMenu) => {
          this.cacheMenu(subMenu, map);
        });
      }
    },
    async getAllData() {
      const res = await this.$api.enum.getAll();
      // let dic={};
      if (res.code == 100) {
        res.data.forEach((x) => {
          utils.addEnumValue(x.type, x);
        });
        this.ready = true;
      }
    },

    ...mapMutations({ updateIds: "updateIds" }),
  },

  async created() {
    let resp = await Api.system.getIds({ projectId: 3 });
    debugger
    if (resp.isSuccess) {
      this.updateIds(resp.data);
      this.ready=true;
    } else {
      this.$Message.warning("获取初始化数据失败");
    }
  },
  // init all module
  mounted() {
    this.initModules();
  },
  watch: {
    $router() {},
  },
};
</script>
<style></style>
<style scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  position: absolute;
  background-size: cover;
  background-color: #f7f7f7;
}
/* Set scroll bar style */
::-webkit-scrollbar {
  width: 8px;
  height: 80%;
  border-radius: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}
/* thumb */
::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 8px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.header {
  height: 65px;
  background-color: rgb(48, 65, 86);
  text-align: left;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 0px 6px 4px rgba(80, 80, 80, 0.2);
}
.logo {
  margin-left: 30px;
  height: 35px;
  top: 13px;
  display: inline-block;
  position: relative;
}
.user-dropdown-menu-container {
  margin-right: 50px;
  margin-top: 20px;
  display: inherit;
  float: right;
  font-size: 13px;
}
.body {
  padding: 0;
  margin-top: 71px;
  width: 100%;
  text-align: left;
}
.body-left-menu-container {
  position: fixed;
  top: 65px;
  width: 13%;
  bottom: 0;
  vertical-align: top;
  background-color: rgb(48, 65, 86);
  /* box-shadow: 0px 0px 6px 4px rgba(80, 80, 80, 0.2); */
}
.body-right-container {
  display: inline-block;
  margin-left: 14%;
  width: 85.2%;
  min-height: 800px;
  background-color: white;
}
.body-right-page-container {
  margin: 20px;
  text-align: center;
}
.body-right-tab-nav-container {
  background-color: white;
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid #dcdee2;
}
.footer {
  padding-top: 10px;
  margin-top: 5px;
  background-color: #ffffff;
  height: 70px;
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
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
  border-bottom: 3px solid #2d8cf0;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
  color: white;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}
.ivu-dropdown-item:hover {
  background: red;
}
.ivu-menu {
  width: 100%;
  text-align: left;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #2d8cf0;
  /* background: #f0faff; */
  z-index: 2;
}
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-move {
  transition: all 0.5s;
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
<style>
.filter {
  text-align: left;
  margin-bottom: 30px;
}
.filter > span {
  display: inline-block;
  margin-top: 20px;
  margin-right: 20px;
}
.pager {
  margin-top: 15px;
  text-align: left;
}
.control-title {
  margin-right: 10px;
}
.ivu-scroll-container {
  overflow-y: scroll;
  padding-right: 10px;
}
.ivu-form-item {
  /* margin-bottom: 24px; */
  vertical-align: top;
  zoom: 1;
}
</style>
