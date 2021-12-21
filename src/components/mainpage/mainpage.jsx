import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ItemSlickFour from "../slick/itemSlickFour/itemSlickFour";
import ItemSlickOne from "../slick/itemSlickOne/itemSlickOne";
import ItemSlickThree from "../slick/itemSlickThree/itemSlickThree";
import ItemSlickTwo from "../slick/itemSlickTwo/itemSlickTwo";
import TagButton from "../tagButton/tagButton";
import styles from "./mainpage.module.css";

const Mainpage = ({ chabak, jejuBest, hotList, tagButtonList }) => {
  const navigate = useNavigate();
  const listRef = useRef();

  const setObserver = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      console.log(entries);
    });
    observer.observe(listRef.current);
  };
  useEffect(() => {
    setObserver();
  }, []);
  return (
    <div className={styles.mainpage}>
      <div className={styles.top_banner}>
        <div className={styles.top_filter}>
          <p className={styles.title}>사랑하는 댕댕이와 함께하는 추억여행,</p>
          <p className={styles.title_two}>트래블위드독이 함께합니다.</p>
          <p className={styles.subtitle}>
            중/대형견과 함께하는 여행이 어렵다고요? 중/대형견 전용 렌터카를
            찾아보세요.
          </p>
          <div className={styles.search_and_tag_container}>
            <div className={styles.search_container}>
              <input
                type="text"
                className={styles.search_input}
                placeholder="원하시는 키워드로 검색해보세요"
              />
              <div
                className={styles.search_icon_container}
                onClick={() => {
                  navigate("/mypage/edit");
                }}
              >
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
            </div>
            <div className={styles.tag_container}>
              {tagButtonList.map((tag) => (
                <TagButton key={tag} value={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list_part}>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>HOT한 여행지 순위</p>
          <ItemSlickTwo viewItems={hotList} />
        </div>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>현재 인기 있는 숙소</p>
          <ItemSlickThree viewItems={chabak} />
        </div>

        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>현재 인기 있는 숙소</p>
          <ItemSlickFour viewItems={chabak} />
        </div>
        <div ref={listRef} className={styles.list_container}>
          <p className={styles.list_title}>양양/속초 반려견 여행 BEST</p>
          <ItemSlickOne viewItems={jejuBest} />
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
