import { combineReducers, legacy_createStore as createStore } from "redux";
import userReducer from "./reducer/user-reducer";

const rootReducer = combineReducers({
    user: userReducer,
});
export const store = createStore(rootReducer)