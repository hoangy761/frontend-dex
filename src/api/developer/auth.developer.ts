import axios from 'axios';
import Cookies from 'js-cookie';
import { SERVER_URL } from '~/config/api.config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/string';

export async function web3Sign(signer: string, signature: string) {
  try {
    const res = await axios.post(`${SERVER_URL}/developer/auth/web3`, { signer, signature });

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
