<template>
  <div style="text-align: left">
    <div>
      <div>
        <span>
          <SqlCodeViewer type="textarea" :code="orderByText" disabled :rows="5"
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
    <MyModal ref="modal" @ok="ok" width="60%" title="配置排序">
      <div class="_table_info">
        <span
          class="_table_item"
          v-for="(item, index) in tableInfos"
          :key="index"
        >
          {{ item }}
        </span>
      </div>
      <OperationPanel @analyze="analyze()" :operations="operations" />
      <EditTable
        ref="table"
        :columns="columns"
        :context="context"
        :keySelector="keySelector"
        :showCheckbox="false"
        msgText="排序"
        maxHeight="700px"
        v-model="orderByItems"
      >
        <template slot="orderBy" slot-scope="{ row }">
          <span :title="makeOrderText(row)">
            {{ makeOrderText(row) }}
          </span>
        </template>

        <template
          slot="edit"
          slot-scope="{ data, index, save, context, cancel, checkUnique }"
        >
          <OrderByForm
            :data="data"
            :index="index"
            @save="save"
            @cancel="cancel"
            :tables="context.tables"
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
import * as utils from "./../../../utils";
import SqlUtils from "./../../../lib/enum/sql";
import RandomUtils from "./../../../lib/random";
import { mapGetters } from "vuex";
export default {
  props: {
    tables: {
      type: Array,
      default: () => [],
    },
    context: Object | Array,
  },
  mixins: [ModelMixin, FormatMixin],
  data() {
    return {
      columns: [
        {
          title: "排序",
          field: "table",
          // show: true,
        },
        {
          title: "排序",
          field: "column",
          // show: true,
        },
        {
          title: "排序",
          field: "orderByType",
          // show: true,
        },
        {
          title: "排序",
          field: "customer",
          // show: true,
        },
        {
          title: "排序",
          field: "customerSql",
          // show: true,
        },
        {
          title: "排序",
          field: "orderBy",
          show: true,
          width: "300px",
        },
      ],
      operations: [
        {
          label: "自动分析",
          event: "analyze",
        },
      ],
      orderByItems: [],
      keySelector: (x) =>
        x.customer ? x.customerSql : `${x.table}.${x.column} ${x.orderByType}`,
    };
  },
  computed: {
    ...mapGetters(["getTableColumns"]),
    tableInfos() {
      let items = [];
      this.context.tables.forEach((x) => {
        if (!x) return;

        let item = this.$utils.parseJson(x);
        let text = this.format({ format: "table" }, x);
        items.push(`${text}`);
      });

      return items;
    },

    orderByText() {
      let text = "";
      if (!this.value) return "";
      return this.formatOrderBy(this.value);
    },
  },
  created() {
    this.orderByItems = this.$utils.clone(this.value);
  },
  methods: {
    show() {
      this.$refs.modal.show();
      this.$refs.table.init(this.value);
    },
    ok() {
      this.$emit("change", this.orderByItems);
      this.$refs.modal.close();
    },

    analyze() {
      if (this.context.tables) {
        let results = [];
        this.context.tables.forEach((x) => {
          let columns = this.getTableColumns(x);
          columns.forEach((column) => {
            if (column.isSortField) {
              results.push({
                table: x,
                $$guid: RandomUtils.guid(),
                column: column.$$guid,
                orderByType: column.orderByType,
              });
            }
          });
        });

        this.$refs.table.cloneColumns(results);
      }
    },

    makeOrderText(data) {
      if (!data) return "";

      let text = "";
      if (data.customer) {
        text += data.customerSql;
      } else {
        text += `${this.format({ format: "table" }, data.table)}.${this.format(
          { format: "column" },
          data.column
        )} ${data.orderByType}`;
      }

      return text;
    },
  },
};
</script>
<style scoped>
._btn {
  float: right;
}
._table_info {
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
<style >
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>