<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { fetchData } from "../utils/fetchData";
import Table from "../components/Table.vue";

import { NConfigProvider } from "naive-ui";
import type { EventLog } from "../utils/Types/EventLog.ts";
import { useEventLogTableStore } from "../store/eventLogTableStore.ts";
import { columns } from "../Helpers/EventLogTableColumns.ts";
import EventLogHeader from "../components/EventLogHeader.vue";
const responseData = ref<EventLog>({
  events: [],
  limit: 30,
  page: 1,
  totalCount: 0,
  totalPages: 0,
});
const eventLogTableStore = useEventLogTableStore()
const currentPage = ref(1);
const pageSize = ref(5);
const error = ref(false);
const isLoading = ref(false);

const fetchEvents = async () => {
  try {
    isLoading.value = true;
    const result: EventLog = await fetchData(
      `http://localhost:3000/system-log/getFilteredSystemLog/`
    );
    eventLogTableStore.setEvents(result.events || []);
    eventLogTableStore.setPagination({
      page: eventLogTableStore.state.page,
      limit: eventLogTableStore.state.limit
    })
  } catch (err) {
    error.value = true;
    console.error("Fetch error:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchEvents);
watch(currentPage, fetchEvents);
</script>

<template>
  <NConfigProvider>
    <div class="flex w-full flex-col p-4">
      <EventLogHeader />
      <Table :data="eventLogTableStore.state.events" :current-page="currentPage" :columns="columns"
        :total="responseData.totalPages" :page-size="pageSize" :total-pages="responseData.totalPages"
        @update:page="(newPage) => (currentPage = newPage)" />
    </div>
  </NConfigProvider>
</template>
