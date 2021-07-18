<template>
  <span>
    <span v-if="title" style="margin-right: 1px">{{ title }}</span>
    <span :style="style">
      <Input
        v-model="value_"
        :clearable="clearable"
        :placeholder="placeHolder"
        :type="type"
        :readonly="readonly"
        :size="size"
        :border="border"
        :maxlength="maxlength"
        :rows="rows"
      />
    </span>
  </span>
</template>
<script>
import utils from "./../../../common";
import ControlMixin from "./../../mixins/control-mixin";
export default {
  mixins: [ControlMixin],
  props: {
    maxlength: {
      type: Number,
    },
    rows: {
      type: Number,
      default: 3,
    },
    type: String,
    border: Boolean,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
 
};
</script>
