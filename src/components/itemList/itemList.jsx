import React from "react";
import Item from "./item/item";
import styles from "./itemList.module.css";

const ItemList = ({ itemList }) => {
  return (
    <div className={styles.main}>
      {itemList.map((item) => (
        <Item key={item.idx} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
