import {
  CLEAR_TOTAL_USERS,
  SET_DRAFT_PRODUCT,
  SET_EXPANDED_MENU,
  SET_PUBLISH_PRODUCT,
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
  isHaveNewNotify?: boolean;
  isChangePublic?: boolean;
  isChangeDraft?: boolean;
}
const initialState: UserState = {
  isAddNewUser: false,
  isExpandedMenu: false,
  isAddNewCategory: false,
  isAddNewProduct: false,
  isHaveNewNotify: false,
  isChangePublic: false,
  isChangeDraft: false,
};

const userReducer = (
  state = initialState,
  action: SetTotalUsersAction
): UserState => {
  switch (action.type) {
    case SET_TOTAL_USERS:
      return {
        ...state,
        isAddNewUser: action.payload || false,
      };
    case SET_TOTAL_CATEGORY:
      return {
        ...state,
        isAddNewCategory: action.payload || false,
      };
    case SET_TOTAL_PRODUCT:
      return {
        ...state,
        isAddNewProduct: action.payload || false,
      };
    case SET_EXPANDED_MENU:
      return {
        ...state,
        isExpandedMenu: action.payload || false,
      };
    case SET_PUBLISH_PRODUCT:
      return {
        ...state,
        isChangePublic: action.payload || false,
      };
    case SET_DRAFT_PRODUCT:
      return {
        ...state,
        isChangeDraft: action.payload || false,
      };

    case CLEAR_TOTAL_USERS:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
