import formatDate from './formatDate';

const context = describe;

describe('util transform date', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  describe('without option', () => {
    context('input date today', () => {
      it('return time only', () => {
        const result = formatDate(`${year}.${month}.${day} 00:00:00`);

        expect(result).toBe('오전 12:00');
      });
    });

    context('input date this year except today', () => {
      it('return time only', () => {
        if (month !== '01' && day !== '01') {
          const result = formatDate(`${year}.01.01 00:00:00`);

          expect(result).toBe('1월 1일');
        }
      });
    });

    context('input a date before this year', () => {
      it('return time only', () => {
        const result = formatDate(`${year - 2}.01.01 00:00:00`);

        expect(result).toBe(`${year - 2}년 1월 1일`);
      });
    });
  });

  describe('with option', () => {
    context('set "time" option', () => {
      it('return time', () => {
        const result = formatDate(`${year - 2}.01.01 00:00:00`, { time: true });

        expect(result).toBe('오전 12:00');
      });
    });

    context('set "monthDay" option', () => {
      it('return month and day', () => {
        const result = formatDate(`${year - 2}.01.01 00:00:00`, { monthDay: true });

        expect(result).toBe('1월 1일');
      });
    });

    context('set "yearMonthDay" option', () => {
      it('return year and month and day', () => {
        const result = formatDate('2023.01.01 00:00:00', { yearMonthDay: true });

        expect(result).toBe('2023년 1월 1일');
      });
    });
  });
});
