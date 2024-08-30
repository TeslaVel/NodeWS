import moment from 'moment-timezone';
import { Moment } from 'moment';

export const toMomentDate = (date: Date, timezone?: string): Moment => {
  const setTimezone = timezone || 'Europe/Madrid';
  const formattedDate = date.toISOString(); // Convert Date to ISO String
  return moment.tz(formattedDate, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', setTimezone);
};
