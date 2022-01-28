import React, { useRef, useEffect } from "react";
import styles from "./cardDefault.module.css";

const CardDefault = ({ item }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref) {
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          const target = entry.target;
          target.setAttribute(
            "style",
            `background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.208) 100%
          ),url("${item.image_url}") center/cover no-repeat`
          );
        }
      });
    });

    io.observe(ref.current);
  }, [ref]);
  return (
    <div ref={ref} className={styles.item}>
      <h3 className={styles.title}>{item.title}</h3>
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></div>
      <div className={styles.detail_button}>자세히보기</div>
    </div>
  );
};

export default CardDefault;
