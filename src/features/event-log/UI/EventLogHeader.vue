<template>
  <div class="w-full">
    <NButtonGroup class="">
      <NButton size="small" @click="downloadCSV"> Экспортировать всё </NButton>
      <NButton :disabled="!selectedEventLogRowsStore.state.selectedIds.length > 0 ? true : false" size="small"
        @click="downloadSelectedCSV"> Экспортировать выделенное </NButton>
    </NButtonGroup>
    <div class="flex gap-8">
      <div class="flex gap-3.5 items-center">
        <div>
          <SearchInput label="Путь" :model-value="searchStore.state.filePath" placeholder="Путь" @update:modelValue="(val) => {
            updateFieldAndFetch('filePath', val)
          }
          " />
        </div>
        <div>
          <SearchInput label="Носитель" :model-value="searchStore.state.carrier" placeholder="Носитель"
            @update:modelValue="(val) => {
              updateFieldAndFetch('carrier', val)
            }
            " />
        </div>
        <div>
          <label class="text-xs text-gray-400" for="event-type">Тип события</label>
          <NSelect id="event-type" size="tiny" style="max-width: 160px; min-width: 160px"
            :value="searchStore.state.eventType" @update:value="val => updateFieldAndFetch('eventType', val)"
            :options="eventTypeOptions" />
        </div>
        <div>
          <label class="text-xs text-gray-400" for="status">Статус</label>
          <NSelect id="status" placeholder="Статус" size="tiny" style="max-width: 160px; min-width: 160px"
            :value="searchStore.state.status" @update:value="val => updateFieldAndFetch('status', val)"
            :options="statusOptions" />
        </div>
      </div>
      <div class="flex">
        <div class="p-1.5 border-2">
          <div class="flex gap-2.5">
            <div>
              <label class="text-xs text-gray-400" for="start-date">Начальная дата</label>
              <NDatePicker id="start-date" :value="searchStore.state.startDate"
                @update:value="val => updateFieldAndFetch('startDate', val)" />
            </div>
            <div>
              <label class="text-xs text-gray-400" for="end-date">Конечная дата</label>
              <NDatePicker id="end-date" :value="searchStore.state.endDate"
                @update:value="val => updateFieldAndFetch('endDate', val)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButton, NButtonGroup, NDatePicker, NSelect } from "naive-ui";

import { useSearchStore } from "../../../store/searchStore";
import { onUnmounted, ref } from "vue";
import { downloadFile, fetchEventLogData } from "../../../utils/fetchData";
import { useEventLogTableStore } from "../../../store/eventLogTableStore";
import { useSelectEventLogStore } from "../../../store/selectedEventLogRowsStore";
import SearchInput from "../../../components/UI/SearchInput.vue";

const searchStore = useSearchStore();
const eventLogTableStore = useEventLogTableStore()
const selectedEventLogRowsStore = useSelectEventLogStore()
const debounceTimer = ref(null);

const updateFieldAndFetch = (field, value) => {
  searchStore.updateField(field, value);
  triggerDebouncedFetch();
};

const triggerDebouncedFetch = () => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    fetchEventData();
  }, 500);
};

const downloadCSV = async () => {
  await downloadFile(`http://localhost:3000/system-log/exportCsv`)
}

const downloadSelectedCSV = async () => {
  console.log()
  await downloadFile(`http://localhost:3000/system-log/exportSelectedCsv/?ids=${selectedEventLogRowsStore.state.selectedIds}`)
}

const fetchEventData = async () => {
  console.log("Fetching data with params:", searchStore.state);
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
onUnmounted(() => {
  clearTimeout(debounceTimer.value);
});

const eventTypeOptions = [
  { label: "Все", value: "" },
  { label: "Создание", value: "create" },
  { label: "Изменение", value: "modify" },
  { label: "Удаление", value: "delete" },
];

const statusOptions = [
  { label: "Все", value: "" },
  { label: "Активные", value: "active" },
  { label: "Архивированные", value: "archived" },
  { label: "Удалённые", value: "deleted" },
];

</script>
