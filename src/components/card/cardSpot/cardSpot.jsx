import React, { useEffect, useRef } from "react";
import styles from "./cardSpot.module.css";
import ReactStars from "react-rating-stars-component";

// 임시 디자인입니다. 디자인 수정 요청 시 수정 해야합니다
const CardSpot = ({ item }) => {
  const ref = useRef();

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
    <div className={styles.item}>
      <img
        ref={ref}
        src="/travelWithDog/images/default_image.png"
        data-src={item.images[0].url}
        alt="thumbnail"
        className={styles.thumbnail}
      />
      <div className={styles.data_container}>
        <p className={styles.category}>{item.categories[0].name}</p>
        <p className={styles.title}>{item.name}</p>
        <div className={styles.star_container}>
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
          <p className="rating_text">{`${item.rating}.0점`}</p>
        </div>
      </div>
    </div>
  );
};

export default CardSpot;
