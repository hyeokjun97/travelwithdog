import React from "react";
import styles from "./cardProduct.module.css";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ item }) => {
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate(`/product/${item.product_id}`);
    window.scrollTo({ top: 0 });
  };
  return (
    <div className={styles.item} onClick={moveToDetailPage}>
      <img
        src={item.product && item.product.tour.image.url}
        alt="thumbnail"
        className={styles.thumbnail}
      />
      <div className="data_container">
        <p className="title">{item.product && item.product.tour.name_en}</p>
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
        <p className={styles.price}>{`${
          item.product && item.product.tour.price.toLocaleString("ko-KR")
        }원`}</p>
      </div>
    </div>
  );
};

export default CardProduct;
