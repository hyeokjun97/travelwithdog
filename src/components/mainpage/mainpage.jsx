import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarSlick from "../slick/carSlick/carSlick";
import TagButton from "../tagButton/tagButton";
import styles from "./mainpage.module.css";
import HelmetComponent from "../helmetComponent/helmetComponent";
import SlickTemplate from "../slick/slickTemplate/slickTemplate";
import LoadingPage from "../loadingPage/loadingPage";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "react-date-range/dist/locale/index.js";

const Mainpage = ({ loadPageData }) => {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [topSelect, setTopSelect] = useState("키워드");

  const onSearchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchSubmitHandler = () => {
    if (searchInput === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    navigate(`/search/${searchInput}`);
    window.scrollTo({ top: 0 });
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    //모바일에서 헤더 검색창과 중복 이벤트 발생 막기
    if (e.target.dataset.name === "search_input") {
      onSearchSubmitHandler();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);

  const settingPageData = (data) => {
    setPageData(data);
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    loadPageData("home", settingPageData);
  }, []);

  //rentcar 검색 때문에 추가된 부분
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

  const [timeValue, setTimeValue] = useState({
    rentTime: "",
    returnTime: "",
  });

  const { rentTime, returnTime } = timeValue;

  const onTimeChangeHandler = (e) => {
    const { name, value } = e.target;
    setTimeValue({
      ...timeValue,
      [name]: value,
    });
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
    navigate(`/carsearch/${selectedDateTime[0]}/${selectedDateTime[1]}`);
    window.scrollTo({ top: 0 });
  };

  const onTopSelectChangeHandler = (e) => {
    setTopSelect(e.target.innerText);
  };

  useEffect(() => {
    if (!date) {
      return;
    }
    const { startDate, endDate } = date[0];

    const startList = startDate.toString().split(" ");
    const endList = endDate.toString().split(" ");
    setDateShow(
      `${monthTranslator(startList[1])}월 ${Number(
        startList[2]
      )}일 (${dayTranslator(startList[0])}) - ${monthTranslator(
        endList[1]
      )}월 ${Number(endList[2])}일 (${dayTranslator(endList[0])})`
    );
  }, [date]);

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

  return (
    <>
      {pageData ? (
        <div className={styles.mainpage}>
          <HelmetComponent
            title={pageData.html_title}
            desc={pageData.html_description}
            url={`https://www.travelwithdog.co.kr`}
            keyword={pageData.html_keyword}
          />

          <div
            className={styles.top_banner}
            style={
              pageData && {
                background: `url("${pageData.image_url}") center/cover no-repeat`,
              }
            }
          >
            <div className={styles.top_filter}>
              <h1 className={styles.title}>{pageData && pageData.title}</h1>
              <h2 className={styles.subtitle}>
                {pageData && pageData.subtitle}
              </h2>
              <div className={styles.top_main}>
                <div className={styles.top_select_button_container}>
                  <div
                    className={`${
                      topSelect === "키워드"
                        ? `${styles.top_select_button} ${styles.top_select_on}`
                        : `${styles.top_select_button}`
                    }`}
                    onClick={onTopSelectChangeHandler}
                  >
                    키워드
                  </div>
                  <div
                    className={`${
                      topSelect === "렌터카"
                        ? `${styles.top_select_button} ${styles.top_select_on}`
                        : `${styles.top_select_button}`
                    }`}
                    onClick={onTopSelectChangeHandler}
                  >
                    렌터카
                  </div>
                </div>
                {topSelect === "키워드" ? (
                  <div className={styles.search_and_tag_container}>
                    <div className={styles.search_container}>
                      <input
                        value={searchInput}
                        onChange={onSearchInputChangeHandler}
                        type="text"
                        data-name="search_input"
                        className={styles.search_input}
                        placeholder="원하시는 키워드로 검색해보세요"
                      />
                      <div
                        className={styles.search_icon_container}
                        onClick={onSearchSubmitHandler}
                      >
                        <i
                          className={`${styles.search_icon} fas fa-search`}
                        ></i>
                      </div>
                    </div>
                    <div className={styles.tag_container}>
                      {pageData.keywords.map((tag, index) => (
                        <TagButton key={index} value={tag} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.car_search_container}>
                    <div className={styles.car_search_input_box_date}>
                      <p className={styles.car_search_text}>대여기간</p>
                      <div
                        className={styles.car_search_input_date}
                        onClick={datePickerOpenHandler}
                      >
                        <i
                          className={`${styles.date_icon} fas fa-calendar`}
                        ></i>
                        <span>{dateShow}</span>
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
                    <div className={styles.car_search_input_box}>
                      <p className={styles.car_search_text}>대여시각</p>
                      <select
                        name="rentTime"
                        value={rentTime}
                        onChange={onTimeChangeHandler}
                        className={styles.car_search_input}
                      >
                        {timeList.map((time) => (
                          <option
                            key={time}
                            value={time === "시간 선택" ? "" : time}
                          >
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.car_search_input_box}>
                      <p className={styles.car_search_text}>반납시각</p>
                      <select
                        name="returnTime"
                        value={returnTime}
                        onChange={onTimeChangeHandler}
                        className={styles.car_search_input}
                      >
                        {timeList.map((time) => (
                          <option
                            key={time}
                            value={time === "시간 선택" ? "" : time}
                          >
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className={styles.car_search_icon_container}
                      onClick={onSearchHandler}
                    >
                      <i
                        className={`${styles.car_search_icon} fas fa-search`}
                      ></i>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.list_part}>
            {pageData.sections.map((section) =>
              section.section_template_cd === "default" ||
              section.section_template_cd === "spot" ||
              section.section_template_cd === "board" ? (
                section.items.length > 0 && ( //일단 빈데이터 있어서 이렇게 해둠
                  <div key={section.title} className={styles.list_container}>
                    <p className={styles.list_title}>{section.title}</p>
                    {section.subtitle && (
                      <p className={styles.list_subtitle}>{section.subtitle}</p>
                    )}
                    <SlickTemplate sectionInfo={section} />
                  </div>
                )
              ) : section.section_template_cd === "spot_banner" ? (
                <div className="">
                  스팟배너(완성되면 이미지 넣고 버튼, 문구 추가)
                </div>
              ) : section.section_template_cd === "rentcar_banner" ? (
                <div className="">
                  렌터카배너(완성되면 이미지 넣고 버튼, 문구 추가)
                </div>
              ) : section.section_template_cd === "rentcar" ? (
                <div className={styles.list_container}>
                  <p className={styles.list_title}>가장 인기있는 펫 렌터카</p>
                  <CarSlick viewItems={section.items} />
                </div>
              ) : (
                <></>
              )
            )}

            <div className={styles.bottom_part}></div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <LoadingPage />
        </div>
      )}
    </>
  );
};
export default Mainpage;
