import React, { useState, useEffect } from "react";
import styles from "./productOption.module.css";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";

const ProductOption = (props) => {
  //date-range
  const [datePickerOn, setDatePickerOn] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [dateShow, setDateShow] = useState("");
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

  const datePickerOpenHandler = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setDatePickerOn(!datePickerOn);
  };
  //
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

  useEffect(() => {
    if (!date) {
      return;
    }
    const { startDate, endDate } = date[0];

    const startList = startDate.toString().split(" ");
    const endList = endDate.toString().split(" ");
    setDateShow(
      `${monthTranslator(startList[1])}월 ${startList[2]}일 (${dayTranslator(
        startList[0]
      )}) - ${monthTranslator(endList[1])}월 ${endList[2]}일 (${dayTranslator(
        endList[0]
      )})`
    );
  }, [date]);

  return (
    <div className={styles.item}>
      <div
        className={`${
          openValue ? `${styles.main} ${styles.main_on}` : `${styles.main}`
        }`}
      >
        <img
          src="/travelWithDog/images/example.png"
          alt="option_image"
          className={`${
            openValue ? `${styles.image} ${styles.image_on}` : `${styles.image}`
          }`}
        />
        <div className={styles.data_container}>
          <div className={styles.title_and_price}>
            <p className={styles.title}>
              [디럭스트윈 펫룸]강릉 씨베이 호텔 반려견 여행 1박 2일
            </p>
            <div className={styles.price_container}>
              <div className={styles.price_box}>
                <p className={styles.price_title}>반려인</p>
                <p className={styles.price}>150,000원</p>
              </div>
              <div className={styles.price_box}>
                <p className={styles.price_title}>반려견</p>
                <p className={styles.price}>51,000원</p>
              </div>
            </div>
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
              <li>포함사항</li>
              <li>불포함사항</li>
              <li>유의사항</li>
              <li>취소규정</li>
            </ul>
          </nav>
          <div className={styles.detail_main}>
            1. 프리미엄 미팅 서비스 <br></br>2. 렌트카 1박 2일(최대 24시간)
            이용- 뉴모닝 또는 스파크 경차 기준 (업그레이드 가능)- 자차 보험
            (일반) <br></br>3. 트래블키트 (랜트카 수령시) <br></br>4. 부산 영무
            파라드 호텔 1박 (조식불포함)<br></br>
            1. 프리미엄 미팅 서비스 <br></br>2. 렌트카 1박 2일(최대 24시간)
            이용- 뉴모닝 또는 스파크 경차 기준 (업그레이드 가능)- 자차 보험
            (일반) <br></br>3. 트래블키트 (랜트카 수령시) <br></br>4. 부산 영무
            파라드 호텔 1박 (조식불포함)<br></br>
            1. 프리미엄 미팅 서비스 <br></br>2. 렌트카 1박 2일(최대 24시간)
            이용- 뉴모닝 또는 스파크 경차 기준 (업그레이드 가능)- 자차 보험
            (일반) <br></br>3. 트래블키트 (랜트카 수령시) <br></br>4. 부산 영무
            파라드 호텔 1박 (조식불포함)<br></br>
          </div>
        </div>
      ) : (
        openValue === "reservation" && (
          <div className={styles.option_detail_container}>
            <div className={styles.option_detail_content}>
              <div className={styles.date_and_number_container}>
                <div className={styles.date}>
                  <p className={styles.option_detail_title}>날짜 선택</p>
                  <div
                    className={styles.date_select}
                    onClick={datePickerOpenHandler}
                  >
                    {dateShow}
                    <div
                      className={`${
                        datePickerOn
                          ? `${styles.date_picker} ${styles.on}`
                          : `${styles.date_picker} ${styles.off}`
                      }`}
                    >
                      <DateRange
                        minDate={new Date()}
                        editableDateInputs={false}
                        showSelectionPreview={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        months={window.innerWidth > 768 ? 2 : 1}
                        direction={
                          window.innerWidth > 768 ? "horizontal" : "vertical"
                        }
                        locale={ko}
                      />
                      <button
                        className={styles.date_picker_button}
                        onClick={() => setDatePickerOn(false)}
                      >
                        선택
                      </button>
                    </div>
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
