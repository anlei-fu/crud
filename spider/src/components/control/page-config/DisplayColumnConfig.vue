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
      v-model="items"
      keyProperty="alias"
      :context="{ tables }"
      :columns="listPageColumns"
    >
      <template
        slot="edit"
        slot-scope="{ data, index, save, cancel, checkUnique, context }"
      >
        <DisplayColumnForm
          :data="data"
          :index="index"
          :tables="context.tables"
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
import { mapGetters } from "vuex";
export default {
  mixins: [ModelMixin],
  props: {
    tables: Array,
  },
  data() {
    return {
      listPageColumns: COLUMNS.LIST_PAGE_COLUMNS,
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
  computed: {
    ...mapGetters(["getColumnInfo"]),
  },
  created() {
    this.items = this.$utils.clone(this.value);
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
          this.$utils.copyFieldsFrom(data, info, [
            "sortable",
            "format",
            "pattern",
            "label",
            "javaType",
            "palceHolder",
            "minWidth",
            "placeHolder",
            "defaultShow",
          ]);

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