import React from "react";
import { Col } from "react-bootstrap";
import {
  CategoryImg,
  CategoryContent,
  CategoryName,
  CategoryClick,
  CategoryDescription,
  RowBootstrap,
  ColBootstrap,
} from "../../pages/Home/StyledComponent";

const CategoryComponent = (props) => {
  return (
    <div>
      {props.data &&
        props.data.map((item, indx) => {
          if (indx % 2 === 0) {
            return (
              <RowBootstrap key={item.id}>
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
                <ColBootstrap xs={7}>
                  <CategoryContent>
                    <CategoryName>{item.name}</CategoryName>
                    <CategoryDescription>
                      {item.description}
                    </CategoryDescription>
                    <CategoryClick
                      onClick={() => {
                        props.onClick(item.id);
                      }}
                    >
                      {`Explore ${item.key}`}
                    </CategoryClick>
                  </CategoryContent>
                </ColBootstrap>
              </RowBootstrap>
            );
          } else {
            return (
              <RowBootstrap key={item.id}>
                <ColBootstrap xs={7}>
                  <CategoryContent>
                    <CategoryName>{item.name}</CategoryName>
                    <CategoryDescription>
                      {item.description}
                    </CategoryDescription>
                    <CategoryClick
                      onClick={() => {
                        props.onClick(item.id);
                      }}
                    >
                      {`Explore ${item.key}`}
                    </CategoryClick>
                  </CategoryContent>
                </ColBootstrap>

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
              </RowBootstrap>
            );
          }
        })}
    </div>
  );
};

export default CategoryComponent;
