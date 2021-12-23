import React from "react";
import styles from "./find.module.css";

const Find = ({
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
      <h3 className={styles.title}>비밀번호 찾기</h3>
      <form className={styles.form}>
        <div className={styles.input_container}>
          <p className={styles.text}>가입 시 등록한 이메일 주소</p>
          <input
            type="email"
            className={styles.input}
            placeholder="이메일 주소"
            spellCheck="false"
          />
        </div>
        <p className={styles.alert}>
          *이메일 주소로 임시 비밀번호가 발송됩니다.
        </p>
        <button type="submit" className={styles.submit_button}>
          임시 비밀번호 발송
        </button>
      </form>
    </div>
  );
};

export default Find;
