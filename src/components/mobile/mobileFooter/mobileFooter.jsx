import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./mobileFooter.module.css";

const MobileFooter = (props) => {
  const navigate = useNavigate();
  const { pathname } = window.location;

  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const parsePath = () => {
      const pathList = pathname.split("/");
      if (pathList[pathList.length - 1] === "") {
        return "home";
      } else if (pathList.find((item) => item === "mypage")) {
        return "mypage";
      } else if (
        pathList.find((item) => item === "category" || item === "rentcar")
      ) {
        return "category";
      } else if (pathList.find((item) => item === "community")) {
        return "community";
      } else if (pathList.find((item) => item === "map")) {
        return "map";
      }
    };
    setSelected(parsePath());
  }, [pathname]);
  return (
    <footer className={styles.footer}>
      <div
        className={`${
          selected === "home"
            ? `${styles.button} ${styles.on}`
            : `${styles.button}`
        }`}
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0 });
        }}
      >
        <i className={`${styles.icon} fas fa-home`}></i>
        <p className={styles.text}>홈</p>
      </div>
      <div
        className={`${
          selected === "category"
            ? `${styles.button} ${styles.on}`
            : `${styles.button}`
        }`}
        onClick={() => {
          navigate("/mobile/category/jeju");
          window.scrollTo({ top: 0 });
        }}
      >
        <i className={`${styles.icon} fas fa-shopping-bag`}></i>
        <p className={styles.text}>상품</p>
      </div>
      <div
        className={`${
          selected === "community"
            ? `${styles.button} ${styles.on}`
            : `${styles.button}`
        }`}
        onClick={() => {
          navigate("/community/1");
          window.scrollTo({ top: 0 });
        }}
      >
        <i className={`${styles.icon} far fa-comments`}></i>
        <p className={styles.text}>커뮤니티</p>
      </div>
      <div
        className={`${
          selected === "map"
            ? `${styles.button} ${styles.on}`
            : `${styles.button}`
        }`}
        onClick={() => {
          navigate("/map");
          window.scrollTo({ top: 0 });
        }}
      >
        <i className={`${styles.icon} fas fa-map-marker-alt`}></i>
        <p className={styles.text}>지도</p>
      </div>
      <div
        className={`${
          selected === "mypage"
            ? `${styles.button} ${styles.on}`
            : `${styles.button}`
        }`}
        onClick={() => {
          navigate("/mobile/mypage");
          window.scrollTo({ top: 0 });
        }}
      >
        <i className={`${styles.icon} fas fa-user-alt`}></i>
        <p className={styles.text}>프로필</p>
      </div>
    </footer>
  );
};

export default MobileFooter;
