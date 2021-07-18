<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="24">
        <FormItem label="选择文件" prop="file">
          <FileReader
            type="text"
            @change="change"
            accept=".sql"
          /> </FormItem></Col
    ></Row>
    <FormItem>
      <Alert type="info" show-icon closable
        >导入sql文件
        <span slot="desc"
          >sql必须是标准的DDL语句。
        </span></Alert
      >
    </FormItem>
    <div class="_container">
      <span class="_btn_container">
        <span class="_btn_item">
          <ImportExcelButton :loading="loading" @click="submit" />
        </span>
      </span>
    </div>
  </Form>
</template>
<script>
import ConfigFormMixin from "./../../mixins/config-form-mixin";
import Api from "../../../api/index";
import * as utils from "./../../../utils";
export default {
  mixins: [ConfigFormMixin],
  data() {
    return {
      loading: false,
      data1: {
        ImportType: null,
        file: null,
      },
      rules: {
        ImportType: [
          {
            required: true,
            message: "名称不能为空",
          },
        ],
        // file: [
        //   {
        //     required: true,
        //     message: "选择文件不能为空",
        //   },
        // ],
      },
    };
  },
  methods: {
    change(file) {
      this.data1.file = file;
    },
    async submit() {
      if (!this.data1.file) {
        this.$Message.info("请选择导入文件");
        return;
      }
      this.loading = true;
      let sql = await this.$utils.read(this.data1.file);
      let resp = await Api.parser.parserMySql({ sql });
      this.$emit("importTables", resp.data);
      this.loading = false;
    },
  },
};
</script>
<style scoped>
._container {
  text-align: right;
  line-height: 40px;
  margin-bottom: 5px;
}
._btn_container {
}
._btn_item {
  margin-right: 10px;
}
</style>