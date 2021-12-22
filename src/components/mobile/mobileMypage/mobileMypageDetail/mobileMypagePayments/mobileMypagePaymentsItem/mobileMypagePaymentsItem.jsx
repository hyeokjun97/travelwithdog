import React from "react";
import styles from "./mobileMypagePaymentsItem.module.css";

const MobileMypagePaymentsItem = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.image_container}>
        <img
          src="/travelWithDog/images/example.png"
          alt="product_image"
          className={styles.image}
        />
      </div>
      <div className={styles.data_container}>
        <p className={styles.name}>
          [디럭스트윈 펫룸]강릉 씨베이 호텔 반려견 여행 1박 2일
        </p>
        <div className={styles.date_and_number_container}>
          <div className={styles.date_container}>
            <i className={`${styles.date_icon} fas fa-calendar`}></i>
            <p className={styles.date_text}>2021/12/12</p>
          </div>
          <div className={styles.number_container}>
            <i className={`${styles.number_icon} fas fa-user-alt`}></i>
            <p className={styles.number_text}>2인</p>
          </div>
        </div>
        <p className={styles.price}>20,000원</p>
      </div>
    </div>
  );
};
export default MobileMypagePaymentsItem;
