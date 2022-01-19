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
      if (
        pathList.find((item) => item === "rentcar") ||
        pathList.find((item) => item === "carsearch")
      ) {
        return "rentcar";
      } else if (pathList.find((item) => item === "mypage")) {
        return "mypage";
      } else if (pathList.find((item) => item === "category")) {
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
        <p
          className={`${
            selected === "category"
              ? `${styles.text} ${styles.on}`
              : `${styles.text}`
          }`}
        >
          상품
        </p>
      </div>
      <div
        className={`${
          selected === "rentcar"
            ? `${styles.button} ${styles.on}`
            : `${styles.button}`
        }`}
        onClick={() => {
          navigate("/rentcar");
          window.scrollTo({ top: 0 });
        }}
      >
        <i className={`${styles.icon} fas fa-car-side`}></i>
        <p
          className={`${
            selected === "rentcar"
              ? `${styles.text} ${styles.on}`
              : `${styles.text}`
          }`}
        >
          렌터카
        </p>
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
        <p
          className={`${
            selected === "community"
              ? `${styles.text} ${styles.on}`
              : `${styles.text}`
          }`}
        >
          커뮤니티
        </p>
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
        <p
          className={`${
            selected === "map"
              ? `${styles.text} ${styles.on}`
              : `${styles.text}`
          }`}
        >
          지도
        </p>
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
        <p
          className={`${
            selected === "mypage"
              ? `${styles.text} ${styles.on}`
              : `${styles.text}`
          }`}
        >
          프로필
        </p>
      </div>
    </footer>
  );
};

export default MobileFooter;
