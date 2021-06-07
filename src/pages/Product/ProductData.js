import React from "react";
import "./productStyle.css";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { ADD_TO_CART } from "../../context/reducer";
import MediaQuery from "react-responsive";

const URL = "http://localhost:3000";

export default function ProductData({ allitems, categoryID }) {
  const { dispatch } = useContext(AppContext);

  const handleAddToCart = (item) => {
    const productID = item.id;
    //todo make request and change below code acc. to response
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: "http://localhost:5000/addToCart",
      data: productID,
    }).then((res) => {
      console.log(res);
      dispatch({ type: ADD_TO_CART, payload: item });
    });
  };

  return (
    <div>
      <Row>
        {allitems
          .filter((item) => {
            if (!categoryID) {
              return item;
            } else {
              return item.category === categoryID;
            }
          })
          .map((item) => (
            <>
              <Col lg={6} md={6} xl={3} sm={12} xs={12}>
                <div className="box  " key={item.id}>
                  <Row>
                    <Col md={12}>
                      <div className="pl-2 pr-2" style={{ height: "75px" }}>
                        <strong>{item.name}</strong>
                      </div>
                    </Col>

                    <Col lg={12} md={6} sm={6} xs={6}>
                      <div
                        className="pl-2 pr-2 "
                        style={{ maxHeight: "200px" }}
                      >
                        <img
                          style={{ height: "100%", margin: "auto" }}
                          className="itemImg"
                          src={`${URL}${item.imageURL}`}
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
                      <div
                        className="itemDescription"
                        style={{ height: "100%" }}
                      >
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
                      className="button hideLgDevice"
                      onClick={() => handleAddToCart(item)}
                    >
                      {`  Buy Now @ ${item.price}`}
                    </button>
                  </Row>

                  {/* {Desktop devices}
                  <MediaQuery minDeviceWidth={1140}>
                    <Col>
                      <div className="pl-2 pr-2 ">
                        <img
                          style={{ width: "70%", height: "70%" }}
                          className="itemImg"
                          src={`${URL}${item.imageURL}`}
                          alt="Sabka Bazar"
                        ></img>
                      </div>
                      <div
                        className="itemDescription"
                        style={{ height: "55%" }}
                      >
                        <small>{item.description}</small>
                      </div>
                    </Col>
                    <div className="pl-2 pr-2 pt-50 btnclass">
                      <Row noGutters>
                        <Col md={6}>
                          <p>{`MRP RS.  ${item.price}`}</p>
                        </Col>
                        <Col md={6}>
                          <button
                            className="button"
                            onClick={() => handleAddToCart(item)}
                          >
                            Buy Now
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </MediaQuery>

                  {for tablet devices}
                  <MediaQuery maxDeviceWidth={1024} minDeviceWidth={767}>
                    <Row>
                      <Col sm={6}>
                        <div className="pl-2 pr-2 ">
                          <img
                            className="itemImg"
                            src={`${URL}${item.imageURL}`}
                            alt="Sabka Bazar"
                          ></img>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="itemDescription">
                          <small>{item.description}</small>
                        </div>
                      </Col>
                    </Row>
                    <div className="pl-2 pr-2 pt-50 btnclass">
                      <Row noGutters>
                        <Col md={12}>
                          <button
                            style={{ width: "100%" }}
                            className="button"
                            onClick={() => handleAddToCart(item)}
                          >
                            {`Buy Now @ RS.  ${item.price}`}
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </MediaQuery>
                  {mobile devices}
                  <MediaQuery maxDeviceWidth={425}>
                    <Row>
                      <Col xs={6}>
                        <div className="pl-2 pr-2 ">
                          <img
                            className="itemImg"
                            src={`${URL}${item.imageURL}`}
                            alt="Sabka Bazar"
                          ></img>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="itemDescription">
                          <small>{item.description}</small>
                        </div>

                        <div className="pl-2 pr-2 pt-50 btnclass">
                          <button
                            style={{ width: "100%" }}
                            className="button"
                            onClick={() => handleAddToCart(item)}
                          >
                            <small>Buy Now @{`RS.${item.price}`} </small>
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </MediaQuery> */}
                </div>
              </Col>
            </>
          ))}
      </Row>
    </div>
  );
}
