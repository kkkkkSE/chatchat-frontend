import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || '';

export default class ApiService {
  private instance = axios.create({
    baseURL: API_BASE_URL,
  });

  private accessToken = '';

  setAccessToken(accessToken: string) {
    if (accessToken === this.accessToken) {
      return;
    }

    const authorization = accessToken ? `Bearer ${accessToken}` : undefined;

    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: authorization },
    });
  }

  async login({ type, username, password } : {
    type: string;
    username: string;
    password: string;
  }) {
    const { data } = await this.instance.post(
      `/${type}/session`,
      { username, password },
      { withCredentials: true },
    );
    const { accessToken } = data;

    return accessToken;
  }
}

export const apiService = new ApiService();
