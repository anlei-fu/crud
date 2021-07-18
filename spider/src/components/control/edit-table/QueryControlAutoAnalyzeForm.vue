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
            :multiple ="true"
            placeHolder="请选择Java类型"
          /> </FormItem
        ></Col
      ><Col :span="8">
        <FormItem label="名称后缀" prop="suffixes">
          <MyInput
            v-model="data1.suffixes"
            size="small"
            :maxlength="100"
            type="textarea"
            placeHolder="请输入后缀"
            width="100%"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="控件类型" prop="controlType">
           <MySelect
            v-model="data1.controlType"
            size="small"
            width="100%"
             dicName="controlType"
            placeHolder="请选择控件类型"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            type="textarea"
            :maxlength="100"
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
import UiUitls from "./../../../lib/enum/web";
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        controlType: null,
        javaType: null,
        suffixes: null,
        description: null,
      },
      rules: {
        controlType: [ValidatorUtils.RuleFactory.require("控件类型不能为空")],
        javaType: [ValidatorUtils.RuleFactory.require("Java类型不能为空")],
        suffixes: [],
      },
    };
  },
  computed: {
    javaTypes() {
      return JavaUtils.JavaType;
    },
    controlTypes() {
      return UiUitls.getQueryControl();
    },
  },
};
</script>