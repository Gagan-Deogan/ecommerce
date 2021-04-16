import React, { useEffect } from "react";
import { CloseIcon } from "../../assests";
import { CheckIcon } from "../../assests";
import { useSnakbarContext } from "../../Context";
import "./snakbar.css";
export const Snakbar = () => {
  const { snakbarStatus, snakbarDispatch } = useSnakbarContext();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      snakbarDispatch({ type: "INITAIL" });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const checkTypeOfSnakbar = (type) => {
    switch (type) {
      case "ERROR":
        return "snakbar-err";
      case "SUCCESS":
        return "snakbar-suc";
      case "WARNING":
        return "snakbar-war";
      default:
        return "snakbar";
    }
  };

  const snakbarType = checkTypeOfSnakbar(snakbarStatus["alertType"]);
  return (
    <div className={snakbarType}>
      <CheckIcon />
      <h5>{snakbarStatus["msg"]}</h5>
      <button className="btn-link">
        <CloseIcon />
      </button>
    </div>
  );
};
