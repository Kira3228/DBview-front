export const endpoints = {
    exportAllCsv: `http://localhost:3000/api/logs/export/all`,
    exportSelectedCsv: `http://localhost:3000/api/logs/export/selected/?ids=`,
    getFiltered: `http://localhost:3000/api/logs/filtered/?`,
    // getFiltered: `http://localhost:3001/system-log/getFilteredSystemLog/?`,
    getActive: `http://localhost:3000/api/active/get/active/?`,
    getArchive: `http://localhost:3000/api/active/get/archive`,
    update: ``,
    
}