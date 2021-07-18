<template>
  <Select v-model="value_">
    <Option v-for="color in colors" :key="color.value" :value="color.value" :label="color.label">
      <span class="color" :style="{ 'background-color': color.value }"></span>
      <span class="text">{{ color.label }}</span>
    </Option>
  </Select>
</template>
<script>
  export default {
    model: {
      prop: "value",
      event: "change",
    },
    props: {
      value: String,
    },
    data() {
      return {
        value_: null,
        colors: [
          {
            label: "Primary",
            value: "#2d8cf0",
          },
          {
            label: "Info",
            value: "#2db7f5",
          },
          {
            label: "Success",
            value: "#19be6b",
          },
          {
            label: "Warning",
            value: "#ff9900",
          },
          {
            label: "Error",
            value: "#ed4014",
          },
          {
            label: "Disabled",
            value: "#515a6e",
          },
          {
            label: "Moccasin",
            value: "#FFE4B5",
          },
          {
            label: "lavender",
            value: "#E6E6FA",
          },
          {
            label: "SlateBlue",
            value: "#6A5ACD",
          },
          {
            label: "Gold",
            value: "#CDAD00",
          },
          {
            label: "Pink",
            value: "#FFC0CB",
          },
        ],
      };
    },
    created() {
      this.value_ = this.value;
    },
    watch: {
      value() {
        this.value_ = this.value;
      },
      value_(newVal) {
        this.$emit("change", newVal);
      },
    },
  };
</script>
<style scoped>
  .text {
    vertical-align: super;
    margin-left: 10px;
  }
  .color {
    width: 22px;
    display: inline-block;
    height: 18px;
  }
</style>
