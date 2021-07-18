<template>
  <div>
    <div>
      <span >
        <Input v-model="displayText" size="small" disabled
      /></span>
      <span class="_btn"><Button @click="show" size="small">修改</Button></span>
    </div>
    <MyModal ref="modal" @ok="ok" width="50%" title="选择索引列">
      <MyScroll maxHeight="500px" >
      <div class="_content">
        <div class="_left">
          <MyCheckBoxGroup
            v-model="selectedColumns"
            labelWidth="160px"
            :options="candidateColumns"
          />
        </div>
        <div class="_right">
          <Drag
            v-for="(item, index) in selectedColumns"
            :id="index"
            :key="item"
            :block="true"
            @change="changePos"
          >
            <div class="_drag_item">
              <span>{{ format({ format: "column" }, item) }}</span>
              <span></span>
            </div>
          </Drag>
        </div>
      </div>
      </MyScroll>
    </MyModal>
  </div>
</template>
<script>
import ModelMixin from"./../../mixins/model-mixin";
import FormatMixin from "./../../mixins/format-mixin";
import { mapGetters } from "vuex";
export default {
  props: {
    table: String,
    context: Object | Array,
  },
  mixins: [ModelMixin, FormatMixin],
  data() {
    return {
      selectedColumns: [],
    };
  },
  computed: {
    candidateColumns() {
      let columns = this.getTableColumns(this.table);
      return this.$utils.makeDictionary(columns, "name", "$$guid");
    },
    ...mapGetters(["getTableColumns"]),
    displayText() {
      if (!this.value) {
        return "未选择";
      }

      let text = "";
      this.value.forEach((x) => {
        text += this.format({ format: "column" }, x) + ",";
      });

      return text.substring(0, text.length - 1);
    },
  },
  created() {
    this.selectedColumns = this.$utils.clone(this.value);
  },
  methods: {
    ok() {
      this.$emit("change", this.selectedColumns);
      this.$refs.modal.close();
    },
    show() {
      this.$refs.modal.show();
    },
    changePos(params1, params2) {
      let targetData = this.selectedColumns.splice(params1.id, 1);
      this.selectedColumns.splice(params2.id, 0, targetData[0]);
    },
  },
};
</script>
<style scoped>
._left {
  display: inline-block;
  vertical-align: top;
  display: inline-block;
  width: 60%;
  /* padding: 10px; */
  background: #f8f8f9;
  border: 1px solid #e8eaec;
  padding-top: 10px;
}
._right {
  display: inline-block;
  vertical-align: top;
  display: inline-block;
  width: 30%;
  /* padding: 10px 0px; */
  background: #f8f8f9;
  border: 1px solid #e8eaec;
  /* padding: 10px 0px; */
  margin-left: 20px;
}
._drag_item {
  line-height: 31px;
  padding-left: 21px;
  border-bottom: 1px solid #e8eaec;
}
._drag_item :hover {
  background-color: red;
}
._input {
  display: inline-block;
  width: 60%;
}
._btn {
  margin-left: "5px";
}
</style>