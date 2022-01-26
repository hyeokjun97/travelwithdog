import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemList from "../itemList/itemList";
import LoadingPage from "../loadingPage/loadingPage";
import styles from "./searchPage.module.css";

const SearchPage = (props) => {
  //컴포넌트 마운트 시 마다 서버 요청해서 결과값 받아오고 분류, 정렬 선택 여부로 보여주기
  const navigate = useNavigate();
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [sortResult, setSortResult] = useState(null);
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

  const loadSearchResult = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/products?keyword=${query}`)
      .then((response) => {
        setSearchResult(response.data);
        setSortResult(response.data);
      })
      .catch((err) => console.error(err));
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
    window.addEventListener("keypress", keyHandler);

    return () => window.removeEventListener("keypress", keyHandler);
  }, [keyHandler]);

  useEffect(() => {
    setSearchResult(null);
    setSortResult(null);
    setSearchValue(query);
    loadSearchResult();
  }, [query]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.side_menu_container}>
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
        </div>
        <div className={styles.main}>
          <p className={styles.result}>{`검색결과 총 ${
            sortResult ? sortResult.length : ""
          }건`}</p>

          <div className={styles.result_list}>
            {sortResult ? (
              sortResult.length > 0 ? (
                <ItemList itemList={sortResult} />
              ) : (
                <p className={styles.nothing}>검색 결과가 없습니다</p>
              )
            ) : (
              <div className={styles.loading_container}>
                <LoadingPage />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
