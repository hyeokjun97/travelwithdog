import React, { useState } from "react";
import styles from "./mobileMypageCommunity.module.css";
import MobileMypageCommunityArticle from "./mobileMypageCommunityArticle/mobileMypageCommunityArticle";
import MobileMypageCommunityComment from "./mobileMypageCommunityComment/mobileMypageCommunityComment";

const MobileMypageCommunity = (props) => {
  const [selectedValue, setSelectedValue] = useState("글");

  const onValueSelectChangeHandler = (e) => {
    setSelectedValue(e.target.innerText);
  };
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h3 className={styles.title}>나의 글/댓글</h3>
        <div className={styles.button_container}>
          <button
            onClick={onValueSelectChangeHandler}
            className={`${
              selectedValue === "글"
                ? `${styles.select_button} ${styles.selected_on}`
                : `${styles.select_button}`
            }`}
          >
            글
          </button>
          <button
            onClick={onValueSelectChangeHandler}
            className={`${
              selectedValue === "댓글"
                ? `${styles.select_button} ${styles.selected_on}`
                : `${styles.select_button}`
            }`}
          >
            댓글
          </button>
        </div>
      </div>
      <div className={styles.list}>
        {selectedValue === "글" ? (
          <MobileMypageCommunityArticle />
        ) : (
          <MobileMypageCommunityComment />
        )}
      </div>
    </div>
  );
};

export default MobileMypageCommunity;
