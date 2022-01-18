import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./carItem.module.css";

const CarItem = ({ item }) => {
  const navigate = useNavigate();
  const moveToDetail = () => {
    navigate(`/cardetail/${item.id}`);
  };
  return (
    <div className={styles.item} onClick={moveToDetail}>
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
