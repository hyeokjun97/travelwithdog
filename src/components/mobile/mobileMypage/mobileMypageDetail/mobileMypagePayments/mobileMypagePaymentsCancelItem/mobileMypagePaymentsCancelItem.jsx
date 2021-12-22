import React, { useState } from "react";
import styles from "./mobileMypagePaymentsCancelItem.module.css";

const MobileMypagePaymentsCancelItem = (props) => {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => {
    setOpen(!open);
  };

  const purchaseHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.item} onClick={onOpenHandler}>
      <div className={styles.main}>
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
          <div className={styles.price_and_button_container}>
            <p className={styles.price}>20,000원</p>
            <button
              className={styles.purchase_button}
              onClick={purchaseHandler}
            >
              이어서결제
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className={styles.detail}>
          <p className={styles.detail_title}>예약 정보</p>
          <div className={styles.member_info_container}>
            <p className={styles.member_info}>
              이종혁 | JongHyuk Lee | 남 | 2021/12/12
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default MobileMypagePaymentsCancelItem;
