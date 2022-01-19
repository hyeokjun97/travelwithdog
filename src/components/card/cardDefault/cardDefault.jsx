import React from "react";
import styles from "./cardDefault.module.css";

const CardDefault = ({ item }) => {
  return (
    <div
      className={styles.item}
      style={{
        background: `linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.208) 100%
      ),url("${item.image_url}") center/cover no-repeat`,
      }}
    >
      <h3 className={styles.title}>{item.title}</h3>
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></div>
      <div className={styles.detail_button}>자세히보기</div>
    </div>
  );
};

export default CardDefault;
