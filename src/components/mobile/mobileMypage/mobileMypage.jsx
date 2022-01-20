import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./mobileMypage.module.css";

const MobileMypage = ({ loginPopupHandler, signupPopupHandler }) => {
  const navigate = useNavigate();

  //로그인 여부 구분 용으로 임시로 만듬
  const [user, setUser] = useState(null);

  return (
    <div className={styles.main}>
      {user ? (
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
              <p className={styles.top_text_two}>로그아웃</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.top_no_login}>
          <p className={styles.login_message}>로그인해주세요</p>
          <div className={styles.login_button_container}>
            <div className={styles.login_button} onClick={loginPopupHandler}>
              로그인
            </div>
            <div className={styles.login_button} onClick={signupPopupHandler}>
              회원가입
            </div>
          </div>
        </div>
      )}
      {user && (
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
      )}
      {user && (
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
      )}
    </div>
  );
};

export default MobileMypage;
