import { format, parse } from 'date-fns';

const formatDateWithOption = (
  dateString : string,
  option : 'time' | 'monthDay' | 'yearMonthDay',
) => {
  const date = parse(dateString, 'yyyy.MM.dd HH:mm:ss', new Date());

  switch (option) {
  case 'time':
    return format(date, 'a') === 'PM'
      ? `오후 ${format(date, 'h:mm')}`
      : `오전 ${format(date, 'h:mm')}`;

  case 'monthDay':
    return format(date, 'M월 d일');

  case 'yearMonthDay':
    return format(date, 'yyyy년 M월 d일');

  default:
    return '';
  }
};

export default formatDateWithOption;
