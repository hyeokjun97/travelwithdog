import React, { useState, useEffect, useCallback } from "react";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage/mainpage";
import Header from "./components/header/header";
import Map from "./components/map/map";
import Footer from "./components/footer/footer";
import CategoryPage from "./components/categoryPage/categoryPage";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Rentcar from "./components/rentcar/rentcar";
import Mypage from "./components/mypage/mypage";
import MobileMypage from "./components/mobile/mobileMypage/mobileMypage";
import MobileMypageDetail from "./components/mobile/mobileMypage/mobileMypageDetail/mobileMypageDetail";
import MobileFooter from "./components/mobile/mobileFooter/mobileFooter";
import MobileHeader from "./components/mobile/mobileHeader/mobileHeader";
import MobileCategory from "./components/mobile/mobileCategory/mobileCategory";
import axios from "axios";
import Find from "./components/find/find";
import SearchPage from "./components/searchPage/searchPage";
import MobileSearchPage from "./components/mobile/mobileSearchPage/mobileSearchPage";
import ProductDetail from "./components/productDetail/productDetail";
import ReservationPage from "./components/reservationPage/reservationPage";
import ArticleView from "./components/articleView/articleView";
import ArticleWrite from "./components/articleWrite/articleWrite";
import CarSearchPage from "./components/carSearchPage/carSearchPage";
import CarDetail from "./components/carDetail/carDetail";
import MobileCarSearch from "./components/mobile/mobileCarSearch/mobileCarSearch";
import TestPage from "./components/testPage/testPage";
import NewsView from "./components/newsView/newsView";
import Introduce from "./components/introduce/introduce";
import CommunityPage from "./components/communityPage/communityPage";
import { debounce } from "lodash";

