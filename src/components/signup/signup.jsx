import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";

const Signup = ({ onCloseButtonHandler }) => {
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    authNum: "",
  });

  const [checkboxValue, setCheckboxValue] = useState({
    recieve: false,
    policy: false,
  });

  const { id, password, passwordConfirm, phone, authNum } = inputValue;
  const { recieve, policy } = checkboxValue;

  const onInputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onCheckboxChangeHandler = (e) => {
    const { name, checked } = e.target;

    setCheckboxValue({
      ...checkboxValue,
      [name]: checked,
    });
  };

  useEffect(() => {
    console.log(checkboxValue);
  }, [checkboxValue]);

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
              name="id"
              onChange={onInputValueChangeHandler}
              value={id}
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
              name="authNum"
              onChange={onInputValueChangeHandler}
              value={authNum}
              type="text"
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
            name="password"
            onChange={onInputValueChangeHandler}
            value={password}
            type="password"
            className={styles.input}
            placeholder="비밀번호"
            spellCheck="false"
          />
        </div>

        <div className={styles.input_container}>
          <p className={styles.text}>비밀번호 확인</p>
          <input
            name="passwordConfirm"
            onChange={onInputValueChangeHandler}
            value={passwordConfirm}
            type="password"
            className={styles.input}
            placeholder="비밀번호 확인"
            spellCheck="false"
          />
        </div>

        <div className={styles.input_container_bottom}>
          <p className={styles.text}>연락처</p>
          <input
            name="phone"
            onChange={onInputValueChangeHandler}
            value={phone}
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
            <input
              name="recieve"
              onChange={onCheckboxChangeHandler}
              value={recieve}
              type="checkbox"
              className={styles.save_id}
            />
            <p className={styles.agree_text}>
              이메일 또는 문자로 새로운 소식이나 할인쿠폰을 받겠습니다.(선택)
            </p>
          </div>
          <div className={styles.agree}>
            <input
              name="policy"
              onChange={onCheckboxChangeHandler}
              value={policy}
              type="checkbox"
              className={styles.save_id}
            />
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
