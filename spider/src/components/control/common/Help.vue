<template>
  <Tooltip :content="content" theme="light" placement="top-end" transfer>
    <slot />
  </Tooltip>
</template>
<script>
export default {
  props: {
    content: String,
  },
};
</script>