import "./snakbar.css";
import { useEffect } from "react";

import { ErrorIcon, CheckIcon } from "assests/icons";
import { useSnakbar } from "context/SnakbarProvider";

const snakbarVarient = {
  ERROR: {
    className: "snakbar-err",
    icon: <ErrorIcon />,
  },
  SUCCESS: {
    className: "snakbar-suc",
    icon: <CheckIcon />,
  },
};

export const Snakbar = () => {
  const {
    snakbarStatus: { type, message },
    snakbarDispatch,
  } = useSnakbar();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      snakbarDispatch({ type: "HIDE_SNAKBAR" });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [snakbarDispatch]);

  return (
    <div className={snakbarVarient[type].className}>
      {snakbarVarient[type].icon}
      <h5>{message}</h5>
    </div>
  );
};
