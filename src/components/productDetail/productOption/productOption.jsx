import React, { useState } from "react";
import styles from "./productOption.module.css";

const ProductOption = ({ item }) => {
  const [menuSelected, setMenuSelected] = useState("포함사항");

  const [openValue, setOpenValue] = useState(false);
  const changeOpenValueHandler = (value) => {
    if (openValue === value) {
      setOpenValue(false);
      return;
    }
    setOpenValue(value);
  };

  const closeDetailHandler = () => {
    setOpenValue(false);
  };

  const onMenuSelectChangeHandler = (e) => {
    setMenuSelected(e.target.innerText);
  };

  return (
    <div className={styles.item}>
      <div
        className={`${
          openValue ? `${styles.main} ${styles.main_on}` : `${styles.main}`
        }`}
      >
        <div className={styles.data_container}>
          <div className={styles.title_and_tag}>
            <div className={styles.tag}>
              {item.supplier.product_confirmation_code.name}
            </div>
            <p className={styles.title}>{item.name}</p>
          </div>

          <div className={styles.price_container}>
            {item.supplier.prices.length > 0 &&
              item.supplier.prices.map((price) => (
                <div key={price.id} className={styles.price_box}>
                  <div className={styles.price_title}>{price.unit.name}</div>
                  <p className={styles.price}>{`${price.price.toLocaleString(
                    "ko-kr"
                  )}원`}</p>
                  {price.unit.remark && (
                    <div className={styles.price_remark}>
                      {price.unit.remark}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div
            className={`${
              openValue
                ? `${styles.button_container} ${styles.button_container_on}`
                : `${styles.button_container}`
            }`}
          >
            <button
              className={`${
                openValue
                  ? `${styles.button_view} ${styles.button_on}`
                  : `${styles.button_view}`
              }`}
              onClick={() => changeOpenValueHandler("detail")}
            >
              <p className={styles.button_text}>상품 정보 및 규정 보기</p>
              <i className={`${styles.icon} fas fa-chevron-down`}></i>
            </button>
            <button
              className={`${
                openValue
                  ? `${styles.button} ${styles.button_on}`
                  : `${styles.button}`
              }`}
              onClick={() => changeOpenValueHandler("reservation")}
            >
              예약하기
            </button>
          </div>
        </div>
      </div>
      {openValue === "detail" ? (
        <div className={styles.option_detail_container_info}>
          <nav className={styles.menu_bar}>
            <ul className={styles.menu_list}>
              <li
                className={
                  menuSelected === "포함사항"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item}`
                }
                onClick={onMenuSelectChangeHandler}
              >
                포함사항
              </li>
              <li
                className={
                  menuSelected === "불포함사항"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item}`
                }
                onClick={onMenuSelectChangeHandler}
              >
                불포함사항
              </li>
              <li
                className={
                  menuSelected === "유의사항"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item}`
                }
                onClick={onMenuSelectChangeHandler}
              >
                유의사항
              </li>
              <li
                className={
                  menuSelected === "취소규정"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item}`
                }
                onClick={onMenuSelectChangeHandler}
              >
                취소규정
              </li>
            </ul>
          </nav>
          <div
            className={styles.detail_main}
            dangerouslySetInnerHTML={{
              __html: `${
                menuSelected === "포함사항"
                  ? item.supplier.inclusion
                  : menuSelected === "불포함사항"
                  ? item.supplier.exclusion
                  : menuSelected === "유의사항"
                  ? item.supplier.note
                  : menuSelected === "취소규정"
                  ? item.supplier.cancellation
                  : ""
              }`,
            }}
          ></div>
        </div>
      ) : (
        openValue === "reservation" && (
          <div className={styles.option_detail_container}>
            <div className={styles.option_detail_content}>
              <div className={styles.date_and_number_container}>
                {item.supplier.prices.map((price) => (
                  <div key={price.id} className={styles.number}>
                    <p className={styles.option_detail_title}>
                      {price.unit.name}
                    </p>
                    <select className={styles.select}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                ))}
              </div>
              <div className={styles.final_price_container}>
                <p className={styles.final_price_title}>예상 결제 금액</p>
                <p className={styles.final_price}>201,000원</p>
              </div>
            </div>
            <div className={styles.option_detail_bottom}>
              <button
                className={styles.button_close}
                onClick={closeDetailHandler}
              >
                <span>접기</span>
                <i className={`${styles.up_icon} fas fa-chevron-up`}></i>
              </button>
              <button className={styles.button_purchase}>결제하기</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductOption;
