import moment from 'moment-timezone';
import { Moment } from 'moment';

// export const toMomentDate = (date: string, timezone?: string): Moment => {
//   const setTimezone = timezone || 'Europe/Madrid'

//   if (date?.replace) {
//     const fixedDate = date.replace('UTC', '+0000')
//     return moment.tz(fixedDate, 'YYYY-MM-DD hh:mm:ss Z', setTimezone)
//   }

//   return moment.tz(date, 'YYYY-MM-DD hh:mm:ss Z', setTimezone)
// }

export const toMomentDate = (date: Date, timezone?: string): Moment => {
  const setTimezone = timezone || 'Europe/Madrid';
  const formattedDate = date.toISOString(); // Convert Date to ISO String
  return moment.tz(formattedDate, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', setTimezone);
};
