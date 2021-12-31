import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarItemList from "../carItemList/carItemList";
import ItemList from "../itemList/itemList";
import styles from "./carSearchPage.module.css";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";

const CarSearchPage = (props) => {
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
  const timeList = [
    "08시 00분",
    "08시 30분",
    "09시 00분",
    "09시 30분",
    "10시 00분",
    "10시 30분",
    "11시 00분",
    "11시 30분",
    "12시 00분",
    "12시 30분",
    "13시 00분",
    "13시 30분",
    "14시 00분",
    "14시 30분",
    "15시 00분",
    "15시 30분",
    "16시 00분",
    "16시 30분",
    "17시 00분",
    "17시 30분",
    "18시 00분",
    "18시 30분",
    "19시 00분",
    "19시 30분",
    "20시 00분",
    "20시 30분",
    "21시 00분",
    "21시 30분",
    "22시 00분",
    "22시 30분",
    "23시 00분",
    "23시 30분",
    "24시 00분",
  ];

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

  const datePickerOpenHandler = () => {
    setDatePickerOn(!datePickerOn);
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

  //컴포넌트 마운트 시 마다 서버 요청해서 결과값 받아오고 분류, 정렬 선택 여부로 보여주기
  const { query } = useParams();
  const [jejuBest, setJejuBest] = useState([
    {
      idx: 0,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "스코틀랜드 아일랜드 8일간의 여행",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 1,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "올 오브 피렌체",
      type: "숙소",
      price: 20000,
    },
    {
      idx: 2,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/7511/296672_medium_1544173662.jpg?1544173662",
      title: "바티칸투어",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 3,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/70816/595376_medium_1638331669.jpg?1638331669",
      title: "롯데월드 입장권",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 4,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "올 오브 피렌체",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 5,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "제주도차박",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 6,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/53556/592873_medium_1636329887.jpg?1636329887",
      title: "제주 아쿠아플라넷 입장권",
      type: "입장권",
      price: 20000,
    },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const onSearchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const [typeSelect, setTypeSelect] = useState("전체");
  const [fuelSelect, setFuelSelect] = useState("전체");

  const onTypeSelectChangeHandler = (e) => {
    if (e.target.tagName === "P") {
      setTypeSelect(e.target.innerText);
    } else if (e.target.tagName === "INPUT") {
      setTypeSelect(e.target.name);
    }
  };

  const onFuelSelectChangeHandler = (e) => {
    if (e.target.tagName === "P") {
      setFuelSelect(e.target.innerText);
    } else if (e.target.tagName === "INPUT") {
      setFuelSelect(e.target.name);
    }
  };

  useEffect(() => {
    setSearchValue(query);
  }, [query]);
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <aside className={styles.side_menu}>
          <div className={styles.search_part}>
            <div className={styles.search_container}>
              <input
                value={searchValue}
                onChange={onSearchValueChangeHandler}
                type="text"
                className={styles.search_input}
                spellCheck="false"
                placeholder="검색"
              />
              <div className={styles.search_icon_container}>
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
            </div>
          </div>
          <div className={styles.division_part}>
            <p className={styles.side_menu_title}>차종</p>
            <div className={styles.checkbox_list}>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="전체"
                  checked={typeSelect === "전체" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  전체
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="소형"
                  checked={typeSelect === "소형" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  소형
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="준중형"
                  checked={typeSelect === "준중형" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  준중형
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="중형"
                  checked={typeSelect === "중형" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  중형
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="고급"
                  checked={typeSelect === "고급" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  고급
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="SUV"
                  checked={typeSelect === "SUV" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  SUV
                </p>
              </div>
            </div>
          </div>
          <div className={styles.sort_part}>
            <p className={styles.side_menu_title}>연료</p>
            <div className={styles.checkbox_list}>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="전체"
                  checked={fuelSelect === "전체" ? true : false}
                  onChange={onFuelSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onFuelSelectChangeHandler}
                >
                  전체
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="휘발유"
                  checked={fuelSelect === "휘발유" ? true : false}
                  onChange={onFuelSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onFuelSelectChangeHandler}
                >
                  휘발유
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="경유"
                  checked={fuelSelect === "경유" ? true : false}
                  onChange={onFuelSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onFuelSelectChangeHandler}
                >
                  경유
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="LPG"
                  checked={fuelSelect === "LPG" ? true : false}
                  onChange={onFuelSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onFuelSelectChangeHandler}
                >
                  LPG
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="하이브리드"
                  checked={fuelSelect === "하이브리드" ? true : false}
                  onChange={onFuelSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onFuelSelectChangeHandler}
                >
                  하이브리드
                </p>
              </div>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="전기"
                  checked={fuelSelect === "전기" ? true : false}
                  onChange={onFuelSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onFuelSelectChangeHandler}
                >
                  전기
                </p>
              </div>
            </div>
          </div>
        </aside>
        <div className={styles.main}>
          <div className={styles.range_container}>
            <div className={styles.range_input_box_date}>
              <p className={styles.range_text}>대여기간</p>
              <div
                className={styles.range_input_date}
                onClick={datePickerOpenHandler}
              >
                <i className={`${styles.date_icon} fas fa-calendar`}></i>
                {dateShow}
              </div>
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
              </div>
            </div>
            <div className={styles.range_input_box}>
              <p className={styles.range_text}>대여시각</p>
              <select className={styles.range_input}>
                {timeList.map((time) => (
                  <option key={time} value="time">
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.range_input_box}>
              <p className={styles.range_text}>반납시각</p>
              <select className={styles.range_input}>
                {timeList.map((time) => (
                  <option key={time} value="time">
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.range_icon_container}>
              <i className={`${styles.range_icon} fas fa-search`}></i>
            </div>
          </div>
          <div className={styles.result_container}>
            <p className={styles.result}>{`검색결과 총 ${255}건`}</p>

            <div className={styles.result_list}>
              <CarItemList itemList={jejuBest} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarSearchPage;
