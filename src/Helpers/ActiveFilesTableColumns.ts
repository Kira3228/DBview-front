import { NSelect, NTag, type DataTableColumn } from "naive-ui";
import type { ActiveFile } from "../shared/lib/types/ActiveFile";
import { h } from "vue";
import { updateStatus } from "../shared/api/fetchData";

export const activeFileColumns: DataTableColumn<ActiveFile>[] = [
  { title: "ID", key: "id", width: 80 },
  {
    title: `Путь`,
    key: `filePath`,
    resizable: true,
  },
  { title: "Inode", key: "inode", resizable: true },
  { title: "Размер", key: `fileSize`, resizable: true },
  { title: "Макс. глубина цепочки", key: `maxChainDepth`, width: 100 },
  { title: "Мин. глуюина цепочки", key: `minChainDepth`, width: 100 },
  {
    title: "Статус",
    key: "status",
    resizable: true,
    render(row) {
      const colors: Record<string, `success` | `warning` | `error`> = {
        active: `success`,
        archived: `warning`,
        deleted: `error`,
      };
      return h(
        NTag,
        {
          size: "tiny",
          type: colors[row.status],
        },
        {
          default: () => row.status,
        }
      );
    },
  },
  {
    title: "Изменить статус",
    key: "action",
    render(row) {
      return h(NSelect, {
        size: "tiny",
        value: row.status,
        options: statusOptions,
        onUpdateValue: (newStatus: string) => {
          console.log(newStatus);
          row.status = newStatus;
          updateStatus(row.id, row.status);
          // Тут можно отправить обновление на сервер, если нужно
          // например: updateStatus(row.id, newStatus)
        },
      });
    },
  },
];

const statusOptions = [
  { label: "active", value: "active" },
  { label: "archived", value: "archived" },
  { label: "deleted", value: "deleted" },
];
