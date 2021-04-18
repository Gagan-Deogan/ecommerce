import { useState, useEffect } from "react";

export const Hidden = ({ children, hideAt = "sm" }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  switch (hideAt) {
    case "sm":
      return <>{windowWidth < 600 ? "" : children}</>;
    case "md":
      return <>{windowWidth < 900 ? "" : children}</>;
    default:
      return <>{children}</>;
  }
};
