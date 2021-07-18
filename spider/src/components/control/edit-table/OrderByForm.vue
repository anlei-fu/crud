<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between">
      <Col :span="24">
        <FormItem label="自定义" title="自定义" prop="customer">
          <MyCheckbox v-model="data1.customer" />
        </FormItem> </Col
      ><Col v-if="!data1.customer" :span="8">
        <FormItem label="表" title="排序字段所属表" prop="table">
          <TableSelector
            v-model="data1.table"
            size="small"
            :includes="tables"
            placeHolder="选择排序表"
            width="100%"
          /> </FormItem></Col
      ><Col v-if="!data1.customer" :span="8">
        <FormItem label="column" title="排序列" prop="column">
          <TableColumnSelector
            v-model="data1.column"
            :table="data1.table"
            size="small"
            placeHolder="请选择排序列"
            width="100%"
          /> </FormItem
      ></Col>

      <Col v-if="!data1.customer" :span="8">
        <FormItem label="orderByType" title="排序类型" prop="orderByType">
          <MySelect
            v-model="data1.orderByType"
            size="small"
            placeHolder="选择排序类型"
            dicName="orderByType"
            width="100%"
          /> </FormItem
      ></Col>
      <Col v-if="data1.customer" :span="24">
        <FormItem label="自定义sql" title="自定义排序sql" prop="customerSql">
          <MyInput
            v-model="data1.customerSql"
            size="small"
            width="100%"
            type="textarea"
            placeHolder="输入自定义sql"
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
  props: {
    tables: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        table: null,
        column: null,
        oderByType: null,
        customer: false,
        customerSql: null,
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
            message: "列不能为空",
          },
        ],
        // customer: [
        //   {
        //     required: true,
        //     message: "排序类型",
        //   },
        // ],
        customerSql: [
          {
            required: true,
            message: "自定义排序sql不能为空",
          },
        ],
      },
    };
  },
};
</script>