import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSlick from "../../../slick/buttonSlick/buttonSlick";
import MobileMypageCommunity from "./mobileMypageCommunity/mobileMypageCommunity";

import styles from "./mobileMypageDetail.module.css";
import MobileMypageEdit from "./mobileMypageEdit/mobileMypageEdit";
import MobileMypagePayments from "./mobileMypagePayments/mobileMypagePayments";
import MobileMypageQna from "./mobileMypageQna/mobileMypageQna";

const MobileMypageDetail = (props) => {
  const navigate = useNavigate();
  const { path } = useParams();
  const [selected, setSelected] = useState(null);
  const [buttonList, setButtonList] = useState([
    {
      cd: 1,
      name: "정보수정",
      route: "edit",
    },
    {
      cd: 2,
      name: "결제내역",
      route: "payments",
    },
    {
      cd: 3,
      name: "취소내역",
      route: "paymentscancel",
    },
    {
      cd: 4,
      name: "글/댓글",
      route: "community",
    },
    {
      cd: 5,
      name: "고객문의",
      route: "qna",
    },
  ]);

  const onSelectChangeHandler = (item) => {
    navigate(`/mobile/mypage/${item.route}`);
  };

  useEffect(() => {
    buttonList.forEach((button) => {
      if (button.route === path) {
        setSelected(button.name);
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
            where="mypage"
          />
        )}
      </div>

      {path === "edit" ? (
        <MobileMypageEdit />
      ) : path === "payments" ? (
        <MobileMypagePayments />
      ) : path === "paymentscancel" ? (
        <MobileMypagePayments />
      ) : path === "community" ? (
        <MobileMypageCommunity />
      ) : path === "qna" ? (
        <MobileMypageQna />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileMypageDetail;
