import "./index.css";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../../assests/icons";
export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="column w12 align-center padding-64">
      <NotFound />
      <h2 className="bold text-center text-primary margin-t-16">Oh no!</h2>
      <p className="text-center sm-w10 md-w6 w4 margin-t-8">
        We're usually a treasure chest of knowledge, but we Couldn't find what
        you'r looking for.
      </p>
      <button className="btn-pry-fil margin-t-16" onClick={() => navigate("/")}>
        Back To Home
      </button>
    </section>
  );
};
