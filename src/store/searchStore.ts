// store/searchStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export interface SearchState {
  eventType: string;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  filePath: string;
  user: string;
  page: number;
  limit?: number;
}

export const useSearchStore = defineStore("search", () => {
  // Инициализация состояния
  const state = ref<SearchState>({
    eventType: "",
    startDate: null,
    endDate: null,
    status: "",
    filePath: "",
    user: "",
    page: 1,
    limit: 10,
  });

  // Обновление конкретного поля
  const updateField = <K extends keyof SearchState>(
    field: K,
    value: SearchState[K]
  ) => {
    state.value[field] = value;
    console.log(field, value);
  };

  // Сброс фильтров (кроме пагинации)
  const resetFilters = () => {
    state.value = {
      ...state.value,
      eventType: "",
      startDate: null,
      endDate: null,
      status: "",
      filePath: "",
      user: "",
    };
  };

  // Обновление диапазона дат
  const setDateRange = (dates: [Date | null, Date | null]) => {
    state.value.startDate = dates[0];
    state.value.endDate = dates[1];
  };

  return {
    state,
    updateField,
    resetFilters,
    setDateRange,
  };
});
