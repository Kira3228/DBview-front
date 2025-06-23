<script setup lang="ts">
import { NButton, NInput, NInputGroup } from 'naive-ui';
import SearchIcon from '../Icons/SearchIcon.vue';

</script>

<template>
    <NInputGroup>
        <NInput placeholder="Имя файла" size="tiny" autosize class="w-36" />
        <NButton size="tiny">
            <template #icon>
                <SearchIcon />
            </template>
        </NButton>
    </NInputGroup>
</template>