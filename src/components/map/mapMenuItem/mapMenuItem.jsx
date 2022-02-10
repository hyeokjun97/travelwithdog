import React, { useRef, useEffect } from "react";
import styles from "./mapMenuItem.module.css";
import ReactStars from "react-rating-stars-component";

const MapMenuItem = ({ item, marker, onItemClickHandler, google }) => {
  const ref = useRef();

  const changeIconToSelected = () => {
    const icon = {
      url: `/travelWithDog/images/marker/${item.categories[0].cd}-on.png`,
      scaledSize: new google.maps.Size(30, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(15, 40), // anchor
    };

    marker.setIcon(icon);
  };

  const changeIconToDefault = () => {
    const icon = {
      url: `/travelWithDog/images/marker/${item.categories[0].cd}.png`,
      scaledSize: new google.maps.Size(30, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(15, 40), // anchor
    };

    marker.setIcon(icon);
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
    <div
      className={styles.item}
      onClick={onItemClickHandler}
      onMouseEnter={changeIconToSelected}
      onMouseLeave={changeIconToDefault}
    >
      <img
        ref={ref}
        src="/travelWithDog/images/default_image.png"
        data-src={
          item.images.length > 0
            ? item.images[0].url
            : "/travelWithDog/images/no_image.jpeg"
        }
        alt={item.name_ko}
        className={styles.image}
      />
      <div className={styles.data_container}>
        <p className={styles.type}>{item.categories[0].name}</p>
        <p className={styles.name}>{item.name}</p>
        <div className={styles.rating}>
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
        </div>
        <p className={styles.desc}>{item.description}</p>
      </div>
    </div>
  );
};

export default MapMenuItem;
