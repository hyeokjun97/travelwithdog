import axios from "axios";
import { Container } from "postcss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./articleView.module.css";
import ReivewItem from "./reivewItem/reivewItem";
import Heart from "react-animated-heart";

const ArticleView = (props) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [date, setDate] = useState(null);
  const [isClick, setClick] = useState(false);

  useEffect(() => {
    const loadArticle = () => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/board/articles/${articleId}`)
        .then((response) => setArticle(response.data))
        .catch((err) => console.error(err));
    };
    loadArticle();
  }, []);
  // article.like_cnt <-int
  // article 
  console.log("FROM HERE\n");
  console.log(article);
  //
  return (
    <div className={styles.body}>
      <div
        className={styles.top_banner}
        style={{
          background: `url("${
            article &&
            (article.images.length > 0
              ? article.images[0].url
              : "/travelWithDog/images/no_image.jpeg")
          }") center/cover no-repeat`,
        }}
      >
        <div className={styles.top_data_container}>
          <p className={styles.title}>{article && article.title}</p>
          <p className={styles.name}>
            {article && article.user
              ? `${article.user.email.split("@")[0]}회원님`
              : "관리자"}
          </p>
          <p className={styles.date}>{date && date}</p>
        </div>
      </div>
      <main className={styles.main}>
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: article && article.content }}
        ></article>
        {/*HERE for Several Buttons*/}
        <div className={styles.article_options}>
            <div className={styles.article_like}>
              <button className={styles.article_navigate_btn}> 이전글 </button>
            </div>
            <div className={styles.article_like}>
                {/*npm install react-animated-heart */}
                    <Heart isClick={isClick} onClick={() => setClick(!isClick)} /> 
                    <p>좋아요</p>
            </div>
            <div className={styles.article_like}>
              <button className={styles.article_navigate_btn}> 다음글 </button>
            </div>
        </div>
        {/*HERE for Several Buttons*/}
        <div className={styles.review_container}>
          <div className={styles.review_input_form}>
            <p className={styles.review_text}>댓글(1)</p>

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
