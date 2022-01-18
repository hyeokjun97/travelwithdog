import React from "react";
import CarItem from "./carItem/carItem";
import styles from "./carItemList.module.css";

const CarItemList = ({ itemList, moveToDetail }) => {
  return (
    <div className={styles.main}>
      {itemList.map((item) => (
        <CarItem key={item.id} item={item} moveToDetail={moveToDetail} />
      ))}
    </div>
  );
};

export default CarItemList;
