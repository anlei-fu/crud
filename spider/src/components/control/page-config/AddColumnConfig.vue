<template>
  <div>
    <OperationPanel
      @batchDelete="batchDelete()"
      @clone="clone()"
      :operations="operations"
    />
    <TableCloneColumnSelector ref="cloneConfiger" />
    <EditTable>
      <template
        slot="edit"
        slot-scope="{ data, index, save, cancel, checkUnique }"
      >
        <AddColumnForm
          :data="data"
          :index="index"
          @save="save"
          @cancel="cancel"
          :checkUnique="checkUnique"
        />
      </template>
    </EditTable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      operations: [
        {
          label: "从其他表克隆",
          event: "clone",
        },
        {
          label: "批量删除",
          event: "batchDelete",
          icon: "ios-trash-outline",
          type: "error",
        },
      ],
    };
  },
  methods: {
    clone() {},
    batchDelete() {},
  },
};
</script>