export const downloadFile = async (url: string) => {
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
    a.download = `system-logs.csv`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }, 100);
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};
