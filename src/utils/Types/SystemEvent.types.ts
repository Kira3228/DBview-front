export type TSystemEvent = {
  id: number;
  eventType: string;
  eventData: string;
  severity: string;
  source: string;
  timestamp: string;
};

export type TSystemEventResponse = {
  data: TSystemEvent[];
  total: number;
  page: number;
  totalPages: number;
};
