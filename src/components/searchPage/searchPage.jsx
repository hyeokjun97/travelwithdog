import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemList from "../itemList/itemList";
import styles from "./searchPage.module.css";

const SearchPage = (props) => {
  //컴포넌트 마운트 시 마다 서버 요청해서 결과값 받아오고 분류, 정렬 선택 여부로 보여주기
  const navigate = useNavigate();
  const { query } = useParams();
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
  const [searchValue, setSearchValue] = useState("");
  const onSearchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const [classSelect, setClassSelect] = useState("전체");
  const [sortSelect, setSortSelect] = useState("최신순");

  const onClassSelectChangeHandler = (e) => {
    if (e.target.tagName === "P") {
      setClassSelect(e.target.innerText);
    } else if (e.target.tagName === "INPUT") {
      setClassSelect(e.target.name);
    }
  };

  const onSortSelectChangeHandler = (e) => {
    if (e.target.tagName === "P") {
      setSortSelect(e.target.innerText);
    } else if (e.target.tagName === "INPUT") {
      setSortSelect(e.target.name);
    }
  };

  const onSearchSubmitHandler = () => {
    if (searchValue === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    navigate(`/search/${searchValue}`);
    window.scrollTo({ top: 0 });
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

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <aside className={styles.side_menu}>
          <div className={styles.search_part}>
            <div className={styles.search_container}>
              <input
                value={searchValue}
                onChange={onSearchValueChangeHandler}
                type="text"
                className={styles.search_input}
                data-name="search_input"
                spellCheck="false"
                placeholder="검색"
              />
              <div
                className={styles.search_icon_container}
                onClick={onSearchSubmitHandler}
              >
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
            </div>
          </div>
          <div className={styles.division_part}>
            <p className={styles.side_menu_title}>분류</p>
            <div className={styles.checkbox_list}>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="전체"
                  checked={classSelect === "전체" ? true : false}
                  onChange={onClassSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onClassSelectChangeHandler}
                >
                  전체
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="숙소"
                  checked={classSelect === "숙소" ? true : false}
                  onChange={onClassSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onClassSelectChangeHandler}
                >
                  숙소
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="패키지"
                  checked={classSelect === "패키지" ? true : false}
                  onChange={onClassSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onClassSelectChangeHandler}
                >
                  패키지
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="교통편"
                  checked={classSelect === "교통편" ? true : false}
                  onChange={onClassSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onClassSelectChangeHandler}
                >
                  교통편
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="커뮤니티"
                  checked={classSelect === "커뮤니티" ? true : false}
                  onChange={onClassSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onClassSelectChangeHandler}
                >
                  커뮤니티
                </p>
              </div>
            </div>
          </div>
          <div className={styles.sort_part}>
            <p className={styles.side_menu_title}>정렬</p>
            <div className={styles.checkbox_list}>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="최신순"
                  checked={sortSelect === "최신순" ? true : false}
                  onChange={onSortSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onSortSelectChangeHandler}
                >
                  최신순
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="리뷰많은순"
                  checked={sortSelect === "리뷰많은순" ? true : false}
                  onChange={onSortSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onSortSelectChangeHandler}
                >
                  리뷰많은순
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="평점높은순"
                  checked={sortSelect === "평점높은순" ? true : false}
                  onChange={onSortSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onSortSelectChangeHandler}
                >
                  평점높은순
                </p>
              </div>
            </div>
          </div>
        </aside>
        <div className={styles.main}>
          <p className={styles.result}>{`검색결과 총 ${255}건`}</p>
          <p className={styles.division_name}>숙소 (126)</p>
          <div className={styles.result_list}>
            <ItemList itemList={jejuBest} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
