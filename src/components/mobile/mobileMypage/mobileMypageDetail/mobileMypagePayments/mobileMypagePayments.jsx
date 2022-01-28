import React from "react";
import { useParams } from "react-router-dom";
import styles from "./mobileMypagePayments.module.css";
import MobileMypagePaymentsCancelItem from "./mobileMypagePaymentsCancelItem/mobileMypagePaymentsCancelItem";
import MobileMypagePaymentsItem from "./mobileMypagePaymentsItem/mobileMypagePaymentsItem";

const MobileMypagePayments = ({ isLoggedIn }) => {
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
      {path === "payments" ? (
        <MobileMypagePaymentsItem isLoggedIn={isLoggedIn} />
      ) : path === "paymentscancel" ? (
        <MobileMypagePaymentsCancelItem />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileMypagePayments;
