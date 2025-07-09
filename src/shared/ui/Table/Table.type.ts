import type { DataTableColumn } from "naive-ui";
import type { ActiveFile } from "../../lib/types/ActiveFile";
import type { Event } from "../../lib/types/EventLog";

export type TableItem = Event | ActiveFile;

export type TableProps = {
  data?: Event[] | ActiveFile[];
  columns?: DataTableColumn<Event | ActiveFile>[];
  currentPage: number;
  total?: number;
  pageSize?: number;
  totalPages?: number;
  onRowClick?: (row: TableItem) => void;
};
