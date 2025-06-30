import { defineStore } from "pinia";
import { ref } from "vue";
import type { EventLog } from "../utils/Types/EventLog";

const initialState: EventLog = {
  events: [],
  limit: 30,
  page: 1,
  totalCount: 0,
  totalPages: 0,
};

export const useEventLogTableStore = defineStore("eventLogTable", () => {
  const state = ref<EventLog>({ ...initialState });

  // Полное обновление данных
  const updateStore = (newData: Partial<EventLog>) => {
    state.value = { ...state.value, ...newData };
  };

  // Установка событий
  const setEvents = (events: EventLog["events"]) => {
    state.value.events = events;
  };

  // Обновление пагинации
  const setPagination = (config: {
    page?: number;
    limit?: number;
    totalCount?: number;
    totalPages?: number;
  }) => {
    if (config.page !== undefined) state.value.page = config.page;
    if (config.limit !== undefined) state.value.limit = config.limit;
    if (config.totalCount !== undefined)
      state.value.totalCount = config.totalCount;
    if (config.totalPages !== undefined)
      state.value.totalPages = config.totalPages;
  };

  // Сброс к начальному состоянию
  const reset = () => {
    state.value = { ...initialState };
  };

  return {
    state,
    updateStore,
    setEvents,
    setPagination,
    reset,
  };
});
