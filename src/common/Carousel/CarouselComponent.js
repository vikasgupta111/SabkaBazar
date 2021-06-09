import React from "react";
import { Carousel } from "react-bootstrap";
import { CarouselWrapper } from "../../pages/Home/StyledComponent";

const CarouselComponent = ({ data }) => {
  return (
    <CarouselWrapper>
      <Carousel
        interval={1000}
        controls={window.innerWidth >= 768 ? true : false}
        indicators={true}
        autoPlay={true}
      >
        {data
          .map((item) => (
            <img
              key={item.id}
              width="90%"
              src={`${item.bannerImageUrl}`}
              alt={item.bannerImageAlt}
            />
          ))
          .map((item) => {
            return <Carousel.Item key={item.id}>{item}</Carousel.Item>;
          })}
      </Carousel>
    </CarouselWrapper>
  );
};
export default CarouselComponent;
