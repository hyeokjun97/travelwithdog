import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./mobileHeader.module.css";

const MobileHeader = (props) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const onSearchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchInput === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    setSearchInput("");
    navigate(`/search/${searchInput}`);
  };
  return (
    <header className={styles.header}>
      <img
        src="/travelWithDog/images/logo.png"
        alt="logo"
        className={styles.logo}
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0 });
        }}
      />
      <form className={styles.search_container}>
        <input
          value={searchInput}
          onChange={onSearchInputChangeHandler}
          type="text"
          className={styles.search_input}
          spellCheck="false"
          placeholder="검색"
        />
        <button
          type="submit"
          className={styles.search_icon_container}
          onClick={onSearchSubmitHandler}
        >
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </button>
      </form>
    </header>
  );
};

export default MobileHeader;
