import type { DataTableRowKey } from "naive-ui";
import { downloadFile } from "../../../shared/lib/downloadFile";

export const downloadCSV = async () => {
  console.log(`качаю всё`);
  await downloadFile(`http://localhost:3000/system-log/exportCsv`);
};
export const downloadSelectedCSV = async (ids: DataTableRowKey[]) => {
  await downloadFile(
    `http://localhost:3000/system-log/exportSelectedCsv/?ids=${ids}`
  );
};
