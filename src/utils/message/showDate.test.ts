import showDate from './showDate';

const context = describe;

describe('showDate', () => {
  context('if the two parameters(date) are different', () => {
    it('return true', () => {
      const curDate = '2023.07.01 00:00:00';
      const prevDate = '2023.07.02 00:00:00';

      expect(showDate({ curDate, prevDate })).toBe(true);
    });
  });

  context('if the two parameters(date) are the same', () => {
    it('return false', () => {
      const curDate = '2023.07.01 00:00:00';
      const prevDate = '2023.07.01 12:00:00';

      expect(showDate({ curDate, prevDate })).toBe(false);
    });
  });

  context('called a function with only 1 parameter(current date),', () => {
    it('return true', () => {
      const curDate = '2023.07.01 00:00:00';

      expect(showDate({ curDate })).toBe(true);
    });
  });
});
