import axios from "axios";
import { Container } from "postcss";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./articleView.module.css";
import ReivewItem from "./reivewItem/reivewItem";

import { Button } from "react-bootstrap";
import sampleComments from "./commentsSample.jsx";
import SelectInput from "@mui/material/Select/SelectInput";


const ArticleView = (props) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [date, setDate] = useState(null);
  const [isClick, setClick] = useState(false);
  {/*HERE for Several Buttons*/}
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
  
  

  useEffect(() => {
    const loadArticle = () => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/board/articles/${articleId}`)
        .then((response) => setArticle(response.data))
        .catch((err) => console.error(err));
    };
    loadArticle();
    //데이터를 로드하는 부분
    setComments([...sampleComments]);
  }, []);

  //댓글기능 추가
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [demoNo, setDemoNo] = useState(0);
  const inputComment = useRef(null);

  
  const onChange = (e) => {
    setInput(e.target.value);
  }
  const commentSubmit = (e) => {
    e.preventDefault();
    let now = new Date();
    let year = now.getFullYear();
    let month =("0"+ (now.getMonth() + 1)).slice(-2);
    let day =("0"+ now.getDate()).slice(-2);
    let hours = ("0"+ now.getHours()).slice(-2);
    let minutes= ("0"+ now.getMinutes()).slice(-2);
    const updateComments = [{
      //해당 컴포넌트
      user_id:"",
      name: "DEMO " + demoNo,
      time: year+'-'+month+'-'+day+' '+hours+':'+minutes,
      text: input, 
    }].concat(comments);
    setDemoNo(demoNo+1);
    setComments(updateComments);

    setInput(''); //Input 안에 문자 초기화
    console.log("DEBUG", comments);
    console.log("HERE IS INPUT: ", comments[1].text);
  }
/*
  현재 작동 방식입니다. 
  1) sampleComments을 읽어온다. <- 이부분은 API를 이용하여 정보를 가져옵니다.
  2) comments 배열에 복사를 한다.
  3) input을 입력받고 comments에 추가하여 화면에 반영한다.

  *useref는  댓글의 수정, 삭제에 관한 부분을 위함입니다.
  *updateComments에서 접속한 유저의 아이디와 이름을 채워줘야합니다. 
*/
  return (
    <div className={styles.body}>
      <div
        className={styles.top_banner}
        style={{
          background: `url("${
            article &&
            (article.images.length > 0
              ? article.images[0].url
              : "./images/no_image.jpeg")
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

        <div className={styles.review_container}>
          <div className={styles.review_input_form}>
            <p className={styles.review_text}>댓글({comments.length})</p>

            <div 
              className={styles.review_input_container}
            >
              <textarea
                className={styles.review_input}
                spellCheck="false"
                name="comments"
                type="text"
                placeholder="댓글 입력"
                value={input}
                onChange={onChange}
                ref={inputComment}
              ></textarea>
              <button 
              className={styles.review_upload_button}
              type="submit"
              onClick = {commentSubmit}
              >작성</button>

            </div>
          </div>
          <div className={styles.review_list}>
            {/*<ReivewItem />*/}
            <div >{
              comments.map( (item) =>
                <div className={styles.commentReview}>
                  <div className={styles.commentSub_data_container}>
                    <p className={styles.commentName}>{item.name}</p>
                    <p className={styles.commentDate}>{item.time}</p>
                  </div>
                  <div className={styles.comment_container}>
                    <p className={styles.comment}>{item.text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ArticleView;
