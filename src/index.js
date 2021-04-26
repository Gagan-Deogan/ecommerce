import React from "react";
import ReactDOM from "react-dom";
import "./assests/css/index.css";
import App from "./App.jsx";
import {
  LoaderContextProvider,
  CartContextProvider,
  SnakbarContextProvider,
  AuthProvider,
} from "./Context";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <LoaderContextProvider>
          <SnakbarContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </SnakbarContextProvider>
        </LoaderContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
