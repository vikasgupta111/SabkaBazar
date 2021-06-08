import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Register } from "./pages/Register";
import { SignIn } from "./pages/SignIn";
import { CartModal } from "./pages/Cart";
import Layout from "./layout/Layout";
import { AppContext } from "./context/userContext";
import { useReducer } from "react";
import { shopReducer, initialState } from "./context/reducer";
import CartResponsive from "./pages/Cart/CartResponsive";

function App() {
  // Storing ContextApi state in localStorage
  // let contextData =
  //   JSON.parse(localStorage.getItem("contextState")) || initialState;
  const [state, dispatch] = useReducer(shopReducer, initialState);
  // useEffect(() => {
  //   localStorage.setItem("contextState", JSON.stringify(state));
  // }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch: dispatch }}>
      <Layout>
        {state.showCartDrawer && <CartModal></CartModal>}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/product" component={Product}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/signIn" component={SignIn}></Route>
          <Route exact path="/cart" component={CartResponsive}></Route>
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
