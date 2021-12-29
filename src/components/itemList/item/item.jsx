import React from "react";
import styles from "./item.module.css";
import ReactStars from "react-rating-stars-component";

const Item = ({ item }) => {
  return (
    <div key={item.idx} className={styles.item}>
      <img src={item.image} alt="thumbnail" className={styles.thumbnail} />
      <div className={styles.data_container}>
        <p className={styles.title}>{item.title}</p>
        <div className={styles.star_container}>
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
          <p className={styles.rating_text}>4.0점</p>
        </div>
        <p className={styles.price}>{`${item.price.toLocaleString(
          "ko-KR"
        )}원`}</p>
      </div>
    </div>
  );
};
export default Item;
