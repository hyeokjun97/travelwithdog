import React from "react";
import { useParams } from "react-router-dom";
import styles from "./mobileMypagePayments.module.css";
import MobileMypagePaymentsItem from "./mobileMypagePaymentsItem/mobileMypagePaymentsItem";

const MobileMypagePayments = (props) => {
  const { path } = useParams();

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>
        {path === "payments"
          ? "결제내역"
          : path === "paymentscancel"
          ? "결제취소내역"
          : ""}
      </h3>
      <MobileMypagePaymentsItem />
    </div>
  );
};

export default MobileMypagePayments;
