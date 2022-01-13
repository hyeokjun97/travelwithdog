import React, { useEffect, useState } from "react";
import MenuSlick from "../../slick/menuSlick/menuSlick";
import styles from "./mobileCategory.module.css";
import ItemSlickFour from "../../slick/itemSlickFour/itemSlickFour";
import ItemSlickOne from "../../slick/itemSlickOne/itemSlickOne";
import ItemSlickThree from "../../slick/itemSlickThree/itemSlickThree";
import ItemSlickTwo from "../../slick/itemSlickTwo/itemSlickTwo";
import { useNavigate, useParams } from "react-router-dom";

const MobileCategory = ({ categoryList }) => {
  console.log(categoryList);
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
      <div className={styles.list_part}>
        {category &&
          category.cardList.map((item) =>
            item.type === 1 ? (
              <div key={item.id} className={styles.list_container}>
                <p className={styles.list_title}>{item.title}</p>
                <ItemSlickOne viewItems={item.data} />
              </div>
            ) : item.type === 2 ? (
              <div key={item.id} className={styles.list_container}>
                <p className={styles.list_title}>{item.title}</p>
                <ItemSlickTwo viewItems={item.data} />
              </div>
            ) : item.type === 3 ? (
              <div key={item.id} className={styles.list_container}>
                <p className={styles.list_title}>{item.title}</p>
                <ItemSlickThree viewItems={item.data} />
              </div>
            ) : item.type === 4 ? (
              <div key={item.id} className={styles.list_container}>
                <p className={styles.list_title}>{item.title}</p>
                <ItemSlickFour viewItems={item.data} />
              </div>
            ) : (
              <></>
            )
          )}
      </div>
    </div>
  );
};
export default MobileCategory;
