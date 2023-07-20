import {
  format, parse, isThisYear, isToday,
} from 'date-fns';

const formatDateAuto = (
  dateString : string,
) => {
  const date = parse(dateString, 'yyyy.MM.dd HH:mm:ss', new Date());

  if (isToday(date)) {
    return format(date, 'a') === 'PM'
      ? `오후 ${format(date, 'h:mm')}`
      : `오전 ${format(date, 'h:mm')}`;
  }

  if (isThisYear(date)) {
    return format(date, 'M월 d일');
  }

  return format(date, 'yyyy년 M월 d일');
};

export default formatDateAuto;
