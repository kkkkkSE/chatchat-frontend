import {
  format, isToday, isThisYear, parse,
} from 'date-fns';

const formatDate = (
  dateString : string,
  option? : {
    time?: boolean
    monthDay?: boolean
    yearMonthDay?: boolean
  },
) => {
  const date = parse(dateString, 'yyyy.MM.dd HH:mm:ss', new Date());

  const formatting = {
    time: format(date, 'a') === 'PM'
      ? `오후 ${format(date, 'h:mm')}` : `오전 ${format(date, 'h:mm')}`,
    monthDay: format(date, 'M월 d일'),
    yearMonthDay: format(date, 'yyyy년 M월 d일'),
  };

  if (option) {
    if (option?.time) return formatting.time;
    if (option?.monthDay) return formatting.monthDay;

    return formatting.yearMonthDay;
  }

  if (isToday(date)) return formatting.time;
  if (isThisYear(date)) return formatting.monthDay;

  return formatting.yearMonthDay;
};

export default formatDate;
