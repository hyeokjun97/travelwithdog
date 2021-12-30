import React, { useState } from "react";
import CarItemList from "../../carItemList/carItemList";
import ButtonSlick from "../../slick/buttonSlick/buttonSlick";
import styles from "./mobileCarSearch.module.css";

const MobileCarSearch = (props) => {
  const [kindSelected, setKindSelected] = useState({
    id: 1,
    title: "전체",
  });

  const [fuelSelected, setFuelSelected] = useState({
    id: 1,
    title: "전체",
  });

  const [kindButtonList, setKindButtonList] = useState([
    {
      id: 1,
      title: "전체",
    },
    {
      id: 2,
      title: "소형",
    },
    {
      id: 3,
      title: "준중형",
    },
    {
      id: 4,
      title: "중형",
    },
    {
      id: 5,
      title: "고급",
    },
    {
      id: 5,
      title: "SUV",
    },
  ]);
  const [fuelButtonList, setFuelButtonList] = useState([
    {
      id: 1,
      title: "전체",
    },
    {
      id: 2,
      title: "휘발유",
    },
    {
      id: 3,
      title: "경유",
    },
    {
      id: 4,
      title: "LPG",
    },
    {
      id: 5,
      title: "하이브리드",
    },
    {
      id: 5,
      title: "전기",
    },
  ]);

  const onKindSelectChangeHandler = (item) => {
    setKindSelected(item);
  };

  const onFuelSelectChangeHandler = (item) => {
    setFuelSelected(item);
  };

  return (
    <div className={styles.page}>
      <div className={styles.text_container}>
        <p className={styles.title}>렌터카 검색</p>
        <p className={styles.number}>{`${12}건의 검색결과`}</p>
      </div>
      <div className={styles.button_container}>
        {kindSelected && fuelSelected && (
          <div className={styles.select_container}>
            <div className={styles.button_slick_container}>
              <p className={styles.select_title}>차종</p>
              <ButtonSlick
                buttonList={kindButtonList}
                selected={kindSelected}
                onSelectChangeHandler={onKindSelectChangeHandler}
              />
            </div>
            <div className={styles.button_slick_container_bottom}>
              <p className={styles.select_title}>연료</p>
              <ButtonSlick
                buttonList={fuelButtonList}
                selected={fuelSelected}
                onSelectChangeHandler={onFuelSelectChangeHandler}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.divide_line}></div>
      <div className={styles.main}>
        <CarItemList itemList={kindButtonList} />
      </div>
    </div>
  );
};

export default MobileCarSearch;
