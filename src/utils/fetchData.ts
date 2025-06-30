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
  const params = new URLSearchParams({
    page: page.toString(),
    status: encodeURIComponent(status),
    path: encodeURIComponent(path),
    carrier: encodeURIComponent(carrier),
    eventType: encodeURIComponent(eventType),
    startDate: startDate ? startDate.toISOString() : "",
    endDate: endDate ? endDate.toISOString() : "",
  });

  const url = `http://localhost:3000/system-log/getFilteredSystemLog/?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
