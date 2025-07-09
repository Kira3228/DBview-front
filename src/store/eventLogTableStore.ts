import { defineStore } from "pinia";
import { ref } from "vue";
import type { EventLog } from "../shared/lib/types/EventLog";

const initialState: EventLog = {
  events: [],
  limit: 30,
  page: 1,
  totalCount: 0,
  totalPages: 0,
};

const useEventLogTableStore = defineStore("eventLogTable", () => {
  const state = ref<EventLog>({ ...initialState });

  // Полное обновление данных
  const updateStore = (newData: Partial<EventLog>) => {
    // Явное преобразование page к числу, если он присутствует
    if (newData.page !== undefined) {
      newData.page = Number(newData.page);
    }
    state.value = { ...state.value, ...newData };
  };

  // Установка событий
  const setEvents = (events: EventLog["events"]) => {
    state.value.events = events;
  };

  // Обновление пагинации
  const setPagination = (config: {
    page?: number | string; // Разрешаем и string на входе
    limit?: number;
    totalCount?: number;
    totalPages?: number;
  }) => {
    if (config.page !== undefined) {
      state.value.page = Number(config.page); // Явное преобразование
    }
    if (config.limit !== undefined) {
      state.value.limit = Number(config.limit);
    }
    if (config.totalCount !== undefined) {
      state.value.totalCount = Number(config.totalCount);
    }
    if (config.totalPages !== undefined) {
      state.value.totalPages = Number(config.totalPages);
    }
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
export default useEventLogTableStore;
