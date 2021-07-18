<template>
  <span>
    <span v-if="label"> {{ label }}</span>
    <RadioGroup v-model="selectedValue_">
      <Radio v-for="item in options_" :key="item.value" :label="item.label">
        <Icon v-if="item.icon" :type="item.icon" />
      </Radio>
    </RadioGroup>
  </span>
</template>
<script>
import  arrayUtils from "./../../../lib/array-utils";
export default {
  model: {
    event: "change",
    prop: "selectedValue",
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedValue: {
      type: String | Number,
    },
    label: String,
  },
  data() {
    return {
      selectedValue_: null,
      options_: null,
    };
  },
  created() {
    this.options_ = this.options;
    this.selectedValue_ = arrayUtils.findFirst(
      this.options_,
      (x) => x.label == this.selectedValue
    );
  },
  watch: {
    options(val) {
      this.options_ = this.options;
    },
    selectedValue_(newVal) {
      this.$emit(
        "change",
        arrayUtils.findFirst(
          this.options_,
          (x) => x.label == this._selectedValue
        )
      );
    },
    selectedValue(newVal) {
      this.selectedValue_ = arrayUtils.findFirst(
        this.options_,
        (x) => x.label == this.selectedValue
      );
    },
  },
};
</script>
