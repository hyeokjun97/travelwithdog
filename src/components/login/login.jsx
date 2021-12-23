import React from "react";
import styles from "./login.module.css";

const Login = ({
  onCloseButtonHandler,
  signupPopupHandler,
  findPopupHandler,
}) => {
  return (
    <div className={styles.login_popup}>
      <div onClick={onCloseButtonHandler}>
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      <img
        src="/travelWithDog/images/logo.svg"
        alt="logo"
        className={styles.logo}
      />
      <h3 className={styles.title}>로그인</h3>
      <form className={styles.form}>
        <div className={styles.input_container}>
          <p className={styles.text}>이메일</p>
          <input
            type="email"
            className={styles.input}
            placeholder="이메일"
            spellCheck="false"
          />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>비밀번호</p>
          <input
            type="password"
            className={styles.input}
            placeholder="비밀번호"
            spellCheck="false"
          />
        </div>

        <div className={styles.save_id_container}>
          <input type="checkbox" className={styles.save_id} />
          <p className={styles.save_id_text}>아이디 저장</p>
        </div>
        <button type="submit" className={styles.submit_button}>
          로그인
        </button>
      </form>
      <div className={styles.sub_button_container}>
        <div className={styles.sub_button}>아이디찾기</div>
        <div
          className={styles.sub_button}
          onClick={() => {
            onCloseButtonHandler();
            findPopupHandler();
          }}
        >
          비밀번호찾기
        </div>
        <div
          className={styles.sub_button}
          onClick={() => {
            onCloseButtonHandler();
            signupPopupHandler();
          }}
        >
          회원가입
        </div>
      </div>

      <div className={styles.divide_container}>
        <div className={styles.divide_line}></div>
        <p className={styles.divide_text}>또는 아래 계정으로 로그인</p>
        <div className={styles.divide_line}></div>
      </div>
      <div className={styles.social_container}>
        <div className={styles.social_button}>
          <img
            src="/travelWithDog/images/kakao_round.png"
            alt="kakao_login"
            className={styles.social_image}
          />
          <p className={styles.social_text}>Kakao</p>
        </div>
        <div className={styles.social_button}>
          <img
            src="/travelWithDog/images/facebook_round.png"
            alt="facebook_login"
            className={styles.social_image}
          />
          <p className={styles.social_text}>Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
