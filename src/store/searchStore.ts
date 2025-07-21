// store/searchStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
interface SearchState {
  eventType: string;
  carrier: string;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  filePath: string;
  page: number;
  limit?: number;
}

const useSearchStore = defineStore("search", () => {
  // Инициализация состояния
  const state = ref<SearchState>({
    eventType: "",
    startDate: null,
    carrier: "",
    endDate: null,
    status: "",
    filePath: "",
    page: 1,
    limit: 10,
  });

  // Обновление конкретного поля
  const updateField = <K extends keyof SearchState>(
    field: K,
    value: SearchState[K]
  ) => {
    state.value[field] = value;
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
      carrier: ``,
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
export default useSearchStore;
