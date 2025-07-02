import { NSelect, NTag, type DataTableColumn } from 'naive-ui'
import type { ActiveFile } from '../utils/Types/ActiveFile'
import { h } from 'vue'

export const activeFileColumns: DataTableColumn<ActiveFile>[] = [
	{ title: 'ID', key: 'id', width: 80 },
	{
		title: `Путь`,
		key: `filePath`,
		resizable: true,
	},
	{ title: 'Inode', key: 'inode', resizable: true },
	{ title: 'Размер', key: `fileSize`, resizable: true },
	{ title: 'Макс. глубина цепочки', key: `maxChainDepth`, width: 100 },
	{ title: 'Мин. глуюина цепочки', key: `minChainDepth`, width: 100 },
	{
		title: 'Статус',
		key: 'status',
		resizable: true,
		render(row) {
			return h(NTag, {
        size: 'tiny',
        
      })
		},
	},
	{
		title: 'Изменить статус',
		key: 'action',
		render(row) {
			return h(NSelect, {
				size: 'tiny',
				value: row.status,
				options: statusOptions,
				onUpdateValue: (newStatus: string) => {
					console.log(newStatus)
					row.status = newStatus
					// Тут можно отправить обновление на сервер, если нужно
					// например: updateStatus(row.id, newStatus)
				},
			})
		},
	},
]

const statusOptions = [
	{ label: 'active', value: 'active' },
	{ label: 'archived', value: 'archived' },
	{ label: 'deleted', value: 'deleted' },
]
