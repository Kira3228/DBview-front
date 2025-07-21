<script setup>
import { NButton, NButtonGroup } from "naive-ui";
import { options } from "../../../shared/ui/Inputs/SelectInput/InputOptions";
import { DateInput, SearchInput, SelectInput } from "../../../shared/ui";
import { useEventLogTableStore, useSearchStore, useSelectEventLogStore } from "../../../store";
import { useDebounce } from "../../../shared/lib/debounce";
import { downloadCSV, downloadSelectedCSV } from "../api/exportCSV";
import { fetchEventLogData } from "../api/fetchEventData";

const searchStore = useSearchStore();
const eventLogTableStore = useEventLogTableStore()
const selectedEventLogRowsStore = useSelectEventLogStore()
const { debounce } = useDebounce()

const updateFieldAndFetch = (field, value) => {
    searchStore.updateField(field, value);
    debounce(fetchEventData)
};

const fetchEventData = async () => {
    try {
        const data = await fetchEventLogData(
            searchStore.state.filePath,
            searchStore.state.carrier,
            searchStore.state.eventType,
            searchStore.state.startDate,
            searchStore.state.endDate,
            searchStore.state.status,
            searchStore.state.page
        );
        eventLogTableStore.updateStore(data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
</script>
<template>
    <div class="w-full">
        <NButtonGroup class="">
            <NButton size="small" @click="() => downloadCSV()"> Экспортировать всё </NButton>
            <NButton :disabled="!selectedEventLogRowsStore.state.selectedIds.length > 0 ? true : false" size="small"
                @click="() => downloadSelectedCSV(selectedEventLogRowsStore.state.selectedIds)"> Экспортировать
                выделенное
            </NButton>
        </NButtonGroup>
        <div class="flex gap-8">
            <SearchInput label="Путь" :model-value="searchStore.state.filePath" placeholder="Путь" @update:modelValue="(val) => {
                updateFieldAndFetch('filePath', val)
            }" />
            <SearchInput label="Носитель" :model-value="searchStore.state.carrier" placeholder="Носитель"
                @update:modelValue="(val) => {
                    updateFieldAndFetch('carrier', val)
                }" />
            <SelectInput label="Тип события" :option="options.eventTypeOptions" :value="searchStore.state.eventType"
                @update:value="(val) => { updateFieldAndFetch(`eventType`, val) }" />
            <SelectInput label="Статус" :option="options.statusOptions" :value="searchStore.state.status"
                @update:value="(val) => { updateFieldAndFetch(`status`, val) }" />
            <DateInput label="Начальная дата" @update:value="val => updateFieldAndFetch('startDate', val)"
                :value="searchStore.state.startDate" />
            <DateInput label="Конечная дата" @update:value="val => updateFieldAndFetch('endDate', val)"
                :value="searchStore.state.endDate" />
        </div>
    </div>
</template>
