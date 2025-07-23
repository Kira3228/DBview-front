<script setup lang="ts">
import PreviewTable from '../features/event-list/PreviewTable.vue';
import Filters from '../features/event-list/Filters/Filters.vue';
import { useCheckedFieldStore } from '../store/checkedFieldsStore';
const checkedFieldStore = useCheckedFieldStore()


</script>

<template>
    <div class="flex gap-5">
        <Filters />
        <PreviewTable :selected-fields="checkedFieldStore.state" />
    </div>
</template>

<style></style>
