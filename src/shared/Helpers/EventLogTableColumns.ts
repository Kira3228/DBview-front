import type { DataTableColumn } from "naive-ui";
import { h } from "vue";
import { NCode } from "naive-ui";
import type { Event } from "../lib/types/EventLog";

const columns: DataTableColumn<Event>[] = [
  {
    type: "selection",
    options: ["all", "none"],
  },
  {
    type: "expand",
    renderExpand: (rowData) => {
      try {
        const jsonData =
          typeof rowData.eventData === "string"
            ? JSON.parse(rowData.eventData)
            : rowData.eventData;

        return h(NCode, {
          language: "json",
          code: JSON.stringify(jsonData, null, 2),
          wordWrap: true,
          showLineNumbers: true,
          style: {
            maxHeight: "300px",
            overflow: "auto",
            whiteSpace: "pre-wrap",
          },
        });
      } catch (e) {
        return h("div", { style: { color: "red" } }, "Invalid JSON data");
      }
    },
  },
  {
    title: "ID",
    key: "id",
    width: 80,
  },
  {
    title: "Related File ID",
    key: "relatedFileId[fileSystemId]",
    resizable: true,
  },
  {
    title: "Type",
    key: "eventType",
    resizable: true,
  },
  {
    title: "Name",
    key: "relatedFileId[fileName]",
    resizable: true,
  },
  {
    title: "Path",
    key: "relatedFileId[filePath]",
    resizable: true,
  },
  {
    title: "Status",
    key: "relatedFileId[status]",
    resizable: true,
  },
  {
    title: "Timestamp",
    key: "timestamp",
    resizable: true,
  },
  {
    title: "Source",
    key: "source",
    resizable: true,
  },
];

export default columns
