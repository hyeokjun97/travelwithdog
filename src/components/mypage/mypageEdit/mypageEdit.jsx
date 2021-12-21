import React from "react";
import styles from "./mypageEdit.module.css";

const MypageEdit = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.container_top}>
        <div className={styles.input_container}>
          <p className={styles.text}>이메일</p>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>연락처</p>
          <input type="text" className={styles.input} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <p className={styles.text}>비밀번호</p>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>비밀번호확인</p>
          <input type="text" className={styles.input} />
        </div>
      </div>
      <div className={styles.agree_container}>
        <input type="checkbox" className={styles.checkbox} />
        <p className={styles.agree_text}>
          이메일 또는 문자로 새로운 소식이나 할인쿠폰을 받겠습니다.
        </p>
      </div>
      <button className={styles.button}>정보수정</button>
    </div>
  );
};

export default MypageEdit;
