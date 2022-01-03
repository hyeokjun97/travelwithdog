import React, { useState } from "react";
import styles from "./mypageQnaItem.module.css";

const MypageQnaItem = (props) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const onDetailOpenHandler = () => {
    setDetailOpen(!detailOpen);
  };
  return (
    <div className={styles.item}>
      <div
        className={`${
          detailOpen
            ? `${styles.item_top} ${styles.item_top_on}`
            : `${styles.item_top}`
        }`}
        onClick={onDetailOpenHandler}
      >
        <div className={styles.state}>답변 완료</div>
        <div className={styles.data_container}>
          <p className={styles.title}>상품 관련 문의 드립니다.</p>
          <p className={styles.date}>2021/12/12</p>
        </div>
      </div>
      {detailOpen && (
        <div className={styles.detail_container}>
          <div className={styles.detail_item_q}>
            <div className={styles.detail_item_type}>Q</div>
            <p className={styles.detail_item_content}>
              상품 구매는 어떻게 하나요?
            </p>
          </div>
          <div className={styles.detail_item}>
            <div className={styles.detail_item_type}>A</div>
            <p className={styles.detail_item_content}>
              {`안녕하세요 
              
              연락주세요`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageQnaItem;
