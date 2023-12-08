import { Action } from "redux";

export const SET_TOTAL_USERS = "SET_TOTAL_USERS";
export const SET_EXPANDED_MENU = "SET_EXPANDED_MENU";
export const SET_TOTAL_CATEGORY = "SET_TOTAL_CATEGORY";
export const SET_TOTAL_PRODUCT = "SET_TOTAL_PRODUCT";

export const CLEAR_TOTAL_USERS = "CLEAR_TOTAL_USERS";
type ActionTypes =
  | typeof SET_TOTAL_USERS
  | typeof CLEAR_TOTAL_USERS
  | typeof SET_EXPANDED_MENU
  | typeof SET_TOTAL_PRODUCT
  | typeof SET_TOTAL_CATEGORY;
export interface SetTotalUsersAction extends Action<ActionTypes> {
  payload: boolean;
}

export const actionSetTotalUsers = (
  type: any,
  payload: boolean
): SetTotalUsersAction => ({
  type: type,
  payload: payload,
});
