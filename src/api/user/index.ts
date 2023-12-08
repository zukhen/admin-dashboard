import axiosClient, { logError } from "..";
import { BASE_URL_API, USERS } from "../constants";

export const handleGetUserCount = async () => {
  try {
    const response = await axiosClient.get(`${BASE_URL_API}/${USERS.COUNT}`);
    return response;
  } catch (error: any) {
    logError(error, "handleGetUserCount");
  }
};

//true is query shop
export const handleQueryUser = async (
  pageNumber: number = 1,
  role: boolean = false,
  pageSize: number = 10
) => {
  try {
    const response = await axiosClient.get(
      `${BASE_URL_API}/${USERS.QUERY}/?page=${pageNumber}&pageSize=${pageSize}${
        role ? "&role=shop" : ""
      }`
    );
    return response;
  } catch (error: any) {
    logError(error, "handleQueryUser");
  }
};
