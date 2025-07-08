<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchData } from "../utils/fetchData";
import Table from "../components/Table.vue";
import { NConfigProvider, type DataTableRowKey } from "naive-ui";
import type { Event, EventLog } from "../utils/Types/EventLog.ts";
import { useEventLogTableStore } from "../store/eventLogTableStore.ts";
import { columns } from "../Helpers/EventLogTableColumns.ts";
import EventLogHeader from "../features/event-log/UI/EventLogHeader.vue";
import type { ActiveFile } from "../utils/Types/ActiveFile.ts";
import type { TableColumn } from "naive-ui/es/data-table/src/interface";
import { useSearchStore } from "../store/searchStore.ts";
import { useSelectEventLogStore } from "../store/selectedEventLogRowsStore.ts";

const eventLogTableStore = useEventLogTableStore();
const searchStore = useSearchStore()
const selectEventRows = useSelectEventLogStore()
const error = ref(false);
const isLoading = ref(false);
const fetchEvents = async () => {
  try {
    isLoading.value = true;

    const result: EventLog = await fetchData(
      `http://localhost:3000/system-log/getFilteredSystemLog/?page=${eventLogTableStore.state.page}&status=${searchStore.state.status}`
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
  <NConfigProvider>
    <div class="flex w-full flex-col p-4">
      <EventLogHeader />
      <Table :data="eventLogTableStore.state.events" :current-page="eventLogTableStore.state.page"
        :columns="columns as TableColumn<Event | ActiveFile>[]" :total="eventLogTableStore.state.totalCount"
        :page-size="eventLogTableStore.state.limit" :total-pages="eventLogTableStore.state.totalPages"
        @update:page="handlePageChange" @select:rows="handleSelectRows" />
    </div>
  </NConfigProvider>
</template>
