import React from "react";
import styles from "./communityPage.module.css";

const CommunityPage = (props) => {
  return (
    <div className={styles.body}>
      <div className={styles.top_banner}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>커뮤니티</h1>
          <p className={styles.subtitle}>트래블위드독 회원들과의 소통공간</p>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.main_top}>
          <h2 className={styles.board_title}>여행기 게시판</h2>
          <ul className={styles.select_container}>
            <li className={styles.select_button}>여행기</li>
            <li className={styles.select_button}>노하우</li>
            <li className={styles.select_button}>이벤트</li>
            <li className={styles.select_button}>뉴스</li>
          </ul>
        </div>
        <div className={styles.search_container}>
          <select className={styles.select}>
            <option value="제목">제목</option>
            <option value="글쓴이">글쓴이</option>
            <option value="내용">내용</option>
          </select>
          <div className={styles.search_box}>
            <input
              type="text"
              className={styles.search_input}
              placeholder="검색"
              spellCheck="false"
            />
            <div className={styles.search_icon_container}>
              <i className={`${styles.search_icon} fas fa-search`}></i>
            </div>
          </div>
        </div>
        <div className={styles.list}></div>
      </main>
    </div>
  );
};

export default CommunityPage;
