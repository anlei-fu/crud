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
import TypeUtils from "./../../../lib/type-utils";
import { mapGetters } from "vuex";
export default {
  props: {
    excludes: {
      type: Array,
      default: () => [],
    },
    includes: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [ModelMixin, ControlMixin],
  computed: {
    ...mapGetters(["getTables"]),
    options() {
      let tables = this.getTables;
      let results = [];
      tables.forEach((x) => {
        if (this.includes.length != 0) {
          for (const include of this.includes) {
            let item = this.$utils.parseJson(include);
            if(!item)
               continue;

            if (TypeUtils.isObject(item)) {
              if (item.$$guid == x.baseInfo.$$guid) {
                let label = item.alias
                  ? `${item.alias}(${x.baseInfo.name})`
                  : x.baseInfo.name;
                results.push({
                  label: label,
                  value: this.$utils.toJson({
                    $$guid: x.baseInfo.$$guid,
                    alias: item.alias,
                  }),
                });
              }
            } else {
              if (include == x.baseInfo.$$guid) {
                results.push({
                  label: x.baseInfo.name,
                  value: this.$utils.toJson({ $$guid: x.baseInfo.$$guid }),
                });
              }
            }
          }

          return;
        }

        console.log(this.excludes.length);
        if (this.excludes.length != 0) {
          for (const exclude of this.excludes) {
            let item = this.$utils.parseJson(exclude);
            if(!item)
               continue;

            if (TypeUtils.isObject(item)) {
              if (item.$$guid == x.baseInfo.$$guid) {
                return;
              }
            } else {
              if (exclude == x.baseInfo.$$guid) {
                return;
              }
            }
          }
        }
        results.push({
          label: x.baseInfo.name,
          value: this.$utils.toJson({ $$guid: x.baseInfo.$$guid }),
        });
      });
      return results;
    },
  },
};
</script>