// mock.ts
import type { TreeOption } from 'naive-ui';

export const data: TreeOption[] = [
    { label: 'ID', key: 'id' },
    { label: 'Event Type', key: 'eventType' },
    { label: 'Event Data', key: 'eventData' },
    { label: 'Severity', key: 'severity' },
    { label: 'Source', key: 'source' },
    { label: 'Timestamp', key: 'timestamp' },
    {
        label: 'Related Process',
        key: 'relatedProcessId',
        children: [
            { label: 'ID', key: 'relatedProcessId.id' },
            { label: 'PID', key: 'relatedProcessId.pid' },
            { label: 'Executable Path', key: 'relatedProcessId.executablePath' },
            { label: 'Command Line', key: 'relatedProcessId.commandLine' },
            { label: 'Parent PID', key: 'relatedProcessId.parentPid' },
            { label: 'Group ID', key: 'relatedProcessId.groupId' },
            { label: 'Created At', key: 'relatedProcessId.createdAt' },
            { label: 'Process Start Time', key: 'relatedProcessId.processStartTime' },
        ]
    },
    {
        label: 'Related File',
        key: 'relatedFileId',
        children: [
            { label: 'ID', key: 'relatedFileId.id' },
            { label: 'File System ID', key: 'relatedFileId.fileSystemId' },
            { label: 'Inode', key: 'relatedFileId.inode' },
            { label: 'File Path', key: 'relatedFileId.filePath' },
            { label: 'File Name', key: 'relatedFileId.fileName' },
            { label: 'File Size', key: 'relatedFileId.fileSize' },
            { label: 'Created At', key: 'relatedFileId.createdAt' },
            { label: 'Modified At', key: 'relatedFileId.modifiedAt' },
            { label: 'Is Original Marked', key: 'relatedFileId.isOriginalMarked' },
            { label: 'Max Chain Depth', key: 'relatedFileId.maxChainDepth' },
            { label: 'Min Chain Depth', key: 'relatedFileId.minChainDepth' },
            { label: 'Status', key: 'relatedFileId.status' },
            { label: 'Extended Attributes', key: 'relatedFileId.extendedAttributes' },
        ]
    }
];
