<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { fetchData } from "../utils/fetchData";
import type { TSystemEventResponse } from "../utils/Types/SystemEvent.types";
import Table from "../components/Table.vue";
import EventLogHeader from "../components/EventLogHeader.vue";
import { NConfigProvider } from "naive-ui";
import { useSearchStore } from "../store/searchStore";
import type { EventLog } from "../utils/Types/EventLog.ts";

const responseData = ref<EventLog>({
  events: [],
  limit: 30,
  page: 1,
  totalCount: 0,
  totalPages: 0,
});

const currentPage = ref(1);
const pageSize = ref(5);
const error = ref(false);
const isLoading = ref(false);
const searchStore = useSearchStore();
const fetchEvents = async () => {
  try {
    isLoading.value = true;
    const result: EventLog = await fetchData(
      `http://localhost:3000/system-log/getFilteredSystemLog/?filePath=${searchStore.state.filePath}&`
    );

    responseData.value = {
      events: result.events || [],
      page: result.page || 1,
      totalPages: result.totalPages || 1,
      limit: result.limit || 30,
      totalCount: result.totalCount || 0
    };
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
      <Table :data="responseData.events" :current-page="currentPage" :total="responseData.totalPages"
        :page-size="pageSize" :total-pages="responseData.totalPages"
        @update:page="(newPage) => (currentPage = newPage)" />
    </div>
  </NConfigProvider>
</template>
