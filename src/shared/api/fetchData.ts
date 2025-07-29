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
    return data
  }
  catch (error) {
    console.error("Error updating status:", error);
  }
}


