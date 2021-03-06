import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./tagButton.module.css";

const TagButton = ({ value }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.button}
      onClick={() => {
        navigate(`/search/${value}`);
        window.scrollTo({ top: 0 });
      }}
    >
      <p className={styles.text}>{`#${value}`}</p>
    </div>
  );
};

export default TagButton;
