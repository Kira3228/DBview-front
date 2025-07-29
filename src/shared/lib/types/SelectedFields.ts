export type TSelectedFields = {
    id: boolean;
    eventType: boolean;
    eventData: boolean;
    severity: boolean;
    source: boolean;
    timestamp: boolean;
    relatedFileId: MonitoredFile;
    relatedProcessId: Process;
};

type Process = {
    id: boolean; pid: boolean; executablePath: boolean; commandLine: boolean;
    parentPid: boolean; groupId: boolean; createdAt: boolean; processStartTime: boolean;
};

type MonitoredFile = {
    id: boolean; fileSystemId: boolean; inode: boolean; filePath: boolean;
    fileName: boolean; fileSize: boolean; createdAt: boolean; modifiedAt: boolean;
    isOriginalMarked: boolean; maxChainDepth: boolean; minChainDepth: boolean;
    status: boolean; extendedAttributes: boolean;
};