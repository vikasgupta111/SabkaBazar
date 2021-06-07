import React from "react";
import MediaQuery from "react-responsive";

import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import cartImg from "../assets/img/cart.svg";
import "./nav.css";
import { useContext } from "react";
import { AppContext } from "../context/userContext";
import { Container } from "react-bootstrap";
import {
  TOGGLE_CART_DRAWER,
  LOGOUT,
  HANDLE_CLICK_FROM_PRODUCT,
} from "../context/reducer";

export default function Nav() {
  const { state, dispatch } = useContext(AppContext);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };
  const handleCart = () => {
    dispatch({ type: TOGGLE_CART_DRAWER });
  };

  return (
    <Container className="customNavbar">
      <div id="logo">
        <Link to="/">
          <img src={logo} alt="Sabka Bazar" />
        </Link>
      </div>
      <div className="navItemsleft">
        <div className="navleftItem">
          <Link to="/" style={{ color: "black" }}>
            Home
          </Link>
        </div>
        <div className="navleftItem">
          <Link
            to="/product"
            onClick={() => {
              dispatch({ type: HANDLE_CLICK_FROM_PRODUCT });
            }}
            style={{ color: "black" }}
          >
            Products
          </Link>
        </div>
      </div>

      <div className="navItemsRight">
        <div className="navRightTop">
          <div className="navRightTopItem">
            {!state.loggedIn && (
              <Link to="/signIn" style={{ color: "black" }}>
                SignIn
              </Link>
            )}
          </div>
          <div className="navRightTopItem">
            {!state.loggedIn && (
              <Link to="/register" style={{ color: "black" }}>
                Register
              </Link>
            )}
          </div>
          <div className="navRightTopItem">
            {state.loggedIn && (
              <Link
                to="/signIn"
                style={{ color: "black" }}
                onClick={handleLogout}
              >
                LogOut
              </Link>
            )}
          </div>
        </div>
        <div className="navRightBottom">
          <MediaQuery minDeviceWidth={1025}>
            <div onClick={handleCart}>
              <div>
                <img src={cartImg} alt="cart" width="20px" height="20px"></img>
                {state.cart.length + " Items"}
                {/* <Link to="/cart">{state.cart.length + " "}Items</Link> */}
              </div>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1024}>
            <div>
              <img src={cartImg} alt="cart" width="20px" height="20px"></img>
              {/* {state.cart.length + " Items"} */}
              <Link to="/cart">{state.cart.length + " "}Items</Link>
            </div>
          </MediaQuery>
        </div>
      </div>
    </Container>
  );
}
