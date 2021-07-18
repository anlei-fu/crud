<template>
  <ul v-show="visible" class="menu_wrapper" :style="style">
    <a
      v-for="(item, index) in items"
      :key="index"
      class="menu_item"
      style="color: #2c3e50"
      @click="click(item.event)"
    >
      <li>
        <span style="display: inline-block; width: 30px; padding-left: 7px"
          ><Icon v-if="item.icon" size="17" :type="item.icon" />
        </span>
        <span>
          {{ item.label }}
        </span>
      </li>
    </a>
  </ul>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  data() {
    return {
      id: null,
      visible: false,
      clientX: 1,
      clientY: 1,
    };
  },
  computed: {
    style() {
      return {
        top: this.clientY + "px",
        left: this.clientX + "px",
        position: "absolute",
      };
    },
  },
  watch: {
    visible(val) {
      val
        ? document.body.addEventListener("click", this.closeMenuContextmenu)
        : document.body.removeEventListener("click", this.closeMenuContextmenu);
    },
  },
  methods: {
    click(event) {
      this.$emit(event, this.id);
    },
    show(ev, id) {
      this.id = id;
      this.visible = true;
      this.clientX = ev.clientX;
      this.clientY = ev.clientY;
    },
    closeMenuContextmenu() {
      this.visible = false;
    },
  },
};
</script>
<style >
.menu_wrapper {
  text-decoration: none;
  margin: 0;
  background: white;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  -webkit-box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
  box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
  min-width: 164px;
  padding-top: 20px;
  padding-bottom: 10px;
  background-color: #ffffff;
  opacity: 0.96;
}
.menu_item {
  line-height: 34px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  display: block;
  outline: 0;
  list-style: none;
}
.menu_item :hover {
  background-color: #e6e6e6;
}
</style>