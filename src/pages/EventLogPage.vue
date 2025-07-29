<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchData } from "../shared/api/fetchData.ts";
import { type DataTableRowKey } from "naive-ui";
import type { Event, EventLog } from "../shared/lib/types/EventLog.ts";
import type { ActiveFile } from "../shared/lib/types/ActiveFile.ts";
import type { TableColumn } from "naive-ui/es/data-table/src/interface";
import { useEventLogTableStore, useSearchStore, useSelectEventLogStore } from "../store";
import Table from "../shared/ui/Table/Table.vue";
import { EventLogTableColumns } from "../shared/Helpers/";
import { EventLogHeader } from "../features/event-log/";

const eventLogTableStore = useEventLogTableStore();
const searchStore = useSearchStore()
const selectEventRows = useSelectEventLogStore()
const error = ref(false);
const isLoading = ref(false);
const filePathexception = localStorage.getItem(`filePath`)
const processPathexception = localStorage.getItem(`processPath`)

const fetchEvents = async () => {
  try {
    isLoading.value = true;

    const result: EventLog = await fetchData<EventLog>(
      `http://localhost:3000/api/logs/filtered/?page=${eventLogTableStore.state.page}&status=${searchStore.state.status}&filePathException=${filePathexception}&processPathException=${processPathexception}`
    );

    eventLogTableStore.setEvents(result.events || []);
    eventLogTableStore.setPagination({
      page: result.page,
      totalCount: result.limit,
      totalPages: result.totalPages
    });
  } catch (err) {
    error.value = true;
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (newPage: number) => {
  eventLogTableStore.setPagination({ page: newPage });
  eventLogTableStore.state.page
  fetchEvents();
}

const rows = ref<DataTableRowKey[]>([])

const handleSelectRows = (rowKeys: DataTableRowKey[]) => {
  rows.value = rowKeys
  selectEventRows.setSelectedIds(rowKeys)
  console.log(...selectEventRows.state.selectedIds);
}

onMounted(fetchEvents);
</script>
<template>
  <EventLogHeader />
  <Table :data="eventLogTableStore.state.events" :current-page="eventLogTableStore.state.page"
    :columns="EventLogTableColumns as TableColumn<Event | ActiveFile>[]" :total="eventLogTableStore.state.totalCount"
    :page-size="eventLogTableStore.state.limit" :total-pages="eventLogTableStore.state.totalPages"
    @update:page="handlePageChange" @select:rows="handleSelectRows" />
</template>
