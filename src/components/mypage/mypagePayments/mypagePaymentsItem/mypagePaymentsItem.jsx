import React from "react";
import styles from "./mypagePaymentsItem.module.css";

const MypagePaymentsItem = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.image_container}>
        <img
          src="/travelWithDog/images/example.png"
          alt="item_image"
          className={styles.item_image}
        />
      </div>
      <div className={styles.data_container}>
        <p className={styles.date}>2021/12/12</p>
        <p className={styles.name}>
          [디럭스트윈 펫룸]강릉 씨베이 호텔 반려견 여행 1박 2일
        </p>
        <div className={styles.number_container}>
          <i className={`${styles.number_icon} fas fa-user-alt`}></i>
          <p className={styles.number_text}>2인</p>
        </div>
        <p className={styles.price}>120,000원</p>
      </div>
      <div className={styles.open_button_container}>
        <i className={`${styles.open_button} fas fa-chevron-down`}></i>
      </div>
    </div>
  );
};
export default MypagePaymentsItem;
