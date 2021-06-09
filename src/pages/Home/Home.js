import React, { useEffect, useState } from "react";
import "./home.css";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import getDataFromAPI from "../../useApiData";
import { HANDLE_CLICK_FROM_HOMESCREEN } from "../../context/actionTypes";
import apiUrl from "../../constant/Constant";

import { CategoryWrapper, Wrapper } from "./StyledComponent";
import { CarouselComponent } from "../../common/Carousel";
import { CategoryComponent } from "../../common/Category";

export default function Home() {
  const history = useHistory();
  const [categorydata, setCategorydata] = useState([]);
  const [bannerData, setBanner] = useState([]);
  const { dispatch } = useContext(AppContext);
  const cataegoryData = async () => {
    const [categoriesVal, error] = await getDataFromAPI({
      url: `${apiUrl}/categories`,
      type: "GET",
    });
    console.log(categoriesVal);
    if (!error) setCategorydata([...categoriesVal]);
  };

  useEffect(() => {
    cataegoryData();
    // categories api response
  }, []);

  const banner = async () => {
    const [bannersList, error] = await getDataFromAPI({
      url: `${apiUrl}/banners`,
      type: "GET",
    }); //Banners api response
    console.log(bannersList);
    if (!error) {
      setBanner([...bannersList]);
    }
  };

  useEffect(() => {
    banner();
  }, []);

  const handleCategoryClick = (id) => {
    dispatch({ type: HANDLE_CLICK_FROM_HOMESCREEN, payload: id });
    history.push("./product");
  };

  return (
    <Wrapper>
      <Container className="category my__carousel_main ">
        <CarouselComponent data={bannerData} />
      </Container>
      <Container>
        <CategoryWrapper>
          <CategoryComponent
            data={categorydata}
            onClick={handleCategoryClick}
          />
        </CategoryWrapper>
      </Container>
    </Wrapper>
  );
}
