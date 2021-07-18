<template>
  <div>
    <div>
      <FileReader accept="image/*" @change="change">
        <a><img ref="img" :style="style" /></a>
        <Button v-if="!file"><Icon type="ios-image" size="16" />上传图片</Button>
      </FileReader>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    maxWidth: String,
  },
  data() {
    return {
      file: null,
    };
  },
  computed: {
    style() {
      return {
        "max-width": this.maxWidth,
        "border-radius": "5px",
      };
    },
  },
  methods: {
    change(file) {
      this.$refs.img.src = URL.createObjectURL(file);
      this.file = file;
    },
  },
};
</script>
