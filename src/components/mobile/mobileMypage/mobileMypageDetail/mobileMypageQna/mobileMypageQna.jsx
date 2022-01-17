import React from "react";
import styles from "./mobileMypageQna.module.css";
import MobileMypageQnaItem from "./mobileMypageQnaItem/mobileMypageQnaItem";

const MobileMypageQna = (props) => {
  return (
    <div className={styles.main}>
      <h3 className={styles.title}>고객문의</h3>
      <div className={styles.list}>
        <MobileMypageQnaItem />
      </div>
    </div>
  );
};

export default MobileMypageQna;
