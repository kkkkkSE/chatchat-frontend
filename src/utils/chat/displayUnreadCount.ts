const displayUnreadCount = (count: number) => {
  if (count > 999) return '+999';

  if (count > 0) return `${count}`;

  return null;
};

export default displayUnreadCount;
