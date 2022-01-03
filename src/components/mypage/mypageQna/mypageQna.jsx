import React from "react";
import styles from "./mypageQna.module.css";
import MypageQnaItem from "./mypageQnaItem/mypageQnaItem";

const MypageQna = (props) => {
  return (
    <div className={styles.main}>
      <MypageQnaItem />
      <MypageQnaItem />
    </div>
  );
};

export default MypageQna;
