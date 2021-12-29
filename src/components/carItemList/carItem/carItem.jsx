import React from "react";
import styles from "./carItem.module.css";

const CarItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.box}>
        <div className={styles.image_container}>
          <img
            src="/travelWithDog/images/car_example.png"
            alt="thumbnail"
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.data_container}>
          <div className={styles.title_container}>
            <p className={styles.title}>5인승 중형</p>
            <p className={styles.title_big}>올뉴 말리부(휘)</p>
          </div>
          <div className={styles.option_container}>
            <div className={styles.option}>
              <p className={styles.option_title}>무보험</p>
              <div className={styles.price_container}>
                <p className={styles.price_number}>96,000</p>
                <p className={styles.price_unit}>원</p>
              </div>
            </div>
            <div className={styles.option}>
              <p className={styles.option_title}>일반자차</p>
              <div className={styles.price_container}>
                <p className={styles.price_number}>125,000</p>
                <p className={styles.price_unit}>원</p>
              </div>
            </div>{" "}
            <div className={styles.option}>
              <p className={styles.option_title}>완전자차</p>
              <div className={styles.price_container}>
                <p className={styles.price_number}>147,000</p>
                <p className={styles.price_unit}>원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
