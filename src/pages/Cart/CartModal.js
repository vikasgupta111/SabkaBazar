import React from "react";
import { AppContext } from "../../context/userContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import lowestPriceLogo from "../../assets/img/lowest-price.png";
import {
  CartHeader,
  CartContent,
  EmptyCartWrapper,
  EmptyCart,
  ButtonWrapper,
  ButtonCheckout,
  CounterButton,
  ItemTotalCost,
  LowestPrice,
  MainWrapper,
  CartBackground,
  CloseIcon,
  CartItem,
  RowItem,
  ItemBox,
} from "./StyledComponent";
import {
  TOGGLE_CART_DRAWER,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from "../../context/actionTypes";

export default function CartModal() {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const handleClose = () => dispatch({ type: TOGGLE_CART_DRAWER });

  const getFrequencyOfItems = (cartItems) => {
    const itemList = [];
    cartItems.forEach((item) => {
      if (itemList.findIndex((val) => val.item.id === item.id) !== -1) {
        let indx = itemList.findIndex((val) => val.item.id === item.id);
        itemList[indx].count++;
      } else {
        itemList.push({ item: item, count: 1 });
      }
    });
    return itemList;
  };

  const handleAddToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };
  const handleRemoveFromCart = (item) => {
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
  const handleCheckout = () => {
    dispatch({ type: TOGGLE_CART_DRAWER });
    history.push("./");
  };

  const HandleShopping = () => {
    dispatch({ type: TOGGLE_CART_DRAWER });
    history.push("./");
  };

  return (
    <MediaQuery minDeviceWidth={1025}>
      <MainWrapper>
        <CartBackground>
          <CartHeader>
            <strong>
              My Cart
              {state.cart.length !== 0 && `( ${state.cart.length}  item )`}
            </strong>
            <CloseIcon onClick={handleClose}>x</CloseIcon>
          </CartHeader>

          <CartContent>
            {state.cart.length === 0 && (
              <EmptyCartWrapper>
                <EmptyCart>
                  <strong>No items in your Cart</strong>
                  <p>your favorite items are just a click away</p>
                </EmptyCart>
                <ButtonCheckout onClick={HandleShopping}>
                  Start Shopping
                </ButtonCheckout>
              </EmptyCartWrapper>
            )}

            {getFrequencyOfItems(state.cart).map((val) => (
              <CartItem key={val.item.id}>
                <RowItem key={val.item.id}>
                  <ItemBox sm={2} md={3}>
                    <img
                      src={`${val.item.imageURL}`}
                      alt="Sabka Bazar"
                      width="80px"
                      height="80px"
                    />
                  </ItemBox>

                  <ItemBox sm={8} md={6}>
                    <div>{val.item.name}</div>
                    <div>
                      <CounterButton
                        onClick={() => handleRemoveFromCart(val.item)}
                      >
                        -
                      </CounterButton>
                      {val.count}
                      <CounterButton onClick={() => handleAddToCart(val.item)}>
                        +
                      </CounterButton>
                      <div>{"  x Rs." + val.item.price}</div>
                    </div>
                  </ItemBox>

                  <Col sm={2} md={3}>
                    <ItemTotalCost>
                      {"Rs." + val.item.price * val.count}
                    </ItemTotalCost>
                  </Col>
                </RowItem>
              </CartItem>
            ))}
            {state.cart.length !== 0 && (
              <LowestPrice>
                <img src={lowestPriceLogo} width="25%" alt="lowest Price" />
                <div>You won't find it cheaper anywhere</div>
              </LowestPrice>
            )}
          </CartContent>
          {state.cart.length !== 0 && (
            <>
              <ButtonWrapper>
                <p>Promocode can be applied on payment page</p>
                <ButtonCheckout onClick={handleCheckout}>
                  Proceed To Checkout
                </ButtonCheckout>
              </ButtonWrapper>
            </>
          )}
        </CartBackground>
      </MainWrapper>
    </MediaQuery>
  );
}
