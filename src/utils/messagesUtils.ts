import formatDate from './formatDate';

export const checkReceiver = (
  senderId: number,
  receiverId: number,
) => senderId === receiverId;

export const checkDifferentSender = (
  curSenderId: number,
  prevSenderId: number,
) => curSenderId !== prevSenderId;

export const checkDifferentDate = (curDate: string, prevDate: string) => {
  const formattedCurDate = formatDate(curDate, { yearMonthDay: true });
  const formattedPrevDate = formatDate(prevDate, { yearMonthDay: true });

  return formattedCurDate !== formattedPrevDate;
};
