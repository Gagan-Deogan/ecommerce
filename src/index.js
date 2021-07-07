import React from "react";
import ReactDOM from "react-dom";
import "./assests/css/index.css";
import App from "./App.jsx";
import { AuthProvider } from "context/AuthProvider";
import { CartAndWishlistProvider } from "context/CartAndWishlistProvider";
import { SnakbarProvider } from "context/SnakbarProvider";
import { LoaderProvider } from "context/LoaderProvider";
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
