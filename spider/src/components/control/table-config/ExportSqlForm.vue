<template>
  <div style="text-align: left">
    <Form ref="form" :model="data1"  :label-width="120">
      <FormItem prop="tables">
        <div class="_chekc_container">
          <MyCheckBoxGroup
            v-model="selectedTables"
            :withAll="true"
            allName="所有"
            labelWidth="200px"
            :options="candidateTables"
          />
        </div>
      </FormItem>

      <div class="_container">
        <span class="_btn_container">
          <span class="_btn_item">
            <ExportExcelButton :loading="loading" @click="submit" />
          </span>
          <span class="_btn_item">
            <ExportExcelButton :loading="loading" label="实体类" @click="exportEntity" />
          </span>
        </span>
      </div>
    </Form>
  </div>
</template>
<script>
import ConfigFormMixin from "./../../mixins/config-form-mixin";
import RenderMixin from "./../../mixins/render-mixin";
import * as utils from "./../../../utils";
import FormatMixin from "./../../mixins/format-mixin";
import { mapGetters } from "vuex";
import JsZip from "jszip";
export default {
  mixins: [ConfigFormMixin, FormatMixin, RenderMixin],
  data() {
    return {
      selectedTables: [],
      loading: false,
      data1: {
        fileName: null,
      },
    };
  },
  computed: {
    ...mapGetters(["getTables"]),
    candidateTables() {
      let tables = this.getTables;
      let items = [];
      if (tables) {
        tables.forEach((x) => {
          if (x.baseInfo.$$guid == this.table) return;

          items.push({ label: x.baseInfo.name, value: x.baseInfo.$$guid });
        });
      }
      return items;
    },
  },
  methods: {
    async submit() {
      let tables = this.getTables.filter((x) =>
        this.selectedTables.includes(x.baseInfo.$$guid)
      );
      let text = "";
      try {
        this.loading = true;
        let resp = await this.renderTableDdlBatch(tables);
        text = resp.data;
      } catch (ex) {
        this.$Message.error("导出数据失败！");
      } finally {
        this.loading = false;
      }
      this.$utils.download("ddl.sql", text);
    },

    async exportEntity() {
      let tables = this.getTables.filter((x) =>
        this.selectedTables.includes(x.baseInfo.$$guid)
      );

      let zip = new JsZip();
      let folder = zip.folder("entity");
      for (const table of tables) {
        let resp = await this.renderJavaEntity(table);
        folder.file(`${table.baseInfo.entityName}.java`, resp.data);
      }

      let this_ =this;
      zip.generateAsync({ type: "blob" }).then(function (content) {
          this_.$utils.download("entity.zip",content);
      });
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
  /* margin-right: 20px; */
}
._btn_item {
  margin-right: 10px;
}
._chekc_container {
  background-color: #f0faff;
  padding-bottom: 10px;
  padding: 19px;
  border: 1px solid #abdcff;
  border-radius: 4px;
  margin-top: 8px;
}
</style>