import axiosClient, { logError } from "..";
import { AUTH, BASE_URL_API } from "../constants";

export const handleLoginAdmin = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post(
      `${BASE_URL_API}/${AUTH.LOGIN_ADMIN}`,
      {
        email,
        password,
      }
    );
    return response;
  } catch (error: any) {
    // logError(error, "handleLoginAdmin");
  }
};

export const handleLoginShop = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post(
      `${BASE_URL_API}/${AUTH.LOGIN_SHOP}`,
      {
        email,
        password,
      }
    );
    return response;
  } catch (error: any) {
    // logError(error, "handleLoginShop");
  }
};

export const handleRegister = async (
  email: string,
  password: string,
  f_name: string,
  l_name: string,
  phone: string
) => {
  try {
    const response = await axiosClient.post(
      `${BASE_URL_API}/${AUTH.REGISTER}`,
      {
        f_name,
        email,
        password,
        l_name,
        phone,
      }
    );
    return response;
  } catch (error: any) {
    logError(error, "handleRegister");
  }
};

