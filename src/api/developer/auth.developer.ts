import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { axiosAuthenticated } from '~/config';
import { SERVER_URL } from '~/config/api.config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/string';

export async function getNonce(_singer: string) {
  try {
    const res = await axios.get(`${SERVER_URL}/developer/nonce?signer=${_singer}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function web3Sign(_signer: string, _signature: string) {
  try {
    const res = await axios.post(`${SERVER_URL}/developer/auth/web3`, { signer: _signer, signature: _signature });

    if (res.status === 201) {
      const data = res.data.data;
      Cookies.set(ACCESS_TOKEN, data.accessToken, {
        expires: new Date(data.accessTokenExpire),
      });
      Cookies.set(REFRESH_TOKEN, data.refreshToken, {
        expires: new Date(data.refreshTokenExpire),
      });
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`errr:::::::: ${error.message}`);
    } else {
      throw new Error('errr:::::::: An unknown error occurred');
    }
  }
}
export async function getTokenByAccessToken(_refreshToken: string) {
  try {
    const res = await axios.post(`${SERVER_URL}/developer/auth/refresh`, { refreshToken: _refreshToken });

    if (res.status === 201) {
      const data = res.data.data;
      Cookies.set(ACCESS_TOKEN, data.accessToken, {
        expires: new Date(data.accessTokenExpire),
      });
      Cookies.set(REFRESH_TOKEN, data.refreshToken, {
        expires: new Date(data.refreshTokenExpire),
      });
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`errr:::::::: ${error.message}`);
    } else {
      throw new Error('errr:::::::: An unknown error occurred');
    }
  }
}

export async function getDeveloperProfile() {
  try {
    const response = await axiosAuthenticated.get(`${SERVER_URL}/developer`);

    if (response.status === 200) {
      return response.data.data;
    }

    return null;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Your session has expired. Please login again');
      }

      throw new Error(`Failed to fetch developer profile: ${error.response?.data?.message || error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred while fetching developer profile`);
    }
  }
}

export async function updateDeveloperProfile(profileData: { name: string }) {
  try {
    const response = await axiosAuthenticated.post(`${SERVER_URL}/developer`, profileData);

    if (response.status === 200) return response.data.data;

    return null;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Your session has expired. Please login again');
      }

      throw new Error(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating profile');
    }
  }
}
