import React, { useEffect, useState } from "react";
import styles from "./map.module.css";
import axios from "axios";
import MapMenuItem from "./mapMenuItem/mapMenuItem";
import MapPopup from "./mapPopup/mapPopup";
import { useGoogleMaps } from "react-hook-google-maps";
import HelmetComponent from "../helmetComponent/helmetComponent";
import ReviewUploadPopup from "../reviewUploadPopup/reviewUploadPopup";

const Map = ({ deviceSize, isLoggedIn }) => {
  const [inputValue, setInputValue] = useState("");
  const [spotList, setSpotList] = useState(null);
  const [resultSpotList, setResultSpotList] = useState(null);
  const [popupOn, setPopupOn] = useState(false);
  const [popupValue, setPopupValue] = useState(null);
  const [markerList, setMarkerList] = useState(null);
  const [reviewUploadPopupOn, setReviewUploadPopupOn] = useState(false);
  const [reviewList, setReviewList] = useState(null);

  const reviewPopupOnChangeHandler = (data) => {
    setReviewUploadPopupOn(data);
  };

  const closeReviewPopupOnHandler = () => {
    setReviewUploadPopupOn(false);
  };

  const { ref, map, google } = useGoogleMaps(
    process.env.REACT_APP_GOOGLE_KEY,

    {
      center: { lat: 33.41133915114478, lng: 126.33676192021225 },
      zoom: 11,
    }
  );

  useEffect(() => {
    if (!map) {
      return;
    }
    if (!spotList) {
      return;
    }
    const tmpMarkerList = [];
    spotList.forEach((spot) => {
      const marker = new google.maps.Marker({
        position: {
          lat: spot.position.coordinates[1],
          lng: spot.position.coordinates[0],
        },
        map: map,
        // icon: "/travelWithDog/images/dog_face.svg",
      });
      tmpMarkerList.push(marker);

      google.maps.event.addListener(marker, "click", () => {
        setPopupValue(spot);
        setPopupOn(true);
      });
    });
    setMarkerList(tmpMarkerList);
  }, [map, spotList]);

  const inputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const loadSpotList = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/spots`)
      .then((response) => {
        setSpotList(response.data);
        setResultSpotList(response.data);
      })
      .catch((err) => console.error(err));
  };
  const onItemClickHandler = (data) => {
    setPopupValue(data);
    setPopupOn(true);
  };

  const onFilterClickHandler = (e) => {
    if (e.target.dataset.filter) {
      setPopupOn(false);
    }
  };

  const onCloseButtonHandler = () => {
    setPopupOn(false);
  };

  // popupData 변경될 때 동작 (mapPopup.jsx에서 작동하도록 함)
  // 1. popupData 변경되면 가장 처음의 10개를 불러옴
  // 2. '더보기' 버튼 클릭 시 10개를 더 불러와서 reviewList에 합침
  // 3. popupOn이 false가 되면 이 state도 false로 만듬
  // 여기에 둔 이유 => loadSpotList가 리뷰 업로드 시에도 작동되도록 해야하는데 그러려면 부모 컴포넌트에서 이 함수를 주어야 하기 때문
  const loadSpotReview = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/spots/${id}/reviews?limit=10&page=1`
      )
      .then((response) => setReviewList(response.data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadSpotList();
  }, []);

  useEffect(() => {
    if (!spotList) {
      return;
    }
    if (inputValue === "") {
      setResultSpotList(spotList);
      return;
    }
    const result = spotList.filter((spot) => spot.name.includes(inputValue));
    setResultSpotList(result);
  }, [inputValue]);

  const keyHandler = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    setPopupOn(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [keyHandler]);

  return (
    <div className={styles.body}>
      <HelmetComponent url={`https://www.travelwithdog.co.kr/map`} />
      {reviewUploadPopupOn && (
        <ReviewUploadPopup
          where="spots"
          id={reviewUploadPopupOn.id}
          name={reviewUploadPopupOn.name}
          reviewPopupOnChangeHandler={closeReviewPopupOnHandler}
          isLoggedIn={isLoggedIn}
          loadSpotReview={loadSpotReview}
        />
      )}
      {popupOn && (
        <div
          className={styles.filter}
          data-filter="true"
          onClick={onFilterClickHandler}
        >
          <MapPopup
            popupValue={popupValue}
            onCloseButtonHandler={onCloseButtonHandler}
            deviceSize={deviceSize}
            reviewPopupOnChangeHandler={reviewPopupOnChangeHandler}
            loadSpotReview={loadSpotReview}
            reviewList={reviewList}
          />
        </div>
      )}
      <div className={styles.side_bar}>
        <div className={styles.search_container}>
          <div className={styles.input_container}>
            <input
              value={inputValue}
              onChange={inputValueChangeHandler}
              type="text"
              className={styles.input}
              spellCheck="false"
              placeholder="검색"
            />
            <i className={`${styles.icon} fas fa-search`}></i>
          </div>
        </div>
        <div className={styles.list}>
          {resultSpotList &&
            markerList &&
            resultSpotList.map((item, index) => (
              <MapMenuItem
                key={item.id}
                item={item}
                marker={markerList[index]}
                onItemClickHandler={() => onItemClickHandler(item)}
              />
            ))}
        </div>
      </div>
      <div ref={ref} className={styles.map}></div>
    </div>
  );
};

export default Map;
