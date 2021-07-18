<template>
  <a class="link" :style="{ color: color }" type="text" :path="path" :title="title" @click="click">
    {{ label }}
  </a>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
      },
      path: String,
      label: String,
      color: String,
    },
    methods: {
      click() {
        if (this.path) {
          if (this.$utils.isOutterLink(this.path)) {
            window.open(this.path);
            return;
          }
          this.$router.push({ path: this.path });
          return;
        }
        this.$emit("click");
      },
    },
  };
</script>
