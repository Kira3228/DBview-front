import { endpoints } from "./endpoints";

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