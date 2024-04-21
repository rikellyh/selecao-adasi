import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  const parsedDate = new Date(dateString);
  return format(parsedDate, "dd/MM/yyyy");
};

export const formatDateStartAndEnd = (dateString: string) => {
  const parsedDate = new Date(dateString);
  return format(parsedDate, "dd/MM/yyyy HH:mm:ss");
};
