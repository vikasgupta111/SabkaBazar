import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  HANDLE_CLICK_FROM_PRODUCT,
  HANDLE_CLICK_FROM_CATEGORY,
} from "../../context/actionTypes";
import ProductData from "./ProductData";
import "./productStyle.css";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import useApiData from "../../useApiData";

export default function Product() {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(true);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [categorieArr, setCategoriesArr] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const categoriesVal = useApiData("http://localhost:5000/categories"); //categories api response
  const productList = useApiData("http://localhost:5000/products"); // products api response
  useEffect(() => {
    setData(productList);
    setCategoriesArr([]);
  }, [productList]);

  const handleCategoryClick = (id) => {
    setCategoryID((prevState) => {
      if (prevState === id) {
        return dispatch({ type: HANDLE_CLICK_FROM_PRODUCT });
      } else {
        dispatch({ type: HANDLE_CLICK_FROM_CATEGORY });
        return id;
      }
    });
  };

  useEffect(() => {
    if (state.productClicked) {
      setCategoryID("");
    }
  }, [state.productClicked]);
  return (
    <Container className="productConatiner">
      <Row noGutters>
        <Col lg={2} sm={12} xs={12} md={3}>
          <div
            className="categoryHeading"
            onClick={() => {
              setToggleCategory(!toggleCategory);
            }}
          >
            <div>Category</div>
            <div>▼</div>
          </div>
          {toggleCategory ? (
            <div className="container1">
              {categoriesVal &&
                categoriesVal.map((item) => (
                  <>
                    <div
                      className={`categoryItem ${
                        categoryID === item.id ||
                        state.categoryClick === item.id
                          ? "categoryItemfocus"
                          : null
                      }`}
                      key={item.id}
                      onClick={() => handleCategoryClick(item.id)}
                    >
                      {item.name}
                    </div>
                  </>
                ))}
            </div>
          ) : null}
        </Col>
        <Col lg={10} sm={12} xs={12} md={9}>
          <ProductData
            allitems={data}
            categoryID={state.categoryClick ? state.categoryClick : categoryID}
          />
        </Col>
      </Row>
    </Container>
  );
}
