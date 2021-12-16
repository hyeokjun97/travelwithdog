import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage/mainpage";
import Header from "./components/header/header";
import Map from "./components/map/map";
import Footer from "./components/footer/footer";
import CategoryPage from "./components/categoryPage/categoryPage";

const App = (props) => {
  //메인페이지의 타이틀, 서브타이틀, 태그키워드 목록(예상) 들어가는 곳
  const [mainPageInfo, setMainPageInfo] = useState({
    title: "사랑하는 댕댕이와 함께하는 추억여행,\n트래블위드독이 함께합니다.",
    subtitle:
      "중/대형견과 함께하는 여행이 어렵다고요? 중/대형견 전용 렌터카를 찾아보세요.",
    tagList: ["렌터카", "당일치기", "대형견", "제주도"],
  });

  return (
    <div>
      <BrowserRouter>
        {categoryList && <Header categoryList={categoryList} />}
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

          {categoryList && (
            <Route
              path="/category/:path"
              element={<CategoryPage categoryList={categoryList} />}
            ></Route>
          )}
          <Route path="/map" element={<Map />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
