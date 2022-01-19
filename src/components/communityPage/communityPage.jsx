import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      .then((response) => setArticleList(response.data.data))
      .catch((err) => console.err(err));
  };

  const loadPageLength = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/boards/${boardId}/articles?limit=100000&page=1`
      )
      .then((response) =>
        setPageNumberList(() => {
          const len = response.data.data.length;
          let pageLength;
          const result = [];
          if (len % 8 === 0) pageLength = len / 8;
          else pageLength = parseInt(len / 8) + 1;

          for (let i = 1; i <= pageLength; i++) {
            result.push(i);
          }
          return result;
        })
      )
      .catch((err) => console.err(err));
  };

  const onPageChangeHandler = (e) => {
    setSelectedPage(parseInt(e.currentTarget.innerText));
  };

  useEffect(() => {
    loadBoardList();
  }, []);

  useEffect(() => {
    setSelectedPage(1);
    loadArticleList();
  }, [boardId]);

  useEffect(() => {
    loadArticleList();
  }, [selectedPage]);

  useEffect(() => {
    if (!boardList) {
      return;
    }
    loadPageLength();
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
          {articleList && articleList.length > 0 ? (
            articleList.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))
          ) : (
            <p className={styles.no_article}>게시물이 없습니다</p>
          )}
        </div>
        <div className={styles.number_container}>
          <ul className={styles.number_list}>
            {pageNumberList &&
              pageNumberList.length > 0 &&
              pageNumberList.map((num) => (
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
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
