import React from "react";
import styles from "./mypageCommunityComment.module.css";
import MypageCommunityCommentItem from "./mypageCommunityCommentItem/mypageCommunityCommentItem";

const MypageCommunityComment = (props) => {
  return (
    <div className={styles.board}>
      <div className={styles.top}>
        <div className={styles.title}>글 제목</div>
        <div className={styles.comment}>댓글 내용</div>
        <div className={styles.date}>날짜</div>
        <div className={styles.empty}></div>
      </div>
      <div className={styles.list}>
        <MypageCommunityCommentItem />
      </div>
    </div>
  );
};

export default MypageCommunityComment;
