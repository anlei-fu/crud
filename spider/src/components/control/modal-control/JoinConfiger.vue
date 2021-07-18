<template>
  <div style="text-align:left;">
    <div>
      <div>
        <span>
          <SqlCodeViewer :operations="false" type="textarea" :code="joinText" disabled :rows="5"
        /></span>
      </div>
      <div style="margin-top:5px;">
        <span class="_btn"
          ><Button @click="show" type="primary" icon="ios-create" size="small">修改</Button></span
        >
      </div>
    </div>
    <MyModal ref="modal" @ok="ok" width="60%" title="Join配置">
      <div class="_table_info">
        <span
          class="_table_item"
          v-for="(item, index) in tableInfos"
          v-if="item"
          :key="index"
        >
          {{ format({ format: "table" }, item) }}
        </span>
      </div>
      <EditTable
        ref="table"
        :columns="columns"
        :context="context || {}"
        :keySelector="keySelector"
        :showCheckbox="false"
        :clonable="false"
        :editable="false"
        :draggable="false"
        :removeInterceptor="removeInterceptor"
        maxHeight="700px"
        v-model="joinItems"
      >
        <template slot="sql" slot-scope="{ row }">
          <span>
            {{ formatJoin(row) }}
          </span>
        </template>
        <template
          slot="edit"
          slot-scope="{ data, index, save, cancel, checkUnique }"
        >
          <JoinForm
            :data="data"
            :index="index"
            @save="save"
            @cancel="cancel"
            :tables="tableInfos"
            :checkUnique="checkUnique"
            :uniqueFailedMsgGenerator="(x) => '排序已存在！'"
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
    targetTable: {
      type: String,
    },
    context: Object | Array,
  },
  mixins: [ModelMixin, FormatMixin],
  data() {
    return {
      columns: [
        {
          title: "排序",
          field: "table1",
          // show: true,
        },
        {
          title: "排序",
          field: "table2",
          // show: true,
        },
        {
          title: "排序",
          field: "table1Column",
          // show: true,
        },
        {
          title: "排序",
          field: "table2Column",
          // show: true,
        },
        {
          title: "排序",
          field: "joinType",
          // show: true,
        },
        {
          title: "排序",
          field: "customer",
          width: "200px",
        },
        {
          title: "排序",
          field: "customerSql",
          width: "200px",
        },
        {
          title: "join表达式",
          field: "sql",
          width: "400px",
          show: true,
        },
      ],
      joinItems: [],
      keySelector: (x) =>
        x.customer
          ? X.joinType + x.customerSql
          : `${x.joinType} ${x.table1}.${x.table1Column} ${x.table2} ${x.table2Column}`,
    };
  },
  computed: {
    tableInfos() {
      let items = [];
      if (this.targetTable) {
        let obj = this.$utils.parseJson(this.targetTable);
        obj.alias = "t";

        items.push(this.$utils.toJson(obj));
      }

      if (this.joinItems) {
        this.joinItems.forEach((x) => {
          items.push(x.table2);
        });
      }
      return items;
    },

    joinText() {
      return this.formatJoins(this.value);
    },
  },
  created() {
    this.joinItems = this.$utils.clone(this.value);
  },
  methods: {
    show() {
      this.$refs.modal.show();
      debugger
      this.$refs.table.init(this.value);
    },
    ok() {
      this.$emit("change", this.joinItems);
      this.$refs.modal.close();
    },

    removeInterceptor(guid, index) {
      if (index != this.joinItems.length - 1) {
        this.$Message.warning("只能从最后一个Join开始删除！");
        return false;
      }

      return true;
    },
  },
};
</script>
<style scoped>
._btn {
  float: right;
}
._table_item {
   display: inline-block;
  padding: 10px 25px;
  background-color: #f0faff;
  border: 1px solid #abdcff;
  border-radius: 3px;
  margin: 5px;
  margin-bottom: 18px;
  font-weight: 500;
}
</style>