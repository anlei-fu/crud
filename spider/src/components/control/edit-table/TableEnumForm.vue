<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="100">
    <Row justify="space-between"
      ><Col :span="5">
        <FormItem
          label="名称"
          title="生成枚举类或常量时使用，符合变量命名规则，具有唯一性"
          prop="name"
        >
          <MyInput
            v-model="data1.name"
            size="small"
            :maxlength="100"
            placeHolder="请输入名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="主表" title="主表" prop="table">
          <TableSelector
            v-model="data1.table"
            placeHolder="请选择主表"
            size="small"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem
          label="值列"
          title="主表的值列（一般为主键）"
          prop="valueField"
        >
          <TableColumnSelector
            v-model="data1.valueField"
            size="small"
            palceHolder="请选择主表值列"
            :table="data1.table"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="标题列" title="" prop="labelField">
          <TableColumnSelector
            v-model="data1.labelField"
            size="small"
            palceHolder="请选择主表标题列"
            :table="data1.table"
          /> </FormItem
      ></Col>
      <Col v-if="showJoin" :span="24">
        <FormItem>
          <Alert type="info" closable show-icon @on-close="disableJoin"
            >join 配置
            <span slot="desc"
              >一个表只支持join一次,join条件可自定义配置，删除必须从尾向前删。
            </span></Alert
          >
        </FormItem>
      </Col>
      <Col :span="24">
        <FormItem label="关联配置" prop="joins">
          <JoinConfiger
            v-model="data1.joins"
            :targetTable="data1.table"
            width="100%"
          /> </FormItem
      ></Col>
      <Col :span="24">
        <FormItem label="当前选择的表">
          <div>
            <span
              class="_table_item"
              v-for="(item, index) in orderByContext.tables"
              :key="index"
            >
              {{ format({ format: "table" }, item) }}
            </span>
          </div>
        </FormItem>
      </Col>
      <Col :span="24">
        <FormItem label="筛选配置" prop="filterColumns">
          <TableContextColumnSelector
            v-model="data1.filterColumns"
            :tables="orderByContext.tables"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="排序配置" prop="orderBys">
          <OrderByConfiger
            v-model="data1.orderBys"
            :context="orderByContext"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" title="请输入描述信息" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            width="100%"
            type="textarea"
            placeHolder="请输入描述信息"
            :maxlength="100"
            :rows="3"
          /> </FormItem></Col
    ></Row>
    <OperationPanel
      @save="save"
      @cancel="cancel"
      @create="save"
      :operations="targetOperations"
    />
  </Form>
</template>
<script>
import FormatMixin from "./../../mixins/format-mixin";
import NoticeMixin from "./../../mixins/notice-mixin";
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
export default {
  mixins: [EditTableFormMixin, FormatMixin, NoticeMixin],
  data() {
    return {
      data1: {
        name: null,
        table: null,
        valueField: null,
        labelField: null,
        orderBys: null,
        joins: [],
        filterColumns: [],
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        table: [ValidatorUtils.RuleFactory.require("主表不能为空")],
        valueField: [ValidatorUtils.RuleFactory.require("值列不能为空")],
        labelField: [ValidatorUtils.RuleFactory.require("标题列不能为空")],
      },
    };
  },

  computed: {
    orderByContext() {
      let items = [];
      if (this.data1.table) {
        let obj = this.$utils.parseJson(this.data1.table);
        obj.alias = "t";

        items.push(this.$utils.toJson(obj));
      }

      if (this.data1.joins) {
        this.data1.joins.forEach((x) => {
          items.push(x.table2);
        });
      }
      return { tables: items };
    },
  },
};
</script>
<style scoped>
._table_item {
  display: inline-block;
  padding: 10px 25px;
  background-color: #f0faff;
  border: 1px solid #abdcff;
  border-radius: 3px;
  margin: 5px;
  margin-bottom: 18px;
  font-weight: 500;
  line-height: 17px;
}
</style>