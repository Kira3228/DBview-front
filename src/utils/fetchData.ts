import { couldStartTrivia } from "typescript";

export const fetchData = async (endPoint: string) => {
  const response = await fetch(endPoint);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  console.log("Raw data:", result);
  return result;
};

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

export const fetchActiveFile = async (path: string = "", inode: number = 0) => {
  const params = new URLSearchParams();
  if (path) params.set(`filePath`, path);
  if (inode > 0) params.set(`inode`, inode.toString());

  const url = `http://localhost:3000/active-files/active/?${params.toString()}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
export const fetchArchiveFile = async (
  path: string = "",
  inode: number = 0
) => {
  const params = new URLSearchParams();
  if (path) params.set(`filePath`, path);
  if (inode > 0) params.set(`inode`, inode.toString());

  const url = `http://localhost:3000/active-files/archive/?${params.toString()}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const updateStatus = async (id: number, status: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/active-files/active/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

export const downloadFile = async (url: string, filename: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    const blob = await res.blob();
    console.log(blob);

    const downloadUrl = window.URL.createObjectURL(blob);
    console.log(downloadUrl);
    const a = document.createElement(`a`);
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};
