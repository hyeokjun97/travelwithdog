import React from "react";
import styles from "./mypagePayments.module.css";
import MypagePaymentsItem from "./mypagePaymentsItem/mypagePaymentsItem";

const MypagePayments = (props) => {
  return (
    <div className={styles.payments}>
      <MypagePaymentsItem />
    </div>
  );
};

export default MypagePayments;
