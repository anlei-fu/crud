<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="8">
        <FormItem label="java类型" prop="name">
          <MyInput
            v-model="data1.name"
            size="small"
            width="100%"
            placeHolder="请输入java类型"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="所属包" prop="package">
          <MyInput
            v-model="data1.package"
            size="small"
            :maxlength="100"
            placeHolder="请输入所属包"
            width="100%"
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
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        name: null,
        package: null,
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("java类型不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        package: [ValidatorUtils.DEFAULT_RULES.PACKAGE],
      },
    };
  },
};
</script>