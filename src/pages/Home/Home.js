import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./home.css";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import useApiData from "../../useApiData";
import { HANDLE_CLICK_FROM_HOMESCREEN } from "../../context/actionTypes";

import {
  CategoryWrapper,
  Wrapper,
  CategoryImg,
  CategoryContent,
  CategoryName,
  CategoryClick,
  CategoryDescription,
} from "./StyledComponent";

export default function Home() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const categoriesVal = useApiData("http://localhost:5000/categories"); // categories api response
  const bannersList = useApiData("http://localhost:5000/banners"); //Banners api response

  // useEffect(() => {
  //   const banners = bannersList.map((item) => (
  //     <img
  //       width="90%"
  //       src={`${item.bannerImageUrl}`}
  //       alt={item.bannerImageAlt}
  //     />
  //   ));
  //   setData(banners);
  // }, [bannersList]);

  const handleCategoryClick = (id) => {
    dispatch({ type: HANDLE_CLICK_FROM_HOMESCREEN, payload: id });
    history.push("./product");
  };

  return (
    <Wrapper>
      <Container className="category my__carousel_main ">
        <Carousel
          interval={1000}
          controls={window.innerWidth >= 768 ? true : false}
          indicators={true}
          autoPlay={true}
        >
          {bannersList
            .map((item) => (
              <img
                width="90%"
                src={`${item.bannerImageUrl}`}
                alt={item.bannerImageAlt}
              />
            ))
            .map((item) => {
              return <Carousel.Item>{item}</Carousel.Item>;
            })}
        </Carousel>
      </Container>
      <Container>
        <CategoryWrapper>
          {categoriesVal &&
            categoriesVal.map((item, indx) => {
              if (indx % 2 === 0) {
                return (
                  <Row className="category">
                    <Col xs={5}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CategoryImg src={`${item.imageUrl}`} alt={item.name} />
                      </div>
                    </Col>
                    <Col className="categoryDetails" xs={7}>
                      <CategoryContent>
                        <CategoryName>{item.name}</CategoryName>
                        <CategoryDescription>
                          {item.description}
                        </CategoryDescription>
                        <CategoryClick
                          onClick={() => {
                            handleCategoryClick(item.id);
                          }}
                        >
                          {`Explore ${item.key}`}
                        </CategoryClick>
                      </CategoryContent>
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row className="category">
                    <Col xs={7} className="categoryDetails">
                      <CategoryContent>
                        <CategoryName>{item.name}</CategoryName>
                        <CategoryDescription>
                          {item.description}
                        </CategoryDescription>
                        <CategoryClick
                          onClick={() => {
                            handleCategoryClick(item.id);
                          }}
                        >
                          {`Explore ${item.key}`}
                        </CategoryClick>
                      </CategoryContent>
                    </Col>

                    <Col xs={5}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CategoryImg src={`${item.imageUrl}`} alt={item.name} />
                      </div>
                    </Col>
                  </Row>
                );
              }
            })}
        </CategoryWrapper>
      </Container>
    </Wrapper>
  );
}
