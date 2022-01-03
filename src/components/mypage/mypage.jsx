import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./mypage.module.css";
import MypageCommunity from "./mypageCommunity/mypageCommunity";
import MypageEdit from "./mypageEdit/mypageEdit";
import MypagePayments from "./mypagePayments/mypagePayments";
import MypageQna from "./mypageQna/mypageQna";
import MypageWithdrawal from "./mypageWithdrawal/mypageWithdrawal";

const Mypage = (props) => {
  const { path } = useParams();
  const navigate = useNavigate();
  const [communitySelect, setCommunitySelect] = useState("글");

  const [pageName, setPageName] = useState(null);
  useEffect(() => {
    const pageNameSetting = () => {
      if (path === "edit") {
        return "회원정보수정";
      } else if (path === "payments") {
        return "결제내역";
      } else if (path === "paymentscancel") {
        return "결제취소내역";
      } else if (path === "qna") {
        return "문의/답변";
      } else if (path === "community") {
        return "나의글/댓글";
      } else if (path === "withdrawal") {
        return "회원탈퇴";
      }
    };
    setPageName(pageNameSetting());
  }, [path]);
  return (
    <div className={styles.mypage}>
      <div className={styles.top_banner}></div>
      <div className={styles.main}>
        <aside className={styles.side_bar}>
          <p className={styles.side_bar_title}>마이페이지</p>
          <div className={styles.side_bar_container}>
            <div className={styles.side_bar_divide_line}></div>
            <ul>
              <li
                className={`${
                  path === "edit"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/mypage/edit");
                }}
              >
                회원정보수정
              </li>
              <li
                className={`${
                  path === "payments"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/mypage/payments");
                }}
              >
                결제내역
              </li>
              <li
                className={`${
                  path === "paymentscancel"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/mypage/paymentscancel");
                }}
              >
                결제취소내역
              </li>
              <li
                className={`${
                  path === "qna"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/mypage/qna");
                }}
              >
                문의/답변
              </li>
              <li
                className={`${
                  path === "community"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/mypage/community");
                }}
              >
                나의글/댓글
              </li>
              <li
                className={`${
                  path === "withdrawal"
                    ? `${styles.menu_item} ${styles.on}`
                    : `${styles.menu_item}`
                }`}
                onClick={() => {
                  navigate("/mypage/withdrawal");
                }}
              >
                회원탈퇴
              </li>
            </ul>
          </div>
        </aside>
        <div className={styles.main_part}>
          <div className={styles.title_container}>
            <h2 className={styles.title}>{pageName}</h2>
            {path === "community" && (
              <div className={styles.button_container}>
                <button
                  className={`${
                    communitySelect === "글"
                      ? `${styles.button_left} ${styles.select_on}`
                      : `${styles.button_left}`
                  }`}
                  onClick={() => setCommunitySelect("글")}
                >
                  글
                </button>
                <button
                  className={`${
                    communitySelect === "댓글"
                      ? `${styles.button_right} ${styles.select_on}`
                      : `${styles.button_right}`
                  }`}
                  onClick={() => setCommunitySelect("댓글")}
                >
                  댓글
                </button>
              </div>
            )}
          </div>

          <div className={styles.main_divide_line}></div>
          {path === "edit" ? (
            <MypageEdit />
          ) : path === "withdrawal" ? (
            <MypageWithdrawal />
          ) : path === "payments" ? (
            <MypagePayments />
          ) : path === "qna" ? (
            <MypageQna />
          ) : path === "community" ? (
            <MypageCommunity communitySelect={communitySelect} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
