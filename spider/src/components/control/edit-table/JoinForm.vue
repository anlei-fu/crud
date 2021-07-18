<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="100">
    <Row justify="space-between">
      <Col v-if="!data1.customer" :span="6">
        <FormItem label="表1" title="表1" prop="table1">
          <TableSelector
            v-model="data1.table1"
            size="small"
            :includes="tables"
            :excludes="[data1.table2]"
            placeHolder="选择排序表"
            width="100%"
          /> </FormItem
      ></Col>
      <Col v-if="!data1.customer" :span="6">
        <FormItem label="表2" title="排序字段所属表" prop="table2">
          <TableSelector
            v-model="data1.table2"
            size="small"
            :excludes="tables"
            placeHolder="选择排序表"
            width="100%"
          /> </FormItem
      ></Col>
      <Col v-if="!data1.customer" :span="6">
        <FormItem label="表1字段" title="排序字段所属表" prop="table1Column">
          <TableColumnSelector
            v-model="data1.table1Column"
            size="small"
            :table="data1.table1"
            placeHolder="选择排序表"
            width="100%"
          /> </FormItem
      ></Col>
      <Col v-if="!data1.customer" :span="6">
        <FormItem label="表2字段" title="排序字段所属表" prop="table2Column">
          <TableColumnSelector
            v-model="data1.table2Column"
            size="small"
            :table="data1.table2"
            placeHolder="选择排序表"
            width="100%"
          /> </FormItem
      ></Col>
      <Col v-if="!data1.customer" :span="6">
        <FormItem label="关联类型" title="关联类型" prop="joinType">
          <MySelect
            v-model="data1.joinType"
            size="small"
            dicName="joinType"
            placeHolder="选择排序类型"
            width="100%"
          /> </FormItem
      ></Col>
      <Col :span="24">
        <FormItem label="自定义" title="自定义" prop="customer">
          <MyCheckbox v-model="data1.customer" />
        </FormItem>
      </Col>
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
import { mapGetters } from "vuex";

export default {
  props: {
    tables: {
      type: Array,
      default: () => [],
    },
    index: Number,
  },
  mixins: [EditTableFormMixin],

  data() {
    return {
      data1: {
        table1: null,
        table2: null,
        table1Column: null,
        table2Column: null,
        joinType: null,
        customer: false,
        customerSql: null,
      },
      rules: {
        table1: [
          {
            required: true,
            message: "表1不能为空",
          },
        ],
        table2: [
          {
            required: true,
            message: "表2不能为空",
          },
        ],
        table1Column: [
          {
            required: true,
            message: "表1字段不能为空",
          },
        ],
        table2Column: [
          {
            required: true,
            message: "表2字段不能为空",
          },
        ],
        joinType: [
          {
            required: true,
            message: "join类型不能为空",
          },
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["getTableColumns"]),
  },

  watch: {
    "data1.table1"() {
      this.autoAnalyzeJoin();
    },
    "data1.table2"() {
      this.autoAnalyzeJoin();
    },
  },

  methods: {
    autoAnalyzeJoin() {
      if (!this.data1.table1 || !this.data1.table2) return;

      let obj1 = this.$utils.parseJson(this.data1.table1);
      let obj2 = this.$utils.parseJson(this.data1.table2);
      let columns1 = this.getTableColumns(this.data1.table1);
      columns1 = columns1.filter((x) => x.isForeignKey);
      for (const column of columns1) {
        let joinTable = this.$utils.parseJson(column.joinTable);
        if (joinTable.$$guid == obj2.$$guid) {
          this.data1.table1Column = column.$$guid;
          this.data1.table2Column = column.relationTableField;
          this.data1.joinType = "left join";
          return;
        }
      }

      let columns2 = this.getTableColumns(this.data1.table2);
      columns2 = columns2.filter((x) => x.isForeignKey);
      for (const column of columns2) {
        let joinTable = this.$utils.parseJson(column.joinTable);
        if (joinTable.$$guid == obj1.$$guid) {
          this.data1.table2Column = column.$$guid;
          this.data1.table1Column = column.relationTableField;
          this.data1.joinType = "left join";
          return;
        }
      }
    },
    beforeSave() {
      let obj = this.$utils.parseJson(this.data1.table2);

      obj.alias = `t${this.index + 1}`;
      this.data1.table2 = this.$utils.toJson(obj);
      return true;
    },
  },
};
</script>