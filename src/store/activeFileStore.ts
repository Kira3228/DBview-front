import { defineStore } from "pinia";
import type { ActiveFile } from "../utils/Types/ActiveFile";
import { ref } from "vue";

const initialData: ActiveFile = {
  filePath: "",
  id: 0,
  fileSize: 0,
  inode: 0,
  maxChainDepth: 0,
  minChainDepth: 0,
  status: "",
};

const useActiveFileStore = defineStore(`active_file`, () => {
  const state = ref<ActiveFile>({ ...initialData });

  const updateState = (newData: Partial<ActiveFile>) => {
    state.value = {...state.value, ...newData}
  };
});
