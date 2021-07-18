<template>
  <div>
    <div v-if="display">
      <div>
        <span>
          <SqlCodeViewer
            :operations="false"
            type="textarea"
            width="100%"
            :code="displayText"
            disabled
            :rows="5"
        /></span>
      </div>
      <div>
        <span class="_btn"
          ><Button @click="show" type="primary" icon="ios-create" size="small"
            >修改</Button
          ></span
        >
      </div>
    </div>
    <MyModal ref="modal" @ok="ok" width="80%" title="选择筛选列">
      <MyScroll maxHeight="500px">
        <div class="_content">
          <div class="_left">
            <div class="_table_container">
              <div class="_table_name">
                可选表
                <span @click="clearSelectedTables()" class="_close"
                  ><Icon type="ios-trash-outline" size="24"
                /></span>
              </div>
              <MyCheckBoxGroup
                v-model="selectedTables"
                :withAll="false"
                labelWidth="120px"
                :options="candidateTables"
              />
            </div>

            <div
              class="_table_container"
              v-for="table in selectedTables"
              :key="table"
            >
              <div class="_table_name">
                {{ format({ format: "table" }, table) }}
                <span @click="clearTable(table)" class="_close"
                  ><Icon type="ios-trash-outline" size="22"
                /></span>
              </div>
              <MyCheckBoxGroup
                v-model="selectedColumns[table]"
                labelWidth="120px"
                :withAll="false"
                :options="getColumnCandidate(table)"
              />
            </div>
          </div>
          <div class="_right">
            <div class="_right_header">
              当前选中列
              <span
                @click="clearAll()"
                style="margin-right: 7px; color: #8ce6b0"
                class="_close"
                ><Icon type="ios-trash-outline" size="22"
              /></span>
            </div>
            <div
              v-for="item in targetColumns"
              :key="item.column"
              class="_drag_item"
            >
              <span
                >{{ format({ format: "table" }, item.table) }}.{{
                  format({ format: "column" }, item.column)
                }}</span
              >
              <span
                @click="remove(item.table, item.column)"
                style="color: #8ce6b0"
                class="_close"
                ><Icon type="ios-close" size="24"
              /></span>
            </div>
          </div>
        </div>
      </MyScroll>
    </MyModal>
  </div>
</template>
<script>
import ModelMixin from "./../../mixins/model-mixin";
import FormatMixin from "./../../mixins/format-mixin";
import { mapGetters } from "vuex";
export default {
  props: {
    tables: Array,
    context: Object | Array,
    display: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [ModelMixin, FormatMixin],
  data() {
    return {
      selectedColumns: {},
      selectedTables: [],
    };
  },
  computed: {
    ...mapGetters(["getTableColumns", "getTables", "getColumnInfo"]),
    candidateTables() {
      let tables = this.getTables;
      let items = [];
      if (this.tables) {
        tables.forEach((x) => {
          this.tables.forEach((t) => {
            let obj = this.$utils.parseJson(t);
            if (obj.$$guid == x.baseInfo.$$guid) {
              items.push({ label: x.baseInfo.name, value: t });
            }
          });
        });
      }
      return items;
    },

    displayText() {
      return this.formatContextColumns(this.value_);
    },

    targetColumns() {
      let columns = [];
      this.selectedTables.forEach((x) => {
        if (this.selectedColumns[x]) {
          this.selectedColumns[x].forEach((y) => {
            columns.push(this.$utils.parseJson(y));
          });
        }
      });

      return columns;
    },
  },
  created() {
    // this.selectedColumns = this.$utils.clone(this.value);
  },
  methods: {
    remove(table, column) {
      let table1 = this.selectedColumns[table];
      this.selectedColumns[table] = this.selectedColumns[table].filter(
        (x) => this.$utils.toJson({ table, column }) != x
      );
    },
    clearTable(table) {
      this.selectedColumns[table] = [];
    },
    clearAll() {
      Object.keys(this.selectedColumns).forEach((x) => {
        this.selectedColumns[x] = [];
      });
    },
    clearSelectedTables() {
      this.selectedTables = [];
    },
    ok() {
      let result = [];
      let columns = this.targetColumns;
      if (columns.length > 0) {
        columns.forEach((x) => {
          result.push({ table: x.table, column: x.column });
        });

        this.value_ = result;
        this.$emit("submit", result);
      }
      this.$refs.modal.close();
    },
    show() {
      this.selectedTables = [];
      this.selectedColumns = {};
      this.$refs.modal.show();
    },
    changePos(params1, params2) {
      let targetData = this.selectedColumns.splice(params1.id, 1);
      this.selectedColumns.splice(params2.id, 0, targetData[0]);
    },

    getColumnCandidate(table) {
      let columns = this.getTableColumns(table);
      let items = [];
      columns.forEach((x) => {
        items.push({
          label: x.name,
          value: this.$utils.toJson({ table, column: x.$$guid }),
        });
      });
      return items;
    },
  },
};
</script>
<style scoped>
._left {
  display: inline-block;
  vertical-align: top;
  display: inline-block;
  width: 70%;
  /* padding: 10px; */
  min-height: 300px;
  padding-top: 10px;
  /* padding: 32px; */
  text-align: left;
}
._right_header {
  text-align: left;
  /* line-height: 20px; */
  padding: 11px;
  font-weight: 700;
  font-size: 13px;
  border-bottom: 1px solid #8ce6b0;
}
._right {
  text-align: left;
  display: inline-block;
  vertical-align: top;
  display: inline-block;
  width: 28%;
  /* padding: 10px 0px; */
  background: #edfff3;
  border: 1px solid #8ce6b0;
  /* padding: 10px 0px; */
  margin-top: 20px;
  min-height: 300px;
  margin-left: 20px;
  border-radius: 4px;
}
._drag_item {
  line-height: 43px;
  padding-left: 21px;
  border-bottom: 1px solid #8ce6b0;
  font-size: 12px;
}

._btn {
  float: right;
}
._table_container {
  background-color: #f0faff;
  padding-bottom: 10px;
  padding: 19px;
  border: 1px solid #abdcff;
  border-radius: 4px;
  margin-top: 8px;
}
._table_name {
  /* margin: 26px 0px; */
  /* margin-bottom: 10px; */
  margin-bottom: 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid #abdcff;
  font-size: 13px;
  font-weight: 700;
  padding-left: 18px;
}
._close {
  float: right;
  color: #8fc0f2;
  margin-right: 15px;
  transition: ease 0.5s;
}
._close :hover {
  color: red;
}
</style>