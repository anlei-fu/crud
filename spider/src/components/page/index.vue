<template>
  <div>
    <div class="_list_preview"></div>
    <Drawer
      title="表信息配置"
      v-model="showTableConfig"
      width="100"
      :mask-closable="false"
    >
      <TableConfig />
    </Drawer>
    <Drawer
      title="全局配置"
      v-model="showGlobalConfig"
      width="100"
      :mask-closable="false"
    >
      <GlobalConfig />
    </Drawer>
    <Drawer
      title="页面配置"
      v-model="showPageConfig"
      width="100"
      :mask-closable="false"
    >
      <ListPageConfig />
    </Drawer>
    <Drawer
      title="枚举配置"
      v-model="showEnumConfig"
      width="100"
      :mask-closable="false"
    >
      <EnumConfig />
    </Drawer>
    <div v-if="showWorkBench" class="_work_bench">
      <div class="_work_bench_header">
        <span class="_work_bench_header_title">工作台 </span>
        <span class="_work_bench_header_close" @click="showWorkBench = false">
          <Icon type="ios-close" size="31" />
        </span>
      </div>
      <div>
        <div class="_work_bench_left">
          <Tabs size="small">
            <TabPane label="页面配置"> </TabPane>
            <TabPane label="查询配置"> </TabPane>
            <TabPane label="添加配置"> </TabPane>
            <TabPane label="操作配置"></TabPane>
          </Tabs>
        </div>
        <div class="_work_bench_right">
          <div class="_step_container">
            <Steps :current="2">
              <Step title="页面配置" />
              <Step title="查询配置" />
              <Step title="添加配置" />
              <Step title="操作配置" />
            </Steps>
          </div>
        </div>
      </div>
    </div>

   
    <Affix :offset-bottom="20">
      <ul>
        <a @click="showPageConfig = true"><li>页面配置</li></a>
        <a @click="showGlobalConfig = true"><li>全局配置</li></a>
        <a @click="showTableConfig = true"><li>表信息配置</li></a>
        <a @click="showEnumConfig = true"><li>枚举配置</li></a>
        <a @click="showWorkBench = true"><li>工作台</li></a>
      </ul>
    </Affix>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      showPageConfig:false,
      showTableConfig: false,
      showEnumConfig: false,
      showWorkBench: false,
      showGlobalConfig: false,
    };
  },
  methods: {
    change(id1, id2) {},
    showList() {
      this.$refs.list.show();
    },
    showFilter() {
      this.$refs.filter.show();
    },
    showJoin() {
      this.$refs.join.show();
    },
    showOrderBy() {
      this.$refs.orderBy.show();
    },
    addListColumn() {},
  },
};
</script>
<style scoped>
._left {
  display: inline-block;
  width: 60%;
}
._right {
  display: inline-block;
  width: 30%;
}
._query_container {
  text-align: left;
  margin-top: 22px;
}
._btn {
  /* float: right; */
  margin-right: 20px;
}
._operation {
  text-align: right;
  line-height: 64px;
}
._list_preview {
  height: 200px;
  background-color: white;
}
._window_manage {
  position: fixed;
  right: 6%;
  bottom: 6%;
  z-index: 1000;
  height: 100px;
}
ul {
  list-style: none;
}
li {
  list-style: none;
  line-height: 16px;
}
._add_row {
  text-align: center;
  line-height: 40px;
  border: dashed 1px #cde2f7;
}
._add_row :hover {
  border: dashed 1px #4682b4;
}
a {
  border: none;
}
._property {
  position: fixed;
  right: 2%;
  top: 12%;
  z-index: 1000;
  height: 100px;
  z-index: 20000;
}
._row {
  background-color: #f0f0f0;
  border: 1px solid #dcdee2;
  border-bottom: none;
  line-height: 30px;
}
._row_span1 {
  display: inline-block;
  border-right: solid 1px #dcdee2;
  width: 50%;
}
._row_span2 {
  display: inline-block;
  width: 50%;
  background-color: white;
  text-align: left;
}
._work_bench {
  position: fixed;
  right: 0%;
  bottom: 0%;
  z-index: 1000;
  background-color: #ffffff;
  height: 400px;
  z-index: 1000;
  width: 100%;
  box-shadow: 0px 0px 6px 4px rgb(80 80 80 / 20%);
}
._work_bench_header {
  border-bottom: 1px solid #e8eaec;
  text-align: left;
}
._work_bench_header_close {
  color: #a8a8a8;
  -webkit-transition: color 0.2s ease;
  transition: color 0.2s ease;
  /* position: relative; */
  /* top: 1px; */
  float: right;
  margin-right: 10px;
  margin-top: 6px;
}

._work_bench_header_close:hover {
  color: #5b5e62;
}
._work_bench_header_title {
  line-height: 39px;
  font-size: 14px;
  color: #17233d;
  font-weight: 700;
  margin-left: 15px;
}
._work_bench_left {
  display: inline-block;
  width: 20%;
  background: #ffffff;
  height: 100%;
  border-right: 1px solid #e8eaec;
  min-height: 500px;
}
._work_bench_right {
  display: inline-block;
  width: 79%;
  height: 100%;
  background-color: #ffffff;
  vertical-align: top;
}
._step_container {
  margin-top: 30px;
}
</style>