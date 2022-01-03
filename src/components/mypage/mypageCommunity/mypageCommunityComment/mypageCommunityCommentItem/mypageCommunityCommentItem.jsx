import React from "react";
import styles from "./mypageCommunityCommentItem.module.css";

const MypageCommunityCommentItem = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.title}>
        겨울의 제주도 풍경 보고 가세요!겨울의 제주도 풍경 보고 가세요!겨울의
        제주도 풍경 보고 가세요!
      </div>
      <div className={styles.comment}>
        와 너무 좋아요와 너무 좋아요와 너무 좋아요 와 너무 좋아요와 너무 좋아요
      </div>
      <div className={styles.date}>2021/12/15</div>
      <div className={styles.button_container}>
        <button className={styles.button}>삭제</button>
      </div>
    </div>
  );
};

export default MypageCommunityCommentItem;
