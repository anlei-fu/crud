<template>
  <MySelect
    v-model="value_"
    :options="options"
    :width="width"
    :clearable="clearable"
    :placeholder="placeHolder"
    :size="size"
  />
</template>
<script>
import ModelMixin from "./../../mixins/model-mixin";
import ControlMixin from "./../../mixins/control-mixin";
export default {
  props: {
    excludes: {
      type: Array,
      default: () => [],
    },
    table: String,
  },
  mixins: [ModelMixin, ControlMixin],
  computed: {
    options() {
      if(!this.table)
         return [];
         
      let columns = this.$store.getters.getTableColumns(this.table);
      let results = [];
      columns.forEach((x) => {
        if (this.excludes.includes(x.$$guid)) return;

        results.push({ label: x.name, value: x.$$guid });
      });
      return results;
    },
  },
};
</script>