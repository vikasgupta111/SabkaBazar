export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOGGLE_CART_DRAWER = "TOGGLE_CART_DRAWER";
export const HANDLE_CLICK_FROM_PRODUCT = "HANDLE_CLICK_FROM_PRODUCT";
export const HANDLE_CLICK_FROM_CATEGORY = "HANDLE_CLICK_FROM_CATEGORY";
export const HANDLE_CLICK_FROM_HOMESCREEN = "HANDLE_CLICK_FROM_HOMESCREEN";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";

const initialState = {
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

// function removeElement(state, elem) {
//   // var index = array.findIndex((i) => i.id === elem.id);
//   // console.log(index);
//   // if (index > -1) {
//   //   array.splice(index, 1);
//   // }
//   // return array;

//   const updatedCart = [...state.cart];
//   const updatedItemIndex = updatedCart.findIndex((item) => item.id === elem.id);

//   const updatedItem = {
//     ...updatedCart[updatedItemIndex],
//   };
//   updatedItem.count--;
//   if (updatedItem.count <= 0) {
//     updatedCart.splice(updatedItemIndex, 1);
//   } else {
//     updatedCart[updatedItemIndex] = updatedItem;
//   }
//   return { ...state, cart: updatedCart };
// }

// const removeProductFromCart = (productId, state) => {
//   console.log("Removing product with id: " + productId);
//   const updatedCart = [...state.cart];
//   const updatedItemIndex = updatedCart.findIndex(
//     (item) => item.id === productId
//   );

//   const updatedItem = {
//     ...updatedCart[updatedItemIndex],
//   };
//   updatedItem.quantity--;
//   if (updatedItem.quantity <= 0) {
//     updatedCart.splice(updatedItemIndex, 1);
//   } else {
//     updatedCart[updatedItemIndex] = updatedItem;
//   }
//   return { ...state, cart: updatedCart };
// };
