import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummerNote from "../summerNote/summerNote";
import styles from "./articleWrite.module.css";
import Swal from 'sweetalert2';
const ArticleWrite = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardSelect, setBoardSelect] = useState("");
  const [boardList, setBoardList] = useState(null);

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (data) => {
    setContent(data);
  };

  const submitArticle = () => {
    if (title === "" || content === "" || boardSelect === "") {
      //alert("모든 정보를 입력해주세요");
      Swal.fire({
        icon: 'info',
        //title: 'Something',
        text: '모든 정보를 입력해주세요',
        confirmButtonColor: '#1d5e24',
      });
      return;
    }

    if (!isLoggedIn) {
      //alert("로그인 후에 글 작성이 가능합니다.");
      Swal.fire({
        icon: 'info',
        //title: 'Something',
        text: '로그인 후에 글 작성이 가능합니다.',
        confirmButtonColor: '#1d5e24',
      });
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/boards/${boardSelect}/articles`, {
        board_id: boardSelect,
        title: title,
        content: content,
      })
      .then((response) => {
        if (response.status === 204) {
          navigate(`/community/${boardSelect}`);
          window.scrollTo({ top: 0 });
        } else {
          //alert("에러가 발생했습니다. 잠시 후에 다시 시도해주세요");
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: '에러가 발생했습니다. 잠시 후에 다시 시도해주세요',
            confirmButtonColor: '#1d5e24',
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const loadBoardList = () => {
    const boardResult = [];
    axios
      .get(`${process.env.REACT_APP_BASEURL}/boards`) //
      .then((response) => {
        //1단계
        response.data.forEach((board) => {
          boardResult.push({ id: board.id, name: board.name });
          //2단계
          if (board.children && board.children.length > 0) {
            board.children.forEach((child) => {
              boardResult.push({ id: child.id, name: child.name });
              //3단계 (최대)
              if (child.children && child.children.length > 0) {
                child.children.forEach((ch) => {
                  boardResult.push({ id: ch.id, name: ch.name });
                });
              }
            });
          }
        });
        setBoardList(boardResult);
      })
      .catch((err) => console.error(err));
  };

  const boardSelectChangeHandler = (e) => {
    setBoardSelect(e.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      //alert("글 작성 권한이 없습니다. 로그인 후에 다시 사용해주세요");
      Swal.fire({
        icon: 'info',
        //title: 'Something',
        text: '글 작성 권한이 없습니다. 로그인 후에 다시 사용해주세요',
        confirmButtonColor: '#1d5e24',
      });
      window.location.href = "/travelWithDog";
      return;
    }
    loadBoardList();
  }, []);

  //<SummerNote onContentChangeHandler={onContentChangeHandler} />
  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <p className={styles.title}>여행기/노하우 작성</p>
        <p className={styles.desc}>
          트래블위드독과 함께한 여러분의 솔직한 여행기 또는 노하우를 들려주세요
        </p>
        <select
          value={boardSelect}
          onChange={boardSelectChangeHandler}
          className={styles.division_select}
        >
          <option value="">게시판선택</option>
          {boardList &&
            boardList.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
        </select>
        <input
          value={title}
          onChange={onTitleChangeHandler}
          type="text"
          className={styles.title_input}
          spellCheck="false"
          placeholder="제목"
        />
        <div className={styles.summernote_container}>
          <SummerNote
            onContentChangeHandler={onContentChangeHandler}
            boardSelect={boardSelect}
          />
        </div>
        <div className={styles.button_container}>
          <button onClick={submitArticle} className={styles.button}>
            업로드
          </button>
        </div>
      </main>
    </div>
  );
};

export default ArticleWrite;
