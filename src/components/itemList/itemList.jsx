import React from "react";
import Item from "./item/item";
import styles from "./itemList.module.css";

const ItemList = ({ itemList }) => {
  return (
    <div className={styles.main}>
      {itemList.map((item) =>
        item.tour ? (
          <Item key={item.id} item={item.tour} moveTo={item.id} />
        ) : item.transfer ? (
          <Item key={item.id} item={item.transfer} moveTo={item.id} />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default ItemList;
