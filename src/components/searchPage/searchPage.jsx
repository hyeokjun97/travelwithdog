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
  const [searchValue, setSearchValue] = useState("");
  const onSearchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearchSubmitHandler = () => {
    if (searchValue === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    navigate(`/search/${searchValue}`);
    window.scrollTo({ top: 0 });
  };

  const loadSearchResult = async () => {
    let tmp = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/products?keyword=${query}`
      );
      const boardList = await axios.get(
        `${process.env.REACT_APP_BASEURL}/boards`
      );
      response.data.forEach((data) => tmp.push(data));
      for (const board of boardList.data) {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/boards/${board.id}/articles?limit=1000&page=1&keyword=${query}`
        );
        tmp = tmp.concat(response.data);
      }
      setSearchResult(tmp);
    } catch (err) {
      console.error(err);
    }
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
    setSearchValue(query);
    loadSearchResult();
  }, [query]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.main_top}>
            <p className={styles.result}>{`검색결과 총 ${
              searchResult ? searchResult.length : ""
            }건`}</p>
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

          <div className={styles.result_list}>
            {searchResult ? (
              searchResult.length > 0 ? (
                <ItemList itemList={searchResult} />
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
