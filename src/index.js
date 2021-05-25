import React from "react";
import ReactDOM from "react-dom";
import "./assests/css/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext";
import { CartContextProvider } from "./Context/CartContext";
import { SnakbarContextProvider } from "./Context/SnakbarContext";
import { LoaderContextProvider } from "./Context/LoaderContext";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoaderContextProvider>
        <AuthProvider>
          <SnakbarContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </SnakbarContextProvider>
        </AuthProvider>
      </LoaderContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
