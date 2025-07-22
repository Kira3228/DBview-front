import type { DataTableRowKey } from "naive-ui";
import { downloadFile } from "../../../shared/lib/downloadFile";
import { endpoints } from "./endpoints";

export const downloadCSV = async () => {
  await downloadFile(`${endpoints.exportAllCsv}`);
};
export const downloadSelectedCSV = async (ids: DataTableRowKey[]) => {
  await downloadFile(
    `${endpoints.exportSelectedCsv}${ids}`
  );
};
