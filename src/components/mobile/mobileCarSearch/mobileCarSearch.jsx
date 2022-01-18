import React, { useState, useEffect } from "react";
import CarItemList from "../../carItemList/carItemList";
import ButtonSlick from "../../slick/buttonSlick/buttonSlick";
import styles from "./mobileCarSearch.module.css";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../../loadingPage/loadingPage";

const MobileCarSearch = (props) => {
  const navigate = useNavigate();
  const { pickup, dropoff } = useParams();
  //날짜로 검색한 차량들의 목록
  const [carList, setCarList] = useState(null);

  //날짜로 검색한 차량들 중에 사용자가 검색한 이름, 차종, 연료로 검색된 차량들의 목록
  const [resultCarList, setResultCarList] = useState(null);

  //date-range
  const [dateChangeOn, setDateChangeOn] = useState(false);
  const [datePickerOn, setDatePickerOn] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(pickup.slice(0, 10)),
      endDate: new Date(dropoff.slice(0, 10)),
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

  const searchCarList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/rentcars?pickup_datetime=${pickup}&dropoff_datetime=${dropoff}`
      )
      .then((response) => {
        setCarList(response.data);
        setResultCarList(response.data);
      })
      .catch((err) => {
        if (
          err.response.data.messages.pickup_datetime &&
          err.response.data.messages.pickup_datetime[0].includes("tomorrow")
        ) {
          alert(
            "오늘 당일은 예약이 불가능합니다. 당일 이후로 날짜를 설정해주세요"
          );
          setCarList([]);
          setResultCarList([]);
        } else if (
          err.response.data.messages.dropoff_datetime &&
          err.response.data.messages.dropoff_datetime[0].includes(
            "after pickup date"
          )
        ) {
          alert("반납일자는 대여일자 이후여야 합니다.");
          setCarList([]);
          setResultCarList([]);
        }
        console.error(err);
      });
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

  const [typeSelected, setTypeSelected] = useState("전체");

  const [fuelSelected, setFuelSelected] = useState("전체");

  const [timeValue, setTimeValue] = useState({
    rentTime: `${pickup.slice(11, 13).padStart(2, "0")}시 ${pickup
      .slice(14)
      .padStart(2, "0")}분`,
    returnTime: `${dropoff.slice(11, 13).padStart(2, "0")}시 ${dropoff
      .slice(14)
      .padStart(2, "0")}분`,
  });

  const [typeButtonList, settypeButtonList] = useState([
    "전체",
    "소형",
    "준중형",
    "중형",
    "고급",
    "SUV",
    "승합",
  ]);
  const [fuelButtonList, setFuelButtonList] = useState([
    "전체",
    "휘발유",
    "경유",
    "LPG",
    "하이브리드",
    "전기",
  ]);

  const onTypeSelectChangeHandler = (item) => {
    setTypeSelected(item);
  };

  const onFuelSelectChangeHandler = (item) => {
    setFuelSelected(item);
  };

  const { rentTime, returnTime } = timeValue;

  const onTimeChangeHandler = (e) => {
    const { name, value } = e.target;
    setTimeValue({
      ...timeValue,
      [name]: value,
    });
    console.log(name, value);
  };

  const makeDateFormat = () => {
    const result = [];
    const { startDate, endDate } = date[0];
    const startList = startDate.toString().split(" ");
    const endList = endDate.toString().split(" ");
    result.push(
      startList[3] +
        "-" +
        monthTranslator(startList[1]).toString().padStart(2, "0") +
        "-" +
        startList[2].padStart(2, "0") +
        " " +
        rentTime.slice(0, 2) +
        ":" +
        rentTime.slice(4, 6)
    );
    result.push(
      endList[3] +
        "-" +
        monthTranslator(endList[1]).toString().padStart(2, "0") +
        "-" +
        endList[2].padStart(2, "0") +
        " " +
        returnTime.slice(0, 2) +
        ":" +
        returnTime.slice(4, 6)
    );
    return result;
  };

  const moveToDetail = (carId, businessId) => {
    const selectedDateTime = makeDateFormat();
    navigate(
      `/cardetail/${carId}/${businessId}/${selectedDateTime[0]}/${selectedDateTime[1]}`
    );
  };

  const onSearchHandler = () => {
    const selectedDateTime = makeDateFormat();
    if (
      selectedDateTime[0].length !== 16 ||
      selectedDateTime[1].length !== 16
    ) {
      alert("시간을 선택해주세요");
      return;
    }
    if (selectedDateTime[0] === pickup && selectedDateTime[1] === dropoff) {
      return;
    }
    setDateChangeOn(false);
    setResultCarList(null);
    setCarList(null);

    navigate(`/carsearch/${selectedDateTime[0]}/${selectedDateTime[1]}`);
  };

  useEffect(() => {
    setCarList(null);
    setResultCarList(null);
    setDate([
      {
        startDate: new Date(pickup.slice(0, 10)),
        endDate: new Date(dropoff.slice(0, 10)),
        key: "selection",
      },
    ]);
    setTimeValue({
      rentTime: `${pickup.slice(11, 13).padStart(2, "0")}시 ${pickup
        .slice(14)
        .padStart(2, "0")}분`,
      returnTime: `${dropoff.slice(11, 13).padStart(2, "0")}시 ${dropoff
        .slice(14)
        .padStart(2, "0")}분`,
    });
    setTypeSelected("전체");
    setFuelSelected("전체");
    searchCarList();
  }, [pickup, dropoff]);

  useEffect(() => {
    const sortHandler = () => {
      if (!carList) {
        return;
      }
      const sortResult = [];

      if (typeSelected === "전체" && fuelSelected === "전체") {
        setResultCarList(carList);
      } else if (typeSelected === "전체" && fuelSelected !== "전체") {
        carList.forEach((car) => {
          car.rentcar_fuel_code.name === fuelSelected && sortResult.push(car);
        });
        setResultCarList(sortResult);
      } else if (typeSelected !== "전체" && fuelSelected === "전체") {
        carList.forEach((car) => {
          car.rentcar_class_code.name === typeSelected && sortResult.push(car);
        });
        setResultCarList(sortResult);
      } else {
        carList.forEach((car) => {
          car.rentcar_fuel_code.name === fuelSelected &&
            car.rentcar_class_code.name === typeSelected &&
            sortResult.push(car);
        });
        setResultCarList(sortResult);
      }
    };
    sortHandler();
  }, [typeSelected, fuelSelected]);

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
                <button
                  className={styles.date_picker_button}
                  onClick={() => setDatePickerOn(false)}
                >
                  선택
                </button>
              </div>
            </div>
            <div className={styles.range_input_box}>
              <p className={styles.range_text}>대여시각</p>
              <select
                name="rentTime"
                value={rentTime}
                onChange={onTimeChangeHandler}
                className={styles.range_input}
              >
                {timeList.map((time) => (
                  <option key={time} value={time === "시간 선택" ? "" : time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.range_input_box}>
              <p className={styles.range_text}>반납시각</p>
              <select
                name="returnTime"
                value={returnTime}
                onChange={onTimeChangeHandler}
                className={styles.range_input}
              >
                {timeList.map((time) => (
                  <option key={time} value={time === "시간 선택" ? "" : time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={styles.range_icon_container}
              onClick={onSearchHandler}
            >
              <i className={`${styles.range_icon} fas fa-search`}></i>
            </div>
          </div>
        )}
      </div>
      <div className={styles.button_container}>
        {typeSelected && fuelSelected && (
          <div className={styles.select_container}>
            <div className={styles.button_slick_container}>
              <p className={styles.select_title}>차종</p>
              <ButtonSlick
                buttonList={typeButtonList}
                selected={typeSelected}
                onSelectChangeHandler={onTypeSelectChangeHandler}
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
        {resultCarList && (
          <p
            className={styles.result}
          >{`검색결과 총 ${resultCarList.length}건`}</p>
        )}

        <div className={styles.result_list}>
          {resultCarList ? (
            resultCarList.length > 0 ? (
              <CarItemList
                itemList={resultCarList}
                moveToDetail={moveToDetail}
              />
            ) : (
              <div className={styles.no_result}>검색 결과가 없습니다.</div>
            )
          ) : (
            <div className={styles.loading_container}>
              <LoadingPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCarSearch;
