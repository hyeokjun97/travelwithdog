import React from "react";
import styles from "./footer.module.css";

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <ul className={styles.top_menu}>
          <li>
            <img src="/images/logo.svg" alt="logo" className={styles.logo} />
          </li>
          <li>소개</li>
          <li>우리의 약속</li>
          <li>파트너</li>
          <li>찾아오시는 길</li>
          <li>개인정보처리방침</li>
          <li>여행약관</li>
          <li>이용약관</li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.sns_container}>
          <img
            src="/images/facebook.png"
            alt="sns_icon"
            className={styles.sns_icon}
          />
          <img
            src="/images/kakao.png"
            alt="sns_icon"
            className={styles.sns_icon}
          />
          <img
            src="/images/insta.png"
            alt="sns_icon"
            className={styles.sns_icon}
          />
        </div>
        <p className={styles.text}>
          대표: 김신철 | 사업자등록번호: 822-87-00041 [확인] | 관광사업등록: 제
          2016-000007호 | 통신판매업신고: 제 2016-서울마포-0343호 [확인]
        </p>
        <p className={styles.text}>
          서울특별시 마포구 서강로9길 48, 4층 | Tel: +82-2-6053-7272~3 | Fax:
          +82-2-6053-7270 | Email: info@travelforest.co.kr | 10:00 am ~ 17:00 pm
          (Mon~Fri)
        </p>
        <p className={styles.text_two}>
          트래블포레스트는 3천만원의 보증보험에 가입되어 있으며, 각국이 정한
          여행 법령을 준수합니다.
        </p>
        <p className={styles.right}>@2017 AsisTree All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
