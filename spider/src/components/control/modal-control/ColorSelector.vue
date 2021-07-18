<template>
  <div>
    <div @click="show" ><span :style="buttonStyle">{{ value || "尚未配置" }}</span></div>
    <Center width="80%">
      <div>
        <MyModal ref="modal" @ok="ok" width="60%" title="选择颜色">
          <div>
            <div style="text-align: center; margin-bottom: 10px">
              <span style="display: inline-block; width: 80%"
                ><Input
                  placeholder="输入颜色名称进行过滤"
                  v-model="keyword"
                  search /></span
              ><span></span>
            </div>
            <MyScroll maxHeight="300px">
              <div class="_favorite_container">
                <span
                  class="_color_container"
                  v-for="(item, index) in colors"
                  :title="item.label"
                  @click="changeColor(item.value)"
                  :key="index"
                >
                  <Card>
                    <div>
                      <span
                        class="_favorite"
                        :style="{ 'background-color': item.value }"
                      >
                      </span>
                    </div>
                    <div>
                      <span class="_color_title">
                        {{ item.label }}
                      </span>
                    </div>
                  </Card>
                </span>
              </div>
            </MyScroll>
            <MyCollapse :checkbox="true" title="调整">
              <div class="_slider_container">
                <div class="_slider_item">
                  <span>
                    <span
                      class="_slider_item_title"
                      :style="{ 'background-color': rColor }"
                      >R</span
                    >
                    <span class="_slider_wrapper">
                      <Slider
                        v-model="r"
                        :min="0"
                        :max="255"
                        size="small"
                        show-input
                      ></Slider></span
                  ></span>
                </div>
                <div class="_slider_item">
                  <span>
                    <span
                      class="_slider_item_title"
                      :style="{ 'background-color': gColor }"
                      >G</span
                    >
                    <span class="_slider_wrapper">
                      <Slider
                        v-model="g"
                        :min="0"
                        :max="255"
                        show-input
                      ></Slider></span
                  ></span>
                </div>
                <div class="_slider_item">
                  <span>
                    <span
                      class="_slider_item_title"
                      :style="{ 'background-color': bColor }"
                      >B</span
                    >
                    <span class="_slider_wrapper">
                      <Slider
                        v-model="b"
                        :min="0"
                        :max="255"
                        show-input
                      ></Slider></span
                  ></span>
                </div>
              </div>

              <div class="_color_adjuster">
                <div class="_slider_item">
                  <span>
                    <span
                      class="_slider_item_title _change"
                      :style="{
                        'background-color': lightenColor,
                        cursor: 'pointer',
                      }"
                      title="点击选择此颜色"
                      @click="changeColor(lightenColor)"
                      >Lighten</span
                    >
                    <span class="_slider_wrapper">
                      <Slider
                        v-model="lightenFactor"
                        :min="0"
                        :max="100"
                        :step="1"
                        show-input
                      ></Slider></span
                  ></span>
                </div>
                <div class="_slider_item">
                  <span>
                    <span
                      class="_slider_item_title _change"
                      :style="{
                        'background-color': darkenColor,
                        cursor: 'pointer',
                      }"
                      @click="changeColor(darkenColor)"
                      title="点击选择此颜色"
                      >Darken</span
                    >
                    <span class="_slider_wrapper">
                      <Slider
                        show-input
                        v-model="darkenFacter"
                        :min="0"
                        :max="100"
                        :step="1"
                      ></Slider></span
                  ></span>
                </div>
              </div>
            </MyCollapse>
            <div class="_result_container">
              <span
                class="_slider_item_title"
                :style="{ 'background-color': mixedColor }"
              >
                Current
              </span>
              <span class="_slider_wrapper">
                <span style="display: inline-block; width: 63%; margin-top: 2px"
                  ><Input v-model="colorHex" /></span
                ><Button @click="changeColor1">重置</Button>
              </span>
            </div>
          </div>
        </MyModal>
      </div>
    </Center>
  </div>
</template>
<script>
import ModelMixin from "./../../mixins/model-mixin";
import ColorUtils from "./../../../lib/color";
export default {
  mixins: [ModelMixin],
  data() {
    return {
      keyword: "",
      lightenFactor: 10,
      darkenFacter: 10,
      colorHex: null,
      r: 128,
      g: 128,
      b: 128,
    };
  },
  activated() {
    if (this.value) {
      this.changeColor(this.value);
    }
  },
  computed: {
    colors() {
      if (!this.keyword) return ColorUtils.FAVORITE_COLORS;

      return ColorUtils.FAVORITE_COLORS.filter((x) =>
        x.label.includes(this.keyword)
      );
    },
    buttonStyle() {
      return {
        color: "inherit",
        width: "70px",
        display: "inline-block",
        "text-align": "center",
        color: "whitesmoke",
        "background-color": this.value || "#5CADFF",
        "border-radius": "5px",
        "font-size": "12px",
      };
    },
    rColor() {
      return `rgb(${this.r},0,0)`;
    },
    gColor() {
      return `rgb(0,${this.g},0)`;
    },
    bColor() {
      return `rgb(0,0,${this.b})`;
    },
    mixedColor() {
      return `rgb(${this.r},${this.g},${this.b})`;
    },
    colorText() {
      return ColorUtils.rgbToHex(this.r, this.g, this.b);
    },
    darkenColor() {
      if (this.colorHex)
        return ColorUtils.adjustColor(this.colorHex, -this.darkenFacter);
    },
    lightenColor() {
      if (this.colorHex)
        return ColorUtils.adjustColor(this.colorHex, this.lightenFactor);
    },
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    changeColor1() {
      if (!this.colorHex) return;

      this.changeColor(this.colorHex);
    },
    changeColor(color) {
      let rgb = ColorUtils.hexToRgb(color);
      if (!rgb || isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) {
        return;
      }

      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
    },
    ok() {
      this.value_ = this.colorText;
      this.$refs.modal.close();
    },
  },
  watch: {
    colorText(val) {
      this.colorHex = this.colorText;
    },
  },
};
</script>
<style scoped>
._color_control {
  line-height: 29px;
}
._color_container {
  padding: 5px;
  display: inline-block;
  line-height: 1;
  padding: 5px;
  text-align: center;
}
._color_container :hover {
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
  cursor: pointer;
}
._slider_container {
  padding: 10px 0px;
}
._slider_item {
  margin: 12px 0px;
}
._favorite_container {
  background-color: whitesmoke;
  padding: 10px;
}
._favorite {
  width: 50px;
  height: 50px;
  /* width: 100%; */
  display: inline-block;
}
._color_title {
  display: inline-block;
  width: 67px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  padding: 4px;
}
._color_adjuster {
  padding: 10px 0px;
}
._result_container {
  padding: 20px 0px;
}
._slider_wrapper {
  width: 70%;
  vertical-align: middle;
  float: right;
}
._slider_item_title {
  display: inline-block;
  width: 20%;
  text-align: center;
  background: skyblue;
  line-height: 29px;
  border-radius: 4px;
  margin-right: 17px;
  color: whitesmoke;
  font-weight: bold;
  margin-top: 3px;
}
._change {
}
._change :hover {
  cursor: pointer;
}
._card {
  color: inherit;
  background-color: white;
  text-align: center;
}
._card :hover {
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
  cursor: pointer;
}
</style>