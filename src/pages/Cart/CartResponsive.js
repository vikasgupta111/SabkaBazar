import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/userContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Row, Col, Container } from "react-bootstrap";
import MediaQuery from "react-responsive";
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
  CartItem,
} from "./StyledComponent";
import lowestPriceLogo from "../../assets/img/lowest-price.png";
import {
  TOGGLE_CART_DRAWER,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from "../../context/actionTypes";

const URL = "http://localhost:3000";

export default function CartResponsive() {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const getFrequencyOfItems = (arr) => {
    const itemList = [];
    arr.forEach((item) => {
      if (itemList.findIndex((i) => i.item.id === item.id) !== -1) {
        let indx = itemList.findIndex((i) => i.item.id === item.id);
        itemList[indx].Count++;
      } else {
        itemList.push({ item: item, Count: 1 });
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
    <MediaQuery maxDeviceWidth={1024}>
      <Container style={{ minHeight: "90vh" }}>
        <CartWrapper>
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CartHeader>
              <strong>
                My Cart
                {state.cart.length !== 0 && `( ${state.cart.length}  item )`}
              </strong>
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
                <CartItem>
                  <Row key={val.item.id} className="rowItem">
                    <Col md={2} xs={3} className="itembox">
                      <img
                        src={`${URL}${val.item.imageURL}`}
                        alt="Sabka Bazar"
                        width="80px"
                        height="80px"
                      />
                    </Col>
                    <Col md={8} xs={6} className="itembox">
                      <p>{val.item.name}</p>
                      <div>
                        <CounterButton
                          onClick={() => handleRemoveFromCart(val.item)}
                        >
                          -
                        </CounterButton>
                        {val.Count}
                        <CounterButton
                          onClick={() => handleAddToCart(val.item)}
                        >
                          +
                        </CounterButton>
                        <div>{"  x Rs." + val.item.price}</div>
                      </div>
                    </Col>

                    <Col md={2} xs={3}>
                      <ItemTotalCost>
                        {"Rs." + val.item.price * val.Count}
                      </ItemTotalCost>
                    </Col>
                  </Row>
                </CartItem>
              ))}
              {state.cart.length !== 0 && (
                <LowestPrice>
                  <img src={lowestPriceLogo} width="100px" alt="lowest Price" />
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
          </div>
        </CartWrapper>
      </Container>
    </MediaQuery>
  );
}
