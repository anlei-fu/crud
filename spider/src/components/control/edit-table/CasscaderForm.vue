<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="160">
    <Col :span="12">
      <FormItem label="表枚举筛选字段" title="表枚举筛选字段" prop="tableEnumFilterField">
        <MySelect
          v-model="data1.tableEnumFilterField"
          size="small"
          :options="tableEnumFilterFields"
          placeHolder="选择表枚举筛选字段"
          width="100%"
        /> </FormItem></Col
    ><Col :span="12">
      <FormItem label="查询过滤字段" title="排序列" prop="queryFilterField">
        <MySelect
          v-model="data1.queryFilterField"
          :options="queryFilterFields"
          size="small"
          placeHolder="请选择查询过滤字段"
          width="100%"
        /> </FormItem
    ></Col>
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
  props: {
    tableEnumFilterFields: {
      type: Array,
      default: () => [],
    },
    queryFilterFields: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
       
      },
      rules: {
        tableEnumFilterField: [
          {
            required: true,
            message: "表枚举筛选字段不能为空",
          },
        ],
        queryFilterField: [
          {
            required: true,
            message: "查询筛选字段不能为空",
          },
        ],
      },
    };
  },

  methods:{
    beforeSave(){
      
    }
  }
};
</script>