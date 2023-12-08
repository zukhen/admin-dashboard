import { LocalStorageService } from "@/service/local-storage-service";
import axiosClient, { logError } from "..";
import { BASE_URL_API, CATEGORIES } from "../constants";
import { ADMIN_TOKENA, ADMIN_TOKENR } from "@/service/constant";
import { decryptData } from "@/utils/crypto-utils";

export const handleQueryCategory = async (
  page: number = 1,
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
        `${BASE_URL_API}/${CATEGORIES.QUERY}?page=${page}&limit=${limit}`,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error, "handleQueryCategory");
  }
};

export const handleAddCategory = async (category: object) => {
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
      console.log(category);
      
      const response = await axiosClient.post(
        `${BASE_URL_API}/${CATEGORIES.QUERY}`,category,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error, "handleAddCategory");
  }
};

export const handleUpdateCategory = async (id:string,category: object) => {
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
      
      const response = await axiosClient.put(
        `${BASE_URL_API}/${CATEGORIES.QUERY}/${id}`,category,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error, "handleAddCategory");
  }
};
export const handleDeleteCategory = async (id:string) => {
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
      
      const response = await axiosClient.delete(
        `${BASE_URL_API}/${CATEGORIES.QUERY}/${id}`,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error, "handleAddCategory");
  }
};
