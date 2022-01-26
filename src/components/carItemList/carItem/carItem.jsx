import React from "react";
import styles from "./carItem.module.css";

const CarItem = ({ item, moveToDetail }) => {
  const navigateHandler = () => {
    moveToDetail(item.id, item.insurances[0].business_id);
  };
  return (
    <div className={styles.item} onClick={navigateHandler}>
      <div className={styles.box}>
        <div className={styles.image_container}>
          <img
            src={
              item.images.length > 0
                ? item.images[0].url
                : "/travelWithDog/images/no_image.jpeg"
            }
            alt="thumbnail"
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.data_container}>
          <div className={styles.title_container}>
            <p
              className={styles.title}
            >{`${item.seat_count}인승 ${item.rentcar_class_code.name}`}</p>
            <p className={styles.title_big}>{item.name}</p>
          </div>
          <div className={styles.option_container}>
            {item.insurances.map((ins) => (
              <div key={ins.id} className={styles.option}>
                <p className={styles.option_title}>{ins.name}</p>
                <div className={styles.price_container}>
                  <p className={styles.price_number}>
                    {ins.price.toLocaleString("ko-kr")}
                  </p>
                  <p className={styles.price_unit}>원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
