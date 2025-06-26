<template>
	<div class="w-full">
		<NButtonGroup class="">
			<NButton size="small"> Детали </NButton>
			<NButton size="small"> Экспортировать </NButton>
			<NButton size="small"> Архивировать </NButton>
		</NButtonGroup>
		<div class="flex gap-8">
			<div class="flex gap-3.5 items-center">
				<div>
					<label class="text-xs text-gray-400" for="file-name">Путь</label>
					<SearchInput
						:model-value="searchStore.state.filePath"
						placeholder="Путь"
						@update:modelValue="val => searchStore.updateField('filePath', val)"
						id="filePath"
					/>
				</div>
				<div>
					<label class="text-xs text-gray-400" for="user">Пользователь</label>
					<SearchInput
						placeholder="Пользователь"
						:model-value="searchStore.state.user"
						@update:modelValue="val => searchStore.updateField('user', val)"
						id="user"
					/>
				</div>

				<div>
					<label class="text-xs text-gray-400" for="event-type"
						>Тип события</label
					>
					<NSelect
						id="event-type"
						size="tiny"
						style="max-width: 160px; min-width: 160px"
						:value="searchStore.state.eventType"
						@update:value="val => searchStore.updateField('eventType', val)"
						:options="eventTypeOptions"
					/>
				</div>
				<div>
					<label class="text-xs text-gray-400" for="status">Статус</label>
					<NSelect
						id="status"
						placeholder="Статус"
						size="tiny"
						style="max-width: 160px; min-width: 160px"
						:value="searchStore.state.status"
						@update:value="val => searchStore.updateField('status', val)"
						:options="statusOptions"
					/>
				</div>
			</div>
			<div class="flex">
				<div class="p-1.5 border-2">
					<div class="flex gap-2.5">
						<div>
							<label class="text-xs text-gray-400" for="start-date"
								>Начальная дата</label
							>
							<NDatePicker
								id="start-date"
								:value="searchStore.state.startDate"
								@update:value="val => searchStore.updateField('startDate', val)"
							/>
						</div>
						<div>
							<label class="text-xs text-gray-400" for="end-date"
								>Конечная дата</label
							>
							<NDatePicker
								id="end-date"
								:value="searchStore.state.endDate"
								@update:value="val => searchStore.updateField('endDate', val)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { NButton, NButtonGroup, NDatePicker, NSelect } from 'naive-ui'
import SearchInput from './UI/SearchInput.vue'
import { useSearchStore } from '../store/searchStore'

const searchStore = useSearchStore()

// Опции для селектов
const eventTypeOptions = [
	{ label: 'Все', value: '' },
	{ label: 'Создание', value: 'create' },
	{ label: 'Изменение', value: 'modify' },
	{ label: 'Удаление', value: 'delete' },
]

const statusOptions = [
	{ label: 'Все', value: '' },
	{ label: 'Успех', value: 'success' },
	{ label: 'Ошибка', value: 'error' },
	{ label: 'Предупреждение', value: 'warning' },
]
</script>
