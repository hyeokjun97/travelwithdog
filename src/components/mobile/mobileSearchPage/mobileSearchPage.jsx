import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../../itemList/itemList";
import ButtonSlick from "../../slick/buttonSlick/buttonSlick";
import styles from "./mobileSearchPage.module.css";
import axios from "axios";
import LoadingPage from "../../loadingPage/loadingPage";

const MobileSearchPage = ({ categoryList }) => {
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [sortResult, setSortResult] = useState(null);

  const [selected, setSelected] = useState("전체");

  const [sortValue, setSortValue] = useState("최신순");

  const onSelectChangeHandler = (item) => {
    setSelected(item.name);
  };

  const onSortValueChangeHandler = (value) => {
    setSortValue(value);
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

  useEffect(() => {
    setSearchResult(null);
    setSortResult(null);
    loadSearchResult();
  }, [query]);

  return (
    <div className={styles.page}>
      <div className={styles.text_container}>
        <p className={styles.title}>{`${query} 검색결과`}</p>
        <p className={styles.number}>{`${
          sortResult ? sortResult.length : " "
        }건의 검색결과`}</p>
      </div>
      <div className={styles.button_container}>
        {selected && categoryList && (
          <ButtonSlick
            buttonList={categoryList}
            selected={selected}
            onSelectChangeHandler={onSelectChangeHandler}
            where="search"
          />
        )}
      </div>
      <div className={styles.divide_line}></div>
      <div className={styles.main}>
        <div className={styles.sort_container}>
          <ul className={styles.sort_list}>
            <li
              className={`${
                sortValue === "최신순"
                  ? `${styles.sort_button} ${styles.sort_on}`
                  : `${styles.sort_button}`
              }`}
              onClick={() => onSortValueChangeHandler("최신순")}
            >
              최신순
            </li>
            <li
              className={`${
                sortValue === "리뷰많은순"
                  ? `${styles.sort_button_mid} ${styles.sort_on}`
                  : `${styles.sort_button_mid}`
              }`}
              onClick={() => onSortValueChangeHandler("리뷰많은순")}
            >
              리뷰많은순
            </li>
            <li
              className={`${
                sortValue === "평점높은순"
                  ? `${styles.sort_button} ${styles.sort_on}`
                  : `${styles.sort_button}`
              }`}
              onClick={() => onSortValueChangeHandler("평점높은순")}
            >
              평점높은순
            </li>
          </ul>
        </div>
        <div className={styles.item_list}>
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
  );
};

export default MobileSearchPage;
