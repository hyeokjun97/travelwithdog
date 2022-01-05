import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../../itemList/itemList";
import ButtonSlick from "../../slick/buttonSlick/buttonSlick";
import styles from "./mobileSearchPage.module.css";

const MobileSearchPage = (props) => {
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
        <div className={styles.item_list}>
          <ItemList itemList={jejuBest} />
        </div>
      </div>
    </div>
  );
};

export default MobileSearchPage;
