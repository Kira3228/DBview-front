<template>
    <n-tree block-line :data="data" :default-expanded-keys="defaultExpandedKeys" :render-prefix="renderPrefix"
        :render-label="renderLabel" :render-suffix="renderSuffix" :selectable="false" />
</template>

<script setup lang="ts">
import type { TreeOption } from 'naive-ui'
import { NButton } from 'naive-ui'
import { repeat } from 'seemly'
import { h, ref } from 'vue'

const LABELS: Record<number, string> = {
    4: 'Out of Tao, One is born',
    3: 'Out of One, Two',
    2: 'Out of Two, Three',
    1: 'Out of Three, the created universe'
}

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
    if (!level) return undefined
    return repeat(6 - level, undefined).map((_, index) => {
        const key = `${baseKey}${level}${index}`
        return {
            label: LABELS[level] || '',
            key,
            children: createData(level - 1, key),
            level
        }
    })
}

function renderPrefix({ option }: { option: TreeOption }) {
    return h(
        NButton,
        { text: true, type: 'primary' },
        { default: () => `Prefix-${option.level}` }
    )
}

function renderLabel({ option }: { option: TreeOption }) {
    return `${option.label} :)`
}

function renderSuffix({ option }: { option: TreeOption }) {
    return h(
        NButton,
        { text: true, type: 'primary' },
        { default: () => `Suffix-${option.level}` }
    )
}

const data = createData()
const defaultExpandedKeys = ref(['40', '41'])
</script>