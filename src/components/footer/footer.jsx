import { Container } from "postcss";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = (props) => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <ul className={styles.top_menu}>
          <li>
            <img
              src="/travelWithDog/images/logo.png"
              alt="logo"
              className={styles.logo}
            />
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/aboutus");
            }}
          >
            소개
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/promise");
            }}
          >
            우리의 약속
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/partners");
            }}
          >
            파트너
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/contact");
            }}
          >
            찾아오시는 길
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/privacypolicy");
            }}
          >
            개인정보처리방침
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/travelterms");
            }}
          >
            여행약관
          </li>
          <li
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate("/introduce/userterms");
            }}
          >
            이용약관
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.sns_container}>
          <a
            href="https://www.facebook.com/travelforest"
            target="_blank"
            rel="noopenner"
          >
            <img
              src="/travelWithDog/images/facebook_white.png"
              alt="sns_icon"
              className={styles.sns_icon}
            />
          </a>
          <a
            href="https://www.facebook.com/travelforest"
            target="_blank"
            rel="noopenner"
          >
            <img
              src="/travelWithDog/images/kakao_white.png"
              alt="sns_icon"
              className={styles.sns_icon}
            />
          </a>{" "}
          <a
            href="https://www.facebook.com/travelforest"
            target="_blank"
            rel="noopenner"
          >
            <img
              src="/travelWithDog/images/naver_blog_white.png"
              alt="sns_icon"
              className={styles.sns_icon}
            />
          </a>
        </div>
        {/* Footer 디자인 바꾸기 -> [확인]이라는 글은 지웠습니다 jejupetrentcar 참고 */}
        <div className={styles.contact_container}>
          <div className={styles.contact_space}>
          </div>
          <div className={styles.contact_info1}>
            <p className={styles.text1}>
              <b>대표 </b> 김신철
            </p>
            <p className={styles.text1}>
              <b>사업자등록번호 </b> 822-87-00041
            </p>
            <p className={styles.text1}>
              <b>관광사업등록 </b> 제 2016-000007호
            </p>
            <p className={styles.text1}>
              <b>통신판매업신고 </b> 제 2016-서울마포-0343호
            </p>
          </div>
          <div className={styles.contact_info2}>
            <p className={styles.text2}>
              <b>주소 </b>서울특별시 마포구 서강로9길 48, 4층 
            </p>
            <p className={styles.text2}>
              <b>Tel </b> +82-2-6053-7272~3 
            </p>
            <p className={styles.text2}>
              <b>Fax</b> +82-2-6053-7270 
            </p>
            <p className={styles.text2}>
              <b>Email </b> info@travelforest.co.kr  
            </p>
            <p className={styles.text2}>
              10:00 am ~ 17:00 pm (Mon~Fri)
            </p>
          </div>

        </div>
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
