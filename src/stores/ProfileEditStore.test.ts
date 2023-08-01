import fixtures from '../../fixtures';

import ProfileEditStore from './ProfileEditStore';

const context = describe;

const userType = 'company';

const profile = fixtures.company;

const updateProfile = jest.fn();
const uploadImage = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      updateProfile,
      uploadImage,
    };
  },
}));

describe('ProfileEditStore', () => {
  let store: ProfileEditStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new ProfileEditStore();
  });

  describe('validate and update profile', () => {
    let params : {
      type: string;
      name: string;
      description: string;
      imageUrl: string;
      profileVisibility: boolean;
    };

    beforeEach(() => {
      params = {
        type: userType,
        name: profile.name,
        description: profile.description,
        imageUrl: profile.imageUrl,
        profileVisibility: profile.profileVisibility,
      };
    });

    context('empty name', () => {
      const fieldName = userType === 'company' ? '기업명' : '이름';

      beforeEach(() => {
        params.name = '';
      });

      it('set errorMessage', async () => {
        await store.updateProfile(params);

        expect(store.errorMessage).toBe(`${fieldName}을 입력해주세요`);
      });
    });

    describe('upload image', () => {
      const blob = new Blob([''], { type: 'image/png' });

      const file = new File([blob], 'newImage', { type: 'image/png' });

      context('if there is no new image data', () => {
        it('dose not execute apiService`s uploadImage', async () => {
          await store.updateProfile(params);

          expect(uploadImage).not.toBeCalled();
        });
      });

      context('if there is a new image data', () => {
        it('execute apiService`s uploadImage', async () => {
          store.setNewImage(file);

          await store.updateProfile(params);

          expect(uploadImage).toBeCalled();
        });
      });

      context('when API responds with error', () => {
        const errorMessage = 'error!';

        beforeEach(() => {
          uploadImage.mockRejectedValue(Error(errorMessage));
        });

        it('sets error message', async () => {
          store.setNewImage(file);

          await store.updateProfile(params);

          expect(store.errorMessage).toBe(errorMessage);
        });
      });
    });

    context('when API respond with success', () => {
      beforeEach(() => {
        updateProfile.mockReturnValue(profile);
      });

      it('execute apiService`s updateProfile', async () => {
        await store.updateProfile(params);

        expect(updateProfile).toBeCalledWith(params);

        expect(store.done).toBe(true);
        expect(store.errorMessage).toBe('');
      });
    });

    context('when API responds with error', () => {
      const errorMessage = 'error!';

      beforeEach(() => {
        updateProfile.mockRejectedValue(Error(errorMessage));
      });

      it('sets error message', async () => {
        await store.updateProfile(params);

        expect(store.done).toBe(false);
        expect(store.errorMessage).toBe(errorMessage);
      });
    });
  });
});
