import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { setupMockServer } from "./mock-server/server.js";
import {
  LoaderContextProvider,
  CartContextProvider,
  SnakbarContextProvider,
} from "./Context";
import { BrowserRouter as Router } from "react-router-dom";
setupMockServer();
ReactDOM.render(
  <React.StrictMode>
    <LoaderContextProvider>
      <CartContextProvider>
        <SnakbarContextProvider>
          <Router>
            <App />
          </Router>
        </SnakbarContextProvider>
      </CartContextProvider>
    </LoaderContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
