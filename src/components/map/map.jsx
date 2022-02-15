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
  const [markerObject, setMarkerObject] = useState(null);
  const [reviewUploadPopupOn, setReviewUploadPopupOn] = useState(false);
  const [reviewList, setReviewList] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(null);
  const [reviewShowCount, setReviewShowCount] = useState(1);

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
    if (!map) return;

    if (!spotList) return;

    const tmpMarkerObject = {};
    spotList.forEach((spot) => {
      const icon = {
        url: `/travelWithDog/images/marker/${spot.categories[0].cd}.png`,
        scaledSize: new google.maps.Size(30, 40), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 40), // anchor
      };

      const marker = new google.maps.Marker({
        position: {
          lat: spot.position.coordinates[1],
          lng: spot.position.coordinates[0],
        },
        map: map,
        icon,
      });
      tmpMarkerObject[spot.id] = marker;

      google.maps.event.addListener(marker, "click", () => {
        setPopupValue(spot);
        setPopupOn(true);
      });
    });
    setMarkerObject(tmpMarkerObject);
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
    setPopupValue(false);
    setReviewList(null);
    setReviewShowCount(1);
    setTotalReviewCount(0);
  };

  const loadSpotReview = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/spots/${id}/reviews?limit=10&page=1`
      )
      .then((response) => {
        setReviewList(response.data.data);
        setTotalReviewCount(response.data.total);
        if (response.data.total <= 10) {
          setReviewShowCount(-1);
        }
      })
      .catch((err) => console.error(err));
  };

  // 추가 리뷰 불러오기 (최초 10개 이후)
  const loadMoreReview = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/spots/${popupValue.id}/reviews?limit=10&page=${reviewShowCount}`
      )
      .then((response) => {
        const newList = [...reviewList, ...response.data.data];
        setReviewList(newList);
        if (newList.length === totalReviewCount) {
          setReviewShowCount(-1);
        }
      })
      .catch((err) => console.error(err));
  };

  const onReviewShowCountChangeHandler = () => {
    if (reviewShowCount === -1) {
      return;
    }
    setReviewShowCount(reviewShowCount + 1);
  };

  const setReviewShowCountToInitial = () => {
    setReviewShowCount(1);
  };

  useEffect(() => {
    if (reviewShowCount < 2) {
      return;
    }
    loadMoreReview();
  }, [reviewShowCount]);

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
    onCloseButtonHandler();
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
          setReviewShowCountToInitial={setReviewShowCountToInitial}
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
            totalReviewCount={totalReviewCount}
            loadMoreReview={loadMoreReview}
            reviewShowCount={reviewShowCount}
            onReviewShowCountChangeHandler={onReviewShowCountChangeHandler}
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
            markerObject &&
            resultSpotList.map((item, index) => (
              <MapMenuItem
                key={item.id}
                item={item}
                marker={markerObject[item.id]} //문제 발생 => 인덱스로 넣으니 검색했을 때 오류가 남
                onItemClickHandler={() => onItemClickHandler(item)}
                google={google}
              />
            ))}
        </div>
      </div>
      <div ref={ref} className={styles.map}></div>
    </div>
  );
};

export default Map;
