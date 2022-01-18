import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarItemList from "../carItemList/carItemList";
import styles from "./carSearchPage.module.css";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";
import axios from "axios";
import LoadingPage from "../loadingPage/loadingPage";
import { debounce } from "lodash";

const CarSearchPage = (props) => {
  const navigate = useNavigate();
  const { pickup, dropoff } = useParams();
  //날짜로 검색한 차량들의 목록
  const [carList, setCarList] = useState(null);

  //날짜로 검색한 차량들 중에 사용자가 검색한 이름, 차종, 연료로 검색된 차량들의 목록
  const [resultCarList, setResultCarList] = useState(null);

  const [timeValue, setTimeValue] = useState({
    rentTime: `${pickup.slice(11, 13).padStart(2, "0")}시 ${pickup
      .slice(14)
      .padStart(2, "0")}분`,
    returnTime: `${dropoff.slice(11, 13).padStart(2, "0")}시 ${dropoff
      .slice(14)
      .padStart(2, "0")}분`,
  });

  const { rentTime, returnTime } = timeValue;

  const onTimeChangeHandler = (e) => {
    const { name, value } = e.target;
    setTimeValue({
      ...timeValue,
      [name]: value,
    });
  };

  //date-range
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
    setResultCarList(null);
    setCarList(null);
    navigate(`/carsearch/${selectedDateTime[0]}/${selectedDateTime[1]}`);
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

  //컴포넌트 마운트 시 마다 서버 요청해서 결과값 받아오고 분류, 정렬 선택 여부로 보여주기
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

  const moveToDetail = (carId, businessId) => {
    const selectedDateTime = makeDateFormat();
    navigate(
      `/cardetail/${carId}/${businessId}/${selectedDateTime[0]}/${selectedDateTime[1]}`
    );
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
    searchCarList();
  }, [pickup, dropoff]);

  useEffect(() => {
    const sortHandler = debounce(() => {
      if (!carList) {
        return;
      }
      let searchValueResult = [];
      if (searchValue === "") {
        searchValueResult = [...carList];
      } else {
        carList.forEach((car) => {
          if (car.name.includes(searchValue)) searchValueResult.push(car);
        });
      }
      const sortResult = [];

      if (typeSelect === "전체" && fuelSelect === "전체") {
        setResultCarList(searchValueResult);
      } else if (typeSelect === "전체" && fuelSelect !== "전체") {
        searchValueResult.forEach((car) => {
          car.rentcar_fuel_code.name === fuelSelect && sortResult.push(car);
        });
        setResultCarList(sortResult);
      } else if (typeSelect !== "전체" && fuelSelect === "전체") {
        searchValueResult.forEach((car) => {
          car.rentcar_class_code.name === typeSelect && sortResult.push(car);
        });
        setResultCarList(sortResult);
      } else {
        searchValueResult.forEach((car) => {
          car.rentcar_fuel_code.name === fuelSelect &&
            car.rentcar_class_code.name === typeSelect &&
            sortResult.push(car);
        });
        setResultCarList(sortResult);
      }
    }, 150);
    sortHandler();
  }, [typeSelect, fuelSelect, searchValue]);

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
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  name="승합"
                  checked={typeSelect === "승합" ? true : false}
                  onChange={onTypeSelectChangeHandler}
                  className={styles.checkbox}
                />
                <p
                  className={styles.checkbox_text}
                  onClick={onTypeSelectChangeHandler}
                >
                  승합
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
          <div className={styles.result_container}>
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
                <LoadingPage />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarSearchPage;
