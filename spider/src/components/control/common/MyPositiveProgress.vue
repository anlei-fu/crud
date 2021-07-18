<template>
  <span :style="{ color: color }">{{ percetText }}%</span>
</template>
<script>
  export default {
    props: {
      percent: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      color() {
        if (this.percent < 20) {
          return "#19be6b";
        } else if (this.percent >= 20 && this.percent < 40) {
          return "#2db7f5";
        } else if (this.percent >= 40 && this.percent < 60) {
          return "#2d8cf0";
        } else if (this.percent >= 60 && this.percent < 80) {
          return "#ed4014";
        } else {
          return "red";
        }
      },
      percetText() {
        return parseInt(this.percent);
      },
    },
  };
</script>
