import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarSlick from "../slick/carSlick/carSlick";
import ItemSlickFour from "../slick/itemSlickFour/itemSlickFour";
import ItemSlickOne from "../slick/itemSlickOne/itemSlickOne";
import ItemSlickThree from "../slick/itemSlickThree/itemSlickThree";
import ItemSlickTwo from "../slick/itemSlickTwo/itemSlickTwo";
import TagButton from "../tagButton/tagButton";
import styles from "./mainpage.module.css";
import MainpageMapItem from "./mainpageMapItem/mainpageMapItem";

const Mainpage = ({
  chabak,
  jejuBest,
  hotList,
  tagButtonList,
  spotList,
  deviceSize,
}) => {
  const navigate = useNavigate();
  const listRef = useRef([]);
  const [regionSelect, setRegionSelect] = useState("제주");

  const onRegionChangeHandler = (e) => {
    setRegionSelect(e.target.innerText);
  };

  const setObserver = () => {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("DSd");
          entry.target.style.visibility = "visible";
        } else {
          console.log("NOT");
          entry.target.style.visibility = "hidden";
        }
      });
    });
    listRef.current.forEach((entry) => {
      observer.observe(entry);
    });
  };
  useEffect(() => {
    setObserver();
  }, []);
  return (
    <div className={styles.mainpage}>
      <div className={styles.top_banner}>
        <div className={styles.top_filter}>
          <p className={styles.title}>사랑하는 댕댕이와 함께하는 추억여행,</p>
          <p className={styles.title_two}>트래블위드독이 함께합니다.</p>
          <p className={styles.subtitle}>
            중/대형견과 함께하는 여행이 어렵다고요? 중/대형견 전용 렌터카를
            찾아보세요.
          </p>
          <div className={styles.search_and_tag_container}>
            <div className={styles.search_container}>
              <input
                type="text"
                className={styles.search_input}
                placeholder="원하시는 키워드로 검색해보세요"
              />
              <div
                className={styles.search_icon_container}
                onClick={() => {
                  deviceSize
                    ? navigate("/mypage/edit")
                    : navigate("/mobile/mypage");
                }}
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
        <div className={styles.list_container}>
          <p className={styles.list_title}>양양/속초 반려견 여행 BEST</p>
          <ItemSlickOne viewItems={jejuBest} />
        </div>
        <div className={styles.map_part}>
          <img
            src="/travelWithDog/images/map_logo.png"
            alt="meongji_logo"
            className={styles.map_logo}
          />
          <p className={styles.map_title}>반려여행을 위한 공공지도</p>
          <p className={styles.map_subtitle}>반려견과 어디를 가야할까?</p>
          <p>
            <b>반려견 동반</b>이 가능한 <b>식당, 카페, 여행지, 숙소</b>가 모두
            지도 안에!
          </p>
          <div className={styles.map_main}>
            <div className={styles.map}></div>
            <div className={styles.map_list}>
              {spotList.map((spot) => (
                <MainpageMapItem key={spot.id} item={spot} />
              ))}
            </div>
          </div>
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
