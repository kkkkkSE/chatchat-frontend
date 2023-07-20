import formatDateWithOption from './formatDateWithOption';

const context = describe;

describe('formatDateWithOption', () => {
  const year = new Date().getFullYear();

  context('use "time" option', () => {
    it('return time', () => {
      const result = formatDateWithOption(`${year - 2}.01.01 00:00:00`, 'time');

      expect(result).toBe('오전 12:00');
    });
  });

  context('use "monthDay" option', () => {
    it('return month and day', () => {
      const result = formatDateWithOption(`${year - 2}.01.01 00:00:00`, 'monthDay');

      expect(result).toBe('1월 1일');
    });
  });

  context('use "yearMonthDay" option', () => {
    it('return year and month and day', () => {
      const result = formatDateWithOption('2023.01.01 00:00:00', 'yearMonthDay');

      expect(result).toBe('2023년 1월 1일');
    });
  });
});
