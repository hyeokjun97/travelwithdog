import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./articleView.module.css";
import ReivewItem from "./reivewItem/reivewItem";

const ArticleView = (props) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const loadArticle = () => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/board/articles/${articleId}`)
        .then((response) => setArticle(response.data))
        .catch((err) => console.error(err));
    };
    loadArticle();
  }, []);

  useEffect(() => {
    //상단 이미지를 content의 html 내부에서 찾는 함수 (가장 처음으로 등장한 img태그의 src)
    const findFirstImage = () => {
      let url;
      const { content } = article;
      const contentList = content.split("");

      for (let i = 0; i < contentList.length - 7; i++) {
        if (contentList.slice(i, i + 3).join("") === "src") {
          for (let j = i + 5; j < contentList.length; j++) {
            if (contentList[j] === '"') {
              url = contentList.slice(i + 5, j).join("");
              break;
            }
          }
          break;
        }
      }

      setTopImage(url);
    };

    const dateParser = () => {
      const datePart = article.updated_at.slice(0, 10);
      setDate(
        datePart.slice(0, 4) +
          "/" +
          datePart.slice(5, 7) +
          "/" +
          datePart.slice(8)
      );
    };

    if (article) {
      findFirstImage();
      dateParser();
    }
  }, [article]);

  return (
    <div className={styles.body}>
      <div
        className={styles.top_banner}
        style={{
          background: `url("${topImage && topImage}") center/cover no-repeat`,
        }}
      >
        <div className={styles.top_data_container}>
          <p className={styles.title}>{article && article.title}</p>
          <p className={styles.name}>이종혁 회원님</p>
          <p className={styles.date}>{date && date}</p>
        </div>
      </div>
      <main className={styles.main}>
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: article && article.content }}
        ></article>
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
