<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { data } from '../../../pages/mock';
import { NButton, NInput, NSlider, NSpace, NTree } from 'naive-ui';
import { toSearchString } from '../../../pages/helpers';
import type { TSelectedFields } from '../../../shared/lib/types/SelectedFields';
import SelectInput from '../../../shared/ui/Inputs/SelectInput/SelectInput.vue';
import DateInput from '../../../shared/ui/Inputs/DateInput.vue';
import SearchInput from '../../../shared/ui/Inputs/SearchInput.vue';
import { options } from './options';
import { downloadChainsReport, downloadReport } from '../../event-log/api/downloadReport';
import { useCheckedFieldStore, useReportTypeStore } from '../../../store';

const format = ref<string>("");
const dateRange = ref<[number, number]>([1756135260000, Date.now()]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const fileExceptions = ref<string>("");
const processExceptions = ref<string>("");
const sliderValue = ref<number[]>([1, 2])

const checkedFieldStore = useCheckedFieldStore();
const reportTypeStore = useReportTypeStore()

const handleFormatUpdate = (newVal: string) => {
    format.value = newVal;
    console.log(newVal);
};
const handleUpdateDateRange = (newVal: Date | [number, number] | null) => {
    if (Array.isArray(newVal) && newVal.length === 2) {
        dateRange.value = newVal;
        console.log('Диапазон дат в timestamp:', dateRange.value);
    } else {
        console.warn('Получено неожиданное значение:', newVal);
    }
};
const handleUpdateFileExceptionsText = (newVal: string) => {
    fileExceptions.value = newVal;
};
const handleUpdateProcessExceptionsText = (newVal: string) => {
    processExceptions.value = newVal;
};
const downloadReports = async () => {
    if (!format.value || format.value === "") {
        alert("Не выбран формат")
    }
    if (reportTypeStore.state === `event`) {
        if (checkedFieldStore.checkedKeys.length === 0) {
            alert('Пожалуйста, выберите хотя бы одно поле для отчета.');
            return;
        }

        isLoading.value = true;
        errorMessage.value = null;
        const params = toSearchString(reportObject.value);
        const dateParams = {
            startDate: dateRange.value[0],
            endDate: dateRange.value[1]
        }
        downloadReport(
            format.value,
            params,
            `http://localhost:3000/api/reports/`,
            dateParams.startDate,
            dateParams.endDate,
            fileExceptions.value,
            processExceptions.value
        );
    } else {
        isLoading.value = true;
        errorMessage.value = null;
        const dateParams = {
            startDate: dateRange.value[0],
            endDate: dateRange.value[1]
        }
        downloadChainsReport(
            format.value,
            `http://localhost:3000/api/reports/chains/`,
            dateParams.startDate,
            dateParams.endDate,
            sliderValue.value
        )
    }
};
const handleUpdateSlider = (newVal: number[]) => {
    sliderValue.value = newVal
}
const handleUpdateLeftInput = (newVal: number) => {
    sliderValue.value[0] = newVal
}
const handleUpdateRightInput = (newVal: number) => {
    sliderValue.value[1] = newVal
}

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

</script>

<template>
    <div class="min-w-80 border-1 border-solid border-emerald-300 rounded-sm p-2.5">
        <SelectInput label="Тип" :option="options.reportTypes" :value="reportTypeStore.state"
            @update:value="(val) => { reportTypeStore.updateStore(val) }" />
        <SelectInput label="Формат" :option="options.formatOption" :value="format"
            @update:value="(val) => { handleFormatUpdate(val) }" />

        <NTree v-if="reportTypeStore.state === `event`" v-model:checked-keys="checkedFieldStore.checkedKeys"
            :data="data" cascade checkable block-line />
        <DateInput :value="dateRange" label="Дата" @update:value="handleUpdateDateRange" type="daterange" />
        <div v-if="reportTypeStore.state === `chains`">
            <label class="text-xs text-gray-400" for="event-type">Глубина</label>
            <NSlider class="my-1" @update-value="handleUpdateSlider" :value="sliderValue" range :step="1" />
            <div class="flex justify-between gap-4">
                <NInput @update-value="(newVal) => handleUpdateLeftInput(Number(newVal))"
                    :value="String(sliderValue[0])" size="small" />
                <NInput @update-value="(newVal) => handleUpdateRightInput(Number(newVal))"
                    :value="String(sliderValue[1])" size="small" />
            </div>
        </div>

        <SearchInput v-if="reportTypeStore.state === `event`" label="Исключения путей файлов через ;" placeholder=""
            type="textarea" :model-value="fileExceptions" @update:model-value="(value) => {
                handleUpdateFileExceptionsText(value)
            }" />
        <SearchInput v-if="reportTypeStore.state === `event`" label="Исключения путей процессов через ;" placeholder=""
            type="textarea" :model-value="processExceptions" @update:model-value="(value) => {
                handleUpdateProcessExceptionsText(value)
            }" />
        <div class="mt-1.5 w-full flex flex-col">
            <NButton strong secondary type="primary" class="w-full" @click="downloadReports">Скачать</NButton>
        </div>
    </div>
</template>
