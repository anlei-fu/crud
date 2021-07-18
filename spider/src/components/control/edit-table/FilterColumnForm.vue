<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Groupbox title="sql 输出配置">
      <Col :span="24">
        <Row>
          <Col :span="2">
            <FormItem label="自定义WhereSql" prop="customer">
              <MyCheckbox
                v-model="data1.customer"
                size="small"
                :maxlength="100"
                width="100%"
              /> </FormItem
          ></Col>
        </Row>
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
                placeHolder="请输入自定义Where条件"
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
      <Row
        ><Col :span="5">
          <FormItem label="标题" prop="label">
            <MyInput
              v-model="data1.label"
              size="small"
              :maxlength="100"
              placeHolder="请输入标题"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="控件类型" prop="controlType">
            <MySelect
              v-model="data1.controlType"
              size="small"
              width="100%"
              :options="queryControlTypes"
              placeHolder="请选择控件类型"
            /> </FormItem></Col
        ><Col v-if="showControlEnum" :span="5">
        <FormItem label="枚举类型" title="控件所使用的的枚举类型" prop="controlPattern">
          <EnumSelector
            v-model="data1.controlPattern"
			:tableEnum="true"
             size="small"
          /> </FormItem></Col
    > 
	<Col v-if="isTableEnum" :span="8">
        <FormItem label="级联配置" title="级联配置" prop="casscader">
          <CasscaderConfiger
            v-model="data1.filterMappings"
			:queryFilterFields="targetQueryFilterFields"
			:tableEnumFilterFields="tableEnumFilterFields"
			:joins="joins"
			:filterColumns="filterColumns"
             size="small"
          /> </FormItem></Col
    >
	 <Col
            v-if="
              data1.controlType == 'text' ||
              data1.controlType == 'textarea'
            "
            :span="5"
          >
            <FormItem
              label="字符串筛选类型"
              title="控件所使用的的枚举类型"
              prop="controlPattern"
            >
              <MySelect
                v-model="data1.controlPattern"
                size="small"
                width="100%"
                dicName="stringMatchRule"
                placeHolder="筛选类型"
              /> </FormItem></Col
          ><Col v-if="data1.controlType == 'checkbox'" :span="5">
            <FormItem
              label="二元枚举"
              title="checkbox枚举类型"
              prop="controlPattern"
            >
              <CheckboxEnumSelector
                v-model="data1.controlPattern"
                size="small"
              /> </FormItem></Col
        ></Col>
		 <Col v-if="data1.controlType =='numberRange'" :span="5">
        <FormItem label="步长" title="数字输入框步长" prop="controlPattern">
          <InputNumber size="small"  :min="0" v-model="data1.controlPattern" />  </FormItem></Col
    ><Col v-if="data1.controlType =='date'" :span="5">
        <FormItem label="时间类型" title="时间字段format类型" prop="controlPattern">
           <MySelect
            v-model="data1.controlPattern"
			:options="queryDateFormatTypes"
            size="small"
            placeHolder="请选择时间控件类型"
            width="100%"/> </FormItem></Col
    >
      </Row>
      <Row>
        <Col :span="5">
          <FormItem label="默认展示" prop="defaultShow">
            <MyCheckbox
              v-model="data1.defaultShow"
              size="small"
              :maxlength="100"
              width="100%"
            /> </FormItem></Col
      >
	   <Col :span="5">
          <FormItem label="控件宽度" prop="width">
            <InputNumber
              v-model="data1.width"
              size="small"
              :maxlength="100"
              width="100%"
            /> </FormItem></Col
      >
	  <Col :span="5">
          <FormItem label="提示信息" prop="placeHolder">
            <MyInput
              v-model="data1.placeHolder"
              size="small"
              :maxlength="100"
              width="100%"
            /> </FormItem></Col
      ></Row> </Groupbox
    ><Col :span="24">
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

    <Row>
      <OperationPanel
        @save="save"
        @cancel="cancel"
        @create="save"
        :operations="targetOperations"
      />
    </Row>
  </Form>
</template>
<script>
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import FormatMixin from "./../../mixins/format-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
import UiUtils from "./../../../lib/enum/web";
import { mapGetters } from "vuex";
export default {
  mixins: [EditTableFormMixin, FormatMixin],
  props: {
    tables: Array,
    queryFilterFields: Array,
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
        controlType: null,
        controlPattern: null,
        defaultShow: null,
        description: null,
        width: null,
        filterMappings: null,
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
        label: [ValidatorUtils.RuleFactory.require("标题不能为空")],
        controlType: [ValidatorUtils.RuleFactory.require("控件类型不能为空")],
      },
    };
  },
  computed: {
    ...mapGetters(["getColumnInfo", "getTableEnum", "getLabel"]),
    showControlEnum() {
      if (!this.data1.controlType) return false;
      return UiUtils.isEnumControl(this.data1.controlType);
    },
    queryDateFormatTypes() {
      return UiUtils.getQueryDateFormatType();
    },
    isTableEnum() {
      let data = this.getTableEnum(this.data1.controlPattern);
      return data != null;
    },
    tableEnumFilterFields() {
      let data = this.getTableEnum(this.data1.controlPattern);
      let results = [];
      if (data && data.filterColumns) {
        data.filterColumns.forEach((x) => {
          let label = this.getLabel("column", x.column);
          let table = this.format({ format: "table" }, x.table);

          results.push({ label: table + "." + label, value: x.column });
        });
      }

      return results;
	},
	 filterColumns() {
      let data = this.getTableEnum(this.data1.controlPattern);
	   if(data)
	    return data.filterColumns;
    },
    joins() {
      let data = this.getTableEnum(this.data1.controlPattern);
      if (data) return data.joins;
    },
    targetQueryFilterFields() {
      return this.queryFilterFields.filter((x) => x.value != this.data1.alias);
    },

    queryControlTypes() {
      if (!this.data1.javaType) return [];
      return UiUtils.getQueryControlType(
        this.data1.javaType,
        this.data1.entityFieldName
      );
    },
  },
  watch: {
    "data1.column"(val) {
      if (val) {
        let column = this.getColumnInfo(this.data1.table, val);
        if (column) {
          this.$utils.copyFieldsFrom(this.data1, column, ["javaType", "label"]);
          this.data1.alias = column.entityFieldName;

          //   this.data1.controlType = column.queryControlType;
          //   this.data1.controlPattern = column.queryControlPattern;
        }
      }
    },
  },
};
</script>