import React, { useState } from "react";
import styles from "./header.module.css";

const Header = (props) => {
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
            <li className={styles.menu_item}>입장권</li>
            <li className={styles.menu_item}>교통편</li>
            <li className={styles.menu_item}>맛집</li>
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
            <li className={styles.sub_button_item}>블로그</li>
            <li className={styles.sub_button_item}>로그인</li>
            <li className={styles.sub_button_item}>회원가입</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
