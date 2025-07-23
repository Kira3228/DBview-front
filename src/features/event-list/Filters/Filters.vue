<script setup lang="ts">
import { computed, ref, watch } from 'vue'; // Добавил watch для автоматического обновления store
import { data } from '../../../pages/mock';
import { NButton, NTree } from 'naive-ui';
import { toSearchString } from '../../../pages/helpers';
import type { TSelectedFields } from '../../../shared/lib/types/SelectedFields';
import SelectInput from '../../../shared/ui/Inputs/SelectInput/SelectInput.vue';
import DateInput from '../../../shared/ui/Inputs/DateInput.vue';
import SearchInput from '../../../shared/ui/Inputs/SearchInput.vue';
import { options } from './options';
import { downloadReport } from '../../event-log/api/downloadReport';
import { useCheckedFieldStore } from '../../../store/checkedFieldsStore';

// Получаем store
const checkedFieldStore = useCheckedFieldStore();

// Локальные состояния (остались без изменений)
const format = ref<string>("");
const type = ref<string>("");
const dateRange = ref<[number, number]>([Date.now() - 1, Date.now()]);
const exceptions = ref<string>("");
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

// Хэндлеры (без изменений)
const handleFormatUpdate = (newVal: string) => {
    format.value = newVal;
    console.log(newVal);
};
const handleTypeUpdate = (newVal: string) => {
    type.value = newVal;
    console.log(newVal);
};
const handleUpdateDateRange = (newVal: [number, number]) => {
    dateRange.value = newVal;
};
const handleUpdateExceptionsText = (newVal: string) => {
    exceptions.value = newVal;
};
const downloadReports = async () => {
    if (checkedFieldStore.checkedKeys.length === 0) {
        alert('Пожалуйста, выберите хотя бы одно поле для отчета.');
        return;
    }
    isLoading.value = true;
    errorMessage.value = null;
    const params = toSearchString(reportObject.value);
    downloadReport(type.value, params, `http://localhost:3000/api/reports/`);
};

// Создание default DTO (без изменений)
const createDefaultDto = (): TSelectedFields => ({
    id: false,
    eventType: false,
    eventData: false,
    severity: false,
    source: false,
    timestamp: false,
    relatedFileId: {
        id: false,
        fileSystemId: false,
        inode: false,
        filePath: false,
        fileName: false,
        fileSize: false,
        createdAt: false,
        modifiedAt: false,
        isOriginalMarked: false,
        maxChainDepth: false,
        minChainDepth: false,
        status: false,
        extendedAttributes: false,
    },
    relatedProcessId: {
        id: false,
        pid: false,
        executablePath: false,
        commandLine: false,
        parentPid: false,
        groupId: false,
        createdAt: false,
        processStartTime: false,
    },
});

// Computed reportObject теперь использует checkedKeys из store
const reportObject = computed<TSelectedFields>(() => {
    const result = createDefaultDto();

    checkedFieldStore.checkedKeys.forEach(key => {
        if (key === 'relatedProcessId' || key === 'relatedFileId') {
            return;
        }
        const path = key.split('.');
        if (path.length === 1) {
            (result as any)[path[0]] = true;
        } else if (path.length === 2) {
            const [parentKey, childKey] = path;
            (result as any)[parentKey][childKey] = true;
        }
    });

    return result;
});

// Watcher: автоматически обновляем state в store при изменении checkedKeys
watch(() => checkedFieldStore.checkedKeys, () => {
    checkedFieldStore.updateSelectedFields();
}, { deep: true });
</script>

<template>
    <div class="min-w-80 border-1 border-solid border-gray-300 p-2.5">
        <h4>Выберите поля для отчета</h4>
        <!-- v-model привязан к store -->
        <NTree v-model:checked-keys="checkedFieldStore.checkedKeys" :data="data" cascade checkable block-line />
        <SelectInput label="Формат" :option="options.formatOption" :value="format"
            @update:value="(val) => { handleFormatUpdate(val) }" />
        <SelectInput label="Тип" :option="options.reportTypes" :value="type"
            @update:value="(val) => { handleTypeUpdate(val) }" />
        <DateInput :value="dateRange" label="Дата" @update:value="() => handleUpdateDateRange" type="daterange" />
        <SearchInput label="Пути исключения через ;" type="textarea" :model-value="exceptions" @update:model-value="(value) => {
            handleUpdateExceptionsText(value)
        }" />
        <NButton @click="downloadReports">Скачать</NButton>
    </div>
</template>
