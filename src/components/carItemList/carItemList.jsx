import React from "react";
import CarItem from "./carItem/carItem";
import styles from "./carItemList.module.css";

const CarItemList = ({ itemList }) => {
  return (
    <div className={styles.main}>
      {itemList.map((item) => (
        <CarItem key={item.idx} item={item} />
      ))}
    </div>
  );
};

export default CarItemList;
