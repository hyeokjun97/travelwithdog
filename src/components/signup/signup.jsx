import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";


const Signup = ({ onCloseButtonHandler }) => {
  const [confirmedId, setConfirmedId] = useState(null);
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    authNum: "",
  });

  const [checkboxValue, setCheckboxValue] = useState({
    recieve: false,
    policy: false,
  });

  const { id, password, passwordConfirm, authNum } = inputValue;
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

  const getEmailToken = () => {
    if (id === "") {
      alert("이메일 주소를 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/email/token`, {
        email: id,
      })
      .then((response) => alert("인증번호가 발송되었습니다."))
      .catch((err) => {
        console.error(err);
        alert(err.response.data.message);
      });
  };

  const authEmailToken = () => {
    if (authNum === "") {
      alert("인증번호를 입력해주세요");
      return;
    }
    if (authNum.length !== 6) {
      alert("인증번호는 6자리입니다.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/email/verify`, {
        email: id,
        token: authNum,
      })
      .then((response) => {
        alert("인증이 완료되었습니다.");
        setConfirmedId(response.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data.message);
      });
  };

  const onSignupSubmitHandler = (e) => {
    e.preventDefault();
    if (!confirmedId) {
      alert("이메일 인증을 완료해주세요");

      return;
    }
    if (password.length < 8) {
      alert("비밀번호는 최소 8자리 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!checkboxValue.policy) {
      alert(
        "개인정보처리방침 및 트래블포레스트 이용약관에 동의하셔야 가입이 가능합니다."
      );
      return;
    }

    axios
      .put(`${process.env.REACT_APP_BASEURL}/auth/register`, {
        id: confirmedId.id,
        email: confirmedId.email,
        password: password,
        password_confirmation: passwordConfirm,
        letter: recieve,
      })
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/travelWithDog";
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data.message);
      });
  };


  return (
    <div className={styles.signup_popup}>
      <div onClick={onCloseButtonHandler}>
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      <img
        src="/travelWithDog/images/logo.png"
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
              disabled={confirmedId ? true : false}
            />

            <button
              type="button"
              className={styles.confirm_button}
              onClick={getEmailToken}
              disabled={confirmedId ? true : false}
            >
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
              disabled={confirmedId ? true : false}
            />
            <button
              type="button"
              className={styles.confirm_button}
              onClick={authEmailToken}
              disabled={confirmedId ? true : false}
            >
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
        <button
          type="submit"
          className={styles.submit_button}
          onClick={onSignupSubmitHandler}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
