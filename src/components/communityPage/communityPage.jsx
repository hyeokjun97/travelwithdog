import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../loadingPage/loadingPage";
import ArticleItem from "./articleItem/articleItem";
import styles from "./communityPage.module.css";

const CommunityPage = (props) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState(null);
  const [articleList, setArticleList] = useState(null);
  const [boardTitle, setBoardTitle] = useState(null);
  const [pageNumberList, setPageNumberList] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);

  const loadBoardList = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/boards`)
      .then((response) => setBoardList(response.data))
      .catch((err) => console.error(err));
  };

  const loadArticleList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/boards/${boardId}/articles?limit=8&page=${selectedPage}`
      )
      .then((response) => {
        setArticleList(response.data.data);
        const tmpList = [];
        const len = response.data.total;
        let pageLength;
        if (len % 8 === 0) pageLength = len / 8;
        else pageLength = parseInt(len / 8) + 1;

        for (let i = 1; i <= pageLength; i++) {
          tmpList.push(i);
        }
        setPageNumberList(tmpList);
      })
      .catch((err) => console.error(err));
  };

  const onPageChangeHandler = (e) => {
    setSelectedPage(parseInt(e.currentTarget.innerText));
  };

  const pageRangeToNext = () => {
    if (pageRange + 5 >= pageNumberList[pageNumberList.length - 1]) {
      return;
    }
    setSelectedPage(pageRange + 6);
    setPageRange(pageRange + 5);
  };

  const pageRangeToPrev = () => {
    if (pageRange - 5 < 0) {
      return;
    }
    setSelectedPage(pageRange);
    setPageRange(pageRange - 5);
  };

  const moveToWritePage = () => {
    navigate("/articlew");
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    loadBoardList();
  }, []);

  useEffect(() => {
    setSelectedPage(1);
    setPageRange(0);
    loadArticleList();
  }, [boardId]);

  useEffect(() => {
    loadArticleList();
  }, [selectedPage]);

  useEffect(() => {
    if (!boardList) {
      return;
    }
    boardList.forEach((board) => {
      if (board.id === parseInt(boardId)) {
        setBoardTitle(board.name);
        return false;
      }
    });
  }, [boardList, boardId]);

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
          {boardTitle && (
            <h2 className={styles.board_title}>{`${boardTitle} 게시판`}</h2>
          )}
          <ul className={styles.select_container}>
            {boardList &&
              boardList.map((board) => (
                <li
                  key={board.id}
                  onClick={() => {
                    navigate(`/community/${board.id}`);
                  }}
                  className={`${
                    boardId === board.id.toString()
                      ? `${styles.select_button} ${styles.select_button_on}`
                      : `${styles.select_button}`
                  }`}
                >
                  {board.name}
                </li>
              ))}
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
        <div className={styles.list}>
          {!articleList ? (
            <div className={styles.loading_container}>
              <LoadingPage />
            </div>
          ) : articleList.length > 0 ? (
            articleList.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))
          ) : (
            <p className={styles.no_article}>게시물이 없습니다</p>
          )}
        </div>
        <div className={styles.write_button_container}>
          <button className={styles.write_button} onClick={moveToWritePage}>
            글쓰기
          </button>
        </div>
        <div className={styles.number_container}>
          <ul className={styles.number_list}>
            {pageNumberList && pageNumberList.length > 5 && (
              <li className={styles.arrow_left_box} onClick={pageRangeToPrev}>
                <i className={`${styles.arrow_left} fas fa-chevron-left`}></i>
              </li>
            )}
            {pageNumberList &&
              pageNumberList.length > 0 &&
              pageNumberList.slice(pageRange, pageRange + 5).map((num) => (
                <li
                  key={num}
                  className={`${
                    num === selectedPage
                      ? `${styles.number_item} ${styles.number_item_on}`
                      : `${styles.number_item}`
                  }`}
                  onClick={onPageChangeHandler}
                >
                  {num}
                </li>
              ))}
            {pageNumberList && pageNumberList.length > 5 && (
              <li className={styles.arrow_right_box} onClick={pageRangeToNext}>
                <i className={`${styles.arrow_right} fas fa-chevron-right`}></i>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
