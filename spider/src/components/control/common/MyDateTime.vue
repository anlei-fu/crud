<template>
  <DatePicker
    type="datetime"
    :format="format"
    v-model="value_"
    :size="size"
    :style="{ width: width }"
    :placeholder="placeHolder"
    :disabled="disabled"
    :clearable="clearable"
  />
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: Date | String,
    shortcuts: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: "100%",
    },
    format: String,
    shortcuts: [],
    size: String,
    placeHolder: {
      type: String,
      default: "Select date",
    },
    disabled: Boolean,
    clearable: Boolean,
  },
  data() {
    return {
      value_: null,
    };
  },
  created() {
    this.value_ = this.value;
  },
  computed: {
    options() {
      return { shortcuts: this.shortcuts };
    },
  },
  watch: {
    value(newVal) {
      this.value_ = newVal;
    },
    value_(newVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>
