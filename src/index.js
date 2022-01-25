import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./app";
import "@fortawesome/fontawesome-free/js/all.js";

window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
