/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';

import { DYNAMIC_API_PATHS, STATIC_API_PATHS } from '../constants/apiPaths';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorage';

import { STATIC_ROUTES } from '../constants/routes';

const API_BASE_URL = process.env.API_BASE_URL || '';

export default class ApiService {
  private instance : AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });

    this.instance.interceptors.request.use((config) => {
      const urlsArrowCookie = [
        STATIC_API_PATHS.REISSUE_TOKEN,
        STATIC_API_PATHS.LOGOUT,
      ];

      if (!config.url || config.url === STATIC_API_PATHS.UPLOAD_PROFILE_IMAGE) {
        return config;
      }

      if (urlsArrowCookie.includes(config.url)) {
        config.withCredentials = true;

        return config;
      }

      const accessToken = localStorage.getItem('accessToken')?.slice(1, -1);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response: { status } } = error;

        if (status !== 401 || config.url === STATIC_API_PATHS.REISSUE_TOKEN) {
          return Promise.reject(error);
        }

        const newToken = await this.reissueToken();

        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }

        return axios(config);
      },
    );
  }

  async login({ type, username, password } : {
    type: string;
    username: string;
    password: string;
  }) {
    const { data } = await this.instance.post(
      DYNAMIC_API_PATHS.LOGIN(type),
      { username, password },
      { withCredentials: true },
    );

    const { accessToken } = data;

    return accessToken;
  }

  async logout() {
    await this.instance.delete(STATIC_API_PATHS.LOGOUT);
  }

  async reissueToken() {
    try {
      const { data } = await this.instance.post(STATIC_API_PATHS.REISSUE_TOKEN);

      const { accessToken } = data;

      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, `"${accessToken}"`);

      return accessToken;
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

      window.location.href = STATIC_ROUTES.HOME;

      return error;
    }
  }

  async fetchChatList({ type, page } : {
    type: string;
    page?: number;
  }) {
    const { data } = await this.instance.get(
      DYNAMIC_API_PATHS.CHATROOMS(type),
      { params: { page } },
    );

    return data;
  }

  async fetchChatRoom({ type, id, page } : {
    type: string;
    id: number;
    page?: number;
  }) {
    const { data } = await this.instance.get(
      DYNAMIC_API_PATHS.CHATROOM(type, id),
      { params: { page } },
    );

    return data;
  }

  async fetchLoginUser({ type } : {
    type: string;
  }) {
    const { data } = await this.instance.get(DYNAMIC_API_PATHS.SELF_ACCOUNT(type));
    return data;
  }

  async updateProfile({
    type, name, description, imageUrl, profileVisibility,
  } : {
    type: string;
    name: string;
    description?: string;
    imageUrl: string;
    profileVisibility?: boolean;
  }) {
    await this.instance.patch(
      DYNAMIC_API_PATHS.SELF_ACCOUNT(type),
      {
        name,
        description,
        imageUrl,
        profileVisibility,
      },
    );
  }

  async fetchAutoReplyByCompany() {
    const { data } = await this.instance.get(STATIC_API_PATHS.AUTO_REPLIES_BY_COMPANY);

    return data;
  }

  async deleteAutoReply({ id } : {id : number}) {
    await this.instance.delete(DYNAMIC_API_PATHS.AUTO_REPLIES_FOR_COMPANY(id));
  }

  async uploadImage({ formData }:{
    formData: FormData;
  }) {
    const { data } = await this.instance.post(
      STATIC_API_PATHS.UPLOAD_PROFILE_IMAGE,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );

    return data;
  }
}

export const apiService = new ApiService();
