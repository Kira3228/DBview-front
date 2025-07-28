<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { SearchInput } from '../shared/ui';
import { useDebounce } from '../shared/lib/debounce';

type TExceptions = {
    filePath: string
    processPath: string
}
const exceptions = ref<TExceptions>({
    filePath: "",
    processPath: ""
})
const { debounce } = useDebounce()

const handleExceptionsUpdate = (field: keyof TExceptions, newVal: string) => {
    exceptions.value[field] = newVal
    debounce(() => { saveExceptions(field, newVal) }, 300)
}
const saveExceptions = (field: keyof TExceptions, val: string) => {
    localStorage.setItem(field, val)
}
onMounted(() => {
    exceptions.value.processPath = localStorage.getItem(`processPath`) as string
    exceptions.value.filePath = localStorage.getItem(`filePath`) as string
})
</script>
<template>
    <div>
        <SearchInput @update:model-value="(val) => { handleExceptionsUpdate(`filePath`, val) }"
            :model-value="exceptions.filePath" label="Исключения мониторинга" type="textarea"></SearchInput>
        <SearchInput @update:model-value="(val) => { handleExceptionsUpdate(`processPath`, val) }"
            :model-value="exceptions.processPath" label="Глубина цепочки" type="textarea"></SearchInput>
    </div>
</template>
