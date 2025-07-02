<template>
    <div class="w-full">
        <NButtonGroup class="">
            <NButton size="small"> Детали </NButton>
            <NButton size="small"> Экспортировать </NButton>
            <NButton size="small"> Архивировать </NButton>
        </NButtonGroup>
        <div class="flex gap-8">
            <div class="flex gap-3.5 my-3.5 items-center">
                <div>
                    <label class="text-xs text-gray-400" for="file-name">Путь</label>
                    <SearchInput v-model="searchFields.fileName"
                        @update:modelValue="(val) => handleSearchInput('fileName', val)" id='file-name' />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="user">Пользователь</label>
                    <SearchInput v-model="searchFields.user"
                        @update:modelValue="(val) => handleSearchInput('user', val)" id='user' />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="mni">МНИ</label>
                    <SearchInput v-model="searchFields.mni" @update:modelValue="(val) => handleSearchInput('mni', val)"
                        id='mni' />
                </div>
                <div>
                    <label class="text-xs text-gray-400" for="event-type">Тип события</label>
                    <NSelect id="event-type" size="tiny" style="max-width: 160px; min-width: 160px;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NButton, NButtonGroup, NDatePicker, NSelect } from 'naive-ui';
import SearchInput from './UI/SearchInput.vue';
import { reactive } from 'vue';

const searchFields = reactive({
    fileName: '',
    user: '',
    mni: '',
});
const searchParams = () => {
    const params = Object.fromEntries(
        Object.entries(searchFields).filter(([_, value]) => value !== `` && value !== null)
    )
    const queryString = new URLSearchParams(params).toString()
    console.log(queryString)
}
const handleSearchInput = (field: keyof typeof searchFields, value: string) => {
    searchFields[field] = value;
    console.log(`${field} changed:`, value);
    searchParams();
};
</script>