<script setup lang="ts">
import { NButton, NInput, NInputGroup } from 'naive-ui'
import SearchIcon from '../Icons/SearchIcon.vue'
import { useDebounce } from '../../Hooks/useDebounce'
import { watch } from 'vue'

const { debouncedValue, setDebouncedValue } = useDebounce('', 1000)

const props = defineProps<{
	modelValue: string
	placeholder?: string
}>()

const emits = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

watch(debouncedValue, newValue => {
	
})
</script>

<template>
	<NInputGroup>
		<NInput
			:value="modelValue"
			@update:value="
				value => {
					setDebouncedValue(value)
					emits('update:modelValue', value)
				}
			"
			:placeholder="props.placeholder"
			size="tiny"
			autosize
			class="w-36"
		/>
		<NButton size="tiny">
			<template #icon>
				<SearchIcon />
			</template>
		</NButton>
	</NInputGroup>
</template>
