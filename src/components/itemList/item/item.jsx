import React, { useRef, useEffect } from "react";
import styles from "./item.module.css";
import { useNavigate } from "react-router-dom";

const Item = ({ item, moveTo }) => {
  const navigate = useNavigate();
  const ref = useRef();

  const moveToDetailPage = () => {
    navigate(`/product/${moveTo}`);
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
        src="/travelWithDog/images/default_image.png"
        data-src={item.image.url}
        alt="thumbnail"
        className={styles.thumbnail}
      />
      <div className={styles.data_container}>
        <p className={styles.title}>{item.name_en}</p>
        <p className={styles.price}>{`${item.price.toLocaleString(
          "ko-KR"
        )}원`}</p>
      </div>
    </div>
  );
};
export default Item;
