<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="70">
    <Row justify="space-between"
      ><Col :span="6">
        <FormItem label="索引名称" prop="name">
          <MyInput
            v-model="data1.name"
            size="small"
            :maxlength="100"
            placeHolder="请输入索引名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem label="索引类型" prop="type">
          <MySelect
            v-model="data1.type"
            size="small"
            width="100%"
            dicName="indexType"
            placeHolder="请选择索引类型"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem label="索引列" prop="columns">
          <IndexColumnConfiger
            v-model="data1.columns"
            size="small"
            placeHolder="索引关联的列"
            width="100%"
            :table="table"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            width="100%"
            type="textarea"
            placeHolder="说明创建这个索引的目的"
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
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
export default {
  mixins: [EditTableFormMixin],
  props: {
    table: String,
  },
  data() {
    return {
      data1: {
        name: null,
        type: null,
        columns: [],
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        type: [ValidatorUtils.RuleFactory.require("类型不能为空")],
        columns: [ValidatorUtils.RuleFactory.require("列不能为空")],
        // description: [
        //   ValidatorUtils.RuleFactory.require("描述不能为空")
        // ],
      },
    };
  },
  methods: {
    beforeSave() {
      if (this.data1.columns.length == 0) {
        this.$Message.info("至少选择一列!");
        return false;
      }

      return true;
    },
  },
};
</script>