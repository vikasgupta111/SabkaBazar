import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
export const Wrapper = styled.div`
  margin-top: 3px;
`;

export const CategoryWrapper = styled.div`
  align-items: center;
`;

export const CategoryImg = styled.img`
  display: block;
  width: 100%;
`;

export const CategoryContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const CategoryName = styled.h5``;
export const CategoryDescription = styled.p``;

export const CategoryClick = styled.div`
  background-color: IndianRed;
  color: white;
  display: inline-block;
  padding: 0px 5px;
  cursor: pointer;
`;

export const RowBootstrap = styled(Row)`
  -webkit-box-shadow: 0 4px 4px -4px gray;
  -moz-box-shadow: 0 4px 4px -4px gray;
  box-shadow: 0 4px 4px -4px gray;
  margin-bottom: 10px;
  padding: 10px 0px;

  &:last-child {
    box-shadow: none;
  }
`;

export const CarouselWrapper = styled.div`
  -webkit-box-shadow: 0 4px 4px -4px gray;
  -moz-box-shadow: 0 4px 4px -4px gray;
  box-shadow: 0 4px 4px -4px gray;
  margin-bottom: 10px;
  padding: 10px 0px;
`;

export const ColBootstrap = styled(Col)`
  text-align: center;
`;
