import { ADMIN_TOKENA, ADMIN_TOKENR, ADMIN_UUID } from "@/service/constant";
import { LocalStorageService } from "@/service/local-storage-service";
import { decryptData } from "@/utils/crypto-utils";
import axiosClient, { logError } from "..";
import { BASE_URL_API, ORDERS } from "../constants";
import { orderStatus } from "@/model/order-status";

export const handleGetOrderProduct = async (
  pageNumber: number = 1,
  status: string = orderStatus.pending,
  limit: number = 10
) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);
      
      
      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
        "Content-Type": "application/json",
      };

      const response = await axiosClient.get(
        `${BASE_URL_API}/${ORDERS.QUERY}?limit=${limit}&page=${pageNumber}`,
        { headers, params: { status } }
      );

      return response;
    }
  } catch (error) {
    logError(error, "handleGetOrderProduct");
  }
};

export const handleChangeStatusOrder = async (
  orderId: string,
  status: string
) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    let shopId = LocalStorageService.getTokenR(ADMIN_UUID);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);
      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
        "Content-Type": "application/json",
      };

      const response = await axiosClient.patch(
        `${BASE_URL_API}/order/${status}/${shopId}`,
        { orderId },
        { headers }
      );

      return response;
    }
  } catch (error) {
    logError(error, "handleConfirmOrder");
  }
};
export const handleShippingOrder = async (orderId: string) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    let shopId = LocalStorageService.getTokenR(ADMIN_UUID);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);
      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
        "Content-Type": "application/json",
      };

      const response = await axiosClient.patch(
        `${BASE_URL_API}/${ORDERS.COMFIRMED}/${shopId}`,
        { orderId },
        { headers }
      );

      return response;
    }
  } catch (error) {
    logError(error, "handleConfirmOrder");
  }
};

export const handleGetOrderCount = async (id?:string) => {
  try {
    const response = await axiosClient.get(`${BASE_URL_API}/${ORDERS.COUNT}/${id}`);
    return response;
  } catch (error: any) {
    logError(error, "handleGetUserCount");
  }
};
