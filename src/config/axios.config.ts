import axios from 'axios';
import Cookies from 'js-cookie';
import { getTokenByAccessToken } from '~/api/developer/auth.developer';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/string';
import { SERVER_URL } from './api.config';

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.interceptors.request.use(async (config) => {
  // Initialize headers if not already present
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  const accessToken = Cookies.get(ACCESS_TOKEN);
  if (!refreshToken) {
    throw new Error('Not logged in........');
  }

  if (!accessToken) {
    //call lấy token khi accesstoken hết hạn
    try {
      const res = await getTokenByAccessToken(refreshToken);
      if (res.status === 201) {
        console.log('Get access token success');
      } else {
        throw new Error(res.data);
      }
    } catch (error) {
      throw new Error(typeof error === 'string' ? error : 'Error get access token');
    }
  }

  config.headers = config.headers || {};
  let authToken = {};
  if (accessToken) {
    authToken = accessToken.replace(/"/g, '');
  }

  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  } else {
    console.warn('Token is missing. Do something...');
  }

  return config;
});

export default instance;
