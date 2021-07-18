<template>
  <div>
    <div class="_left_container">
      <div style="border-bottom: 1px solid #e3e5e8">
        <OperationPanel
          align="left"
          @previous="previous"
          @next="next"
          size="small"
          :operations="operations"
        />
      </div>
      <div class="_step_container">
        <Steps size="small" :current="current" direction="vertical">
          <Step title="join配置"></Step>
          <Step title="显示列配置"></Step>
          <Step title="筛选配置"></Step>
          <Step title="排序配置"></Step>
          <Step title="添加配置"></Step>
          <Step title="操作配置"></Step>
        </Steps>
      </div>
    </div>
    <div class="_right_container">
      <div>
        <Tabs>
          <TabPane label="列表展示页面预览">
            <div class="_display">
              <div class="__filter_container">
                <template v-for="(item, index) in filters">
                  <span class="_filter_item" :key="index">
                    <MyInput
                      v-if="item.controlType == 'text'"
                      size="small"
                      :placeHolder="item.placeHolder"
                      :width="item.width"
                      :title="item.title"
                    />
                    <MySelect
                      v-if="item.controlType == 'select'"
                      dicName="controlType"
                      size="small"
                      :width="item.width"
                      :placeHolder="item.placeHolder"
                      :title="item.title"
                    />
                     <MyCheckboxGroup
                      v-if="item.controlType == 'select'"
                      dicName="controlType"
                      size="small"
                      :withAll="false"
                      :width="item.width"
                      :placeHolder="item.placeHolder"
                      :title="item.title"
                    />
                    <MyDateRange
                      v-if="item.controlType == 'date'"
                      dicName="controlType"
                      size="small"
                      :width="item.width"
                      :placeHolder="item.placeHolder"
                      :title="item.title"
                    />
                  </span>
                </template>
                <span class="_filter_item">
                  <QueryButton size="small" />
                </span>
              </div>
              <Table :columns="tableColumns" :data="mockData" />
              <MyPager />
            </div>
          </TabPane>
        </Tabs>
        <div class="_item_container">
          <div v-if="current == 0">
            <JoinConfiger v-model="joins" :targetTable="targetTable" />
          </div>
          <div v-if="current == 1">
            <DisplayColumnConfig v-model="data.listItems" :tables="tables" />
          </div>
          <div v-if="current == 2">
            <FilterColumnConfig v-model="data.filterItems" :tables="tables" />
          </div>
          <div v-if="current == 3">
            <OrderByConfiger v-model="orderBys" :context="{ tables }" />
          </div>
          <div v-if="current == 4"><AddColumnConfig /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import COLUMNS from "./../../../config/columns";
export default {
  data() {
    return {
      targetTable: '{"$$guid":"155491a0-891f-b9d3-e9df-3385ffd19fa8"}',
      current: 0,
      joins: [],
      listColumns: [],
      filterColumns: [],
      orderBys: [],
      addColumns: [],
      deleteConfig: [],
      otherConfig: [],
      operations: [
        { label: "上一步", event: "previous" },
        { label: "下一步", event: "next" },
      ],
      data: {
        listItems: [],
        filterItems: [],
      },
    };
  },
  computed: {
    tables() {
      let items = [];
      if (this.targetTable) {
        let obj = this.$utils.parseJson(this.targetTable);
        obj.alias = "t";

        items.push(this.$utils.toJson(obj));
      }

      if (this.joins) {
        this.joins.forEach((x) => {
          items.push(x.table2);
        });
      }
      return items;
    },
    tableColumns() {
      let result = [];
      if (this.data.listItems) {
        this.data.listItems.forEach((x) => {
          let data = {};
          data.title = x.label;
          data.key = x.alias;
          data.sortable = x.sortable;
          data.align = x.align || "center";
          data.minWidth = x.minWidth;
          data.fixed = x.fixed;
          result.push(data);
        });
      }

      return result;
    },
    filters() {
      let result = [];
      if (this.data.filterItems) {
        this.data.filterItems.forEach((x) => {
          let data = {};
          data.title = x.label;
          data.controlType = x.controlType;
          data.pattern = x.controlPattern;
          data.width = x.width || 220;
          data.placeHolder = x.placeHolder;
          result.push(data);
        });
      }

      return result;
    },
    mockData() {
      let result = [];
      if (this.data.listItems) {
        let data = {};
        this.data.listItems.forEach((x) => {
          data[x.alias] = "test";
        });

        result.push(data);
      }
      return result;
    },
  },
  methods: {
    previous() {
      if (this.current > 0) {
        this.current--;
      }
    },
    next() {
      if (this.current < 6) {
        this.current++;
      }
    },
  },
};
</script>
<style scoped>
._left_container {
  display: inline-block;
  width: 13%;
  vertical-align: top;
  background-color: #f8f8f9;
  min-height: 1000px;
}
._right_container {
  display: inline-block;
  width: 83%;
  margin-left: 20px;
}
._item_container {
  margin-top: 10px;
}
._display {
  margin-bottom: 10px;
  background-color: #e6e6e6;
  padding: 23px 24px;
}
._filter_item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 13px;
}
.__filter_container {
  text-align: left;
  -webkit-box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
  text-align: left;
  padding: 10px 10px;
  margin-bottom: 9px;
  background-color: white;
}
._step_container {
  background-color: #f8f8f9;
  padding: 10px;
  text-align: left;
}
</style>