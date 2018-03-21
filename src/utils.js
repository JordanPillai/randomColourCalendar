import subMinutes from 'date-fns/sub_minutes';
import eachDay from 'date-fns/each_day';
import isFirstDayOfMonth from 'date-fns/is_first_day_of_month';

export const adjustToUtc = date => {
  const offset = date.getTimezoneOffset();
  const adjustedDate = subMinutes(date, offset);
  return adjustedDate;
};

export const eachMonth = (startDate, endDate) => {
  return eachDay(startDate, endDate).filter(isFirstDayOfMonth);
};