//페이지 리로딩 시 로딩 페이지 띄우기
const App = (props) => {
  const [deviceSize, setDeviceSize] = useState(() => {
    if (window.innerWidth > 1100) {
      return true;
    }
    return false;
  });
  //차량 구분, 연료 구분 코드
  const [carCode, setCarCode] = useState(null);
  const [loginPopupOn, setLoginPopupOn] = useState(false);
  const [signupPopupOn, setSignupPopupOn] = useState(false);
  const [findPopupOn, setFindPopupOn] = useState(false);

  //임시데이터
  const [chabak, setChabak] = useState([
    {
      idx: 0,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "스코틀랜드 아일랜드 8일간의 여행",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 1,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "제주도 차박",
      type: "패키지",
      price: 20000,
    },
    {
      idx: 2,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/7511/296672_medium_1544173662.jpg?1544173662",
      title: "바티칸투어",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 3,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/70816/595376_medium_1638331669.jpg?1638331669",
      title: "롯데월드 입장권",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 4,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "올 오브 피렌체",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 5,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "제주도차박",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 6,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/53556/592873_medium_1636329887.jpg?1636329887",
      title: "제주 아쿠아플라넷 입장권",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 7,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/100746/548935_medium_1608107406.jpg?1608107406",
      title:
        "[바티칸 공인가이드] 이것이 베테랑 클라쓰! 에너지 넘치는 바티칸 반일 투어!",
      type: "투어패키지",
      price: 20000,
    },
  ]);

  const [jejuBest, setJejuBest] = useState([
    {
      idx: 0,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "스코틀랜드 아일랜드 8일간의 여행",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 1,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "올 오브 피렌체",
      type: "숙소",
      price: 20000,
    },
    {
      idx: 2,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/7511/296672_medium_1544173662.jpg?1544173662",
      title: "바티칸투어",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 3,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/70816/595376_medium_1638331669.jpg?1638331669",
      title: "롯데월드 입장권",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 4,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "올 오브 피렌체",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 5,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "제주도차박",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 6,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/53556/592873_medium_1636329887.jpg?1636329887",
      title: "제주 아쿠아플라넷 입장권",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 7,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/100746/548935_medium_1608107406.jpg?1608107406",
      title:
        "[바티칸 공인가이드] 이것이 베테랑 클라쓰! 에너지 넘치는 바티칸 반일 투어!",
      type: "투어패키지",
      price: 20000,
    },
  ]);

  //카테고리 리스트 - 메뉴의 구성 요소 그리고 그것을 클릭했을 때 어떤 페이지로 이동하는지 그리고 그 페이지에 어떤 것을 표시할 것인지 필요
  //현재 상태에서 어떤 타입의 섹션으로 어떤 상품들 나오게 할 것인지 추가해야함
  //배경 이미지도 경로 넣어야함
  const [categoryList, setCategoryList] = useState(null);

  const loginPopupHandler = useCallback(() => {
    setLoginPopupOn(true);
  }, []);

  const signupPopupHandler = () => {
    setSignupPopupOn(true);
  };

  const findPopupHandler = () => {
    setFindPopupOn(true);
  };

  const onCloseButtonHandler = () => {
    setLoginPopupOn(false);
    setSignupPopupOn(false);
    setFindPopupOn(false);
  };

  const loadPageList = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/site/pages`)
      .then((response) => setCategoryList(response.data.navigations))
      .catch((err) => console.error(err));
  };

  const loadPageData = (query, settingPageData) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/site/pages/${query}`)
      .then((response) => settingPageData(response.data))
      .catch((err) => console.error(err));
  };

  const loadCarCode = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/codes?keys[]=rentcar_class_codes&keys[]=rentcar_fuel_codes`
      )
      .then((response) => setCarCode(response.data))
      .catch((err) => console.error(err));
  };

  const checkLoginState = () => {
    if (!localStorage.getItem("AK")) {
      console.log("NO ACCESS TOKEN");
      return false;
    } else {
      const now = new Date().getTime();
      const expiredTime = localStorage.getItem("exp");
      if (Number(expiredTime) - now <= 30 * 1000) {
        console.log("REMOVE");
        localStorage.removeItem("AK");
        localStorage.removeItem("RK");
        localStorage.removeItem("exp");
        return false;
      } else if (Number(expiredTime) - now < 10 * 60 * 1000) {
        console.log("REFRESH");
        axios
          .patch(`${process.env.REACT_APP_BASEURL}/auth/refresh`, {
            refresh_token: localStorage.getItem("RK").slice(7),
          })
          .then((response) => {
            console.log("REFRESH SUCCESS");
            localStorage.setItem("AK", `Bearer ${response.data.access_token}`);
            localStorage.setItem("RK", `Bearer ${response.data.refresh_token}`);
            localStorage.setItem(
              "exp",
              new Date().getTime() + response.data.expires_in
            );
            return true;
          })
          .catch((err) => {
            console.log("REFRESH FAILED");
            console.error(err);
            return false;
          });
      } else {
        console.log("LOGGED IN !!");
        return true;
      }
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return checkLoginState();
  });

  const keyHandler = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    setLoginPopupOn(false);
    setSignupPopupOn(false);
    setFindPopupOn(false);
  };

  const onDeviceSizeChangeHandler = debounce(() => {
    if (window.innerWidth > 1100) {
      setDeviceSize(true);
    } else {
      setDeviceSize(false);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", onDeviceSizeChangeHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("resize", onDeviceSizeChangeHandler);
    };
  }, [keyHandler]);

  //컴포넌트 마운트 시에 불러오기
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    loadPageList();
    loadCarCode();
  }, []);

  useEffect(() => {
    setIsLoggedIn(checkLoginState());
  }, [localStorage.getItem("AK")]);

  return (
    <div className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {deviceSize ? (
          categoryList && (
            <Header
              isLoggedIn={isLoggedIn}
              categoryList={categoryList}
              loginPopupHandler={loginPopupHandler}
              signupPopupHandler={signupPopupHandler}
            />
          )
        ) : (
          <MobileHeader />
        )}
        {loginPopupOn && (
          <div className={styles.filter}>
            <Login
              onCloseButtonHandler={onCloseButtonHandler}
              signupPopupHandler={signupPopupHandler}
              findPopupHandler={findPopupHandler}
            />
          </div>
        )}
        {signupPopupOn && (
          <div className={styles.filter}>
            <Signup onCloseButtonHandler={onCloseButtonHandler} />
          </div>
        )}
        {findPopupOn && (
          <div className={styles.filter}>
            <Find onCloseButtonHandler={onCloseButtonHandler} />
          </div>
        )}
        <Routes>
          {categoryList && (
            <Route
              path="/"
              element={
                <Mainpage deviceSize={deviceSize} loadPageData={loadPageData} />
              }
            ></Route>
          )}

          <Route
            path="/category/:path"
            element={
              categoryList &&
              (deviceSize ? (
                <CategoryPage
                  categoryList={categoryList}
                  loadPageData={loadPageData}
                />
              ) : (
                <MobileCategory
                  categoryList={categoryList}
                  loadPageData={loadPageData}
                />
              ))
            }
          ></Route>

          <Route
            path="/rentcar"
            element={<Rentcar loadPageData={loadPageData} />}
          ></Route>

          <Route
            path="/community/:boardId"
            element={<CommunityPage isLoggedIn={isLoggedIn} />}
          ></Route>
          {deviceSize ? (
            <Route path="/search/:query" element={<SearchPage />}></Route>
          ) : (
            <Route
              path="/search/:query"
              element={<MobileSearchPage categoryList={categoryList} />}
            ></Route>
          )}
          <Route
            path="/map"
            element={<Map deviceSize={deviceSize} isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/mypage/:path"
            element={<Mypage isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/mobile/mypage"
            element={
              <MobileMypage
                isLoggedIn={isLoggedIn}
                loginPopupHandler={loginPopupHandler}
                signupPopupHandler={signupPopupHandler}
              />
            }
          ></Route>
          <Route
            path="/mobile/mypage/:path"
            element={<MobileMypageDetail isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/product/:path"
            element={<ProductDetail deviceSize={deviceSize} />}
          ></Route>
          <Route path="/res" element={<ReservationPage />}></Route>
          <Route path="/article/:articleId" element={<ArticleView />}></Route>
          <Route
            path="/articlew"
            element={<ArticleWrite isLoggedIn={isLoggedIn} />}
          ></Route>
          {carCode &&
            (deviceSize ? (
              <Route
                path="/carsearch/:pickup/:dropoff"
                element={<CarSearchPage carCode={carCode} />}
              ></Route>
            ) : (
              <Route
                path="/carsearch/:pickup/:dropoff"
                element={<MobileCarSearch carCode={carCode} />}
              ></Route>
            ))}
          <Route
            path="/cardetail/:carId/:businessId/:pickupDateTime/:dropoffDateTime"
            element={<CarDetail />}
          ></Route>
          <Route path="/testroute" element={<TestPage />}></Route>
          <Route path="/news" element={<NewsView />}></Route>
          <Route path="/introduce/:path" element={<Introduce />}></Route>
        </Routes>

        {deviceSize ? (
          <Footer />
        ) : (
          categoryList && <MobileFooter categoryList={categoryList} />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
