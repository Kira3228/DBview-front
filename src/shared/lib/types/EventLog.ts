export type EventLog = {
  events: Event[];
  totalCount: number;
  page: number;
  totalPages: number;
  limit: number;
};

export type Event = {
  id: number;
  eventType: string;
  source: string;
  timestamp: Date;
  eventData: string;
  relatedFileId: relatedFile;
  relatedProcessId: relatedProcess;
};

type relatedFile = {
  id: number;
  filePath: string;
  fileName: string;
  status: string;
  fileSystemId: string;
};

type relatedProcess = {
  id: number;
  pid: number;
};
