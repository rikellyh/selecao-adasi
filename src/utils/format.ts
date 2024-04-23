import { parseISO } from "date-fns";
import { format as formatTz, toZonedTime } from "date-fns-tz";

export function formatDate(dateString: string, timezone: string = "UTC") {
  const parsedDate = parseISO(dateString);
  const zonedDate = toZonedTime(parsedDate, timezone);

  return formatTz(zonedDate, "dd/MM/yyyy");
}

export function formatDateStartAndEnd(
  dateString: string,
  timezone: string = "UTC"
) {
  const parsedDate = parseISO(dateString);
  const zonedDate = toZonedTime(parsedDate, timezone);

  return formatTz(zonedDate, "dd/MM/yyyy HH:mm:ss");
}

export function formatDateStartAndEndEdit(
  dateString: string,
  timezone: string = "UTC"
) {
  const parsedDate = parseISO(dateString);
  const zonedDate = toZonedTime(parsedDate, timezone);

  return formatTz(zonedDate, "yyyy-MM-dd'T'HH:mm");
}

export function getCurrentDateInISOFormat(date: Date) {
  const localDate = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
  const formattedDate = localDate.toISOString();

  return formattedDate;
}
