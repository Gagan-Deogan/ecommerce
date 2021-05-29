import React from "react";
import ReactDOM from "react-dom";
import "./assests/css/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthProvider";
import { CartAndWishlistProvider } from "./Context/CartAndWishlistProvider";
import { SnakbarProvider } from "./Context/SnakbarProvider";
import { LoaderProvider } from "./Context/LoaderProvider";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoaderProvider>
        <SnakbarProvider>
          <AuthProvider>
            <CartAndWishlistProvider>
              <App />
            </CartAndWishlistProvider>
          </AuthProvider>
        </SnakbarProvider>
      </LoaderProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
