export const fetchData = async (endPoint: string) => {
  const response = await fetch(endPoint);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  console.log("Raw data:", result);
  return result;
};

export const debouncedFetchEventLogData = async (
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
  if (status) params.set("status", status);
  console.log(status);
  if (path) params.set("filePath", path);
  console.log(path);
  if (carrier) params.set("fileSystemId", carrier);
  console.log(carrier);
  if (eventType) params.set("eventType", eventType);
  console.log(eventType);
  if (startDate) params.set("startDate", startDate.toString());
  console.log(startDate);
  if (endDate) params.set("endDate", endDate.toString());
  console.log(endDate);

  const url = `http://localhost:3000/system-log/getFilteredSystemLog/?${params.toString()}`;
  console.log(url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
