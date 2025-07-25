import { defineStore } from "pinia";
import { ref } from "vue";
import type { FileHierarchyMap } from "../pages/type";

const initialState: FileHierarchyMap = {};

const useFileDetailsTreeStore = defineStore(`fileDetailsTree`, () => {
    const state = ref<FileHierarchyMap>(initialState); // Removed spread since initialState is already an object

    const updateStore = (newData: FileHierarchyMap) => { // Changed Partial<FileHierarchyMap> to FileHierarchyMap
        state.value = { ...state.value, ...newData };
    };

    const reset = () => {
        state.value = initialState; // No need to spread since initialState is constant
    };

    return {
        state,
        updateStore,
        reset
    };
});
export default useFileDetailsTreeStore