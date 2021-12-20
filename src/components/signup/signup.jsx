import React from "react";
import styles from "./signup.module.css";

const Signup = ({ onCloseButtonHandler }) => {
  return (
    <div className={styles.signup_popup}>
      <div onClick={onCloseButtonHandler}>
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      <img
        src="/travelWithDog/images/logo.svg"
        alt="logo"
        className={styles.logo}
      />
      <h3 className={styles.title}>회원가입</h3>
      <form className={styles.form}>
        <div className={styles.input_container_top}>
          <p className={styles.text}>이메일</p>
          <div className={styles.input_with_button_container}>
            <input
              type="email"
              className={styles.input_with_button}
              placeholder="이메일 주소"
              spellCheck="false"
            />
            <button type="button" className={styles.confirm_button}>
              인증번호받기
            </button>
          </div>
          <div className={styles.input_with_button_container}>
            <input
              type="email"
              className={styles.input_with_button}
              placeholder="인증번호를 입력해주세요."
              spellCheck="false"
            />
            <button type="button" className={styles.confirm_button}>
              인증번호확인
            </button>
          </div>
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

        <div className={styles.input_container}>
          <p className={styles.text}>비밀번호 확인</p>
          <input
            type="password"
            className={styles.input}
            placeholder="비밀번호 확인"
            spellCheck="false"
          />
        </div>

        <div className={styles.input_container_bottom}>
          <p className={styles.text}>연락처</p>
          <input
            type="text"
            className={styles.input}
            placeholder="연락처"
            spellCheck="false"
          />
          <p className={styles.alert}>
            *한국 내 연락처는 <b>국가번호를 제외</b>하고 입력해주세요.
          </p>
        </div>

        <div className={styles.agree_container}>
          <div className={styles.agree}>
            <input type="checkbox" className={styles.save_id} />
            <p className={styles.agree_text}>
              이메일 또는 문자로 새로운 소식이나 할인쿠폰을 받겠습니다.(선택)
            </p>
          </div>
          <div className={styles.agree}>
            <input type="checkbox" className={styles.save_id} />
            <p className={styles.agree_text}>
              <span className={styles.green}>개인정보처리방침</span> 및{" "}
              <span className={styles.green}>트래블포레스트 이용약관</span>에
              동의합니다.(필수)
            </p>
          </div>
        </div>
        <button type="submit" className={styles.submit_button}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
