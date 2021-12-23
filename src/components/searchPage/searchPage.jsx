import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./searchPage.module.css";

const SearchPage = (props) => {
  const { query } = useParams();
  const [searchValue, setSearchValue] = useState(query ? query : "");
  const onSearchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.side_menu}>
          <div className={styles.search_part}>
            <div className={styles.search_container}>
              <input
                value={searchValue}
                onChange={onSearchValueChangeHandler}
                type="text"
                className={styles.search_input}
                spellCheck="false"
                placeholder="검색"
              />
              <div className={styles.search_icon_container}>
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
            </div>
          </div>
          <div className={styles.division_part}>
            <p className={styles.side_menu_title}>분류</p>
            <div className={styles.checkbox_list}>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>전체</p>
              </div>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>숙소</p>
              </div>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>패키지</p>
              </div>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>교통편</p>
              </div>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>커뮤니티</p>
              </div>
            </div>
          </div>
          <div className={styles.sort_part}>
            <p className={styles.side_menu_title}>정렬</p>
            <div className={styles.checkbox_list}>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>최신순</p>
              </div>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>리뷰많은순</p>
              </div>
              <div className={styles.checkbox_container}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.checkbox_text}>평점높은순</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main}></div>
      </div>
    </div>
  );
};
export default SearchPage;
