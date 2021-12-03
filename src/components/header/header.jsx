import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./header.module.css";

const Header = (props) => {
  const navigate = useNavigate();
  const [toggleOn, setToggleOn] = useState(false);
  return (
    <header className={styles.header}>
      <div
        onClick={() => {
          setToggleOn(!toggleOn);
        }}
      >
        <i className={`${styles.close} fas fa-bars`}></i>
      </div>

      <div className={styles.body}>
        <div className={styles.logo_container}>
          <img
            src="/images/logo.svg"
            alt="travel_with_dog"
            className={styles.logo}
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0 });
            }}
          />
        </div>

        <nav
          className={`${
            toggleOn
              ? `${styles.navbar} : ${styles.on}`
              : `${styles.navbar} ${styles.off}`
          }`}
        >
          <ul className={styles.menu_list}>
            <li className={styles.menu_item}>숙박</li>
            <li className={styles.menu_item}>패키지</li>
            <li className={styles.menu_item}>교통편</li>
            <li className={styles.menu_item}>커뮤니티</li>
            <li className={styles.menu_item}>렌터카</li>
          </ul>
        </nav>
        <div
          className={`${
            toggleOn
              ? `${styles.sub_button_container} : ${styles.on}`
              : `${styles.sub_button_container} ${styles.off}`
          }`}
        >
          <ul className={styles.sub_button_list}>
            <li
              className={styles.sub_button_item}
              onClick={() => {
                navigate("/map");
                window.scrollTo({ top: 0 });
              }}
            >
              멍:지
            </li>
            <li className={styles.sub_button_item}>로그인</li>
            <li className={styles.sub_button_item}>회원가입</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
