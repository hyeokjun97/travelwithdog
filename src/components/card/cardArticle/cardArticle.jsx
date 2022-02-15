import React, { useEffect, useRef } from "react";
import styles from "./cardArticle.module.css";
import { useNavigate } from "react-router-dom";

// 임시 디자인, 수정 요청 들어오면 수정해야합니다
const CardArticle = ({ item }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate(`/article/${item.id}`);
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
        data-src={item.images.length > 0 && item.images[0].url}
        alt="thumbnail"
        className={styles.thumbnail}
      />
      <div className={styles.data_container}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.writer}>{`${item.user.name} 회원님`}</p>
        <p
          className={styles.like_and_comment}
        >{`좋아요${item.like_count} 댓글${item.comment_count}`}</p>
      </div>
    </div>
  );
};

export default CardArticle;
