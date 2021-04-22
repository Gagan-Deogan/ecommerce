import { useState } from "react";
import { useAuthContext } from "../../Context";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if (user) {
    navigate("/");
  }

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { handleLogin } = useAuthContext();
  const { state } = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, state ? state.from : "/");
  };
  return (
    <section className="column justify-center align-center">
      <h3 className="margin-t-32">Login to Roots</h3>
      <div className="card padding-64 bor-rad-8 box-shd margin-t-32">
        <form className="column" onSubmit={(e) => handleSubmit(e)} action="#">
          <section className="column margin-b-16">
            <label for="email" className="margin-b-8">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder=" "
              autocomplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section className="column margin-b-16  ">
            <label for="current-password" className="margin-b-8">
              Password
            </label>
            <input
              id="current-password"
              name="current-password"
              type="password"
              autocomplete="current-password"
              aria-describedby="password-constraints"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <button
              id="toggle-password"
              type="button"
              aria-label="Show password as plain text. Warning: this will display your password on the screen.">
              Show password
            </button> */}
            {/* <div id="password-constraints">
              Eight or more characters, with at least one&nbsp;lowercase and one
              uppercase letter.
            </div> */}
          </section>
          {/* <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input> */}
          {/* <input
            type="password"
            placeholder="Password"
            className="margin-t-32 "
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input> */}
          {/* <div className="text-help">Help text</div> */}
          <button className="btn-pry-fil margin-t-32 w12">Login</button>
        </form>
      </div>
    </section>
  );
};
