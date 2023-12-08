import { LocalStorageService } from "@/service/local-storage-service";
import axiosClient, { logError } from "..";
import { BASE_URL_API, PRODUCT } from "../constants";
import { ADMIN_TOKENA, ADMIN_TOKENR } from "@/service/constant";
import { decryptData } from "@/utils/crypto-utils";

export const handleGetProductCount = async () => {
  try {
    const response = await axiosClient.get(`${BASE_URL_API}/${PRODUCT.COUNT}`);
    return response;
  } catch (error: any) {
    logError(error, "handleGetProductCount");
  }
};

export const handleQueryProduct = async (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await axiosClient.get(
      `${BASE_URL_API}/${PRODUCT.QUERY}/?page=${pageNumber}&pageSize=${pageSize}`
    );
    return response;
  } catch (error: any) {
    logError(error, "handleQueryProduct");
  }
};
export const handleAddProduct = async (data: object) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);

      const headers = {
        authorization: myHashA,
        "refresh-token": myHashR,
      };

      const response = await axiosClient.post(
        `${BASE_URL_API}/${PRODUCT.POST}`,
        data,
        { headers }
      );
      return response;
    }
  } catch (error: any) {
    logError(error, "addNewProduct");
  }
};
export const handleGetProductById = async (str: string) => {
  try {
    const response = await axiosClient.get(
      `${BASE_URL_API}/${PRODUCT.POST}/${str}`
    );
    return response;
  } catch (error) {
    logError(error);
  }
};
export const handleUpdateProduct = async (
  id: string,
  urlImage: string,
  name: string,
  desc: string,
  categoryId: string,
  price: number,
  quantity: number
) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);
      console.log(myHashA);
      console.log(myHashR);

      const headers = {
        authorization: myHashA,
        "refresh-token": myHashR,
        "Content-Type": "application/json",
      };
      const data = {
        image: urlImage,
        product_type: "Food",
        product_thumb: urlImage,
        product_name: name,
        product_description: desc,
        product_slug: "Food",
        product_price: price,
        product_quality: quantity,
        categoryId: categoryId,
        product_attributes: {
          brand: "Deli Food",
          size: "Lớn",
          ingredients: "Không",
          allergens: "Không",
          nutritionalValue: "Nhiều",
          availability: "2023-12-04T10:00:00.000Z",
        },
      };
      console.log("FORM DATA");
      console.log(data);

      const response = await axiosClient.patch(
        `${BASE_URL_API}/${PRODUCT.POST}/${id}`,
        data,
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error);
  }
};
export const handleHideProduct = async (id: string) => {
  try {
    let tokenA = LocalStorageService.getTokenA(ADMIN_TOKENA);
    let tokenR = LocalStorageService.getTokenR(ADMIN_TOKENR);
    if (tokenA && tokenR) {
      let myHashA = decryptData(tokenA);
      let myHashR = decryptData(tokenR);

      const headers = {
        authorization: myHashA,
        "refresh-token": myHashR,
        "Content-Type": "application/json",
      };
      const response = await axiosClient.put(
        `${BASE_URL_API}/${PRODUCT.HIDE}/${id}`,
        {},
        { headers }
      );
      return response;
    }
  } catch (error) {
    logError(error);
  }
};
