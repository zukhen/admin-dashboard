import { Action } from "redux";

export const RECEIVE_NEW_ORDER = "RECEIVE_NEW_ORDER";
export const CLEAR_NEW_ORDER = "CLEAR_NEW_ORDER";

type ActionTypes = typeof RECEIVE_NEW_ORDER | typeof CLEAR_NEW_ORDER;

export interface ReceiveNewOrderAction extends Action<ActionTypes> {
  payload: any;
}

export const receiveNewOrder = ( type: ActionTypes,orderData: any): ReceiveNewOrderAction => ({
  type: type,
  payload: orderData,
});
