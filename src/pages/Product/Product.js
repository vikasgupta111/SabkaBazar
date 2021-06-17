import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import {
  HANDLE_CLICK_FROM_PRODUCT,
  HANDLE_CLICK_FROM_CATEGORY,
} from "../../context/actionTypes";
import { ProductData } from "../../common/ProductItem";
import "./productStyle.css";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import getDataFromAPI from "../../useApiData";
import apiUrl from "../../constant/Constant";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function Product(props) {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(true);

  const [categorieArr, setCategoriesArr] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const Products = async () => {
    const [productList, error] = await getDataFromAPI({
      url: "https://my-json-server.typicode.com/vikasgupta111/productsServer/products",
      //`${apiUrl}/products`,
      type: "GET",
    });
    if (!error) {
      setData([...productList]);
      // setCategoriesArr([]);
    }
  };

  useEffect(() => {
    // const query = queryString.parse(props.location.search);
    // if (query.category) {
    //   if (!categoryID) {
    //     setCategoryID(query.category);
    //   }
    // }
    Products();
  }, []);

  const cataegoryData = async () => {
    const [categoriesVal, error] = await getDataFromAPI({
      url: "https://my-json-server.typicode.com/vikasgupta111/dbRepo/categories",
      //`${apiUrl}/categories`,
      type: "GET",
    });

    if (!error) {
      setCategoriesArr([...categoriesVal]);
    }
  };

  useEffect(() => {
    cataegoryData();
    // categories api response
  }, []);

  const handleCategoryClick = (id) => {
    setCategoryID((prevState) => {
      if (prevState === id) {
        dispatch({ type: HANDLE_CLICK_FROM_PRODUCT });
        return null;
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
              {categorieArr &&
                categorieArr.map((item) => (
                  // <Link to={`/product/?category=${item.id}`}>
                  <div
                    className={`categoryItem ${
                      categoryID === item.id || state.categoryClick === item.id
                        ? "categoryItemfocus"
                        : null
                    }`}
                    key={item.id}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    {item.name}
                  </div>
                  // </Link>
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
export default Product;
// export default withRouter(Product);
