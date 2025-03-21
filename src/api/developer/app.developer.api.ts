import { axiosAuthenticated } from '~/config';
import { SERVER_URL } from '~/config/api.config';
import { CreateAppInterface, UpdateAppInterface } from '../interfaces/app.interface';
import { ResAxiosCustom } from '../interfaces/res-custom.interface';

export async function createApiKey(body: CreateAppInterface) {
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

export async function getAppByAppId(_id: string) {
  try {
    const res = await axiosAuthenticated.get(`${SERVER_URL}/developer/apps/${_id}`);
    if (res.status === 200) return res.data.data;
    else return null;
  } catch {
    throw new Error('errr:::::::: get app failed');
  }
}

export async function deleteAppByAppId(_id: string) {
  const res: ResAxiosCustom = await axiosAuthenticated.delete(`${SERVER_URL}/developer/apps/${_id}`);
  return res;
}
export async function updateAppByAppId(_id: string, _body: UpdateAppInterface) {
  const res: ResAxiosCustom = await axiosAuthenticated.post(`${SERVER_URL}/developer/apps/${_id}`, _body);
  return res;
}

export async function getAppsByDeveloper(page: number, limit: number) {
  const res: ResAxiosCustom = await axiosAuthenticated.get(`${SERVER_URL}/developer/apps`, {
    params: {
      page,
      limit,
    },
  });
  return res;
}
