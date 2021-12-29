import React, { useState } from "react";
import styles from "./productOption.module.css";

const ProductOption = (props) => {
  const [openValue, setOpenValue] = useState(false);
  const changeOpenValueHandler = (value) => {
    if (openValue === value) {
      setOpenValue(false);
      return;
    }
    setOpenValue(value);
  };
  return (
    <div className={styles.item}>
      <div
        className={`${
          openValue ? `${styles.main} ${styles.main_on}` : `${styles.main}`
        }`}
      >
        <img
          src="/travelWithDog/images/example.png"
          alt="option_image"
          className={`${
            openValue ? `${styles.image} ${styles.image_on}` : `${styles.image}`
          }`}
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
          <div
            className={`${
              openValue
                ? `${styles.button_container} ${styles.button_container_on}`
                : `${styles.button_container}`
            }`}
          >
            <button
              className={styles.button_view}
              onClick={() => changeOpenValueHandler("detail")}
            >
              <p className={styles.button_text}>상품 정보 및 규정 보기</p>
              <i className={`${styles.icon} fas fa-chevron-down`}></i>
            </button>
            <button
              className={`${
                openValue
                  ? `${styles.button} ${styles.button_on}`
                  : `${styles.button}`
              }`}
              onClick={() => changeOpenValueHandler("reservation")}
            >
              예약하기
            </button>
          </div>
        </div>
      </div>
      {openValue === "detail" ? (
        <div className={styles.option_detail_container}>
          <nav className={styles.menu_bar}>
            <ul className={styles.menu_list}>
              <li>포함사항</li>
              <li>불포함사항</li>
              <li>유의사항</li>
              <li>취소규정</li>
            </ul>
          </nav>
          <div className={styles.detail_main}>
            1. 프리미엄 미팅 서비스 <br></br>2. 렌트카 1박 2일(최대 24시간)
            이용- 뉴모닝 또는 스파크 경차 기준 (업그레이드 가능)- 자차 보험
            (일반) <br></br>3. 트래블키트 (랜트카 수령시) <br></br>4. 부산 영무
            파라드 호텔 1박 (조식불포함)<br></br>
            1. 프리미엄 미팅 서비스 <br></br>2. 렌트카 1박 2일(최대 24시간)
            이용- 뉴모닝 또는 스파크 경차 기준 (업그레이드 가능)- 자차 보험
            (일반) <br></br>3. 트래블키트 (랜트카 수령시) <br></br>4. 부산 영무
            파라드 호텔 1박 (조식불포함)<br></br>
            1. 프리미엄 미팅 서비스 <br></br>2. 렌트카 1박 2일(최대 24시간)
            이용- 뉴모닝 또는 스파크 경차 기준 (업그레이드 가능)- 자차 보험
            (일반) <br></br>3. 트래블키트 (랜트카 수령시) <br></br>4. 부산 영무
            파라드 호텔 1박 (조식불포함)<br></br>
          </div>
        </div>
      ) : (
        openValue === "reservation" && (
          <div className={styles.option_detail_container}>
            <p>예약한다</p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductOption;
