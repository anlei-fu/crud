<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="8">
        <FormItem label="java类型" prop="javaType">
          <MySelect
            v-model="data1.javaType"
            size="small"
            width="100%"
            dicName="javaType"
            :multiple="true"
            placeHolder="请选择Java类型"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="名称后缀" prop="suffixes">
          <MyInput
            v-model="data1.suffixes"
            size="small"
            :maxlength="100"
            placeHolder="请输入名称后缀"
            width="100%"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="规则类型" prop="ruleType">
          <MySelect
            v-model="data1.ruleType"
            size="small"
            width="100%"
            :options="ruleTypes"
            placeHolder="请选择规则类型"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            :maxlength="100"
            placeHolder="请输入描述"
            type="textarea"
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
import UiUitls from "./../../../lib/enum/web";
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        javaType: null,
        suffixes: null,
        ruleType: null,
        description: null,
      },
      rules: {
        javaType: [ValidatorUtils.RuleFactory.require("java类型不能为空")],
        suffixes: [],
        ruleType: [ValidatorUtils.RuleFactory.require("规则类型不能为空")],
      },
    };
  },

  computed: {
    javaTypes() {
      return JavaUtils.JavaType;
    },
    ruleTypes() {
      return UiUitls.RuleType;
    },
  },
};
</script>