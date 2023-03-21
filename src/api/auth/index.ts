import axios from "@/api/utilities/axios";
import { AxiosResponse } from "axios";

export default class AuthApi {
  public static async refresh(token: string): Promise<AxiosResponse> {
    return axios.post("/auth/register", {
      token,
    });
  }
}
