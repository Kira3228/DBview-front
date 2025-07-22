export const downloadReport = async (type: string, params: string, baseUrl: string) => {
    console.log(type);

    const response = await fetch(baseUrl + type + params)
    console.log(response);


}