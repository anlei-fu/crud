<template>
  <MyScroll maxHeight="500px">
    <MyTable ref="table" filter border stripe columnFilter :columns="columns" :datas="data.list" />
  </MyScroll>
</template>
<script>
  import utils from "./../../../common";
  export default {
    props: {
      id: Number | String,
    },
    created() {
      if (this.id) this.getData();
    },
    data() {
      return {
        columns: [
          utils.column("id"),
          utils.enumColumn("bindResult", null),
          utils.column("bindMsg"),
          utils.dateColumn("createTime", "CTime"),
        ],
        data: utils.data(),
      };
    },
    watch: {
      id() {
        this.getData();
      },
    },
    methods: {
      async getData() {
        try {
          let resp = await this.$api.bindRecord.getByTaskId({
            taskId: this.$utils.clone(this.id),
          });
          if (resp.code != 100) {
            this.$Message.error("get Data failed");
          }
          this.data.list = resp.data;
        } catch (ex) {}
      },
    },
  };
</script>
