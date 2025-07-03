import { defineStore } from "pinia";
import { ref } from "vue";

export interface InitialState {
  filePath: string;
  inode: number;
}
export const useActiveFileSearchStore = defineStore(`active-search`, () => {
  const state = ref<InitialState>({
    filePath: "",
    inode: 0,
  });
  const updateField = <K extends keyof InitialState>(
    field: K,
    value: InitialState[K]
  ) => {
    state.value[field] = value;
  };
  const resetFilters = () => {
    state.value = {
      ...state.value,
      filePath: "",
      inode: 0,
    };
  };
  return {
    state,
    updateField,
    resetFilters,
  };
});
