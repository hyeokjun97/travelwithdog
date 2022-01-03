import React from "react";
import styles from "./aboutUs.module.css";

const AboutUs = (props) => {
  const desc = `트래블포레스트는 각 지역의 전문지식과 경험으로\n현지여행에 필요한 모든 서비스 - 숙소, 교통, 투어, 입장권, 가이드, 라운지, 각종 패스 등 - 를 제공하는\n온라인 여행 서비스 플랫폼 (Travel Service Platform Company)입니다.`;
  const descBottom = `아시아대륙에 처음 꽃피운 여행자의 쉼터 아시아트리(AsiaTree)를 시작으로\n이제 전세계 곳곳에 여행자를 위한 나무를 심고 가꾸어 숲을 만들도록 하겠습니다.\n이제\n여행자들을 위한 숲 = 트래블포레스트(Travel Forest)에서\n보다 쉽고, 보다 편하게 여행을 하세요.`;
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Welcome To Travel Forest!</h2>
      <p className={styles.desc}>{desc}</p>
      <img
        src="/travelWithDog/images/aboutus.jpeg"
        alt="aboutus"
        className={styles.image}
      />
      <p className={styles.desc}>{descBottom}</p>
    </main>
  );
};

export default AboutUs;
