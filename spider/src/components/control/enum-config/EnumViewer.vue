<template>
  <div>
    <Tabs v-model="selectedTab" @on-click="render1">
      <TabPane label="Java枚举类" name="javaEnum">
        <JavaCodeViewer height="500px" :code="javaEnumCode" :name="data.baseInfo.name" />
      </TabPane>
      <TabPane label="Java常量类" name="javaConst">
        <JavaCodeViewer  height="500px" :code="javaConstCode" :name="data.baseInfo.name" />
      </TabPane>
      <TabPane label="Js枚举" name="jsEnum">
        <JsCodeViewer height="500px" :code="jsEnumCode" :name="data.baseInfo.name" />
      </TabPane>
      <TabPane label="Js常量" name="jsConst">
        <JsCodeViewer height="500px" :code="jsConstCode" :name="data.baseInfo.name" />
      </TabPane>
      
    </Tabs>
  </div>
</template>
<script>
import showdown from "showdown";
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
      javaEnumCode: null,
      javaConstCode:null,
      jsEnumCode: null,
      jsConstCode: null,
    };
  },
  methods: {
    render1() {
      if (this.selectedTab == "javaEnum") {
        this.renderJavaEnumCode();
      } else if (this.selectedTab == "javaConst") {
        this.renderJavaConstCode();
      } else if (this.selectedTab == "jsEnum") {
        this.renderJsEnumCode();
      }else if (this.selectedTab == "jsConst") {
        this.renderJsConstCode();
      }
    },

    async renderJavaEnumCode() {
      
      let resp = await this.renderJavaEnum(this.data);
      this.javaEnumCode = resp.data || resp.message;
    },
    async renderJavaConstCode() {
      let resp = await this.renderJavaConst(this.data);
      this.javaConstCode = resp.data || resp.message;
      
    },
     async renderJsEnumCode() {
      let resp = await this.renderJsEnum(this.data);
      this.jsEnumCode = resp.data || resp.message;
    },
    async renderJsConstCode() {
      let resp = await this.renderJsConst(this.data);
      this.jsConstCode = resp.data || resp.message;
    },
  },
};
</script>
<style scoped>
._container {
  text-align: right;
  line-height: 40px;
  margin-bottom: 5px;
  margin-top: 10px;
}
._btn_container {
  margin-right: 30px;
}
._btn_item {
  margin-right: 10px;
}
</style>