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

      // console.log(myHashA);
      // console.log(myHashR);

      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
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

export const handleGetOrderCount = async (id?: string) => {
  try {
    const response = await axiosClient.get(
      `${BASE_URL_API}/${ORDERS.COUNT}/${id}`
    );
    return response;
  } catch (error: any) {
    logError(error, "handleGetUserCount");
  }
};
// 
// top order for admin
export const handleGetTopProduct = async (
  sort: string = "-totalQuantity",
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1,
  limit: number = 5
) => {
  try {
    // ?sort=-totalQuantity&year=2023&month=12&limit=100
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);
      // let a = new URLSearchParams

      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
        "Content-Type": "application/json",
      };
      const response = axiosClient.get(
        `${BASE_URL_API}/${ORDERS.TOP_PRODUCT}?sort=${sort}&year=${year}&month=${month}&limit=${limit}`,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error);
  }
};
//top order for shop
export const handleGetTopOrder = async (
  sort: string = "-totalPriceAll",
  year: number = new Date().getFullYear(),
) => {
  try {
    // ?sort=-totalQuantity&year=2023&month=12&limit=100
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);
      // let a = new URLSearchParams
      console.log(myHashA);
      console.log(myHashR);
      
      const headers = {
        Authorization: myHashA,
        RefreshToken: myHashR,
        "Content-Type": "application/json",
      };
      const response = axiosClient.get(
        `${BASE_URL_API}/${ORDERS.TOP_PRODUCT}?sort=${sort}&year=${year}`,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error);
  }
};