import React, { useEffect, useRef } from "react";
import styles from "./cardProduct.module.css";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ item }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate(`/product/${item.product_id}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (!ref) {
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          const target = entry.target;
          target.setAttribute("src", target.dataset.src);
          io.unobserve(target);
        }
      });
    });

    io.observe(ref.current);
  }, [ref]);

  return (
    <div className={styles.item} onClick={moveToDetailPage}>
      <img
        ref={ref}
        src="./images/default_image.png"
        data-src={item.product && item.product.tour.image.url}
        alt="thumbnail"
        className={styles.thumbnail}
      />
      <div className={styles.data_container}>
        <p className={styles.title}>
          {item.product && item.product.tour.name_en}
        </p>

        <p className={styles.price}>{`${
          item.product && item.product.tour.price.toLocaleString("ko-KR")
        }원`}</p>
      </div>
    </div>
  );
};

export default CardProduct;
