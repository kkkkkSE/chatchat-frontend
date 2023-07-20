import formatDateWithOption from '../date/formatDateWithOption';

const showDate = ({
  curDate, prevDate,
} : {
  curDate: string,
  prevDate?: string
}) => {
  if (!prevDate) return true;

  const formattedCurDate = formatDateWithOption(curDate, 'yearMonthDay');
  const formattedPrevDate = formatDateWithOption(prevDate, 'yearMonthDay');

  return formattedCurDate !== formattedPrevDate;
};

export default showDate;
