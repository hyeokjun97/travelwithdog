import React from "react";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage/mainpage";
import Header from "./components/header/header";

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
