import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./app";
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios";

//토큰 만료 시 refresh도 테스트
if (localStorage.getItem("AK")) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("AK");
}

window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
