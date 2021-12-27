import React from "react";
import styles from "./productOption.module.css";

const ProductOption = (props) => {
  return (
    <div className={styles.item}>
      <img
        src="/travelWithDog/images/example.png"
        alt="option_image"
        className={styles.image}
      />
      <div className={styles.data_container}>
        <div className={styles.title_and_price}>
          <p className={styles.title}>
            [디럭스트윈 펫룸]강릉 씨베이 호텔 반려견 여행 1박 2일
          </p>
          <div className={styles.price_container}>
            <div className={styles.price_box}>
              <p className={styles.price_title}>반려인</p>
              <p className={styles.price}>150,000원</p>
            </div>
            <div className={styles.price_box}>
              <p className={styles.price_title}>반려견</p>
              <p className={styles.price}>51,000원</p>
            </div>
          </div>
        </div>

        <div className={styles.button_container}>
          <button className={styles.button_view}>
            <p className={styles.button_text}>상품 정보 및 규정 보기</p>
            <i className={`${styles.icon} fas fa-chevron-down`}></i>
          </button>
          <button className={styles.button}>예약하기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductOption;
