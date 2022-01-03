import React from "react";
import styles from "./promiseItem.module.css";

const PromiseItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <i className={`${styles.icon} ${item.icon}`}></i>
      <h4 className={styles.title}>{item.title}</h4>
      <p className={styles.desc}>{item.desc}</p>
    </div>
  );
};

export default PromiseItem;
