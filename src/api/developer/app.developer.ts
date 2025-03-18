import { axiosAuthenticated } from '~/config';
import { SERVER_URL } from '~/config/api.config';

export async function createApiKey(_name: string) {
  try {
    const res = await axiosAuthenticated.post(`${SERVER_URL}/developer/apps`, { name: _name });

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`errr:::::::: ${error.message}`);
    } else {
      throw new Error('errr:::::::: An unknown error occurred');
    }
  }
}
