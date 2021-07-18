<template>
  <div>
    <Tabs v-model="selectedTab" @on-click="render1">
      <TabPane label="DDL" name="sql">
        <Alert
          v-if="showDdlSql"
          @on-close="disableDdlSql"
          closable
          style="text-align: left"
          type="info"
          show-icon
          >表创建Sql语句<span slot="desc"
            >表生成DDLsql，点击右下角按钮可进行拷贝和导出。</span
          ></Alert
        >
        <SqlCodeViewer height="500px" :code="sqlCode" :name="data.baseInfo.entityName" />
      </TabPane>
      <TabPane label="Java实体类" name="javaEntity">
        <Alert
          v-if="showJavaEntity"
          @on-close="disableJavaEntity"
          style="text-align: left"
          closable
          type="info"
          show-icon
          >java实体类class<span slot="desc"
            >生成包名不正确，请先在全局配置->项目配置，配置公司编号和项目编号,如果要配置实体类后缀名称，在全局配置->生成配置，配置相应的后缀名。点击右下角按钮可进行拷贝和导出。</span
          ></Alert
        >
        <JavaCodeViewer  height="500px" :code="javaCode" :name="data.baseInfo.entityName" />
      </TabPane>
      <TabPane label="Js实体类" name="jsEntity">
        <JsCodeViewer height="500px" :code="jsCode" :name="data.baseInfo.entityName" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import RenderMixin from "./../../mixins/render-mixin";
import NoticeMixin from "./../../mixins/notice-mixin";
export default {
  mixins: [RenderMixin, NoticeMixin],
  props: {
    data: Object,
  },
  data() {
    return {
      selectedTab: null,
      sqlCode: null,
      javaCode: null,
      jsCode: null,
    };
  },
  methods: {
    render1() {
      if (this.selectedTab == "sql") {
        this.renderSqlCode();
      } else if (this.selectedTab == "javaEntity") {
        this.renderJavaCode();
      } else if (this.selectedTab == "jsEntity") {
        this.renderJsCode();
      }
    },

    async renderSqlCode() {
      let resp = await this.renderTableDdl(this.data);
      this.sqlCode = resp.data || resp.message;
    },
    async renderJavaCode() {
      let resp = await this.renderJavaEntity(this.data);
      this.javaCode = resp.data || resp.message;
    },
    async renderJsCode() {
      let resp = await this.renderJsEntity(this.data);
      this.jsCode = resp.data || resp.message;
    },

    renderGraph() {},
  },
};
</script>
