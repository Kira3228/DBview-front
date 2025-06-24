<template>
    <div class="flex min-h-screen">
        <NMenu class="w-56 h-screen sticky top-0" :options="menuOptions" v-model:value="activeKey"
            @update:value="handleMenuSelect" />

        <main class="flex-1 overflow-auto">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import { NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

interface RouteMeta {
    menuKey?: string;
}

const activeKey = ref<string>((route.meta as RouteMeta).menuKey || 'home');

const menuOptions = [
    {
        label: 'Главная',
        key: 'home',
        route: { name: 'events' }
    },
    {
        label: 'Управление файлами',
        key: 'files',
        children: [
            {
                label: 'Активные файлы',
                key: 'active-files',
                route: { name: 'active-files' }
            },
            {
                label: 'Архив',
                key: 'archive',
                route: { name: 'archive' }
            }
        ]
    }
];

const handleMenuSelect = (key: string) => {
    const findRoute = (options: any[]): any => {
        for (const item of options) {
            if (item.key === key && item.route) return item;
            if (item.children) {
                const found = findRoute(item.children);
                if (found) return found;
            }
        }
        return null;
    };

    const target = findRoute(menuOptions);
    if (target?.route) router.push(target.route);
};

watch(
    () => (route.meta as RouteMeta).menuKey,
    (newKey) => {
        if (newKey) activeKey.value = newKey;
    },
    { immediate: true }
);
</script>

<style scoped>
.sticky {
    position: sticky;
}
</style>