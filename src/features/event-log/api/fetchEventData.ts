import { endpoints } from "./endpoints";
export const fetchEventLogData = async (
  path: string = "",
  carrier: string = "",
  eventType: string = "",
  startDate: Date | null = null,
  endDate: Date | null = null,
  status: string = "",
  page: number = 1
) => {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  if (status) {
    params.set("status", status);
  }
  console.log(status);
  if (path) {
    params.set("filePath", path);
  }
  console.log(path);
  if (carrier) {
    params.set("fileSystemId", carrier);
  }
  console.log(carrier);
  if (eventType) {
    params.set("eventType", eventType);

  }
  console.log(eventType);
  if (startDate) {
    params.set("startDate", startDate.toISOString());
    console.log("startDate", startDate.toISOString());
  }

  if (endDate) {
    params.set("endDate", endDate.toISOString());
    console.log(`endDate`, endDate.toISOString());
  }

  const url = `${endpoints.getFiltered}${params.toString()}`;
  console.log(url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

