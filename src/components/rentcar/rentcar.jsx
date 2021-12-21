import React, { useEffect, useState } from "react";
import styles from "./rentcar.module.css";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";

const Rentcar = (props) => {
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

  return (
    <div className={styles.mainpage}>
      <div className={styles.top_banner}>
        <div className={styles.top_filter}>
          <div className={styles.title_container}>
            <p className={styles.title}>제주펫렌터카에서</p>
            <p className={styles.title_two}>
              반려견과 함께 타는 렌터카를 예약하세요.
            </p>
          </div>

          <div className={styles.search_and_tag_container}>
            <div className={styles.search_container}>
              <div className={styles.search_input_box_date}>
                <p className={styles.search_text}>대여기간</p>
                <div
                  className={styles.search_input_date}
                  onClick={datePickerOpenHandler}
                >
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
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    months={2}
                    direction="horizontal"
                    locale={ko}
                  />
                </div>
              </div>
              <div className={styles.search_input_box}>
                <p className={styles.search_text}>대여시각</p>
                <select className={styles.search_input}>
                  {timeList.map((time) => (
                    <option key={time} value="time">
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.search_input_box}>
                <p className={styles.search_text}>반납시각</p>
                <select className={styles.search_input}>
                  {timeList.map((time) => (
                    <option key={time} value="time">
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.search_icon_container}>
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list_part}></div>
    </div>
  );
};

export default Rentcar;
