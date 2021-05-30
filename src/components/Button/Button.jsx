import { useState } from "react";
import { Spinner } from "Components/Spinner";
export const Button = ({ className, onClick, children }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    await onClick().then(() => setLoading(false));
  };
  return (
    <button
      className={`${className} ${loading && "btn-dis"} `}
      onClick={(e) => handleClick(e)}
      disabled={loading}>
      {loading ? <Spinner /> : children}{" "}
    </button>
  );
};
