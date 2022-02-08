import React, { useRef, useEffect } from "react";
import styles from "./mapSectionItem.module.css";
import ReactStars from "react-rating-stars-component";

const MapSectionItem = ({ item }) => {
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
      <div className={styles.image_container}>
        <img
          ref={ref}
          src="/travelWithDog/images/default_image.png"
          data-src={
            item.images.length > 0
              ? item.images[0].url
              : "/travelWithDog/images/no_image.jpeg"
          }
          className={styles.image}
        />
      </div>

      <div className={styles.data_container}>
        <p className={styles.type}>{item.categories[0].name}</p>
        <p className={styles.name}>{item.name}</p>
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

export default MapSectionItem;
