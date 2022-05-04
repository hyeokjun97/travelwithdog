import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../loadingPage/loadingPage";
import ArticleItem from "./articleItem/articleItem";
import styles from "./communityPage.module.css";

const CommunityPage = ({ isLoggedIn }) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState(null);
  const [articleList, setArticleList] = useState(null);
  const [board, setBoard] = useState(null);
  const [pageNumberList, setPageNumberList] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);
  const [child, setChild] = useState(null);
  const [childOpen, setChildOpen] = useState(false);
  const [allBoardList, setAllBoardList] = useState(null);

  const loadBoardList = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/boards`)
      .then((response) => {
        setBoardList(response.data);
        const boardResult = [];
        //1단계
        response.data.forEach((board) => {
          boardResult.push(board);
          //2단계
          if (board.children && board.children.length > 0) {
            board.children.forEach((child) => {
              boardResult.push(child);
              //3단계 (최대)
              if (child.children && child.children.length > 0) {
                child.children.forEach((ch) => {
                  boardResult.push(ch);
                });
              }
            });
          }
        });
        setAllBoardList(boardResult);
      })
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
    if (!isLoggedIn) {
      alert("로그인 후에 사용 가능합니다.");
      return;
    }
    navigate("/articlew");
    window.scrollTo({ top: 0 });
  };

  const onChildOpenHandler = () => {
    setChildOpen(!childOpen);
  };

  useEffect(() => {
    loadBoardList();
  }, []);

  useEffect(() => {
    setChildOpen(false);
    setSelectedPage(1);
    setPageRange(0);
    loadArticleList();
  }, [boardId]);

  useEffect(() => {
    loadArticleList();
  }, [selectedPage]);

  useEffect(() => {
    if (!allBoardList) {
      return;
    }
    allBoardList.forEach((boardItem) => {
      if (boardItem.id === parseInt(boardId)) {
        setBoard(boardItem);
        return false;
      }
    });
  }, [allBoardList, boardList, boardId]);

  useEffect(() => {
    if (!board) {
      return;
    }
    const childTmp = [];
    if (board.children.length > 0) {
      board.children.forEach((ch) => {
        childTmp.push(ch);
      });
    }
    setChild(childTmp);
  }, [board]);

  return (
    <div className={styles.body}>
      <div className={styles.top_banner}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>커뮤니티</h1>
          <p className={styles.subtitle}>트래블위드독 회원들과의 소통공간</p>
        </div>
      </div>
      <main className={styles.main}>
      {/*board && (
            <h2 className={styles.board_title}>{`${board.name} 게시판`}</h2>
      )*/}
        {/* From here we change to tree node. */}
        <div className={styles.main_top}>
            {board && (
              <h2 className={styles.board_title}>{`${board.name} 게시판`}</h2>
            )}
            
            <div className={styles.search_container}>
            <div className={styles.search_left}>
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
            {/*child && child.length > 0 && (
              <button
                className={styles.open_child_button}
                onClick={onChildOpenHandler}
              >
                서브게시판
              </button>
            )*/}
          </div>

        </div>
        
        <div className={styles.sidebar}>
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
        <div className={styles.main_contents}>
            <div className={styles.list}>
              {childOpen && child && child.length > 0 && (
                <div className={styles.child_container}>
                  {child.map((ch) => (
                    <div className={styles.child}>
                      <h3
                        className={styles.child_title}
                        onClick={() => navigate(`/community/${ch.id}`)}
                      >
                        {ch.name}
                      </h3>
                      <div className={styles.child_of_child_container}>
                        <ul>
                          {ch.children.length > 0 &&
                            child.children.map((chch) => (
                              <li className={styles.child_of_child}>{chch.name}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
        </div>
        
        
      </main>
    </div>
  );
};

export default CommunityPage;
