import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || '';

const TYPES_PLURAL : Record<string, string> = {
  company: 'companies',
  customer: 'customers',
};

export default class ApiService {
  private instance : AxiosInstance;

  private accessToken = '';

  type : string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });

    this.instance.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const { config, response: { status } } = error;

        if (status !== 401 || config.url === '/token') {
          return Promise.reject(error);
        }

        const newAccessToken = await this.reissueToken();

        if (newAccessToken) {
          this.setAccessToken(newAccessToken);
        }

        return axios(config);
      },
    );
  }

  setAccessToken(accessToken: string) {
    if (accessToken === this.accessToken) {
      return;
    }

    const authorization = accessToken ? `Bearer ${accessToken}` : undefined;

    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: authorization },
    });

    this.accessToken = accessToken;
  }

  setType(type:string) {
    this.type = type;
  }

  async login({ username, password } : {
    username: string;
    password: string;
  }) {
    const { data } = await this.instance.post(
      `/${this.type}/session`,
      { username, password },
      { withCredentials: true },
    );
    const { accessToken } = data;

    return accessToken;
  }

  async reissueToken() {
    try {
      const { data: { accessToken } } = await this.instance.post(
        '/token',
        { withCredentials: true },
      );

      localStorage.setItem('accessToken', `${accessToken}`);

      return accessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');

      window.location.href = '/';

      return '';
    }
  }
}

export const apiService = new ApiService();
