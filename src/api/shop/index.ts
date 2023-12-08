import axiosClient, { logError } from "..";
import { BASE_URL_API, SHOPS } from "../constants";

export const addNewShop = async (shop: object) => {
  try {
    const response = await axiosClient.post(
      `${BASE_URL_API}/${SHOPS.ADD}`,
      shop
    );
    return response;
  } catch (error: any) {
    logError(error, "addNewShop");
  }
};

export const handleGetUserInformation = async (UserId: string) => {
  try {
    const response = await axiosClient.post(
      `${BASE_URL_API}/${SHOPS.GET_PROFILE}`,
      { UserId }
    );
    return response;
  } catch (error) {
    logError(error, "handleGetUserInformation");
  }
};
