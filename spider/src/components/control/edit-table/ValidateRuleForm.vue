<template>
    <Form ref="form" :model="data1" :rules="rules" :label-width="120">
      <Row justify="space-between"
        ><Col :span="8">
          <FormItem label="规则名称" prop="name">
            <MyInput
              v-model="data1.name"
              size="small"
              :maxlength="100"
              placeHolder="请输入规则名称"
              width="100%"
            /> </FormItem></Col
        ><Col :span="8">
          <FormItem label="规则标题" prop="label">
            <MyInput
              v-model="data1.label"
              size="small"
              :maxlength="100"
              placeHolder="请输入规则标题"
              width="100%"
            /> </FormItem></Col
        ><Col :span="24">
          <FormItem label="后端validator代码" prop="backendValidator">
            <MyInput
              v-model="data1.backendValidator"
              size="small"
              type="textarea"
              :maxlength="100"
              placeHolder="请输入后端validator代码"
              width="100%"
            /> </FormItem></Col
        ><Col :span="24">
          <FormItem label="前端validator代码" prop="frontendValidator">
            <MyInput
              v-model="data1.frontendValidator"
              size="small"
              type="textarea"
              :maxlength="100"
              placeHolder="请输入前端validator代码"
              width="100%"
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
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        name: null,
        label: null,
        backendValidator: null,
        frontendValidator: null,
        description: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "规则名称不能为空",
          },
        ],
        label: [
          {
            required: true,
            message: "规则标题不能为空",
          },
        ],
        backendValidator: [
          {
            required: true,
            message: "后端validator代码不能为空",
          },
        ],
        frontendValidator: [
          {
            required: true,
            message: "前端validator代码不能为空",
          },
        ],
      },
    };
  },
};
</script>