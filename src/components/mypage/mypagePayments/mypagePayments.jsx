import React from "react";
import styles from "./mypagePayments.module.css";
import MypagePaymentsItem from "./mypagePaymentsItem/mypagePaymentsItem";

const MypagePayments = ({ isLoggedIn }) => {
  return (
    <div className={styles.payments}>
      <MypagePaymentsItem isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default MypagePayments;
