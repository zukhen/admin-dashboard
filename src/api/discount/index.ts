import { LocalStorageService } from "@/service/local-storage-service";
import axiosClient, { logError } from "..";
import { BASE_URL_API, DISCOUNT } from "../constants";
import { ADMIN_TOKENA, ADMIN_TOKENR } from "@/service/constant";
import { decryptData } from "@/utils/crypto-utils";

export const handleQueryDiscount = async () => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);

      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
      };
      const response = await axiosClient.get(
        `${BASE_URL_API}/${DISCOUNT.GET_BY_SHOP}`,
        { headers }
      );
      return response;
    }
  } catch (error: any) {
    logError(error, "handleQueryDiscount");
  }
};
export const handleAddDiscount = async (body: any) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);

      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
      };
      const response = await axiosClient.post(
        `${BASE_URL_API}/${DISCOUNT.GET_BY_SHOP}`, body, { headers });
      return response;
    }
  } catch (error) {
    logError(error)
  }
}

export const handleGetDiscountCount = async () => {
  try {
    const response = await axiosClient.get(`${BASE_URL_API}/${DISCOUNT.COUNT}`);
    return response;
  } catch (error: any) {
    logError(error, "handleGetDiscountCount");
  }
};