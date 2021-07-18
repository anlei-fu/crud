<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Groupbox title="sql 输出配置">
      <Col :span="24">
        <Row
          ><Col :span="2">
            <FormItem label="自定义输出sql" prop="customer">
              <MyCheckbox
                v-model="data1.customer"
                size="small"
                :maxlength="100"
                placeHolder="请输入自定义"
                width="100%"
              /> </FormItem></Col
        ></Row>
        <Row>
          <Col v-if="!data1.customer" :span="5">
            <FormItem label="表" prop="table">
              <TableSelector
                v-model="data1.table"
                :includes="tables"
                size="small"
                width="100%"
                :options="Enum.Table"
                placeHolder="请选择表"
              /> </FormItem></Col
          ><Col v-if="!data1.customer" :span="5">
            <FormItem label="表字段" prop="column">
              <TableColumnSelector
                v-model="data1.column"
                size="small"
                placeHolder="请输入表字段"
                :table="data1.table"
                width="100%"
              /> </FormItem></Col
          ><Col v-if="data1.customer" :span="24">
            <FormItem label="sql" prop="customerSql">
              <MyInput
                v-model="data1.customerSql"
                size="small"
                :maxlength="100"
                type="textarea"
                placeHolder="请输入自定义输出sql"
                width="100%"
              /> </FormItem
          ></Col>
        </Row>
        <Col :span="5">
          <FormItem label="java类型" prop="javaType">
            <MySelect
              v-model="data1.javaType"
              size="small"
              dicName="javaType"
              placeHolder="请输入别名"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="别名" prop="alias">
            <MyInput
              v-model="data1.alias"
              size="small"
              :maxlength="100"
              placeHolder="请输入别名"
              width="100%"
            /> </FormItem
        ></Col>
      </Col>
    </Groupbox>
    <Groupbox title="显示配置">
      <Row>
        <Col :span="5">
          <FormItem label="标题" prop="label">
            <MyInput
              v-model="data1.label"
              size="small"
              :maxlength="100"
              placeHolder="请输入标题"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="格式化类型" prop="format">
            <MySelect
              v-model="data1.format"
              size="small"
              width="100%"
              :options="Enum.FormatType"
              placeHolder="请选择格式化类型"
            /> </FormItem
        ></Col>
        <Col v-if="data1.format == 'enum'" :span="5">
          <FormItem
            label="枚举类型"
            title="控件所使用的的枚举类型"
            prop="pattern"
          >
            <EnumSelector v-model="data1.pattern" size="small" /> </FormItem
        ></Col>
        <Col :span="5" v-if="showDecimal">
          <FormItem
            label="小数保留位数"
            title="控件所使用的的枚举类型"
            prop="pattern"
          >
            <InputNumber
              v-model="data1.pattern"
              size="small"
              :min="0"
              :step="1" /></FormItem
        ></Col>
        <Col :span="5" v-if="data1.format == 'date'">
          <FormItem
            label="日期格式化字符串"
            title="日期格式化字符串"
            prop="pattern"
            ><MyInput
              size="small"
              width="100%"
              v-model="data1.pattern" /></FormItem
        ></Col>
      </Row>
      <Row>
        <Col :span="3">
          <FormItem label="最小宽度" prop="minWidth">
            <InputNumber
              v-model="data1.minWidth"
              size="small"
              width="100%"
            /> </FormItem
        ></Col>
        <Col :span="5">
          <FormItem label="空值显示" prop="placeHolder">
            <MyInput
              v-model="data1.placeHolder"
              size="small"
              width="100%"
            /> </FormItem></Col
        ><Col :span="2">
          <FormItem label="默认展示" prop="defaultShow">
            <MyCheckbox v-model="data1.defaultShow" width="100%" /> </FormItem
        ></Col>
        <Col :span="2">
          <FormItem label="不显示此列" prop="notShow">
            <MyCheckbox v-model="data1.notShow" width="100%" /> </FormItem></Col
        ><Col :span="2">
          <FormItem label="可排序" prop="sortable">
            <MyCheckbox
              v-model="data1.sortable"
              size="small"
              :maxlength="100"
              width="100%"
            /> </FormItem></Col
      ></Row>

      <Col :span="5">
        <FormItem label="表头对齐方式" prop="headerAlign">
          <MySelect
            v-model="data1.headerAlign"
            size="small"
            :options="aligns"
            width="100%"
          /> </FormItem
      ></Col>
      <Col :span="5">
        <FormItem label="内容对齐方式" prop="align">
          <MySelect
            v-model="data1.align"
            :options="aligns"
            size="small"
            width="100%"
          /> </FormItem
      ></Col>
      <Col :span="5">
        <FormItem label="固定位置" prop="fxied">
          <MySelect
            v-model="data1.fixed"
            :options="fixeds"
            size="small"
            width="100%"
          /> </FormItem
      ></Col>
    </Groupbox>
    <Col :span="24">
      <FormItem label="描述" prop="description">
        <MyInput
          v-model="data1.description"
          size="small"
          :maxlength="100"
          type="textarea"
          placeHolder="请输入描述"
          width="100%"
        /> </FormItem
    ></Col>
    <Col :span="24">
      <OperationPanel
        @save="save"
        @cancel="cancel"
        @create="save"
        :operations="targetOperations"
      />
    </Col>
  </Form>
</template>
<script>
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
import UiUtils from "./../../../lib/enum/web";
import { mapGetters } from "vuex";
export default {
  mixins: [EditTableFormMixin],
  props: {
    tables: Array,
  },
  data() {
    return {
      data1: {
        table: null,
        column: null,
        customerSql: null,
        customer: null,
        alias: null,
        javaType: null,
        label: null,
        format: null,
        pattern: null,
        defaultShow: null,
        palceHolder: null,
        minWidth: null,
        description: null,
        headerAlign: null,
        align: null,
        fixed: null,
      },
      rules: {
        table: [ValidatorUtils.RuleFactory.require("表不能为空")],
        column: [ValidatorUtils.RuleFactory.require("表字段不能为空")],
        customerSql: [
          ValidatorUtils.RuleFactory.require("自定义输出sql不能为空"),
        ],
        javaType: [ValidatorUtils.RuleFactory.require("javaType不能为空")],
        alias: [
          ValidatorUtils.RuleFactory.require("别名不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        label: [ValidatorUtils.RuleFactory.require("标题")],
      },
    };
  },
  computed: {
    ...mapGetters(["getColumnInfo"]),
    showDecimal() {
      return ["money", "decimal", "percent", "decimal"].includes(
        this.data1.format
      );
    },
    fixeds() {
      return UiUtils.ColumnFixed;
    },
    aligns() {
      return UiUtils.Alignment;
    },
  },
  watch: {
    "data1.column"(val) {
      if (val) {
        let column = this.getColumnInfo(this.data1.table, val);
        if (column) {
          this.$utils.copyFieldsFrom(this.data1, column, [
            "javaType",
            "label",
            "fixed",
            "sortable",
            "placeHolder",
          ]);

          this.data1.formatType = column.format;
          this.data1.formatPattern = column.pattern;
          this.data1.alias = column.entityFieldName;
        }
      }
    },
  },
};
</script>