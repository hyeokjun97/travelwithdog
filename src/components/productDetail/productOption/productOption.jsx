import React, { useState, forwardRef, useEffect } from "react";
import styles from "./productOption.module.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import axios from "axios";
import LoadingPage from "../../loadingPage/loadingPage";

const ProductOption = ({ item, productId }) => {
  const [menuSelected, setMenuSelected] = useState("포함사항");

  const [price, setPrice] = useState(null);

  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) //임시
  );

  //영문 달을 숫자로 바꾸어 줌
  const monthTranslator = (selectedMonth) => {
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 0; i < monthList.length; i++) {
      if (monthList[i] === selectedMonth) {
        return i + 1;
      }
    }
  };

  //영문 요일을 한글로 바꾸어 줌
  const dayTranslator = (selectedDay) => {
    const dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const korDayList = ["월", "화", "수", "목", "금", "토", "일"];
    for (let i = 0; i < dayList.length; i++) {
      if (dayList[i] === selectedDay) {
        return korDayList[i];
      }
    }
  };

  const [dateShow, setDateShow] = useState(() => {
    const now = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000); //임시
    const nowSplit = now.toString().split(" ");
    return `${nowSplit[3]}년 ${monthTranslator(nowSplit[1])}월 ${
      nowSplit[2]
    }일 (${dayTranslator(nowSplit[0])})`;
  });

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

  const loadPriceList = (date) => {
    setPrice(null);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/tours/${productId}/items?date=${date}`
      )
      .then((response) => {
        response.data.forEach((option) => {
          if (option.id === item.id) {
            setPrice(option);
            return false;
          }
        });
      })
      .catch((err) => console.error(err));
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={styles.custom_input} onClick={onClick} ref={ref}>
      {dateShow}
    </button>
  ));

  const dateShowChangeHandler = (date) => {
    const dateSplit = date.toString().split(" ");
    setDateShow(
      `${dateSplit[3]}년 ${monthTranslator(dateSplit[1])}월 ${
        dateSplit[2]
      }일 (${dayTranslator(dateSplit[0])})`
    );
  };

  useEffect(() => {
    const dateSplit = startDate.toString().split(" ");
    const translatedDate = `${dateSplit[3]}-${monthTranslator(dateSplit[1])
      .toString()
      .padStart(2, "0")}-${dateSplit[2].toString().padStart(2, "0")}`;
    loadPriceList(translatedDate);
    dateShowChangeHandler(startDate);
  }, [startDate]);

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
            {price ? (
              price.supplier.prices.length > 0 ? (
                price.supplier.prices.map((price) => (
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
                ))
              ) : (
                <p className={styles.nothing}>
                  선택하신 날짜에 예약 가능한 상품이 없습니다.
                </p>
              )
            ) : (
              <LoadingPage />
            )}
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
                <div className={styles.date}>
                  <p className={styles.option_detail_title}>날짜 선택</p>
                  <div className={styles.date_select}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={subDays(new Date(), 0)}
                      customInput={<CustomInput />}
                      locale={ko}
                    />
                  </div>
                </div>
                <div className={styles.number}>
                  <p className={styles.option_detail_title}>반려인 수</p>
                  <select className={styles.select}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className={styles.number}>
                  <p className={styles.option_detail_title}>반려견 수</p>
                  <select className={styles.select}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
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
