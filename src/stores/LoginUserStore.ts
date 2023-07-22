import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { apiService } from '../services/ApiService';

import { nullProfile, Profile } from '../types';

@singleton()
@Store()
export default class LoginUserStore {
  userType = localStorage.getItem('userType') || '';

  profile : Profile = nullProfile;

  error = false;

  @Action()
  reset() {
    this.userType = '';
    this.profile = nullProfile;
    this.error = false;
  }

  @Action()
  setLoginUser(profile : Profile) {
    this.profile = profile;
    this.error = false;
  }

  @Action()
  setError() {
    this.profile = nullProfile;
    this.error = true;
  }

  async fetchLoginUser(type: string) {
    try {
      const profile = await apiService.fetchLoginUser({ type });

      this.setLoginUser(profile);
    } catch (e) {
      this.setError();
    }
  }
}
