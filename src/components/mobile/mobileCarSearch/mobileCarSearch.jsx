import React, { useState, useEffect } from "react";
import CarItemList from "../../carItemList/carItemList";
import ButtonSlick from "../../slick/buttonSlick/buttonSlick";
import styles from "./mobileCarSearch.module.css";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";

const MobileCarSearch = (props) => {
  //date-range
  const [dateChangeOn, setDateChangeOn] = useState(false);
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
    "시간 선택",
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

  const dateChangeOnHandler = () => {
    setDateChangeOn(!dateChangeOn);
  };

  const [kindSelected, setKindSelected] = useState({
    id: 1,
    title: "전체",
  });

  const [fuelSelected, setFuelSelected] = useState({
    id: 1,
    title: "전체",
  });

  const [kindButtonList, setKindButtonList] = useState([
    {
      id: 1,
      title: "전체",
    },
    {
      id: 2,
      title: "소형",
    },
    {
      id: 3,
      title: "준중형",
    },
    {
      id: 4,
      title: "중형",
    },
    {
      id: 5,
      title: "고급",
    },
    {
      id: 6,
      title: "SUV",
    },
  ]);
  const [fuelButtonList, setFuelButtonList] = useState([
    {
      id: 1,
      title: "전체",
    },
    {
      id: 2,
      title: "휘발유",
    },
    {
      id: 3,
      title: "경유",
    },
    {
      id: 4,
      title: "LPG",
    },
    {
      id: 5,
      title: "하이브리드",
    },
    {
      id: 6,
      title: "전기",
    },
  ]);

  const onKindSelectChangeHandler = (item) => {
    setKindSelected(item);
  };

  const onFuelSelectChangeHandler = (item) => {
    setFuelSelected(item);
  };

  return (
    <div className={styles.page}>
      <div className={styles.text_container}>
        <p className={styles.title}>렌터카 검색</p>
        <p className={styles.number}>{`${12}건의 검색결과`}</p>
      </div>
      <div className={styles.range_part}>
        <button className={styles.range_button} onClick={dateChangeOnHandler}>
          대여 기간 변경
        </button>
        {dateChangeOn && (
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
        )}
      </div>
      <div className={styles.button_container}>
        {kindSelected && fuelSelected && (
          <div className={styles.select_container}>
            <div className={styles.button_slick_container}>
              <p className={styles.select_title}>차종</p>
              <ButtonSlick
                buttonList={kindButtonList}
                selected={kindSelected}
                onSelectChangeHandler={onKindSelectChangeHandler}
              />
            </div>
            <div className={styles.button_slick_container_bottom}>
              <p className={styles.select_title}>연료</p>
              <ButtonSlick
                buttonList={fuelButtonList}
                selected={fuelSelected}
                onSelectChangeHandler={onFuelSelectChangeHandler}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.divide_line}></div>
      <div className={styles.main}>
        <CarItemList itemList={kindButtonList} />
      </div>
    </div>
  );
};

export default MobileCarSearch;
