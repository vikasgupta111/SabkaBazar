import React from "react";
import { AppContext } from "../../context/userContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Row, Col } from "react-bootstrap";
import "./cart.css";
import MediaQuery from "react-responsive";
import lowestPriceLogo from "../../assets/img/lowest-price.png";
import {
  CartWrapper,
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
} from "./StyledComponent";
import {
  TOGGLE_CART_DRAWER,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from "../../context/reducer";
// import { CartHeader } from "./StyledComponent";

const URL = "http://localhost:3000";

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
              <div>
                <Row key={val.item.id} className="rowItem">
                  <Col lg={3} className="itembox">
                    <img
                      src={`${URL}${val.item.imageURL}`}
                      alt="Sabka Bazar"
                      width="80px"
                      height="80px"
                    />
                  </Col>
                  <Col lg={6} className="itembox">
                    <p>{val.item.name}</p>
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
                  </Col>

                  <Col lg={3}>
                    <ItemTotalCost>
                      {"Rs." + val.item.price * val.count}
                    </ItemTotalCost>
                  </Col>
                </Row>
              </div>
            ))}
            {state.cart.length !== 0 && (
              <LowestPrice>
                <img src={lowestPriceLogo} width="25%" alt="lowest Price" />
                <label>You won't find it cheaper anywhere</label>
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
