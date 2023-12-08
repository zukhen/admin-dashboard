import { ADMIN_DATA, ADMIN_TOKENA, ADMIN_TOKENR, ADMIN_UUID } from "./constant";

export const LocalStorageService: LocalStorageModel = {
  setTokenA: (key = ADMIN_TOKENA, value) => {
    localStorage.setItem(key, value);
  },
  setUUID: (key = ADMIN_UUID, value) => {
    localStorage.setItem(key, value);
  },

  setTokenR: (key = ADMIN_TOKENR, value) => {
    localStorage.setItem(key, value);
  },
  getTokenA: (key = ADMIN_TOKENA) => {
    return localStorage.getItem(key);
  },
  getUUID: (key = ADMIN_UUID) => {
    return localStorage.getItem(key);
  },
  getTokenR: (key = ADMIN_TOKENR) => {
    return localStorage.getItem(key);
  },
  setUserData: (key = ADMIN_DATA, value) => {
    localStorage.setItem(key, value);
  },
  getUserData: (key = ADMIN_DATA) => {
    return localStorage.getItem(key);
  },
  removeAll: () => {
    localStorage.clear();
  },
};
