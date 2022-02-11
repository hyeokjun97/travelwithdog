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
          searchResult ? searchResult.length : " "
        }건의 검색결과`}</p>
      </div>
      <div className={styles.divide_line}></div>
      <div className={styles.main}>
        <div className={styles.item_list}>
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
  );
};

export default MobileSearchPage;
