<template>
  <div @click="click">
    <slot>
      <Input
        v-if="type == 'text'"
        readonly
        v-model="file"
        search
        enter-button="点击选择文件"
      />
      <Button v-if="type == 'button'" :icon="icon">{{ title }} </Button>
    </slot>
    <input
      class="_file_input"
      :accept="accept"
      @change="handleChange"
      ref="file"
      type="file"
    />
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: "ios-cloud-upload-outline",
    },
    title: {
      type: String,
      default: "点击选择文件",
    },
    accept: String,
    showInput: Boolean,
    type: {
      type: String,
      default: "button",
    },
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    click() {
      this.$refs.file.click();
    },

    handleChange(e) {
      const files = e.target.files;
      if (!files || files.length == 0) {
        return;
      }
      this.file = files[0].name;

      this.$emit("change", files[0]);
    },
  },
};
</script>
<style scoped>
._file_input {
  display: none;
}
</style>