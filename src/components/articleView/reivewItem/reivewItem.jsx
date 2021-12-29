import React from "react";
import styles from "./reivewItem.module.css";

const ReivewItem = (props) => {
  return (
    <div className={styles.review}>
      <div className={styles.sub_data_container}>
        <p className={styles.name}>이종혁</p>
        <p className={styles.date}>2021-12-03 12:42</p>
      </div>
      <div className={styles.comment_container}>
        <p className={styles.comment}>
          제주도 여행기 재밌게 잘 봤습니다! 저도 반려견과 함께 제주도 다녀오고
          싶네요☺️
        </p>
      </div>
    </div>
  );
};

export default ReivewItem;
