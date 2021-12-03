import React, { useEffect, useRef, useState } from "react";
import ItemSlick from "../slick/itemSlick/itemSlick";
import styles from "./mainpage.module.css";

const Mainpage = (props) => {
  const listRef = useRef();

  const setObserver = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      console.log(entries);
    });
    observer.observe(listRef.current);
  };
  useEffect(() => {
    setObserver();
  }, []);
  return (
    <div className={styles.mainpage}>
      <div className={styles.top_banner}>
        <div className={styles.top_filter}>
          <p className={styles.title}>사랑하는 댕댕이와 함께하는 추억여행</p>
          <p className={styles.title_two}>트래블위드독이 함께합니다</p>
          <p className={styles.subtitle}>
            중/대형견과 함께하는 여행이 어렵다고요? 중/대형견 전용 렌터카를
            찾아보세요
          </p>
        </div>
      </div>
      <div className={styles.list_part}>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>
            반려견과 함께하는 차박(Car Camping)
          </p>
          <ItemSlick viewItems={chabak} />
        </div>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>제주 반려견 여행 BEST</p>
          <ItemSlick viewItems={jejuBest.reverse()} />
        </div>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>강릉/동해 반려견 여행 BEST</p>
          <ItemSlick viewItems={chabak} />
        </div>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>양양/속초 반려견 여행 BEST</p>
          <ItemSlick viewItems={jejuBest} />
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
