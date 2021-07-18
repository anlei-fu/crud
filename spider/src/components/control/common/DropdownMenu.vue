<template>
  <Dropdown>
    <a href="javascript:void(0)">
      {{ title }}
      <Icon type="ios-arrow-down"></Icon>
    </a>
    <DropdownMenu slot="list" class="drop-dowm-menu">
      <DropdownItem v-for="item in items" :key="item.name" @click="handleClick(item)">
        <Icon :type="item.icon" />
        {{ item.text }}
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
  export default {
    props: {
      title: String,
      items: Array,
    },
    data() {
      return {};
    },
    methods: {
      handleClick(path) {
        this.$router.push({ path });
      },
    },
  };
</script>
<style scoped>
  .ivu-dropdown-menu {
    display: flex;
  }
</style>
