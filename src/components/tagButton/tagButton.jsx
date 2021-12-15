import React from "react";
import styles from "./tagButton.module.css";

const TagButton = ({ value }) => {
  return (
    <div className={styles.button}>
      <p className={styles.text}>{`#${value}`}</p>
    </div>
  );
};

export default TagButton;
