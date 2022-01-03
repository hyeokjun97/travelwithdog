import React from "react";
import styles from "./mypageCommunity.module.css";
import MypageCommunityArticle from "./mypageCommunityArticle/mypageCommunityArticle";
import MypageCommunityComment from "./mypageCommunityComment/mypageCommunityComment";

const MypageCommunity = ({ communitySelect }) => {
  return (
    <div className={styles.main}>
      {communitySelect === "글" ? (
        <MypageCommunityArticle />
      ) : communitySelect === "댓글" ? (
        <MypageCommunityComment />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MypageCommunity;
