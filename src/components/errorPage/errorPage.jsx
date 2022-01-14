import React from "react";
import styles from "./errorPage.module.css";

const ErrorPage = (props) => {
  return (
    <div className={styles.error}>
      <div className={styles.error_main}>
        <div className={styles.image_container}>
          <img
            src="/travelWithDog/images/error_logo.png"
            alt="error_logo"
            className={styles.image}
          />
        </div>
        <div className={styles.text_container}>
          <p className={styles.title}>Page not found</p>
          <p className={styles.subtitle}>페이지를 찾을 수 없습니다.</p>
          <p className={styles.desc}>
            {`페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.\n입력하신 주소가 정확한지 다시 한 번 확인해주세요.`}
          </p>
          <div className={styles.button_container}>
            <button className={styles.button_main}>메인으로</button>
            <button className={styles.button}>이전페이지</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
