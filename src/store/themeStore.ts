import { defineStore } from "pinia"
import { ref } from "vue"

const useTheme = defineStore(`theme`, () => {
    const savedTheme = localStorage.getItem('theme')
    const state = ref<boolean>(savedTheme === 'true')
    const updateState = (newVal: boolean) => {
        state.value = newVal
        localStorage.setItem(`theme`, String(state.value))

    }
    return {
        state,
        updateState
    }
})

export default useTheme 