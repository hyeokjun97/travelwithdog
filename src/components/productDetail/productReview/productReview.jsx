import React from "react";
import styles from "./productReview.module.css";
import ReactStars from "react-rating-stars-component";

const ProductReview = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.star_container}>
        <ReactStars
          count={5}
          edit={false}
          size={16}
          value={4}
          activeColor="#000000"
          isHalf={true}
          emptyIcon={<i className="fas fa-paw"></i>}
          halfIcon={<i className="fas fa-paw"></i>}
          filledIcon={<i className="fas fa-paw"></i>}
        />
        <p className={styles.rating_text}>4.0점</p>
        <p className={styles.name}>김**</p>
      </div>
      <p className={styles.content}>
        침실도 너무 마음에 들고 마당도 너무 마음에 들었습니다. 너무 만족해요
        !침실도 너무 마음에 들고 마당도 너무 마음에 들었습니다. 너무 만족해요 !
      </p>
    </div>
  );
};

export default ProductReview;
