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
                <SearchInput />
                <SearchInput />
                <SearchInput />
                <NSelect size="tiny" :options="options" v-model:value="value"
                    style="max-width: 160px; min-width: 160px;" />
            </div>
            <div class="flex">
                <div class="p-1.5 border-2">
                    <div class="flex gap-2.5">
                        <NDatePicker />
                        <NDatePicker />
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


const options = [{}]
</script>