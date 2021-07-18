<template>
  <span :title="title">
    <span v-if="title" style="margin-right: 1px">{{ title }}</span>
    <span :style="style">
      <Select
        v-model="value_"
        filterable
        :clearable="clearable"
        :placeholder="placeHolder"
        :multiple="multiple"
        transfer
        :size="size"
      >
        <Option
          v-for="item in candicateoptions"
          :label="item[labelField]"
          :value="item[valueField]"
          :key="item[valueField]"
        />
      </Select>
    </span>
  </span>
</template>
<script>
import utils from "./../../../common";
import ControlMixin from "./../../mixins/control-mixin";
import EnumMixin from "./../../mixins/enum-mixin";
import { mapGetters } from "vuex";
export default {
  props: {
    dicName: String,
    multiple: Boolean,
  },
  mixins: [ControlMixin, EnumMixin],
  data() {
    return {
      options_: {
        source: [],
        filtered: [],
      },
    };
  },
  created() {
    this.value_ = this.$utils.clone(this.value);
  },
  computed: {
    ...mapGetters(["getDictionary"]),
    candicateoptions() {
      if (this.dicName) {
        return this.getDictionary(this.dicName);
      } else {
        return this.options;
      }
    },
  },

  watch: {
    value_: {
      handler(val) {
        this.$emit("change", val);
      },
      deep: true,
    },
  },
};
</script>
