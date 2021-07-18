<template>
  <span :width="width">
    <Checkbox
      v-model="value_"
      :true-value="trueValue"
      :false-value="falseValue"
    >
      <Icon v-if="icon" :type="icon"></Icon>
      <span v-if="label">{{ label }}</span>
    </Checkbox>
  </span>
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    label: String,
    icon: String,
    value: {
      type: String | Number | Boolean,
      default: false,
    },
    trueValue: {
      type: String | Number | Boolean,
      default: true,
    },
    falseValue: {
      type: String | Number | Boolean,
      default: false,
    },
    width: String | Number,
  },

  data() {
    return {
      value_: null,
    };
  },
  created() {
    this.value_ = this.value;
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