<template>
  <MySelect
    v-model="value_"
    :width="width"
    :clearable="clearable"
    :placeholder="placeHolder"
    :size="size"
    :options="options"
  />
</template>
<script>
import ModelMixin from "./../../mixins/model-mixin";
import ControlMixin from "./../../mixins/control-mixin";
import { mapGetters } from "vuex";
export default {
  props: {
    excludes: {
      type: Array,
      default: () => [],
    },
    tableEnum: Boolean,
  },
  mixins: [ModelMixin, ControlMixin],
  computed: {
    ...mapGetters(["getEnums", "getTableEnums"]),
    options() {
      let enums = this.getEnums;
      let results = [];
      enums.forEach((x) => {
        if (this.excludes.includes(x.baseInfo.name)) return;

        results.push({
          label: x.baseInfo.name + "(枚举)",
          value: x.baseInfo.$$guid,
        });
      });
      if (this.tableEnum) {
        let tableEnums = this.getTableEnums;
        tableEnums.forEach((x) => {
          if (this.excludes.includes(x.name)) return;

          results.push({ label: x.name + "(表枚举)", value: x.$$guid });
        });
        return results;
      }
    },
  },
};
</script>