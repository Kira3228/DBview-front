<template>
    <div class="flex w-full flex-col p-4">
        <ActiveFileHeader />
        <Table/>
    </div>
</template>

<script lang="ts" setup>
import ActiveFileHeader from '../components/ActiveFileHeader.vue';
import Table from '../components/Table.vue';
</script>