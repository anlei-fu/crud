<template>
  <div class="pager">
    <Page
      :total="total"
      show-sizer
      show-total
      :current="current"
      :page-size="size"
      @on-change="onIndexChanged"
      @on-page-size-change="onSizeChanged"
      :page-size-opts="sizes"
    />
  </div>
</template>
<script>
  export default {
    props: {
      total: {
        type: Number,
        default: 0,
      },
      current: {
        type: Number,
        default: 1,
      },
      size:{
        type: Number,
        default: 10,
      },
      sizes: {
        type: Array,
        default: () => [10, 20, 30, 50, 100],
      },
    },
    methods: {
      onSizeChanged(newSize) {
        this.$emit("onSizeChanged", newSize);
      },
      onIndexChanged(newIndex) {
        this.$emit("onIndexChanged", newIndex);
      },
    },
  };
</script>
