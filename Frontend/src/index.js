import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./fonts/Nunito/Nunito-Regular.ttf";
import { history } from "./utils/history.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router history={history}>
      <ToastContainer />
      <App />
    </Router>
  </React.StrictMode>
);
