<template>
  <div>
    <span class="wrapper">
      <span class="icon-container">
        <Icon type="ios-home" class="icon-item" size="24" @click="toHome" />
        <Icon type="md-refresh" class="icon-item" size="24" @click="refresh" />
        <Icon
          v-if="tabs.length > 10"
          class="icon-item"
          type="ios-arrow-back"
          size="24"
          @click="moveLeft"
        ></Icon>
      </span>
      <span class="tab-scroll">
        <span class="tab-container" :style="{ transform: offset }">
          <Drag
            v-for="(item, index) in tabs"
            :key="index"
            :id="item.path"
            @change="changePosition"
          >
            <ContextMenuWrapper :id="item.path" @contextMenu="contextMenu">
              <TabItem
                :tab="item"
                :selected="item.selected"
                @close="closeTab(item, true)"
                @click="addTab(item, true)"
              />
            </ContextMenuWrapper>
          </Drag>
        </span>
      </span>
      <span class="icon-container">
        <Icon
          v-if="tabs.length > 10"
          class="icon-item"
          type="ios-arrow-forward"
          size="24"
          @click="moveRight"
        ></Icon>
      </span>
    </span>
    <MyContextMenu ref="menu" :items="menuOptions" @closeRight="closeRight" />
  </div>
</template>
<script>
import TabItem from "./TabItem";
export default {
  components: {
    TabItem,
  },
  props: {
    currentLocation: String,
    homePath: String,
  },
  data() {
    return {
      tabs: [],
      index: 0,
      activePath: "",
      leftNavigateEnabled: false,
      rightNavigateEnabled: false,
      menuOptions: [
        { label: "关闭", event: "close", icon: "md-refresh" },
        { label: "关闭右侧", event: "closeRight" },
        { label: "固定位置" },
        { label: "test" },
      ],
    };
  },
  computed: {
    offset() {
      return this.index > 10
        ? `translateX(${(this.index - 10) * -105}px)`
        : `translateX(0px)`;
    },
  },
  methods: {
    /**
     * Callback of tab close button click
     * remove current tab and active its previous
     *
     * @param {Tab} tab
     */
    closeTab(tab, emitChange) {
      if (this.tabs.length == 1) return;
      let index = this.findTabIndex(tab.path);
      if (index != -1) {
        this.tabs = this.tabs.filter((x) => x.path != tab.path);
        this.index = index;
        if (this.tabs.length != 0 && emitChange)
          this.emitChange(this.tabs[index], true);
      }
      if (index > 10) {
        this.leftNavigateEnabled = true;
        if (index != this.tabs.length) {
          this.rightNavigateEnabled = true;
        } else {
          this.rightNavigateEnabled = false;
        }
      }
    },

    contextMenu(ev, id) {
      this.$refs.menu.show(ev, id);
    },
    changePosition(path1, path2) {
      let index1 = this.findTabIndex(path1);
      let index2 = this.findTabIndex(path2);
      if (index1 == -1 || index2 == -1) return;

      if (index1 == index2) return;

      this.exchange(this.tabs, index1, index2);
    },
    /**
     * Remove element
     *
     * @param {[]} array
     * @param {Number} startIndex
     * @param {Number} count
     * @returns {[]}
     */
    remove(array, startIndex, count = 1) {
      return array.splice(startIndex, count);
    },

    /**
     * Exchange Position
     *
     * @param {[]} array
     * @param {Number} sourceIndex
     * @param {Number} targetIndex
     */
    exchange(array, sourceIndex, targetIndex) {
      if (sourceIndex == targetIndex) return array;

      let item = array[sourceIndex];
      this.remove(array, sourceIndex);
      let move = sourceIndex > targetIndex ? 0 : 0;
      array.splice(targetIndex + move, 0, item);

      return array;
    },

    setArrow() {
      if (this.index > 10) {
        this.leftNavigateEnabled = true;
        if (index != this.tabs.length) {
          this.rightNavigateEnabled = true;
        } else {
          this.rightNavigateEnabled = false;
        }
      }
    },

    /**
     * Remove old tab and insert it at the start of tabs
     * call by parent component
     *
     * @param {Tab} tab
     */
    addTab(tab, emit) {
      let index = this.findTabIndex(tab.path);
      // add by outter
      if (index == -1) {
        this.tabs.unshift(tab);
        if (this.tabs.length > 10) {
          this.index = 0;
          this.leftNavigateEnabled = false;
          this.rightNavigateEnabled = true;
        }
      } else {
        // not change
        if (index == this.index) return;
        if (index > 10) {
          this.leftNavigateEnabled = true;
          if (index != this.tabs.length) {
            this.rightNavigateEnabled = true;
          } else {
            this.rightNavigateEnabled = false;
          }
        } else {
          this.leftNavigateEnabled = false;
          if (this.tabs.length > 10) this.rightNavigateEnabled = true;
        }
        // click tab to change
        this.emitChange(tab, emit);
        this.index = index;
      }
    },

    fixedTab() {},
    unFixedTab() {},
    closeRight() {},
    closeAll() {},
    /**
     * To home page
     */
    toHome() {
      if (this.homePath) {
        this.$router.push({ path: homePath });
      }
    },
    /**
     * Emit tab ''on-changed' event to parent component
     */
    emitChange(tab, emit) {
      this.tabs.forEach((tabItem) => {
        if (tabItem.path == tab.path) {
          tabItem.selected = true;
        } else {
          tabItem.selected = false;
        }
      });
      if (emit) {
        this.$emit("on-change", tab);
      }
    },
    resetOffset() {
      if (this.index < 10) {
        if (this.tabs.length > 10) {
          this.leftNavigateEnabled = false;
          this.rightNavigateEnabled = true;
        } else {
          this.leftNavigateEnabled = this.rightNavigateEnabled = false;
        }
      } else {
        this.leftNavigateEnabled = true;
      }
    },
    /**
     * Callback of refresh current page
     */
    refresh() {},
    /**
     * Callback of move left button click
     */
    moveLeft() {
      if (this.index == 10) return;
      this.index = this.index - 1;
    },
    closeRight(path) {
      let index = this.findTabIndex(path);
      if (index == this.tabs.length) return;

      if (this.index > index) {
        this.index = index;
      }

      this.tabs.splice(index + 1, this.tabs.length - index - 1);
    },
    /**
     * Callback of move right button click
     */
    moveRight() {
      if (this.index == this.tabs.length) return;
      this.index = this.index + 1;
    },
    findTabIndex(path) {
      let index = -1;
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] && this.tabs[i].path == path) {
          return i;
        }
      }
      return -1;
    },
  },
};
</script>
<style scoped>
.wrapper {
  vertical-align: middle;
}
.icon-container {
  display: inline-block;
  /* height: 30px; */
  transform: translateY(-12px);
}
.tab-scroll {
  overflow: hidden;
  display: inline-block;
  margin-left: 10px;
  width: 1040px;
}
.tab-container {
  /* max-width: 1400px; */
  display: inline-block;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-transition: 0.5s;
  transition: transform 0.5s ease-in-out;
  margin: 0px 10px;
}
.icon-item {
  transition: 0.6s;
}
.icon-item:hover {
  color: #57a3f3;
  cursor: pointer;
}
</style>
