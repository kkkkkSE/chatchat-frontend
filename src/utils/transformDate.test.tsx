import transformDate from './transformDate';

const context = describe;

describe('util transform date', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  context('input date today', () => {
    it('return time only', () => {
      const result = transformDate(`${year}.${month}.${day} 00:00:00`);

      expect(result).toBe('오전 12:00');
    });
  });

  context('input date this year except today', () => {
    it('return time only', () => {
      if (month !== '01' && day !== '01') {
        const result = transformDate(`${year}.01.01 00:00:00`);

        expect(result).toBe('1월 1일');
      }
    });
  });

  context('input a date before this year', () => {
    it('return time only', () => {
      const result = transformDate(`${year - 2}.01.01 00:00:00`);

      expect(result).toBe(`${year - 2}년 1월 1일`);
    });
  });
});
