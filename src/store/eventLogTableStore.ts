import { defineStore } from "pinia";
import { ref } from "vue";
import type { EventLog } from "../utils/Types/EventLog";

interface initialData {}

export const useEventLogTableStore = defineStore(`eventLogTable`, () => {
  const state = ref<EventLog>({
    events: [],
    limit: 30,
    page: 1,
    totalCount: 0,
    totalPages: 0,
  });

  return { state }
});
