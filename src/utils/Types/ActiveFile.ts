export type ActiveFile = {
  id: number;
  inode: number;
  filePath: string;
  fileSize: number;
  maxChainDepth: number;
  minChainDepth: number;
  status: string;
};

export type ActiveFileRes = {
  files: ActiveFile[];
  totalCount: number;
  page: number;
  totalPage: number;
  limit: number;
};
