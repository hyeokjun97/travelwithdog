import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./mobileHeader.module.css";

const MobileHeader = (props) => {
  const navigate = useNavigate();
  return (
    <header
      className={styles.header}
      onClick={() => {
        navigate("/");
        window.scrollTo({ top: 0 });
      }}
    >
      <img
        src="/travelWithDog/images/logo.svg"
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.search_container}>
        <input
          type="text"
          className={styles.search_input}
          spellCheck="false"
          placeholder="검색"
        />
        <div className={styles.search_icon_container}>
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
