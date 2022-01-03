import React from "react";
import styles from "./mypageCommunityArticle.module.css";
import MypageCommunityArticleItem from "./mypageCommunityArticleItem/mypageCommunityArticleItem";

const MypageCommunityArticle = (props) => {
  return (
    <div className={styles.board}>
      <div className={styles.top}>
        <div className={styles.division}>구분</div>
        <div className={styles.title}>제목</div>
        <div className={styles.date}>날짜</div>
        <div className={styles.empty}></div>
      </div>
      <div className={styles.list}>
        <MypageCommunityArticleItem />
      </div>
    </div>
  );
};

export default MypageCommunityArticle;
