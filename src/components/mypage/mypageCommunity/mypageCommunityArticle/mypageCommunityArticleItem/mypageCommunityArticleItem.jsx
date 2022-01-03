import React from "react";
import styles from "./mypageCommunityArticleItem.module.css";

const MypageCommunityArticleItem = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.division}>후기</div>
      <div className={styles.title}>
        겨울의 제주도 풍경 보고 가세요!겨울의 제주도 풍경 보고 가세요!겨울의
        제주도 풍경 보고 가세요!
      </div>
      <div className={styles.date}>2021/12/12</div>
      <div className={styles.button_container}>
        <button className={styles.button}>삭제</button>
      </div>
    </div>
  );
};

export default MypageCommunityArticleItem;
