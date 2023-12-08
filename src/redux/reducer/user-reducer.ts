import {
  CLEAR_TOTAL_USERS,
  SET_EXPANDED_MENU,
  SET_TOTAL_CATEGORY,
  SET_TOTAL_PRODUCT,
  SET_TOTAL_USERS,
  SetTotalUsersAction,
} from "../action/user-action";
interface UserState {
  isAddNewUser: boolean;
  isAddNewCategory: boolean;
  isAddNewProduct: boolean;
  isExpandedMenu?: boolean;
}
const initialState: UserState = {
  isAddNewUser: false,
  isExpandedMenu: false,
  isAddNewCategory: false,
  isAddNewProduct: false
};

const userReducer = (
  state = initialState,
  action: SetTotalUsersAction
): UserState => {
  switch (action.type) {
    case SET_TOTAL_USERS:
      return {
        ...state,
        isAddNewUser: action.payload,
      };
    case SET_TOTAL_CATEGORY:
      return {
        ...state,
        isAddNewCategory: action.payload,
      };
    case SET_TOTAL_PRODUCT:
      return {
        ...state,
        isAddNewProduct: action.payload,
      };
      
    case SET_EXPANDED_MENU:
      return {
        ...state,
        isExpandedMenu: action.payload,
      };
    case CLEAR_TOTAL_USERS:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
