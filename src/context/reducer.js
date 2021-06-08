import { LOGIN } from "./actionTypes";
import { LOGOUT } from "./actionTypes";
import { TOGGLE_CART_DRAWER } from "./actionTypes";
import { HANDLE_CLICK_FROM_PRODUCT } from "./actionTypes";
import { HANDLE_CLICK_FROM_CATEGORY } from "./actionTypes";
import { HANDLE_CLICK_FROM_HOMESCREEN } from "./actionTypes";
import { ADD_TO_CART } from "./actionTypes";
import { DELETE_FROM_CART } from "./actionTypes";

export const initialState = {
  productClicked: false,
  cart: [],
  loggedIn: true,
  showCartDrawer: false,
  categoryClick: "",
};

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true, categoryClick: "" };
    case LOGOUT:
      return { ...state, loggedIn: false, categoryClick: "" };
    case TOGGLE_CART_DRAWER:
      return {
        ...state,
        showCartDrawer: !state.showCartDrawer,
      };
    case HANDLE_CLICK_FROM_PRODUCT:
      return { ...state, productClicked: true, categoryClick: "" };
    case HANDLE_CLICK_FROM_CATEGORY:
      return { ...state, productClicked: false, categoryClick: "" };
    case HANDLE_CLICK_FROM_HOMESCREEN:
      return { ...state, categoryClick: action.payload };
    case ADD_TO_CART: {
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case DELETE_FROM_CART: {
      console.log(state.cart, action.payload);
      return removeElement(state, action.payload);
    }

    default:
      return state;
  }
};

function removeElement(state, item) {
  const updatedCart = [...state.cart];
  var index = updatedCart.findIndex((i) => i.id === item.id);
  console.log(index);
  if (index >= 0) {
    updatedCart.splice(index, 1);
  }
  return { ...state, cart: updatedCart };
}
