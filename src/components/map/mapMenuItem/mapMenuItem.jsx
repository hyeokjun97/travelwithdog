import React from "react";
import styles from "./mapMenuItem.module.css";

const MapMenuItem = ({ item, onItemClickHandler }) => {
  return (
    <div className={styles.item} onClick={onItemClickHandler}>
      <img
        src={`https://public.travelforest.co.kr/${item.images[0].url}`}
        alt={item.name_ko}
        className={styles.image}
      />
      <div className={styles.data_container}>
        <p className={styles.type}>{item.spot_category_name}</p>
        <p className={styles.name}>{item.name_ko}</p>
        <p className={styles.rating}>{item.rating}</p>
        <p className={styles.desc}>{item.description}</p>
      </div>
    </div>
  );
};

export default MapMenuItem;
