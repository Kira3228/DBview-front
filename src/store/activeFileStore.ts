import { defineStore } from "pinia";
import type { ActiveFile, ActiveFileRes } from "../utils/Types/ActiveFile";
import { ref } from "vue";

const initialState: ActiveFileRes = {
  files: [],
  limit: 30,
  page: 1,
  totalCount: 0,
  totalPages: 0,
};

export const useActiveFileStore = defineStore(`active_file`, () => {
  const state = ref<ActiveFileRes>({ ...initialState });

  const updateStore = (newData: Partial<ActiveFile>) => {
    state.value = { ...state.value, ...newData };
  };

  const setFiles = (files: ActiveFileRes["files"]) => {
    state.value.files = files;
  };

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
  const reset = () => {
    state.value = { ...initialState };
  };

  return {
    state,
    updateStore,
    setFiles,
    setPagination,
    reset,
  };
});
