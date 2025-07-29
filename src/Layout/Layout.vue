<template>
    <NLayout>
        <div class="flex min-h-screen">
            <div class="flex flex-col h-screen sticky top-0 justify-between">
                <NMenu class="w-56  sticky top-0" :options="menuOptions" v-model:value="activeKey"
                    @update:value="handleMenuSelect">
                </NMenu>
                <div class="fixed top-[95%]">
                    <ThemeSwitch class="" />
                </div>
            </div>
            <main class="flex-1 overflow-auto p-4">
                <router-view />
            </main>
        </div>
    </NLayout>
</template>

<script setup lang="ts">
import { NLayout, NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ThemeSwitch from '../shared/ui/Inputs/ThemeSwitch/ThemeSwitch.vue';

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
            },
            {
                label: 'Детали файла',
                key: 'details',
                route: { name: 'details' }
            }
        ]
    },
    {
        label: 'Настройки',
        key: 'settings',
        route: { name: 'settings' }
    },
    {
        label: 'Отчёты',
        key: 'reports',
        children: [
            {
                label: 'Список событий',
                key: 'report-list',
                route: { name: 'report-list' }
            },
        ]
    },

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