import { axiosAuthenticated } from '~/config';
import { SERVER_URL } from '~/config/api.config';
import { CreateAppType } from '../type/app.dto';

export async function createApiKey(body: CreateAppType) {
  try {
    const res = await axiosAuthenticated.post(`${SERVER_URL}/developer/apps`, body);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`errr:::::::: ${error.message}`);
    } else {
      throw new Error('errr:::::::: An unknown error occurred');
    }
  }
}
