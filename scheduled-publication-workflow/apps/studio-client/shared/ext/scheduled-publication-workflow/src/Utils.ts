import { is, joo } from "@jangaroo/runtime";
import { Calendar } from "@coremedia/studio-client.client-core";
import { session } from "@coremedia/studio-client.cap-rest-client";
import ContentRepositoryImpl from "@coremedia/studio-client.cap-rest-client-impl/content/impl/ContentRepositoryImpl";

/**
 * Format options to display the due date in the workflow UI.
 *
 * **Example:**
 *
 * * `en-US`: 09/25/2025, 6:05 PM
 * * `de-DE`: 25.09.2025, 18:05
 */
const dateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
};

export function dateToString(value: Date | Calendar): string {
  let date: Date;
  if (is(value, Date)) {
    date = value;
  } else if (is(value, Calendar)) {
    date = value.getDate();
  } else {
    return null;
  }

  if (date) {
    const locale = joo.localeSupport.getLocale();
    return new Intl.DateTimeFormat(locale, dateTimeFormat).format(date);
  }
}

export function getCalendarOfTomorrow(): Calendar {
  const dayDate: Date = new Date();
  const dayDateInMilliseconds = dayDate.getTime();
  const tomorrowInMillieSeconds = dayDateInMilliseconds + 86400000;
  const tomorrowDate: Date = new Date(tomorrowInMillieSeconds);
  return new Calendar({
    year: tomorrowDate.getFullYear(),
    month: tomorrowDate.getMonth(),
    day: tomorrowDate.getDate(),
    hour: tomorrowDate.getHours(),
    minute: tomorrowDate.getMinutes(),
    second: tomorrowDate.getSeconds(),
    offset: 0,
    timeZone: (session._.getConnection().getContentRepository() as ContentRepositoryImpl).getDefaultTimeZone(),
    normalized: true,
  });
}
