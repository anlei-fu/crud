<template>
  <div style="text-align: left">
    <div>
      <div>
        <span>
          <SqlCodeViewer
            type="textarea"
            :operation="false"
            :code="filterMappingsText"
            disabled
            :rows="5"
        /></span>
      </div>
      <div style="margin-top: 5px">
        <span class="_btn"
          ><Button @click="show" type="primary" icon="ios-create" size="small"
            >修改</Button
          ></span
        >
      </div>
    </div>
    <MyModal ref="modal" @ok="ok" width="60%" title="级联配置">
      <!-- <div class="_table_info">
        <span>
          <SqlcodeViewer  type="textarea" :operation="false" :code="formatJoins(joins)" disabled :rows="5"
        /></span>
      </div> -->
       <div class="_table_info">
        <span>
          <SqlCodeViewer type="textarea" :operation="false" :code="formatContextColumns(filterColumns)" disabled :rows="5"
        /></span>
      </div>
      <EditTable
        :columns="columns"
        :context="{ queryFilterFields, tableEnumFilterFields }"
        :keySelector="keySelector"
        :showCheckbox="false"
        :clonable="false"
        :draggable="false"
        maxHeight="700px"
        v-model="filterMappings"
      >
        <template slot="sql" slot-scope="{ row }">
          <span>
            {{ formatJoin(row) }}
          </span>
        </template>
        <template
          slot="edit"
          slot-scope="{ data, index, save, cancel, checkUnique, context }"
        >
          <CasscaderForm
            :data="data"
            :index="index"
            @save="save"
            @cancel="cancel"
            :tableEnumFilterFields="context.tableEnumFilterFields"
            :queryFilterFields="context.queryFilterFields"
            :checkUnique="checkUnique"
            :uniqueFailedMsgGenerator="(x) => '筛选已存在！'"
          />
        </template>
      </EditTable>
    </MyModal>
  </div>
</template>
<script>
import ModelMixin from "./../../mixins/model-mixin";
import FormatMixin from "./../../mixins/format-mixin";
import SqlUtils from "./../../../lib/enum/sql";
export default {
  props: {
    targetEnum: {
      type: String,
    },
    joins: Array,
    queryFilterFields: Array,
    tableEnumFilterFields: Array,
    filterColumns:Array,

    context: Object | Array,
  },
  mixins: [ModelMixin, FormatMixin],
  data() {
    return {
      columns: [
        {
          title: "表枚举过滤字段",
          field: "tableEnumFilterField",
          show: true,
          format: "column",
          width: "200px",
        },
        {
          title: "查询字段",
          field: "queryFilterField",
          show: true,
          width: "200px",
        },
      ],
      filterMappings: [],
      keySelector: (x) => x.tableFilterField,
    };
  },
  computed: {
    filterMappingsText() {
      let text = "";
      if (this.value) {
        this.value.forEach((x) => {
          text += "query." + x.queryFilterField + " => enum.";
          text +=this.format({ format: "column" }, x.tableEnumFilterField) + "\r\n";
        });
      }
      return text;
    },
  },
  created() {
    this.filterMappings = this.$utils.clone(this.value);
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    ok() {
      this.$emit("change", this.filterMappings);
      this.$refs.modal.close();
    },
  },
};
</script>
<style scoped>
._btn {
  margin-left: "20px";
}
._table_info {
}
._table_item {
  display: inline-block;
  padding: 10px 25px;
  background-color: #f8f8f9;
  margin: 5px;
  margin-bottom: 18px;
  font-weight: 500;
}
</style>