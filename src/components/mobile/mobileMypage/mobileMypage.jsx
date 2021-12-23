import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./mobileMypage.module.css";

const MobileMypage = (props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.top_image_container}>
          <img
            src="/travelWithDog/images/default_profile_image.jpeg"
            alt="profile"
            className={styles.profile_image}
          />
        </div>
        <div className={styles.top_text_container}>
          <p className={styles.name}>이종혁 님</p>
          <div className={styles.top_text_box}>
            <p
              className={styles.top_text}
              onClick={() => {
                navigate("/mobile/mypage/edit");
                window.scrollTo({ top: 0 });
              }}
            >
              정보수정
            </p>
            <p className={styles.top_text}>로그아웃</p>
          </div>
        </div>
      </div>
      <div className={styles.payments_container}>
        <div className={styles.title_part}>결제 정보</div>
        <div
          className={styles.button}
          onClick={() => {
            navigate("/mobile/mypage/payments");
            window.scrollTo({ top: 0 });
          }}
        >
          결제 내역
        </div>
        <div
          className={styles.button}
          onClick={() => {
            navigate("/mobile/mypage/paymentscancel");
            window.scrollTo({ top: 0 });
          }}
        >
          결제 취소 내역
        </div>
      </div>
      <div className={styles.customer_and_community_container}>
        <div className={styles.title_part}>고객센터/커뮤니티</div>
        <div
          className={styles.button}
          onClick={() => {
            navigate("/mobile/mypage/community");
            window.scrollTo({ top: 0 });
          }}
        >
          나의 글/댓글
        </div>
        <div
          className={styles.button}
          onClick={() => {
            navigate("/mobile/mypage/qna");
            window.scrollTo({ top: 0 });
          }}
        >
          고객문의
        </div>
      </div>
    </div>
  );
};

export default MobileMypage;
