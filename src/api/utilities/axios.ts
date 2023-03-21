import axios, { AxiosError, AxiosInstance } from "axios";
import { onRequestError, onRequestSuccess, onResponseError, onResponseSuccess } from "@/api/utilities/interceptors";

const defaultOptions: IDefaultOptions = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const createAxiosInstance = (options: IDefaultOptions = defaultOptions): AxiosInstance => {
  const axiosInstance = axios.create(options);
  axiosInstance.interceptors.request.use(onRequestSuccess, onRequestError);
  axiosInstance.interceptors.response.use(onResponseSuccess, (error: AxiosError) => onResponseError(error));
  return axiosInstance;
};

const axiosBase = createAxiosInstance();

export default axiosBase;
