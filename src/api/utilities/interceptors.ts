import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import AuthApi from "@/api/auth";
import { useAuthStore } from "@/stores/auth";

export const onRequestSuccess = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessKey = localStorage.getItem("access") || window.sessionStorage.getItem("access") || null;
  if (accessKey !== null) {
    config.headers!.Authorization = `Bearer ${accessKey}`;
  }
  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

export const onResponseError = (error: AxiosError): Promise<AxiosError> | undefined => {
  const authStore = useAuthStore();
  const refreshKey = localStorage.getItem("refresh") || window.sessionStorage.getItem("refresh") || null;

  if (error.response?.status === 401) {
    if (refreshKey) {
      AuthApi.refresh(refreshKey).then((response) => {
        authStore.isAuth = true;
        if (authStore.isKeep) {
          localStorage.setItem("access", response.data.access);
        } else {
          window.sessionStorage.setItem("access", response.data.access);
        }
      });
    }
  }
  return Promise.reject(error);
};
