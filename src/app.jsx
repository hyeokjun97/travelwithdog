import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage/mainpage";
import Header from "./components/header/header";
import Map from "./components/map/map";

const App = (props) => {
  const [tagButtonList, setTagButtonList] = useState([
    "렌터카",
    "당일치기",
    "대형견",
    "제주도",
  ]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Mainpage
                chabak={chabak}
                jejuBest={jejuBest}
                hotList={hotList}
                tagButtonList={tagButtonList}
              />
            }
          ></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
