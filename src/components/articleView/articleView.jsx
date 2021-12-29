import React from "react";
import styles from "./articleView.module.css";
import ReivewItem from "./reivewItem/reivewItem";

const ArticleView = (props) => {
  return (
    <div className={styles.body}>
      <div className={styles.top_banner}>
        <div className={styles.top_data_container}>
          <p className={styles.title}>제주도 3박4일 여행기</p>
          <p className={styles.name}>이종혁 회원님</p>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.article}></div>
        <div className={styles.review_container}>
          <div className={styles.review_input_form}>
            <p className={styles.review_text}>댓글(3)</p>
            <div className={styles.review_input_container}>
              <textarea
                className={styles.review_input}
                spellCheck="false"
                placeholder="댓글 입력"
              ></textarea>
              <button className={styles.review_upload_button}>작성</button>
            </div>
          </div>
          <div className={styles.review_list}>
            <ReivewItem />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleView;
