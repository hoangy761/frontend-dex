import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/string';

export function removeAccessTokenAndRefreshToken() {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
}
