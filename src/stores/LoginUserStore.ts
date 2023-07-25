import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { LOCAL_STORAGE_KEYS } from '../constants/localStorage';

import { apiService } from '../services/ApiService';

import { nullProfile, Profile } from '../types';

@singleton()
@Store()
export default class LoginUserStore {
  userType = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_TYPE) || '';

  profile : Profile = nullProfile;

  loading = false;

  error = false;

  @Action()
  reset() {
    this.userType = '';
    this.profile = nullProfile;

    this.loading = false;
    this.error = false;
  }

  @Action()
  setLoginUser(profile : Profile) {
    this.profile = profile;

    this.loading = false;
    this.error = false;
  }

  @Action()
  setUserType(userType: string) {
    this.userType = userType;
  }

  @Action()
  setLoading() {
    this.loading = true;
    this.error = false;
  }

  @Action()
  setError() {
    this.profile = nullProfile;

    this.loading = false;
    this.error = true;
  }

  async fetchLoginUser(type: string) {
    this.setLoading();

    try {
      const profile = await apiService.fetchLoginUser({ type });

      this.setLoginUser(profile);
    } catch (e) {
      this.setError();
    }
  }
}
