export const downloadReport = async (
    format: string,
    params: string,
    baseUrl: string,
    startDate?: number,
    endDate?: number,
    exceptions?: string) => {
    try {
        const queryParams = new URLSearchParams()
        queryParams.set(`startDate`, String(startDate))
        queryParams.set(`endDate`, String(endDate))
        if (exceptions) {
            queryParams.set(`exceptions`, String(exceptions))
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