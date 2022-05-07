import { DateTime } from 'luxon';
import cronParser from 'cron-parser';

export const cronTimes = {
  everyHour: '0 * * * *',
  everyHourExcludingWeekends: '0 * * * 1-5',
};

export function getNextCronDateTime(cronString: string) {
  const cronDate = cronParser.parseExpression(cronString);
  const matchingNextCronDateTime = cronDate.next();
  const matchingNextDateTime = DateTime.fromJSDate(matchingNextCronDateTime.toDate());

  return matchingNextDateTime;
};

export function getDateTimeObjectRepresentation(dateTime: DateTime) {
  const defaults = dateTime.toObject();

  return {
    ...defaults,
    ISO_date_time: dateTime.toISO(),
    pretty_date: dateTime.toLocaleString(DateTime.DATE_MED),
    pretty_time: dateTime.toLocaleString(DateTime.TIME_WITH_SECONDS),
    pretty_day_of_week: dateTime.toFormat('cccc'),
    day_of_week: dateTime.weekday,
  };
}