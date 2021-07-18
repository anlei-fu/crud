<template>
  <div>
    <div v-show="columnFilter" style="text-align: left; padding: 10px; padding-bottom: 15px;">
      <MyCheckBoxGroup v-model="selectedColumns_" label="title" value="slot" :options="columns" />
    </div>
    <div>
      <Table
        ref="table"
        :border="border"
        :stripe="stripe"
        size="small"
        :columns="contentColumn.filtered"
        :data="datas"
      >
        <template v-for="column in contentColumn.filtered" slot-scope="{ row }" :slot="column.slot">
          <span v-if="column.isOperation" :key="column.slot">
            <template v-for="item in column.operations">
              <Link
                style="margin-left: 10px;"
                :key="item.name"
                v-if="item.match(row)"
                :label="item.label"
                @click="emit(item.name, row)"
              />
            </template>
          </span>
          <Link v-else-if="column.isLink" :key="column.slot" :path="row[column.linkField]" :label="row[column.slot]"/>
          <MyPositiveProgress
            v-else-if="column.isPositiveProgress"
            :percent="
              (row[column.currentField] / (row[column.maxField] == 0 ? 1 : row[column.maxField])) *
              100
            "
            :key="column.slot"
          />
          <MyNegativeProgress
            v-else-if="column.isNegativeProgress"
            :percent="
              (row[column.currentField] / (row[column.maxField] == 0 ? 1 : row[column.maxField])) *
              100
            "
            :key="column.slot"
          />
          <PlainText v-else :key="column.slot" :format="column.format" :value="row[column.slot]" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    datas: Array,
    columnFilter: Boolean,
    stripe: Boolean,
    border: Boolean,
    selectedColumns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedColumns_: [],
      contentColumn: {
        source: [],
        filtered: [],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.contentColumn.source = this.contentColumn.filtered = this.columns;
      let columns = this.$utils.clone(this.selectedColumns);
      this.selectedColumns_ =
        columns.length == 0 ? this.getAllColumns() : columns;
    },
    emit(event, row) {
      this.$emit(event, row);
    },
    getSelection() {
      return this.$refs.table.getSelection();
    },
    doFilter() {
      let set = new Set(this.selectedColumns_);
      this.contentColumn.filtered = this.contentColumn.source.filter((x) =>
        set.has(x.slot)
      );
    },
    getAllColumns() {
      let columns = [];
      this.contentColumn.source.forEach((x) => {
        columns.push(x.slot);
      });
      return columns;
    },
  },
  watch: {
    selectedColumns_: {
      deep: true,
      handler: function (newVal) {
        if (this.doFilter) {
          this.doFilter();
        }
      },
    },
    selectedColumns() {
      this.selectedColumns_ = this.$utils.clone(this.selectedColumns);
    },
  },
};
</script>
