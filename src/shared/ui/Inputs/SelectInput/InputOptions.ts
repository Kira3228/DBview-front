import type { TSelectOption } from "./SelectInput.type";

const eventTypeOptions: TSelectOption[] = [
  { label: "Все", value: "" },
  { label: "Создание", value: "create" },
  { label: "Изменение", value: "modify" },
  { label: "Удаление", value: "delete" },
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
