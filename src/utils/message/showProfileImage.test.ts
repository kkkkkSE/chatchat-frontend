import showProfileImage from './showProfileImage';

const context = describe;

const showDate = {
  result: true,
};

jest.mock('./showDate', () => () => showDate.result);

describe('showProfileImage', () => {
  const params = {
    curSenderId: 1,
    prevSenderId: 2,
    curDate: '2023.07.01 00:00:00',
    prevDate: '2023.07.02 12:00:00',
  };

  context('if two parameters(about sender) is different', () => {
    it('return true', () => {
      expect(showProfileImage(params)).toBe(true);
    });
  });

  describe('if two parameters(about sender) is same', () => {
    beforeEach(() => {
      params.prevSenderId = 1;
    });

    context('if showDate function returns true', () => {
      it('return true', () => {
        expect(showProfileImage(params)).toBe(true);
      });
    });

    context('if showDate function returns false', () => {
      beforeEach(() => {
        showDate.result = false;
      });

      it('return false', () => {
        expect(showProfileImage(params)).toBe(false);
      });
    });
  });
});
