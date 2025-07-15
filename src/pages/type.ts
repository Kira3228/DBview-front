import type { TreeOption } from 'naive-ui';

export type FileStatus = "active" | "archived" | "deleted";

export interface File {
    id: number;
    fileSystemId: string;
    inode: number;
    filePath: string;
    fileName: string;
    fileSize: number;
    createdAt: string;
    modifiedAt: string;
    isOriginalMarked: boolean;
    maxChainDepth: number;
    minChainDepth: number;
    status: FileStatus;
    extendedAttributes: string;
}

export interface FileRelationship {
    relationshipType: string;
    childFile: File;
    createdAt: string;
}

export interface FileHierarchy {
    parentFile: File;
    children: FileRelationship[];
}

export interface FileHierarchyMap {
    [key: string]: FileHierarchy;
}

export interface TreeNode extends TreeOption {
    key: string;
    label: string;
    fileData?: File;
    relationshipType?: string;
    children?: TreeNode[];
    isLeaf?: boolean;
}