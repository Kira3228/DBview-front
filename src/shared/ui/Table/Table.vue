<script setup lang="ts">
import {
  NButton,
  NDataTable,
  NPagination,
  type DataTableRowKey,
} from "naive-ui";
import type { TableItem, TableProps } from "./Table.type";

defineProps<
  TableProps
>();

const handleSelectRows = (rowKeys: DataTableRowKey[]) => {
  emit(`select:rows`, rowKeys)
}

const handlePageChange = (page: number) => {
  emit("update:page", page);
};

const emit = defineEmits<{
  (e: `update:page`, page: number): void;
  (e: `select:rows`, rowKeys: DataTableRowKey[]): void
}>();
</script>
<template>
  <div class="mt-4 flex flex-col justify-between">
    <NDataTable @update:checked-row-keys="handleSelectRows" ref="table" :columns="columns" :data="data" :bordered="true"
      :row-key="(row: TableItem) => row.id" class="shadow-sm" @select:rows="handleSelectRows" />
    <div class=" mt-6 flex justify-center">
      <NPagination :page="Number(currentPage)" :page-size="pageSize" :page-count="totalPages"
        @update:page="handlePageChange" show-quick-jumper>
        <template #prev>
          <NButton>Previous</NButton>
        </template>
        <template #next>
          <NButton>Next</NButton>
        </template>
      </NPagination>
    </div>
  </div>
</template>
