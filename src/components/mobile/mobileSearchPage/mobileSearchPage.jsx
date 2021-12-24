import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSlick from "../../slick/buttonSlick/buttonSlick";
import styles from "./mobileSearchPage.module.css";

const MobileSearchPage = (props) => {
  const { query } = useParams();
  const [selected, setSelected] = useState({
    id: 1,
    title: "전체",
  });
  const [buttonList, setButtonList] = useState([
    {
      id: 1,
      title: "전체",
    },
    {
      id: 2,
      title: "숙소",
    },
    {
      id: 3,
      title: "패키지",
    },
    {
      id: 4,
      title: "교통편",
    },
    {
      id: 5,
      title: "렌터카",
    },
    {
      id: 5,
      title: "커뮤니티",
    },
  ]);
  const [sortValue, setSortValue] = useState("최신순");

  const onSelectChangeHandler = (item) => {
    setSelected(item);
  };

  const onSortValueChangeHandler = (value) => {
    setSortValue(value);
  };

  return (
    <div className={styles.page}>
      <div className={styles.text_container}>
        <p className={styles.title}>{`${query} 검색결과`}</p>
        <p className={styles.number}>{`${12}건의 검색결과`}</p>
      </div>
      <div className={styles.button_container}>
        {selected && (
          <ButtonSlick
            buttonList={buttonList}
            selected={selected}
            onSelectChangeHandler={onSelectChangeHandler}
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
      </div>
    </div>
  );
};

export default MobileSearchPage;
