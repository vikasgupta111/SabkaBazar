import React from "react";
import "../../pages/Product/productStyle.css";
import { ADD_TO_CART } from "../../context/actionTypes";

import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import { Col, Row } from "react-bootstrap";
import getDataFromAPI from "../../useApiData";
import apiUrl from "../../constant/Constant";

export default function ProductData({ allitems, categoryID }) {
  const { dispatch } = useContext(AppContext);

  const handleAddToCart = async (item) => {
    const productID = item.id;

    const [data, error] = await getDataFromAPI({
      url: "https://my-json-server.typicode.com/vikasgupta111/dbRepo/addToCart",
      //`${apiUrl}/addToCart`,
      type: "POST",
      body: productID,
    });
    console.log(data);
    console.log(error);
    if (!error) {
      dispatch({ type: ADD_TO_CART, payload: item });
    }
  };

  return (
    <div>
      <Row noGutters>
        {allitems
          .filter((item) => {
            if (!categoryID) {
              return item;
            } else {
              return item.category === categoryID;
            }
          })
          .map((item) => (
            <Col lg={6} md={6} xl={3} sm={12} xs={12} key={item.id}>
              <div className="box  " key={item.id}>
                <Row className="itemBorder" noGutters>
                  <Col md={12}>
                    <div
                      className=" itemHeader pl-2 pr-2"
                      style={{ height: "75px" }}
                    >
                      <strong>{item.name}</strong>
                    </div>
                  </Col>

                  <Col lg={12} md={6} sm={6} xs={6}>
                    <div className="pl-2 pr-2 " style={{ overflow: "hidden" }}>
                      <img
                        style={{
                          height: "100%",
                          margin: "auto",
                          transform: " scale(1.2)",
                        }}
                        className="itemImg"
                        src={`${item.imageURL}`}
                        alt="Sabka Bazar"
                      ></img>
                    </div>
                  </Col>
                  <Col
                    lg={12}
                    md={6}
                    sm={6}
                    xs={6}
                    style={{
                      flexGrow: 1,
                      height: "150px",
                      marginTop: "4px",
                    }}
                  >
                    <div className="itemDescription" style={{ height: "100%" }}>
                      <small>{item.description}</small>
                    </div>

                    <button
                      className="button hideInDekstop"
                      onClick={() => handleAddToCart(item)}
                    >
                      {`  Buy Now @ ${item.price}`}
                    </button>
                  </Col>
                  <Col md={12} className="hideSM">
                    <div className="pl-2 pr-2 pt-50 btnclass">
                      <Row noGutters>
                        <Col
                          md={6}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>{`MRP RS.  ${item.price}`}</div>
                        </Col>
                        <Col md={6}>
                          <button
                            className="button "
                            onClick={() => handleAddToCart(item)}
                          >
                            {`  Buy Now`}
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <button
                    style={{ marginTop: "20px", marginBottom: "14px" }}
                    className="button hideLgDevice"
                    onClick={() => handleAddToCart(item)}
                  >
                    {`  Buy Now @ ${item.price}`}
                  </button>
                </Row>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}
