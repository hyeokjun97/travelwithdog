import React, { useState } from "react";
import styles from "./mobileMypageQnaItem.module.css";

const MobileMypageQnaItem = (props) => {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.item}>
      <div className={styles.preview_part} onClick={onOpenHandler}>
        <div className={styles.state}>답변완료</div>
        <p className={styles.title}>
          상품 관련 문의 드립니다. 상품 관련 문의 드립니다. 상품 관련 문의
          드립니다.
        </p>
      </div>
      {open && (
        <div className={styles.detail_part}>
          <div className={styles.detail_item_q}>
            <div className={styles.mark}>Q</div>
            <div className={styles.detail_text_container}>
              <p className={styles.detail_text}>
                상품 구매는 어떻게 하나요? 상품 구매는 어떻게 하나요? 상품
                구매는 어떻게 하나요? 상품 구매는 어떻게 하나요?
              </p>
            </div>
          </div>
          <div className={styles.detail_item}>
            <div className={styles.mark}>A</div>
            <div className={styles.detail_text_container}>
              <p className={styles.detail_text}>
                안녕하세요 고객님, 트래블포레스트입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMypageQnaItem;
