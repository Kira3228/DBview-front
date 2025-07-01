import type { DataTableColumn } from "naive-ui";
import type { EventLog } from "../utils/Types/EventLog";

export const columns: DataTableColumn<EventLog>[] = [
  { title: "ID", key: "id", width: 80 },
  {
    title: `relatedFileId`,
    key: `relatedFileId[fileSystemId]`,
    resizable: true,
  },
  { title: "Type", key: "eventType", resizable: true },
  { title: "Name", key: `relatedFileId[fileName]`, resizable: true },
  { title: "Path", key: `relatedFileId[filePath]`, resizable: true },
  { title: "Status", key: `relatedFileId[status]`, resizable: true },
  { title: "Timestamp", key: "timestamp", resizable: true },
  { title: "Source", key: "source", resizable: true },
];
