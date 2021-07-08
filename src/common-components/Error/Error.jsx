import { Model } from "../Model";
import { useStatus } from "context/LoaderProvider";
import { useNavigate } from "react-router-dom";
export const Error = ({ setStatus }) => {
  const navigate = useNavigate();
  const handleRetry = () => {
    setStatus("IDLE");
  };
  return (
    <Model
      isOpen={true}
      closeModel={handleRetry}
      className="justify-center align-center">
      <div className="model sm-w9 md-w5 w4 bor-rad-4 box-shd">
        <h3>Something went worng,</h3>
        <p>Please try Again Later</p>
        <div className="row justify-end align-end">
          <button className="sm-btn-pry-fil margin-t-32" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    </Model>
  );
};