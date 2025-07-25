export const downloadReport = async (
    format: string,
    params: string,
    baseUrl: string,
    startDate?: number,
    endDate?: number,
    fileExceptions?: string,
    processExceptions?: string
) => {
    try {
        const queryParams = new URLSearchParams()
        queryParams.set(`startDate`, String(startDate))
        queryParams.set(`endDate`, String(endDate))
        if (fileExceptions) {
            queryParams.set(`fileExceptions`, String(fileExceptions))
        }
        if (processExceptions) {
            queryParams.set(`processExceptions`, String(processExceptions))
        }

        const response = await fetch(`${baseUrl}${format}/?${params}&${queryParams}`)
        console.log(`${baseUrl}${format}/?${params}&${queryParams}`)
        console.log(response);
        if (!response.ok) {
            throw new Error();
        }

        const blob = await response.blob();
        console.log(blob);
        const downloadUrl = window.URL.createObjectURL(blob);

        console.log(downloadUrl);

        const a = document.createElement(`a`);
        a.href = downloadUrl;
        a.download = `report.${format}`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        }, 100);
    }
    catch (error) {
        console.error("Download failed:", error);
        throw error;
    }
}

export const downloadChainsReport = async (
    format: string,
    baseUrl: string,
    startDate?: number,
    endDate?: number,
    range?: number[]
) => {
    try {
        const queryParams = new URLSearchParams()
        if (range) {
            queryParams.set(`minDepth`, String(range[0]))
            queryParams.set(`maxDepth`, String(range[1]))
        }
        queryParams.set(`startDate`, String(startDate))
        queryParams.set(`endDate`, String(endDate))

        const response = await fetch(`${baseUrl}${format}/?${queryParams}`)
        console.log(`${baseUrl}${format}/?${queryParams}`)
        console.log(response);
        if (!response.ok) {
            throw new Error();
        }

        const blob = await response.blob();
        console.log(blob);
        const downloadUrl = window.URL.createObjectURL(blob);

        console.log(downloadUrl);

        const a = document.createElement(`a`);
        a.href = downloadUrl;
        a.download = `report.${format}`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        }, 100);
    }
    catch (error) {
        console.error("Download failed:", error);
        throw error;
    }
}