import { useEffect, useState } from "react";
export default function useApiData(url) {
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
