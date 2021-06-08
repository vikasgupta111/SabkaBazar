import styled from "styled-components";

export const CartWrapper = styled.div`
  width: 100%;
`;

export const CartHeader = styled.div`
  display: flex;
  background-color: black;
  color: white;

  @media only screen and (max-width: 1024px) {
    display: flex;
    background-color: white;
    color: black;
    margin-top: 12px;
  }
`;
export const CartContent = styled.div`
  overflow-y: scroll;
  background-color: rgb(245, 241, 241);
  flex-grow: 1;
  max-width: 100%;
  overflow-x: hidden;
`;
export const EmptyCartWrapper = styled.div`
  @media only screen and (max-width: 1024px) {
    background-color: white;

    button {
      margin: 0;
      position: absolute;
      background-color: IndianRed;
      border: none;
      outline: none;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -155%);
    }
  }

  @media only screen and (min-width: 1025px) {
    height: 100%;
    background-color: white;

    button {
      margin: 0;
      position: absolute;
      background-color: IndianRed;
      border: none;
      outline: none;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, 65%);
    }
  }
`;
export const EmptyCart = styled.div`
  @media only screen and (max-width: 1024px) {
    height: 50%;
    text-align: center;
    padding: 20% 0;
  }
  @media only screen and (min-width: 1025px) {
    height: 90%;
    text-align: center;
    padding: 50% 0;
  }
`;

export const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  background-color: white;
  border: none;
`;

export const ButtonCheckout = styled.button`
  margin: auto;
  width: 90%;
  position: absolute;
  background-color: IndianRed;
  border: none;
  outline: none;
  color: white;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, 65%);
`;

export const CounterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 20px;
  width: 20px;
  border: none;
  border-radius: 50%;
  background-color: IndianRed;
  cursor: pointer;
`;

export const ItemTotalCost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export const LowestPrice = styled.div`
  display: flex;
  margin: 14px 10px;
  padding: 10px;
  align-items: center;
  background-color: white;
`;

export const MainWrapper = styled.div`
  background-color: rgba(17, 17, 17, 0.2);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

export const CartBackground = styled.div`
  @media only screen and (min-width: 1025px) {
    margin: 0px 0px;
    position: absolute;
    width: 30%;
    right: 5%;

    bottom: 0;
    height: 90%;
    display: flex;

    flex-direction: column;
    background-color: white;
  }
  @media only screen and (max-width: 1024px) {
    margin: 0px 0px;
    position: absolute;
    width: 100%;
    right: 0%;
    bottom: 0;
    height: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
`;

export const CloseIcon = styled.div`
  margin-left: auto;
  margin-right: 12px;
  cursor: pointer;
`;

export const CartItem = styled.div`
  .rowItem {
    background-color: white;
    margin-top: 10px;
  }
  .itembox {
    display: flex;
    flex-direction: column;
    line-height: 15px;
    font-size: 12px;
    font-weight: bold;
    justify-content: center;
    align-items: flex-start;
  }
  .itembox div {
    display: flex;
  }
`;
