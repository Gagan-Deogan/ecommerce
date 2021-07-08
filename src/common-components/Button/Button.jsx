import { useState } from "react";
import { Spinner } from "common-components/Spinner";
export const Button = ({ className, onClick, children, disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    await onClick().then(() => setLoading(false));
  };
  return (
    <button
      className={`${className} ${loading && "btn-dis"} `}
      onClick={(e) => handleClick(e)}
      disabled={loading || disabled}>
      {loading ? <Spinner /> : children}{" "}
    </button>
  );
};
