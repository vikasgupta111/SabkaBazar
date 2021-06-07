import React from "react";
import { AppContext } from "../../context/userContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Row, Col, Container } from "react-bootstrap";
import "./cart.css";
import MediaQuery from "react-responsive";

import lowestPriceLogo from "../../assets/img/lowest-price.png";
import {
  TOGGLE_CART_DRAWER,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from "../../context/reducer";

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
      <Container>
        <div style={{ width: "100%" }}>
          <div style={{ height: "100%" }}>
            <div className="cartHeader">
              <strong>
                My Cart
                {state.cart.length !== 0 && `( ${state.cart.length}  item )`}
              </strong>
            </div>

            <div className="cartContent">
              {state.cart.length === 0 && (
                <div className="mainEmptyCart">
                  <div className="emptyCart">
                    <strong>No items in your Cart</strong>
                    <p>your favorite items are just a click away</p>
                  </div>
                  <button className="checkOut" onClick={HandleShopping}>
                    Start Shopping
                  </button>
                </div>
              )}

              {getFrequencyOfItems(state.cart).map((val) => (
                <div>
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
                        <button
                          className="counterButton"
                          onClick={() => handleRemoveFromCart(val.item)}
                        >
                          -
                        </button>
                        {val.Count}
                        <button
                          className="counterButton"
                          onClick={() => handleAddToCart(val.item)}
                        >
                          +
                        </button>
                        <div>{"  x Rs." + val.item.price}</div>
                      </div>
                    </Col>

                    <Col md={2} xs={3}>
                      <div className="itemtotalCost">
                        {"Rs." + val.item.price * val.Count}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
              {state.cart.length !== 0 && (
                <div className="lowestPrice">
                  <img src={lowestPriceLogo} width="25%" alt="lowest Price" />
                  <label>You won't find it cheaper anywhere</label>
                </div>
              )}
            </div>
            {state.cart.length !== 0 && (
              <>
                <div className="buttonWrapper">
                  <p>Promocode can be applied on payment page</p>
                  <button className="checkOut" onClick={handleCheckout}>
                    Proceed To Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </MediaQuery>
  );
}
