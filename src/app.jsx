import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage/mainpage";
import Header from "./components/header/header";
import Map from "./components/map/map";

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
