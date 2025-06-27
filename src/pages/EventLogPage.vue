<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { fetchData } from "../utils/fetchData";
import type { TSystemEventResponse } from "../utils/Types/SystemEvent.types";
import Table from "../components/Table.vue";
import EventLogHeader from "../components/EventLogHeader.vue";
import { NConfigProvider } from "naive-ui";
import { useSearchStore } from "../store/searchStore";
import EventLog from "./utils/Types/EventLog.ts";
const responseData = <EventLog>{
  data: [],
  page: 1,
  total: 0,
  totalPages: 1,
};

const currentPage = ref(1);
const pageSize = ref(5);
const error = ref(false);
const isLoading = ref(false);
const searchStore = useSearchStore();
const fetchEvents = async () => {
  try {
    isLoading.value = true;
    const result: TSystemEventResponse = await fetchData(
      `http://localhost:3000/system-log/getFilteredSystemLog`
    );

    responseData.value = {
      events: result.data || [],
      total: result.total || 0,
      page: result.page || 1,
      totalPages: result.totalPages || 1,
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
      <Table
        :data="responseData.data"
        :current-page="currentPage"
        :total="responseData.total"
        :page-size="pageSize"
        :total-pages="responseData.totalPages"
        @update:page="(newPage) => (currentPage = newPage)"
      />
    </div>
  </NConfigProvider>
</template>
