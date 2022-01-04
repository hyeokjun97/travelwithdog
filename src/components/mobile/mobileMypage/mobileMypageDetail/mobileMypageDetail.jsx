import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSlick from "../../../slick/buttonSlick/buttonSlick";

import styles from "./mobileMypageDetail.module.css";
import MobileMypageEdit from "./mobileMypageEdit/mobileMypageEdit";
import MobileMypagePayments from "./mobileMypagePayments/mobileMypagePayments";

const MobileMypageDetail = (props) => {
  const navigate = useNavigate();
  const { path } = useParams();
  const [selected, setSelected] = useState(null);
  const [buttonList, setButtonList] = useState([
    {
      id: 1,
      title: "정보수정",
      route: "edit",
    },
    {
      id: 2,
      title: "결제내역",
      route: "payments",
    },
    {
      id: 3,
      title: "취소내역",
      route: "paymentscancel",
    },
    {
      id: 4,
      title: "글/댓글",
      route: "community",
    },
    {
      id: 5,
      title: "고객문의",
      route: "qna",
    },
  ]);

  const onSelectChangeHandler = (item) => {
    navigate(`/mobile/mypage/${item.route}`);
  };

  useEffect(() => {
    buttonList.forEach((button) => {
      if (button.route === path) {
        setSelected(button);
        return false;
      }
    });
  }, [path]);

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>마이페이지</h2>
      <div className={styles.button_container}>
        {selected && (
          <ButtonSlick
            buttonList={buttonList}
            selected={selected}
            onSelectChangeHandler={onSelectChangeHandler}
          />
        )}
      </div>

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
