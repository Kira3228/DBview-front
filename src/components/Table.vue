<template>
  <div class="mt-4 flex flex-col justify-between">
    <NDataTable @update:checked-row-keys="handleTest" ref="table" :columns="columns" :data="data" :bordered="true"
      :row-key="(row: TableItem) => row.id"  class="shadow-sm" @test="handleTest" />
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

const handleTest = (rowKeys: DataTableRowKey[]) => {
  emit(`test`, rowKeys)

}
const emit = defineEmits<{
  (e: `update:page`, page: number): void;
  (e: `test`, rowKeys: DataTableRowKey[]): void
}>();

const handlePageChange = (page: number) => {
  emit("update:page", page);
};


  // const rowProps: DataTableCreateRowProps<TableItem> = (row) => {
  //   return {
  //     style: { cursor: props.onRowClick ? 'pointer' : 'default' },
  //     onClick: (e: MouseEvent) => {
  //       if ((e.target as HTMLElement).closest('.n-checkbox') || !props.onRowClick) {
  //         return;
  //       }
  //       props.onRowClick(row);
  //     }
  //   };
  // };
</script>
