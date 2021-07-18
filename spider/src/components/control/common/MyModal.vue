<template>
  <Modal v-model="show_" :mask-closable="false" :title="title" :width="width"  mask>
    <slot></slot>
    <div slot="footer" class="footer">
      <slot name="button" />
      <Button v-if="!noCancel" type="default" @click="close">{{ cancelText }}</Button>
      <Button type="primary" @click="onOk">{{ okText }}</Button>
    </div>
  </Modal>
</template>
<script>
  export default {
    props: {
      title: String,
      width: String,
      noCancel: false,
      okText: {
        type: String,
        default: "确认",
      },
      cancelText: {
        type: String,
        default: "取消",
      },
    },
    data() {
      return {
        show_: false,
      };
    },
    methods: {
      show() {
        this.show_ = true;
      },
      close() {
        this.show_ = false;
      },
      onOk() {
        this.$emit("ok");
      },
    },
  };
</script>
