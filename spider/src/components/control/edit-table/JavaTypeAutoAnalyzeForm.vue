<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="8">
        <FormItem label="sql类型" prop="sqlType">
          <MySelect
            v-model="data1.sqlType"
            size="small"
            width="100%"
            dicName="sqlType"
            :multiple="true"
            placeHolder="请选择Sql类型"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="长度范围" prop="lengthRange">
          <MyInput
            v-model="data1.lengthRange"
            size="small"
            :maxlength="100"
            placeHolder="请输入长度范围"
            width="100%"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="名称后缀" prop="suffixes">
          <MyInput
            v-model="data1.suffixes"
            size="small"
            type="textarea"
            :maxlength="100"
            placeHolder="请输入名称后缀"
            width="100%"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="Java类型" prop="javaType">
          <MySelect
            v-model="data1.javaType"
            size="small"
            width="100%"
            dicName="javaType"
            placeHolder="请选择Java类型"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            :maxlength="100"
            type="textarea"
            placeHolder="请输入描述"
            width="100%"
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
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
import JavaUtils from "./../../../lib/enum/java";
import SqlUtils from "./../../../lib/enum/sql";
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        sqlType: null,
        lengthRange: null,
        suffixes: null,
        javaType: null,
        description: null,
      },
      rules: {
        sqlType: [ValidatorUtils.RuleFactory.require("Sql类型不能为空")],
        lengthRange: [ValidatorUtils.DEFAULT_RULES.LENGTH_ARRAY],
        javaType: [ValidatorUtils.RuleFactory.require("java类型不能为空")],
      },
    };
  },
};
</script>
<style>
.ivu-form-item .ivu-form-item {
     margin-bottom: 24px; 
}
</style>