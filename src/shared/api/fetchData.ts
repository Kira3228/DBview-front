import { toSearchString } from './../../pages/helpers';
import { endpoints } from "../../features/event-log/api/endpoints";

export const fetchData = async <T>(endPoint: string) => {
  const response = await fetch(endPoint);
  console.log(endPoint);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result: T = await response.json();
  console.log("Raw data:", result);
  return result;
};



export const fetchActiveFile = async (path: string = "", inode: number = 0) => {
  const params = new URLSearchParams();
  if (path) params.set(`filePath`, path);
  if (inode > 0) params.set(`inode`, inode.toString());

  const url = `http://localhost:3000/api/active/get/active/?${params.toString()}`;
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

  const url = `${endpoints.getArchive}/?${params.toString()}`;
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
      `http://localhost:3000/api/active/get/active/update/${id}`,
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

export const fetchDetails = async (filePath?: string, inode?: number, filePathExceptions?: string) => {
  try {
    const params = new URLSearchParams()
    if (filePath) {
      params.set(`filePath`, filePath)
    }
    if (inode) {
      params.set(`inode`, inode.toString())
    }
    if (filePathExceptions) {
      params.set(`filePathExceptions`, filePathExceptions)
    }
    const url = `http://localhost:3000/api/active/get/graph/?${params}`
    const response = await fetch(url)
    if (!response.ok) {
      throw Error
    }

    const data = await response.json()
    console.log(url);

    console.log(data);

    return data
  }
  catch {

  }
}

const downLoadFile = async (endPoint: string) => {
  try {
    const response = await fetch(endPoint)
    if (!response.ok) {
      throw new Error
    }

    const blob = await response.blob();

    const disposition = response.headers.get('Content-Disposition');
    let filename = 'report.docx';
    if (disposition && disposition.includes('attachment')) {
      const filenameMatch = /filename="([^"]+)"/.exec(disposition);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  }
  catch (error) {

  }
}
