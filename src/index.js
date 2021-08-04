import React from "react";
import ReactDOM from "react-dom";
import "./assests/css/index.css";
import App from "./App.jsx";
import { AuthProvider } from "context/AuthProvider";
import { CartAndWishlistProvider } from "context/CartAndWishlistProvider";
import { SnakbarProvider } from "context/SnakbarProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SnakbarProvider>
        <AuthProvider>
          <CartAndWishlistProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </CartAndWishlistProvider>
        </AuthProvider>
      </SnakbarProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
