import React from "react";
import styles from "./mainpageMapItem.module.css";
import ReactStars from "react-rating-stars-component";

const MainpageMapItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.image_container}>
        <img
          src={`https://public.travelforest.co.kr/${item.images[0].url}`}
          alt="spot_image"
          className={styles.image}
        />
      </div>

      <div className={styles.data_container}>
        <p className={styles.type}>{item.spot_category_name}</p>
        <p className={styles.name}>{item.name_ko}</p>
        <div className={styles.rating}>
          <ReactStars
            count={5}
            edit={false}
            size={14}
            value={4}
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

export default MainpageMapItem;
