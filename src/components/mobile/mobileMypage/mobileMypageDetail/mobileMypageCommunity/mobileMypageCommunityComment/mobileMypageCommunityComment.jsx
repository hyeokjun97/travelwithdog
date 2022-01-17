import React from "react";
import styles from "./mobileMypageCommunityComment.module.css";

const MobileMypageCommunityComment = (props) => {
  return (
    <div className={styles.item}>
      <p className={styles.comment}>저도 제주도 가보고 싶네요! 잘 봤습니다</p>
      <p className={styles.title}>제주도 3박 4일 여행기</p>
      <div className={styles.data_container}>
        <p className={styles.date}>2021-12-12</p>
        <button className={styles.button}>삭제</button>
      </div>
    </div>
  );
};

export default MobileMypageCommunityComment;
