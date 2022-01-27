import React, { useEffect, useState } from "react";
import MenuSlick from "../../slick/menuSlick/menuSlick";
import styles from "./mobileCategory.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CategoryPage from "../../categoryPage/categoryPage";

const MobileCategory = ({ categoryList, loadPageData }) => {
  const navigate = useNavigate();
  const { path } = useParams();
  const [category, setCategory] = useState(null);

  const onCategoryChangeHandler = (data) => {
    navigate(`/category/${data.id}`);
  };

  useEffect(() => {
    categoryList.forEach((cat) => {
      if (cat.id === Number(path)) {
        setCategory(cat);
      }
    });
  }, [path]);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        {category && (
          <MenuSlick
            viewItems={categoryList}
            category={category}
            onCategoryChangeHandler={onCategoryChangeHandler}
          />
        )}
      </div>
      <div className={styles.list_part}>
        <CategoryPage loadPageData={loadPageData} />
      </div>
    </div>
  );
};
export default MobileCategory;
