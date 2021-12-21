import React from "react";
import styles from "./item.module.css";

const Item = ({ item }) => {
  return (
    <div className={styles.item}>
      <img
        src="/travelWithDog/images/facebook.png"
        alt="item_image"
        className={styles.image}
      />
    </div>
  );
};
export default Item;
