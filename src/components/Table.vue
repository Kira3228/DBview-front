<template>
  <div class="mt-4 flex flex-col justify-between">
    <NDataTable ref="table" :columns="columns" :data="data" :bordered="true" :row-key="(row: TSystemEvent) => row.id"
      class="shadow-sm" />
    <div class="mt-6 flex justify-center">
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
} from "naive-ui";
import type { TSystemEvent } from "../utils/Types/SystemEvent.types";
import type { Event } from "../utils/Types/EventLog";
import type { ActiveFile } from "../utils/Types/ActiveFile";

defineProps<{
  data?: Event[] | ActiveFile[];
  columns?: DataTableColumn<Event | ActiveFile>[];
  currentPage: number;
  total?: number;
  pageSize?: number;
  totalPages?: number;
}>();
const emit = defineEmits<{
  (e: `update:page`, page: number): void;
}>();

const handlePageChange = (page: number) => {
  console.log(`321123213`)
  emit("update:page", page);
};
</script>
