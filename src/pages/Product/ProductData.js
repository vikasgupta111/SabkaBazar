import React from "react";
import "./productStyle.css";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import { Col, Row } from "react-bootstrap";
import { PostApiCall } from "../../useApiData";

export default function ProductData({ allitems, categoryID }) {
  const { dispatch } = useContext(AppContext);

  const handleAddToCart = (item) => {
    const itemToBeAdded = item;
    const productID = item.id;
    PostApiCall(itemToBeAdded, productID, dispatch);
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
            <>
              <Col lg={6} md={6} xl={3} sm={12} xs={12}>
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
                      <div
                        className="pl-2 pr-2 "
                        style={{ overflow: "hidden" }}
                      >
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
                      style={{ marginTop: "20px", marginBottom: "14px" }}
                      className="button hideLgDevice"
                      onClick={() => handleAddToCart(item)}
                    >
                      {`  Buy Now @ ${item.price}`}
                    </button>
                  </Row>
                </div>
              </Col>
            </>
          ))}
      </Row>
    </div>
  );
}
