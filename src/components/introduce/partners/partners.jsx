import React from "react";
import styles from "./partners.module.css";

const Partners = (props) => {
  const desc = `트래블포레스트는 항상 "진짜 여행"을 꿈꾸고 있습니다.
  여러분들이 꿈꾸시는 "진짜 여행"에 대해서 함께 고민하고, 함께 이야기하면서 더불어 함께 성장하고 싶습니다.
  
  트래블포레스트의 파트너가 되시고 싶으신 현지여행사, 한국의 여행사분들 언제든지 저희 쪽으로 알려주십시오.
  여행 분들의 소중한 정보는 여행자들이 편하게 쉬며, 여행할 수 있는 숲의 소중한 씨앗이 됩니다.
  
  감사합니다.`;

  const itemDesc = {
    one: `트래블포레스트의 파트너가 되시는 것부터, 상품을 등록하고 판매하고 진행하는 것이 매우 쉽습니다.
    파트너 사들이 가지시고 계신 가장 좋은 상품들을, 트래블포레스트가 가진 좋은 상품들을, 한국여행자들 그리고 나아가 전세계 여행자들에게 쉽고 빠르게 알릴 수 있습니다.`,
    two: `파트너 사가 계신 곳이 어디든지 인터넷 접속이 가능하시다면, 언제든지 상품을 등록하시고 판매를 하실 수 있습니다.`,
    three: `저희가 생각하는 파트너쉽(Partnership)은 "함께"입니다. 우리 서로 다르지만 여행과 여행자를 생각하는 것은 모두 같습니다.
    갑과 을이 아닌 파트너로 여러분을 모십니다.`,
  };
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>
        Interested In Becoming A Travel Forest Partner
      </h2>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.item_container}>
        <div className={styles.item}>
          <i className={`${styles.icon} fas fa-puzzle-piece`}></i>
          <h4 className={styles.item_title}>IT'S EASY</h4>
          <p className={styles.item_desc}>{itemDesc.one}</p>
        </div>
        <div className={styles.item}>
          <i className={`${styles.icon} fas fa-globe`}></i>
          <h4 className={styles.item_title}>ON-LINE</h4>
          <p className={styles.item_desc}>{itemDesc.two}</p>
        </div>
        <div className={styles.item}>
          <i className={`${styles.icon} fas fa-handshake`}></i>
          <h4 className={styles.item_title}>PARTNERSHIP</h4>
          <p className={styles.item_desc}>{itemDesc.three}</p>
        </div>
      </div>
    </main>
  );
};
export default Partners;
