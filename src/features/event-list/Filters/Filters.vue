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

const format = ref<string>("");
const type = ref<string>("");
const dateRange = ref<[number, number]>([1183135260000, Date.now()]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const exceptions = ref<string>("");

const checkedFieldStore = useCheckedFieldStore();

const handleFormatUpdate = (newVal: string) => {
    format.value = newVal;
    console.log(newVal);
};
const handleTypeUpdate = (newVal: string) => {
    type.value = newVal;
};
const handleUpdateDateRange = (newVal: Date | [number, number] | null) => {
    if (Array.isArray(newVal) && newVal.length === 2) {
        dateRange.value = newVal;
        console.log('Диапазон дат в timestamp:', dateRange.value);
    } else {
        console.warn('Получено неожиданное значение:', newVal);
    }
};
const handleUpdateExceptionsText = (newVal: string) => {
    exceptions.value = newVal;
};
const downloadReports = async () => {
    if (checkedFieldStore.checkedKeys.length === 0) {
        alert('Пожалуйста, выберите хотя бы одно поле для отчета.');
        return;
    }
    if (!format.value || format.value === "") {
        alert("Не выбран формат")
    }
    isLoading.value = true;
    errorMessage.value = null;
    const params = toSearchString(reportObject.value);
    const dateParams = {
        startDate: dateRange.value[0],
        endDate: dateRange.value[1]
    }
    downloadReport(format.value, params, `http://localhost:3000/api/reports/`, dateParams.startDate, dateParams.endDate, exceptions.value);
};


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

watch(() => checkedFieldStore.checkedKeys, () => {
    checkedFieldStore.updateSelectedFields();
}, { deep: true });
watch(dateRange, () => {
    console.log(123123123, dateRange.value[0]);
    console.log(123123123, dateRange.value[1]);

})
</script>

<template>
    <div class="min-w-80 border-1 border-solid border-gray-300 p-2.5">
        <h4>Выберите поля для отчета</h4>

        <NTree v-model:checked-keys="checkedFieldStore.checkedKeys" :data="data" cascade checkable block-line />
        <SelectInput label="Формат" :option="options.formatOption" :value="format"
            @update:value="(val) => { handleFormatUpdate(val) }" />
        <SelectInput label="Тип" :option="options.reportTypes" :value="type"
            @update:value="(val) => { handleTypeUpdate(val) }" />
        <DateInput :value="dateRange" label="Дата" @update:value="handleUpdateDateRange" type="daterange" />
        <SearchInput label="Пути исключения через ;" type="textarea" :model-value="exceptions" @update:model-value="(value) => {
            handleUpdateExceptionsText(value)
        }" />
        <NButton @click="downloadReports">Скачать</NButton>
    </div>
</template>
