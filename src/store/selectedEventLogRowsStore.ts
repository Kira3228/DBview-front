import type { DataTableRowKey } from "naive-ui";
import { defineStore } from "pinia";
import { ref } from "vue";

type initialState = {
  selectedIds: DataTableRowKey[];
};
const useSelectEventLogStore = defineStore(`select_events`, () => {
  const state = ref<initialState>({
    selectedIds: [],
  });

  const setSelectedIds = (ids: DataTableRowKey[]) => {
    state.value.selectedIds = [...ids];
  };
  const addId = (id: DataTableRowKey) => {
    if (!state.value.selectedIds.includes(id)) {
      state.value.selectedIds.push(id);
    }
  };

  const removeId = (id: DataTableRowKey) => {
    state.value.selectedIds = state.value.selectedIds.filter(
      (item) => item !== id
    );
  };

  const reset = () => {
    state.value.selectedIds = [];
  };
  return {
    state,
    setSelectedIds,
    addId,
    removeId,
    reset,
  };
});

export default useSelectEventLogStore;
