import React from "react";
import styles from "./mapMenuItem.module.css";
import ReactStars from "react-rating-stars-component";

const MapMenuItem = ({ item, onItemClickHandler }) => {
  return (
    <div className={styles.item} onClick={onItemClickHandler}>
      <img
        src={`${
          item.images &&
          `https://public.travelforest.co.kr/${item.images[0].url}`
        }`}
        alt={item.name_ko}
        className={styles.image}
      />
      <div className={styles.data_container}>
        <p className={styles.type}>{item.categories[0].name}</p>
        <p className={styles.name}>{item.name}</p>
        <div className={styles.rating}>
          <ReactStars
            count={5}
            edit={false}
            size={14}
            value={item.rating}
            activeColor="#000000"
            isHalf={true}
            emptyIcon={<i className="fas fa-paw"></i>}
            halfIcon={<i className="fas fa-paw"></i>}
            filledIcon={<i className="fas fa-paw"></i>}
          />
        </div>
        <p className={styles.desc}>{item.description}</p>
      </div>
    </div>
  );
};

export default MapMenuItem;
