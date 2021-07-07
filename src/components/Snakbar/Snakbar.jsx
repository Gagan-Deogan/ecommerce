import "./snakbar.css";
import { useEffect } from "react";
import { CloseIcon, CheckIcon, ErrorIcon } from "assests/icons";
import { useSnakbar } from "context/SnakbarProvider";

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

export const Snakbar = () => {
  const { snakbarStatus, snakbarDispatch } = useSnakbar();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      snakbarDispatch({ type: "INITAIL" });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const type = snakbarStatus["alertType"];

  const snakbarType = checkTypeOfSnakbar(type);

  return (
    <div className={snakbarType}>
      {type === "SUCCESS" && <CheckIcon />}
      {type === "ERROR" && <ErrorIcon />}
      <h5>{snakbarStatus["msg"]}</h5>
      <button className="btn-link">
        <CloseIcon />
      </button>
    </div>
  );
};
