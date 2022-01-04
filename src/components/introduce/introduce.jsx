import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AboutUs from "./aboutUs/aboutUs";
import Contact from "./contact/contact";
import styles from "./introduce.module.css";
import OurPromise from "./ourPromise/ourPromise";
import Partners from "./partners/partners";
import PrivacyPolicy from "./privacyPolicy/privacyPolicy";
import TravelTerms from "./travelTerms/travelTerms";
import UserTerms from "./userTerms/userTerms";
import Vahana from "./vahana/vahana";

const Introduce = (props) => {
  const { path } = useParams();
  const navigate = useNavigate();

  const [pageName, setPageName] = useState(null);
  useEffect(() => {
    const pageNameSetting = () => {
      //이거 이름정하기
      if (path === "aboutus") {
        return "소개";
      } else if (path === "promise") {
        return "우리의 약속";
      } else if (path === "partners") {
        return "파트너";
      } else if (path === "contact") {
        return "찾아오시는 길";
      } else if (path === "privacypolicy") {
        return "개인정보 처리방침";
      } else if (path === "travelterms") {
        return "여행약관";
      } else if (path === "vahana") {
        return "바하나 이용약관";
      } else if (path === "userterms") {
        return "이용약관";
      }
    };
    setPageName(pageNameSetting());
  }, [path]);
  return (
    <div className={styles.mypage}>
      <div className={styles.top_banner}></div>
      <div className={styles.main}>
        <aside className={styles.side_bar}>
          <p className={styles.side_bar_title}>트래블포레스트</p>
          <div className={styles.side_bar_container}>
            <div className={styles.side_bar_divide_line}></div>
            <ul>
              <li
                className={`${
                  path === "aboutus"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/aboutus");
                }}
              >
                소개
              </li>
              <li
                className={`${
                  path === "promise"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/promise");
                }}
              >
                우리의 약속
              </li>
              <li
                className={`${
                  path === "partners"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/partners");
                }}
              >
                파트너
              </li>
              <li
                className={`${
                  path === "contact"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/contact");
                }}
              >
                찾아오시는 길
              </li>
              <li
                className={`${
                  path === "privacypolicy"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/privacypolicy");
                }}
              >
                개인정보 처리방침
              </li>
              <li
                className={`${
                  path === "travelterms"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/travelterms");
                }}
              >
                여행약관
              </li>
              <li
                className={`${
                  path === "vahana"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/vahana");
                }}
              >
                바하나 이용약관
              </li>
              <li
                className={`${
                  path === "userterms"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/introduce/userterms");
                }}
              >
                이용약관
              </li>
            </ul>
          </div>
        </aside>
        <div className={styles.main_part}>
          <h2 className={styles.title}>{pageName}</h2>
          <div className={styles.main_divide_line}></div>
          {path === "aboutus" ? (
            <AboutUs />
          ) : path === "promise" ? (
            <OurPromise />
          ) : path === "partners" ? (
            <Partners />
          ) : path === "contact" ? (
            <Contact />
          ) : path === "privacypolicy" ? (
            <PrivacyPolicy />
          ) : path === "travelterms" ? (
            <TravelTerms />
          ) : path === "vahana" ? (
            <Vahana />
          ) : path === "userterms" ? (
            <UserTerms />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Introduce;
