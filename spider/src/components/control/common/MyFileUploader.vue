<template>
  <span style="display: flex;">
    <span style="width: 60%; margin-right: 15px;">
      <Input v-model="path_" disabled />
    </span>
    <span>
      <Upload
        accept=".js"
        :show-upload-list="false"
        :on-success="onSuccess"
        :on-error="onError"
        action="/uploadFile?ext=js"
      >
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
    </span>
  </span>
</template>
<script>
  export default {
    model: {
      prop: "uniqueId",
      event: "change",
    },
    props: {
      path: String,
    },
    data() {
      return {
        path_: null,
      };
    },
    methods: {
      onSuccess(resp) {
        if (resp.result) {
          this.$emit("change", resp.key);
          this.path_ = resp.key;
          this.$Message.info("upload success!");
        } else {
          this.$Message.error("upload failed:" + resp.message);
        }
      },
      onError(err) {
        this.$Message.error("upload failed!");
      },
    },
    created() {
      this.path_ = this.path;
    },
    watch: {
      path() {
        this._path = this.path;
      },
    },
  };
</script>
