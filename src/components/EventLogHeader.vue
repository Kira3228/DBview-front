<template>
    <div class="w-full">
        <NButtonGroup class="">
            <NButton size="small"> Детали </NButton>
            <NButton size="small"> Экспортировать
            </NButton>
            <NButton size="small"> Архивировать
            </NButton>
        </NButtonGroup>
        <div class="flex gap-8">
            <div class="flex gap-3.5 items-center">
                <div>
                    <label class="text-xs text-gray-400" for="file-name">Путь</label>
                    <SearchInput v-model="searchFields.fileName" placeholder="Путь"
                        @update:modelValue="(val) => handleSearchInput('filePath', val)" id='filePath' />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="user">Пользователь</label>
                    <SearchInput placeholder="Пользователь" v-model="searchFields.user"
                        @update:modelValue="(val) => handleSearchInput('user', val)" id='user' />
                </div>

                <div>
                    <label class="text-xs text-gray-400" for="event-type">Тип события</label>
                    <NSelect id="event-type" size="tiny" style="max-width: 160px; min-width: 160px;" />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="event-type">Статус</label>
                    <NSelect id="event-type" placeholder="Статус" size="tiny"
                        style="max-width: 160px; min-width: 160px;" />
                </div>
            </div>
            <div class="flex">
                <div class="p-1.5 border-2">
                    <div class="flex gap-2.5">
                        <div>
                            <label class="text-xs text-gray-400" for="start-date">Начальная дата</label>
                            <NDatePicker id="start-date" />
                        </div>
                        <div>
                            <label class="text-xs text-gray-400" for="end-date">Конечная дата</label>
                            <NDatePicker id="end-date" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { NButton, NButtonGroup, NCard, NDatePicker, NInput, NInputGroup, NSelect } from 'naive-ui';
import SearchIcon from './Icons/SearchIcon.vue';
import SearchInput from './UI/SearchInput.vue';
import { reactive } from 'vue';
import { useSearchStore } from '../store/searhStore';

const searchStore = useSearchStore()
const searchFields = reactive({
    filePath: '',
    user: '',
});
const searchParams = () => {
    const params = Object.fromEntries(
        Object.entries(searchFields).filter(([_, value]) => value !== `` && value !== null)
    )
    const queryString = new URLSearchParams(params).toString()
    console.log(queryString)
}
const handleSearchInput = (field, value) => {
    searchStore.updateField(field, value)
    console.log(`${field} changed:`, value);
    console.log(searchFields)
};

const options = [{}]
</script>