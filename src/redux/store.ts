import { combineReducers, legacy_createStore as createStore } from "redux";
import userReducer from "./reducer/user-reducer";
import orderReducer from "./reducer/order-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,

});
export const store = createStore(rootReducer)