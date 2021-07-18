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
  },
  mixins: [ModelMixin,ControlMixin],
  computed: {
    ...mapGetters(["getCheckboxEnums"]),
    options() {
      let checkboxEnums = this.getCheckboxEnums;
      let results = [];
      checkboxEnums.forEach((x) => {
        if (this.excludes.includes(x.name)) return;

        results.push({ label: x.name, value: x.$$guid });
      });
      return results;
    },
  },
};
</script>