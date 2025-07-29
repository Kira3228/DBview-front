import { h } from "vue";
import type { ActiveFile } from "../lib/types/ActiveFile";
import { NTag, type DataTableColumn } from "naive-ui";

const archiveFileColumns: DataTableColumn<ActiveFile>[] = [
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
];

export default archiveFileColumns
