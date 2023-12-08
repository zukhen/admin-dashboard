import axios from "axios";
import { x_api_key } from "./constants";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "x-api-key": x_api_key,
  },
});
axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return { data: response.data, status: response.status };
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;

export const logError = (error:any, context = '') => {
  console.log(`----------------------------------- ${context} Error:`, error.response ? error.response.data : error.message);
};