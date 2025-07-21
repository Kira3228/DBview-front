import type { TSelectOption } from "./SelectInput.type";

const eventTypeOptions: TSelectOption[] = [
  { label: "Все", value: "" },
  { label: "Создание файла", value: "file_added" },
  { label: "Создание процесса", value: "process_created" },
  { label: "Отказано в доступе", value: "access_denied" },
];

const statusOptions: TSelectOption[] = [
  { label: "Все", value: "" },
  { label: "Активные", value: "active" },
  { label: "Архивированные", value: "archived" },
  { label: "Удалённые", value: "deleted" },
];

export const options = {
  statusOptions,
  eventTypeOptions,
};
