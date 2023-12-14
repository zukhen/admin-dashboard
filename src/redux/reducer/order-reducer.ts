import { CLEAR_NEW_ORDER, RECEIVE_NEW_ORDER, ReceiveNewOrderAction } from "../action/order-action";

interface OrderState {
  newOrder: any | null;
}

const initialState: OrderState = {
  newOrder: null,
};

type OrderAction = ReceiveNewOrderAction;

const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case RECEIVE_NEW_ORDER:
      return {
        ...state,
        newOrder: action.payload,
      };
    case CLEAR_NEW_ORDER:
        return initialState
    default:
      return state;
  }
};

export default orderReducer;