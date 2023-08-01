/* eslint-disable class-methods-use-this */
import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class ProfileEditStore {
  newImageFormData : FormData | null = null;

  newImageUrl : string | null = null;

  errorMessage = '';

  done = false;

  @Action()
  setImageUrl(url: string) {
    this.newImageUrl = url;
  }

  @Action()
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  @Action()
  setDone() {
    this.done = true;
  }

  @Action()
  reset() {
    this.newImageFormData = null;
    this.newImageUrl = null;
    this.errorMessage = '';
    this.done = false;
  }

  @Action()
  setNewImage(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    this.newImageFormData = formData;
  }

  @Action()
  validate(userType: string, name: string) {
    if (name === '') {
      const fieldName = userType === 'company' ? '기업명' : '이름';

      throw new Error(`${fieldName}을 입력해주세요`);
    }
  }

  async uploadImage(formData: FormData) {
    const { url } = await apiService.uploadImage({ formData });

    this.setImageUrl(url);
  }

  async updateProfile({
    type,
    name,
    description,
    imageUrl,
    profileVisibility,
  }:{
      type: string,
      name: string,
      description?: string,
      imageUrl: string,
      profileVisibility?: boolean
    }) {
    try {
      this.validate(type, name);

      if (this.newImageFormData) {
        await this.uploadImage(this.newImageFormData);
      }

      await apiService.updateProfile({
        type,
        name,
        description,
        imageUrl: this.newImageUrl ?? imageUrl,
        profileVisibility,
      });

      this.setDone();
    } catch (e) {
      if (e instanceof Error) {
        this.setErrorMessage(e.message);
      }
    }
  }
}

export default ProfileEditStore;
