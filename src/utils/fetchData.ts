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
  path: string = ``,
  carrier: string = ``,
  eventType: string = ``,
  date: Date | string = ``,
  status: string = ``,
  page: 1
) => {
  const response = await fetch(
    `http://localhost:3000/system-log/getFilteredSystemLog/?status=${status}&path=${path}&carrier=${carrier}&eventType=${eventType}&date=${date}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result;
};
