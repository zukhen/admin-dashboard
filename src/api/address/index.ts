import { LocalStorageService } from "@/service/local-storage-service";
import axiosClient, { logError } from "..";
import { ADDRESS, BASE_URL_API } from "../constants";
import { ADMIN_TOKENA, ADMIN_TOKENR } from "@/service/constant";
import { decryptData } from "@/utils/crypto-utils";

export const handleAddAddress = async (id:string,street: string) => {
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
      let form = {
        street: street,
        city: "Hà Nội",
        state: "DATADATA",
        country: "Viet Nam",
        latitude: "1321313.21",
        longitude: "1321313.21",
        isDefault: true,
      };
      const response = await axiosClient.post(
        `${BASE_URL_API}/${ADDRESS.ADD}/${id}`,
        form,
        { headers }
      );
      return response;
    }
  } catch (error: any) {
    logError(error, "handleAddAddress");
  }
};
