import React from "react";
import styles from "./productReview.module.css";
import ReactStars from "react-rating-stars-component";

const ProductReview = ({ review }) => {
  return (
    <div className={styles.item}>
      <div className={styles.star_container}>
        <ReactStars
          count={5}
          edit={false}
          size={16}
          value={review.rating}
          activeColor="#000000"
          isHalf={true}
          emptyIcon={<i className="fas fa-paw"></i>}
          halfIcon={<i className="fas fa-paw"></i>}
          filledIcon={<i className="fas fa-paw"></i>}
        />
        <p className={styles.rating_text}>{review.rating}점</p>
        <p className={styles.name}>{review.user.email.slice(0, 3) + "***"}</p>
      </div>
      <p className={styles.content}>{review.content}</p>
    </div>
  );
};

export default ProductReview;
