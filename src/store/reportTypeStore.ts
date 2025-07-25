import { defineStore } from "pinia";
import { ref } from "vue";

const useReporTypeStore = defineStore('type-store', () => {
    const state = ref<string>('')

    const updateStore = (newVal: string) => {
        state.value = newVal
    }

    return {
        state,
        updateStore
    }
})

export default useReporTypeStore