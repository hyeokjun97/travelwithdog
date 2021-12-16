import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./header.module.css";
import { debounce } from "lodash";

const Header = ({ categoryList }) => {
  const headerRef = useRef();
  const navigate = useNavigate();
  const [toggleOn, setToggleOn] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      debounce(() => {
        setScrollValue(window.scrollY);
      }, 10)
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${
        !toggleOn
          ? scrollValue < 140
            ? `${styles.header} ${styles.header_on}`
            : `${styles.header} ${styles.header_off}`
          : `${styles.header} ${styles.header_off}`
      }`}
    >
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
              setToggleOn(false);
              navigate("/");
              window.scrollTo({ top: 0 });
            }}
          />
        </div>

        <nav
          className={`${
            toggleOn
              ? `${styles.navbar} ${styles.on}`
              : `${styles.navbar} ${styles.off}`
          }`}
        >
          <ul className={styles.menu_list}>
            {categoryList.map((category) => (
              <li
                key={category.id}
                className={styles.menu_item}
                onClick={() => {
                  navigate(`/category/${category.route}`);
                  window.scrollTo({ top: 0 });
                }}
              >
                {category.title}
              </li>
            ))}
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
                setToggleOn(false);
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
