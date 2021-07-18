<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="5">
        <FormItem label="表" prop="table">
          <MySelect
            v-model="data1.table"
            size="small"
            width="100%"
            :options="Enum.Table"
            placeHolder="请选择表"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="表字段" prop="column">
          <MyInput
            v-model="data1.column"
            size="small"
            :maxlength="100"
            placeHolder="请输入表字段"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="默认值" prop="defaultValue">
          <MyInput
            v-model="data1.defaultValue"
            size="small"
            :maxlength="100"
            placeHolder="请输入默认值"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="校验规则" prop="validateRules">
          <MyInput
            v-model="data1.validateRules"
            size="small"
            :maxlength="100"
            placeHolder="请输入校验规则"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="可编辑" prop="editable">
          <MyCheckbox
            v-model="data1.editable"
            size="small"
            width="100%"
            :options="Enum.Editable"
            placeHolder="请选择可编辑"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="控件类型" prop="controlType">
          <MySelect
            v-model="data1.controlType"
            size="small"
            width="100%"
            :options="Enum.ControlType"
            placeHolder="请选择控件类型"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="控件类型" prop="controlPattern">
          <MyInput
            v-model="data1.controlPattern"
            size="small"
            :maxlength="100"
            placeHolder="请输入控件类型"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
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
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        table: null,
        column: null,
        defaultValue: null,
        validateRules: null,
        editable: null,
        controlType: null,
        controlPattern: null,
        defaultShow: null,
        description: null,
      },
      rules: {
        table: [
          {
            required: true,
            message: "表不能为空",
          },
        ],
        column: [
          {
            required: true,
            message: "表字段不能为空",
          },
        ],
        defaultValue: [
          {
            required: true,
            message: "默认值不能为空",
          },
        ],
        validateRules: [
          {
            required: true,
            message: "校验规则不能为空",
          },
        ],
        editable: [
          {
            required: true,
            message: "可编辑不能为空",
          },
        ],
        controlType: [
          {
            required: true,
            message: "控件类型不能为空",
          },
        ],
        controlPattern: [
          {
            required: true,
            message: "控件类型不能为空",
          },
        ],
        defaultShow: [
          {
            required: true,
            message: "默认展示不能为空",
          },
        ],
        description: [
          {
            required: true,
            message: "描述不能为空",
          },
        ],
      },
    };
  },
};
</script>