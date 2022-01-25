import React, { useEffect, useState } from "react";
import MenuSlick from "../../slick/menuSlick/menuSlick";
import styles from "./mobileCategory.module.css";
import ItemSlickFour from "../../slick/itemSlickFour/itemSlickFour";
import ItemSlickOne from "../../slick/itemSlickOne/itemSlickOne";
import ItemSlickThree from "../../slick/itemSlickThree/itemSlickThree";
import ItemSlickTwo from "../../slick/itemSlickTwo/itemSlickTwo";
import { useNavigate, useParams } from "react-router-dom";

const MobileCategory = ({ categoryList }) => {
  const navigate = useNavigate();
  const { path } = useParams();
  const [category, setCategory] = useState(null);

  const onCategoryChangeHandler = (data) => {
    navigate(`/mobile/category/${data.url}`);
  };

  useEffect(() => {
    categoryList.forEach((cat) => {
      if (cat.url.slice(1) === path) {
        setCategory(cat);
      }
    });
  }, [path]);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <h2 className={styles.top_title}>어떤 상품을 찾으시나요?</h2>
        {category && (
          <MenuSlick
            viewItems={categoryList}
            category={category}
            onCategoryChangeHandler={onCategoryChangeHandler}
          />
        )}
      </div>
      <div className={styles.list_part}>{/*여기에 상품 목록을 보여준다*/}</div>
    </div>
  );
};
export default MobileCategory;
