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
<script setup lang="ts">
import {
  NButton,
  NDataTable,
  NPagination,
  type DataTableColumn,
  type DataTableRowKey,
} from "naive-ui";
import type { Event } from "../utils/Types/EventLog";
import type { ActiveFile } from "../utils/Types/ActiveFile";

type TableItem = Event | ActiveFile;

defineProps<{
  data?: Event[] | ActiveFile[];
  columns?: DataTableColumn<Event | ActiveFile>[];
  currentPage: number;
  total?: number;
  pageSize?: number;
  totalPages?: number;
  onRowClick?: (row: TableItem) => void
}>();

const handleSelectRows = (rowKeys: DataTableRowKey[]) => {
  emit(`select:rows`, rowKeys)

}
const emit = defineEmits<{
  (e: `update:page`, page: number): void;
  (e: `select:rows`, rowKeys: DataTableRowKey[]): void
}>();

const handlePageChange = (page: number) => {
  emit("update:page", page);
};

</script>
