import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_TO_CART } from "./context/actionTypes";

function useApiData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  async function getDataFromAPI(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  useEffect(() => {
    getDataFromAPI(url);
  }, [url]);

  return data;
}

export function PostApiCall(itemToBeAdded, productID, dispatch) {
  async function addToCart(itemToBeAdded, productID) {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: "http://localhost:5000/addToCart",
      data: productID,
    }).then((res) => {
      console.log(res);
      dispatch({ type: ADD_TO_CART, payload: itemToBeAdded });
    });
  }
  addToCart(itemToBeAdded, productID);
}

export default useApiData;
