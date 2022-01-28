import React, { useState } from "react";
import styles from "./reviewUploadPopup.module.css";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

const ReviewUploadPopup = ({
  where,
  id,
  name,
  reviewPopupOnChangeHandler,
  isLoggedIn,
}) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const onRatingChangeHandler = (data) => {
    setRating(data);
  };
  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const onReviewSubmitHandler = () => {
    if (content === "") {
      alert("내용을 입력해주세요");
      return;
    }
    if (!isLoggedIn) {
      alert("로그인 후에 리뷰 작성이 가능합니다.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/${where}/${id}/reviews`, {
        rating,
        content,
      })
      .then((response) => {
        alert("리뷰 작성이 완료되었습니다.");
        reviewPopupOnChangeHandler();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className={styles.filter}>
      <div className={styles.popup}>
        <div onClick={reviewPopupOnChangeHandler}>
          <i className={`${styles.close_icon} fas fa-times`}></i>
        </div>
        <p className={styles.title}>리뷰 작성</p>
        <div className={styles.target_name}>
          {`${
            where === "tours" ? "상품명: " : where === "spots" ? "장소명: " : ""
          }` + `${name}`}
        </div>
        <div className={styles.rating_container}>
          <p className={styles.rating_title}>별점</p>
          <ReactStars
            count={5}
            edit={true}
            size={30}
            value={5}
            onChange={onRatingChangeHandler}
            activeColor="#000000"
            isHalf={false}
            emptyIcon={<i className="fas fa-paw"></i>}
            halfIcon={<i className="fas fa-paw"></i>}
            filledIcon={<i className="fas fa-paw"></i>}
          />
        </div>
        <textarea
          value={content}
          onChange={onContentChangeHandler}
          className={styles.content}
          placeholder="내용"
          spellCheck="false"
        ></textarea>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={onReviewSubmitHandler}>
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewUploadPopup;
