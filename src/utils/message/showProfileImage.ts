import showDate from './showDate';

const showProfileImage = ({
  curSenderId, prevSenderId, curDate, prevDate,
} : {
  curSenderId: number,
  prevSenderId: number,
  curDate: string,
  prevDate: string,
}) => {
  const isSameSender = curSenderId === prevSenderId;

  return !isSameSender || showDate({ curDate, prevDate });
};

export default showProfileImage;
