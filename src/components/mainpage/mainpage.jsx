import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarSlick from "../slick/carSlick/carSlick";
import ItemSlickFour from "../slick/itemSlickFour/itemSlickFour";
import ItemSlickOne from "../slick/itemSlickOne/itemSlickOne";
import ItemSlickThree from "../slick/itemSlickThree/itemSlickThree";
import ItemSlickTwo from "../slick/itemSlickTwo/itemSlickTwo";
import TagButton from "../tagButton/tagButton";
import styles from "./mainpage.module.css";
import MapSection from "../mapSection/mapSection";

const Mainpage = ({
  chabak,
  jejuBest,
  hotList,
  tagButtonList,
  spotList,
  deviceSize,
  loadPageInfo,
}) => {
  const navigate = useNavigate();
  const listRef = useRef([]);
  const [pageData, setPageData] = useState(null);
  const [regionSelect, setRegionSelect] = useState("제주");
  const [searchInput, setSearchInput] = useState("");

  const onSearchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchSubmitHandler = () => {
    if (searchInput === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    navigate(`/search/${searchInput}`);
    window.scrollTo({ top: 0 });
  };

  const onRegionChangeHandler = (e) => {
    setRegionSelect(e.target.innerText);
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    //모바일에서 헤더 검색창과 중복 이벤트 발생 막기
    if (e.target.dataset.name === "search_input") {
      onSearchSubmitHandler();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);

  const settingPageData = (data) => {
    setPageData(data);
  };

  useEffect(() => {
    loadPageInfo("home", settingPageData);
  }, []);

  useEffect(() => {
    if (!pageData) {
      return;
    }
    console.log(pageData);
  }, [pageData]);

  //<div className={styles.list_container}>
  //        <p className={styles.list_title}>HOT한 여행지 순위</p>
  //        <ItemSlickTwo viewItems={hotList} />
  //      </div>
  //      <div className={styles.list_container}>
  //        <p className={styles.list_title}>현재 인기 있는 숙소</p>
  //        <ItemSlickThree viewItems={chabak} />
  //      </div>
  //      <div className={styles.list_container}>
  //        <p className={styles.list_title}>현재 인기 있는 숙소</p>
  //        <ItemSlickFour viewItems={chabak} />
  //      </div>
  //      <div className={styles.list_container}>
  //        <p className={styles.list_title}>양양/속초 반려견 여행 BEST</p>
  //        <ItemSlickOne viewItems={jejuBest} />
  //      </div>

  return (
    <div className={styles.mainpage}>
      <div
        className={styles.top_banner}
        style={
          pageData && {
            background: `url("${pageData.image_url}") center/cover no-repeat`,
          }
        }
      >
        <div className={styles.top_filter}>
          <p className={styles.title}>{pageData && pageData.title}</p>
          <p className={styles.subtitle}>{pageData && pageData.subtitle}</p>
          <div className={styles.search_and_tag_container}>
            <div className={styles.search_container}>
              <input
                value={searchInput}
                onChange={onSearchInputChangeHandler}
                type="text"
                data-name="search_input"
                className={styles.search_input}
                placeholder="원하시는 키워드로 검색해보세요"
              />
              <div
                className={styles.search_icon_container}
                onClick={onSearchSubmitHandler}
              >
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
            </div>
            <div className={styles.tag_container}>
              {tagButtonList.map((tag) => (
                <TagButton key={tag} value={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list_part}>
        {pageData &&
          pageData.sections.map((section) => (
            <div key={section.title} className={styles.list_container}>
              <p className={styles.list_title}>{section.title}</p>
              {section.subtitle && (
                <p className={styles.list_subtitle}>{section.subtitle}</p>
              )}
              <ItemSlickThree viewItems={section.items} />
            </div>
          ))}

        <div className={styles.map_part}>
          <img
            src="/travelWithDog/images/map_logo.png"
            alt="meongji_logo"
            className={styles.map_logo}
          />
          <p className={styles.map_title}>반려여행을 위한 공공지도</p>
          <p className={styles.map_subtitle}>반려견과 어디를 가야할까?</p>

          <p className={styles.map_subtitle}>
            <b>반려견 동반</b>이 가능한 <b>식당, 카페, 여행지, 숙소</b>가 모두
            지도 안에!
          </p>
          <MapSection />
        </div>
        <div className={styles.list_container}>
          <p className={styles.list_title}>가장 인기있는 펫 렌터카</p>
          <CarSlick viewItems={jejuBest} />
        </div>
        <div className={styles.region_select_container}>
          <div className={styles.region_select_bar}>
            <div
              className={`${
                regionSelect === "제주"
                  ? `${styles.region_select_button} ${styles.region_select_on}`
                  : `${styles.region_select_button}`
              }`}
              onClick={onRegionChangeHandler}
            >
              제주
            </div>
            <div
              className={`${
                regionSelect === "강원"
                  ? `${styles.region_select_button} ${styles.region_select_on}`
                  : `${styles.region_select_button}`
              }`}
              onClick={onRegionChangeHandler}
            >
              강원
            </div>
            <div
              className={`${
                regionSelect === "부산/남해"
                  ? `${styles.region_select_button} ${styles.region_select_on}`
                  : `${styles.region_select_button}`
              }`}
              onClick={onRegionChangeHandler}
            >
              부산/남해
            </div>
          </div>
          <div className={styles.region_select_list}>
            <div className={styles.list_container}>
              <p className={styles.list_title}>HOT한 여행지 순위</p>
              <ItemSlickTwo viewItems={hotList} />
            </div>
            <div className={styles.list_container}>
              <p className={styles.list_title}>현재 인기 있는 숙소</p>
              <ItemSlickThree viewItems={chabak} />
            </div>
            <div className={styles.list_container}>
              <p className={styles.list_title}>현재 인기 있는 숙소</p>
              <ItemSlickFour viewItems={chabak} />
            </div>
          </div>
        </div>
        <div className={styles.blog_part}>
          <div className={styles.list_container}>
            <p className={styles.list_title}>여행 정보 블로그</p>
            <ItemSlickTwo viewItems={chabak} />
          </div>
        </div>
        <div className={styles.bottom_part}></div>
      </div>
    </div>
  );
};
export default Mainpage;
