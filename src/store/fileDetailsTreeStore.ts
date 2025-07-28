import { defineStore } from "pinia";
import { ref } from "vue";
import type { FileHierarchyMap } from "../pages/type";

const initialState: FileHierarchyMap = {};

const useFileDetailsTreeStore = defineStore(`fileDetailsTree`, () => {
    const state = ref<FileHierarchyMap>(initialState); 

    const updateStore = (newData: FileHierarchyMap) => { 
        state.value = { ...newData };
    };

    const reset = () => {
        state.value = initialState; 
    };

    return {
        state,
        updateStore,
        reset
    };
});
export default useFileDetailsTreeStore