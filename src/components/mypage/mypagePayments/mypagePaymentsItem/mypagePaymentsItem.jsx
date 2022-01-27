import React, { useState } from "react";
import ReviewUploadPopup from "../../../reviewUploadPopup/reviewUploadPopup";
import styles from "./mypagePaymentsItem.module.css";

const MypagePaymentsItem = (props) => {
  const [detailOn, setDetailOn] = useState(false);
  const [reviewUploadPopupOn, setReviewUploadPopupOn] = useState(false);

  const reviewPopupOnChangeHandler = () => {
    setReviewUploadPopupOn(!reviewUploadPopupOn);
  };

  const detailOnChangeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      return;
    }
    setDetailOn(!detailOn);
  };
  return (
    <div className={styles.item}>
      <div className={styles.pre} onClick={detailOnChangeHandler}>
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
          <div className={styles.price_and_review}>
            <p className={styles.price}>120,000원</p>
            <button
              className={styles.review}
              onClick={reviewPopupOnChangeHandler}
            >
              리뷰 작성
            </button>
          </div>
        </div>
        <div className={styles.open_button_container}>
          <i className={`${styles.open_button} fas fa-chevron-down`}></i>
        </div>
      </div>
      {detailOn && (
        <div className={styles.detail}>
          <div className={styles.image_container}></div>
          <div className={styles.detail_data_container}>
            <p className={styles.detail_title}>예약정보</p>
            <div className={styles.detail_main}>
              <div className={styles.detail_item}>
                <p className={styles.detail_item_text}>이혁종</p>
                <p className={styles.detail_item_text}>JongHyuk Lee</p>
                <p className={styles.detail_item_text}>남</p>
                <p className={styles.detail_item_text}>2021/12/12</p>
              </div>
              <div className={styles.detail_item}>
                <p className={styles.detail_item_text}>이혁종</p>
                <p className={styles.detail_item_text}>JongHyuk Lee</p>
                <p className={styles.detail_item_text}>남</p>
                <p className={styles.detail_item_text}>2021/12/12</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {reviewUploadPopupOn && (
        <ReviewUploadPopup
          where="tours"
          id="115"
          name="[디럭스트윈 펫룸]강릉 씨베이 호텔 반려견 여행 1박 2일"
          reviewPopupOnChangeHandler={reviewPopupOnChangeHandler}
        />
      )}
    </div>
  );
};
export default MypagePaymentsItem;
