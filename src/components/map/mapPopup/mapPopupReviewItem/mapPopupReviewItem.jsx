import React from "react";
import styles from "./mapPopupReviewItem.module.css";
import ReactStars from "react-rating-stars-component";

const MapPopupReviewItem = ({ review }) => {
  return (
    <div className={styles.item}>
      <div className={styles.star_container}>
        <div className={styles.star}>
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
        </div>
        <p className={styles.name}>{review.user.email.slice(0, 3) + "***"}</p>
      </div>
      <p className={styles.content}>{review.content}</p>
    </div>
  );
};

export default MapPopupReviewItem;
