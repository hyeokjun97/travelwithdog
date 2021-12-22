import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./mobileMypageDetail.module.css";
import MobileMypageEdit from "./mobileMypageEdit/mobileMypageEdit";
import MobileMypagePayments from "./mobileMypagePayments/mobileMypagePayments";

const MobileMypageDetail = (props) => {
  const { path } = useParams();

  return (
    <div className={styles.main}>
      {path === "edit" ? (
        <MobileMypageEdit />
      ) : path === "payments" ? (
        <MobileMypagePayments />
      ) : path === "paymentscancel" ? (
        <MobileMypagePayments />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileMypageDetail;
