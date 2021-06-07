import axios from "axios";
import { useEffect, useState } from "react";
export default function usePostApi(productID) {
  const [data, setData] = useState([]);

  async function addToCart(productID) {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: "http://localhost:5000/addToCart",
      data: productID,
    }).then((res) => {
      console.log(res);
      setData(res);
    });
  }

  useEffect(() => {
    addToCart(productID);
  }, [productID]);

  return data;
}
