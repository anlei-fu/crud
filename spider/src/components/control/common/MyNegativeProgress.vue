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
          return "red";
        } else if (this.percent >= 20 && this.percent < 40) {
          return "#ed4014";
        } else if (this.percent >= 40 && this.percent < 60) {
          return "#ff9900";
        } else if (this.percent >= 60 && this.percent < 80) {
          return "#2db7f5";
        } else {
          return "#19be6b";
        }
      },
      percetText() {
        return parseInt(this.percent);
      },
    },
  };
</script>
