<template>
  <div class="w-full">
    <NButtonGroup class="">
      <NButton size="small"> Детали </NButton>
      <NButton size="small"> Экспортировать </NButton>
      <NButton size="small"> Архивировать </NButton>
    </NButtonGroup>
    <div class="flex gap-8">
      <div class="flex gap-3.5 items-center">
        <div>
          <label class="text-xs text-gray-400" for="file-name">Путь</label>
          <SearchInput :model-value="searchStore.state.filePath" placeholder="Путь" @update:modelValue="(val) => {
            updateFieldAndFetch('filePath', val)
          }
          " />
        </div>
        <div>
          <label class="text-xs text-gray-400" for="user">Носитель</label>
          <SearchInput placeholder="Носитель" :model-value="searchStore.state.carrier" @update:modelValue="
            (val) => {
              updateFieldAndFetch('carrier', val)
            }
          " id="user" />
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
import SearchInput from "./UI/SearchInput.vue";
import { useSearchStore } from "../store/searchStore";
import { useDebounce } from "../Hooks/useDebounce";
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import { fetchEventLogData } from "../utils/fetchData";
import { cloneFnJSON } from "@vueuse/core";
import { useEventLogTableStore } from "../store/eventLogTableStore";

const searchStore = useSearchStore();
const eventLogTableStore = useEventLogTableStore()
const debounceTimer = ref(null);

const updateFieldAndFetch = (field, value) => {
  searchStore.updateField(field, value);
  triggerDebouncedFetch();
};

const triggerDebouncedFetch = () => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    fetchData();
  }, 500); 
};


const fetchData = async () => {
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
    console.log(`2312123`, data)
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
