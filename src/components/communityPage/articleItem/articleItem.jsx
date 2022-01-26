import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./articleItem.module.css";

const ArticleItem = ({ article }) => {
  const navigate = useNavigate();
  const moveToArticleView = () => {
    navigate(`/article/${article.id}`);
    window.scrollTo({ top: 0 });
  };
  return (
    <div className={styles.item} onClick={moveToArticleView}>
      <div className={styles.image_container}>
        <img
          src={
            article.images.length > 0
              ? article.images[0].url
              : "/travelWithDog/images/no_image.jpeg"
          }
          alt="article_image"
          className={styles.image}
        />
      </div>
      <div className={styles.text_container}>
        <p className={styles.title}>{article.title}</p>
        <div className={styles.bottom}>
          <p className={styles.date}>{article.created_at.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
