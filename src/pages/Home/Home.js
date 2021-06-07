import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Carousel } from "react-bootstrap";
import "./home.css";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import useApiData from "../../useApiData";
import { HANDLE_CLICK_FROM_HOMESCREEN } from "../../context/reducer";
import useApi from "./useApi";

const URL = "http://localhost:3000";

export default function Home() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const categoriesVal = useApiData("http://localhost:5000/categories"); // categories api response
  const bannersList = useApi(); //Banners api response
  useEffect(() => {
    const banners = bannersList.map((item) => (
      <img
        width="90%"
        src={`${URL}${item.bannerImageUrl}`}
        alt={item.bannerImageAlt}
      />
    ));
    setData(banners);
  }, [bannersList]);

  const handleCategoryClick = (id) => {
    dispatch({ type: HANDLE_CLICK_FROM_HOMESCREEN, payload: id });
    history.push("./product");
  };

  return (
    <div style={{ marginTop: "3px" }}>
      <Container className="category my__carousel_main ">
        <Carousel
          interval={1000}
          controls={true}
          indicators={true}
          autoPlay={true}
        >
          {data.map((item) => {
            return <Carousel.Item>{item}</Carousel.Item>;
          })}
        </Carousel>

        {/* <AliceCarousel
          items={data}
          // responsive={this.responsive}
          autoPlayInterval={1000}
          autoPlayDirection="ltr"
          autoPlay={true}
          fadeOutAnimation={true}
          mouseTrackingEnabled={true}
          disableAutoPlayOnAction={true}
        /> */}
      </Container>
      <Container>
        <div className="align-items-center">
          {categoriesVal &&
            categoriesVal.map((item, indx) => {
              if (indx % 2 === 0) {
                return (
                  <Row className="category">
                    <Col xs={4}>
                      <img
                        className="d-block w-100"
                        src={`${URL}${item.imageUrl}`}
                        alt={item.name}
                      />
                    </Col>
                    {/* <div></div> */}
                    <Col className="categoryDetails" xs={8}>
                      <div className="categoryContent">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <div
                          onClick={() => {
                            handleCategoryClick(item.id);
                          }}
                        >
                          {`Explore ${item.key}`}
                        </div>
                      </div>
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row className="category">
                    <Col xs={8} className="categoryDetails">
                      <div className="categoryContent">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <div
                          onClick={() => {
                            handleCategoryClick(item.id);
                          }}
                        >
                          {`Explore ${item.key}`}
                        </div>
                      </div>
                    </Col>

                    <Col xs={4}>
                      <img
                        className="d-block w-100"
                        src={`${URL}${item.imageUrl}`}
                        alt={item.name}
                      />
                    </Col>
                  </Row>
                );
              }
            })}
        </div>
      </Container>
    </div>
  );
}
