import axios from "axios";
import React, { useState } from "react";
import styles from "./login.module.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = ({
  onCloseButtonHandler,
  signupPopupHandler,
  findPopupHandler,
}) => {
  const { Kakao } = window;

  const [inputValue, setInputValue] = useState({
    id: localStorage.getItem("savedId") || "",
    password: "",
  });

  const [idSave, setIdSave] = useState(
    localStorage.getItem("savedId") ? true : false
  );

  const { id, password } = inputValue;

  const onInputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onIdSaveChangeHandler = (e) => {
    setIdSave(e.target.checked);
  };

  const onLoginHandler = (e) => {
    e.preventDefault();
    if (id === "" || password === "") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (idSave) {
      localStorage.setItem("savedId", id);
    } else {
      localStorage.removeItem("savedId");
    }
    axios
      .patch(`${process.env.REACT_APP_BASEURL}/auth/login`, {
        email: id,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("AK", `Bearer ${response.data.access_token}`);
        localStorage.setItem("RK", `Bearer ${response.data.refresh_token}`);
        localStorage.setItem(
          "exp",
          new Date().getTime() + response.data.expires_in
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`; //새로고침 하면 사라짐 => 해결방법 찾기

        // window.location.reload();
        onCloseButtonHandler();
      })
      .catch((err) => {
        console.error(err);

        if (err.response.data.message) {
          alert(err.response.data.message);
        } else if (err.response.data.messages.password) {
          alert("비밀번호는 최소 8자리 이상이어야 합니다.");
        } else if (err.response.data.messages.email) {
          alert("이메일 형식에 맞지 않습니다.");
        }
      });
  };

  const getUserData = () => {
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        console.log(res);
        //여기에 성공 시 처리 방법 넣어야하는데 이것은 업체측의 회원 관리 방식에 따라 달라질 수 있으니 그 때 추가한다.
      },
      fail: function (error) {
        //
        window.alert("에러 발생");
      },
    });
  };

  const loginWithKakao = () => {
    if (!Kakao) {
      return;
    }
    Kakao.Auth.login({
      success: function (response) {
        Kakao.Auth.setAccessToken(response.access_token);
        getUserData();
      },
      fail: function (response) {
        console.log("fail");
      },
    });
  };

  const loginWithFacebook = (response) => {
    console.log(response);
    //추후 추가
  };

  return (
    <div className={styles.login_popup}>
      <div onClick={onCloseButtonHandler}>
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      <img
        src="/travelWithDog/images/logo.png"
        alt="logo"
        className={styles.logo}
      />
      <h3 className={styles.title}>로그인</h3>
      <form className={styles.form}>
        <div className={styles.input_container}>
          <p className={styles.text}>이메일</p>
          <input
            name="id"
            onChange={onInputValueChangeHandler}
            value={id}
            type="email"
            className={styles.input}
            placeholder="이메일"
            spellCheck="false"
          />
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

        <div className={styles.save_id_container}>
          <input
            checked={idSave ? true : false}
            value={idSave}
            onChange={onIdSaveChangeHandler}
            type="checkbox"
            className={styles.save_id}
          />
          <p className={styles.save_id_text}>아이디 저장</p>
        </div>
        <button
          type="submit"
          className={styles.submit_button}
          onClick={onLoginHandler}
        >
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
          <a
            id="custom-login-btn"
            onClick={loginWithKakao}
            className={styles.kakao}
          >
            <img
              src="/travelWithDog/images/kakao_round.png"
              alt="kakao_login"
              className={styles.social_image}
            />
          </a>
          <p className={styles.social_text}>Kakao</p>
        </div>
        <div className={styles.social_button}>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_KEY}
            autoLoad={false}
            fields="name,first_name,last_name,email"
            callback={loginWithFacebook}
            disableMobileRedirect={true}
            render={(renderProps) => (
              <img
                src="/travelWithDog/images/facebook_round.png"
                alt="facebook_login"
                className={styles.social_image}
                onClick={renderProps.onClick}
              />
            )}
          ></FacebookLogin>
          <p className={styles.social_text}>Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
