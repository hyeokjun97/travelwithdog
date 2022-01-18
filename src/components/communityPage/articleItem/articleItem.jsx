import React from "react";
import styles from "./articleItem.module.css";

const ArticleItem = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.image_container}>
        <img
          src="/travelWithDog/images/example.png"
          alt="article_image"
          className={styles.image}
        />
      </div>
      <div className={styles.text_container}>
        <p className={styles.title}>제주도 다녀왔습니다!</p>
        <p className={styles.content}>
          제주도 3박 4일 여행기입니다! 저희는 반려견과 함께 씨베이 호텔에
          갔다왔는데요 정말 재밌었고 그리고 제주도 3박 4일 여행기입니다! 저희는
          반려견과 함께 씨베이 호텔에 갔다왔는데요 정말 재밌었고 그리고
        </p>
        <div className={styles.bottom}>
          <p className={styles.date}>2021-12-17</p>
          <p className={styles.writer}>이종혁</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
