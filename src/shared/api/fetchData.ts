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


