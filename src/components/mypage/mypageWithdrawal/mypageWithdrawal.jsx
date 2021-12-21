import React from "react";
import styles from "./mypageWithdrawal.module.css";

const MypageWithdrawal = (props) => {
  return (
    <div className={styles.withdrawal}>
      <div className={styles.alert_container}>
        <div className={styles.alert}>
          만약, 고객님께서 메일 또는 문자 수신으로 인한 회원 탈퇴를 원하신다면
          회원 정보 수정을 통해 수신을 거부하실 수 있습니다.
        </div>
        <button className={styles.button}>회원정보수정</button>
      </div>
      <div className={styles.inform_container}>
        <p className={styles.title}>회원 정보 보관에 대한 안내</p>
        <div className={styles.inform_main}>
          <div className={styles.inform_item_top}>
            <div className={styles.inform_item_text}>내용</div>
            <div className={styles.inform_item_text}>보관기간</div>
          </div>
          <div className={styles.inform_item}>
            <div className={styles.inform_item_text}>
              계약 또는 청약 철회 등에 관한 기록
            </div>
            <div className={styles.inform_item_text}>5년</div>
          </div>
          <div className={styles.inform_item}>
            <div className={styles.inform_item_text}>
              대금결제 및 재화 등의 공급에 관한 기록
            </div>
            <div className={styles.inform_item_text}>5년</div>
          </div>
          <div className={styles.inform_item}>
            <div className={styles.inform_item_text}>
              소비자의 불만 또는 분쟁처리에 관한 기록
            </div>
            <div className={styles.inform_item_text}>3년</div>
          </div>
        </div>
      </div>
      <div className={styles.confirm_container}>
        <p className={styles.title}>회원 확인</p>
        <div className={styles.divide_line}></div>
        <div className={styles.confirm_input_container}>
          <div className={styles.input_container}>
            <p className={styles.confirm_text}>이메일</p>
            <input type="text" className={styles.confirm_input} />
          </div>
          <div className={styles.input_container}>
            <p className={styles.confirm_text}>비밀번호</p>
            <input type="text" className={styles.confirm_input} />
          </div>
        </div>
        <button className={styles.button}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default MypageWithdrawal;
