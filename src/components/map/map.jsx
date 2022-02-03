import React, { useEffect, useState, useRef, useCallback } from "react";
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
