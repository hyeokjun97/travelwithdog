import React from "react";
import styles from "./popup.module.css";

const Popup = ({ data, onPopupCloseHandler }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.popup}>
        <div onClick={onPopupCloseHandler}>
          <i className={`${styles.close_icon} fas fa-times`}></i>
        </div>
        <img
          src="/travelWithDog/images/logo.svg"
          alt="logo"
          className={styles.logo}
        />
        <p className={styles.title}>{data.title}</p>
        <div className={styles.content_container}>{data.content}</div>
      </div>
    </div>
  );
};

export default Popup;
