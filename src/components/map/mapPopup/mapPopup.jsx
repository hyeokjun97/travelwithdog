import React from "react";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./mapPopup.module.css";

const MapPopup = ({ popupValue, onCloseButtonHandler }) => {
  return (
    <div className={styles.popup}>
      <div onClick={onCloseButtonHandler}>
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      {popupValue && <CustomPaging imageList={popupValue.images.slice(0, 4)} />}
      <div className={styles.data_container}>
        <div className={styles.name_and_type}>
          <p className={styles.name}>{popupValue.name_ko}</p>
          <p className={styles.type}>{popupValue.spot_category_name}</p>
        </div>
        <div className={styles.rating_and_sns}>
          <p className={styles.rating}>여기에평점</p>
          <img
            src="/images/insta.png"
            alt="instagram"
            className={styles.insta}
          />
        </div>
        <div className={styles.sort_container}>여기에 분류</div>
        <p className={styles.desc}>{popupValue.description}</p>
        <div className={styles.sub_data_container}>
          <span className={styles.sub_data_title}>
            주소 <span className={styles.sub_data}>{popupValue.address}</span>
          </span>
          <span className={styles.sub_data_title}>
            전화번호{" "}
            <span className={styles.sub_data}>{popupValue.telephone_no}</span>
          </span>
          <span className={styles.sub_data_title}>
            영업시간{" "}
            <span className={styles.sub_data}>{popupValue.opening_hours}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
