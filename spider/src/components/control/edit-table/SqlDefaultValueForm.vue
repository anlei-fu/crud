<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="10">
        <FormItem label="sql类型" prop="sqlType">
          <MySelect
            v-model="data1.sqlType"
            size="small"
            width="100%"
            dicName="sqlType"
            :multiple="true"
            placeHolder="请选择Sql类型"
          /> </FormItem></Col
      ><Col :span="10">
        <FormItem label="默认值" prop="defaultValue">
          <MyInput
            v-model="data1.defaultValue"
            size="small"
            :maxlength="100"
            placeHolder="请输入默认值"
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
import SqlUtils from "./../../../lib/enum/sql";
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        sqlType: null,
        defaultValue: null,
      },
      rules: {
        sqlType: [ValidatorUtils.RuleFactory.require("Sql类型不能为空")],
      },
    };
  },
  computed: {
    sqlTypes() {
      return SqlUtils.SqlType;
    },
  },
};
</script>