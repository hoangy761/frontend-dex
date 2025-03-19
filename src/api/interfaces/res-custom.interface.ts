// eslint-disable-next-line import/named
import { AxiosResponse } from 'axios';

interface ResData {
  success: boolean;
  data?: unknown;
  message?: string;
  error?: string;
  statusCode?: string;
}

// Mở rộng AxiosResponse với cấu trúc mới
export type ResAxiosCustom = AxiosResponse<ResData> & {
  data: ResData; // Ghi đè data để sử dụng cấu trúc mới
};
