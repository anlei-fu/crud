<template>
  <div>
    <OperationPanel
      @batchDelete="batchDelete()"
      @clone="clone()"
      :operations="operations"
    />
    <TableCloneColumnSelector ref="cloneConfiger" />
    <EditTable
      ref="table"
      :columns="filterColumns"
      v-model="items"
      keyProperty="alias"
      :context="{ tables ,queryFilterFields}"
    >
      <template
        slot="edit"
        slot-scope="{ data, index, save, cancel, checkUnique, context }"
      >
        <FilterColumnForm
          :data="data"
          :index="index"
          :tables="context.tables"
          :queryFilterFields="context.queryFilterFields"
          @save="save"
          @cancel="cancel"
          :checkUnique="checkUnique"
        />
      </template>
    </EditTable>
    <TableContextColumnSelector
      :display="false"
      @submit="addColumns"
      ref="selector"
      :tables="tables"
    />
  </div>
</template>
<script>
import COLUMNS from "./../../../config/columns";
import ModelMixin from "./../../mixins/model-mixin";
import RandomUtils from "./../../../lib/random"
import { mapGetters } from "vuex";
export default {
  mixins: [ModelMixin],
  props: {
    tables: Array,
  },
  data() {
    return {
      filterColumns: COLUMNS.FILTER_COLUMNS,
      items: [],
      operations: [
        {
          label: "批量添加",
          event: "clone",
          icon: "ios-add",
          type: "primary",
        },
        {
          label: "批量删除",
          event: "batchDelete",
          icon: "ios-trash-outline",
          type: "error",
        },
      ],
    };
  },
  created() {
    this.items = this.$utils.clone(this.value);
  },
  computed: {
    ...mapGetters(["getColumnInfo"]),
    queryFilterFields(){
      let results =[];
      this.items.forEach(x=>{
         results.push({label:x.alias,value:x.alias})
      });

      return results;
    }
  },
  watch: {
    items: {
      handler() {
        this.$emit("change", this.items);
      },
      deep: true,
    },
  },
  methods: {
    clone() {
      this.$refs.selector.show();
    },
    addColumns(columns) {
      if (columns) {
        let results = [];
        columns.forEach((column) => {
          let data = {};
          data.column = column.column;
          data.table = column.table;
          let info = this.getColumnInfo(data.table, data.column);
          this.$utils.copyFieldsFrom(data, info, ["label", "javaType"]);
          data.$$guid =RandomUtils.guid();
          data.controlType = info.queryControlType;
          data.controlPattern = info.queryControlPattern;
          data.alias = info.entityFieldName;
          results.push(data);
        });

        this.$refs.table.cloneColumns(results);
      }
    },
    batchDelete() {
      this.$refs.table.batchDelete();
    },
  },
};
</script>