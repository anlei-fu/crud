<template>
  <div>
    <div
      :style="{ height: height, 'text-align': 'left' }"
      class="_code_container"
    >
      <codemirror :code="codeText" :options="options" />
    </div>
    <div v-if="operations" class="_container">
      <span class="_btn_container">
        <span class="_btn_item">
          <CopyButton size="small" @click="copy" />
        </span>
        <span class="_btn_item">
          <ExportExcelButton size="small" @click="download" />
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    code: String,
    name: String,
    height: String,
    fileExtension: String,
    options: Object,
    operations: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      codeText: "",
    };
  },
  watch: {
    code: {
      handler(val) {
        if (val) return (this.codeText = val);
      },
      immediate: true,
    },
  },
  methods: {
    copy() {
      this.$utils.copy.call(this, this.code);
    },

    download() {
      this.$utils.download(`${this.name}.${this.fileExtension}`, this.code);
    },
  },
};
</script>
<style scoped>
._code_container {
  overflow-x: auto;
  overflow-y: auto;
}
._container {
  text-align: right;
  line-height: 40px;
  margin-bottom: 5px;
  margin-top: 10px;
}
._btn_container {
  margin-right: 0px;
}
._btn_item {
  margin-right: 10px;
}
</style>