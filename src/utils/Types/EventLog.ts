export type EventLog = {
  events: Event[];
  totalCount: number;
  page: number;
  totalPages: number;
  limit: number;
};

type Event = {
  id: number;
  eventType: string;
  source: string;
  timestamp: Date;
  relatedFileId: relatedFile;
  relatedProcessId: relatedProcess;
};

type relatedFile = {
  id: number;
  filePath: string;
  fileName: string;
  status: string;
};

type relatedProcess = {
  id: number;
  pid: number;
};
