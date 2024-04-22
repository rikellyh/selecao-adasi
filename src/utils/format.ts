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
