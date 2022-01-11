import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = ({ url, headers }:{url:string, headers:{}}, loadInInterval =false) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios.get(url, headers)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
    let interval: any;
    if(loadInInterval){
       interval = setInterval(() => {
        fetchData();
      }, 30000);
    }
   return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return { response, error, loading };
};
