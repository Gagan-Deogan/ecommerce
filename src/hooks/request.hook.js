import { useState, useEffect } from "react";
import { request } from "utils";
import axios from "axios";

export const useRequest = (endpoint) => {
  const [status, setStatus] = useState("IDLE");
  const [data, setData] = useState();
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        console.log("!here");
        const res = await request("get", endpoint, undefined, {
          cancelToken: source.token,
        });
        console.log(res);
        if ("data" in res) {
          setData(res.data);
          setStatus("FULFILLED");
        } else {
          setStatus("ERROR");
        }
      })();
    }
    return () => {
      source.cancel();
    };
  }, [setStatus, status, endpoint]);

  const isLoading = status === "IDLE" || status === "PENDING";
  const isError = status === "ERROR";
  const retry = () => {
    setStatus("IDLE");
  };
  return { data, isLoading, isError, retry };
};
