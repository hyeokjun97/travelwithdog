import React, { useEffect, useState } from "react";
import styles from "./map.module.css";
import axios from "axios";
import MapMenuItem from "./mapMenuItem/mapMenuItem";
import MapPopup from "./mapPopup/mapPopup";

const Map = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [spotList, setSpotList] = useState(null);
  const [resultSpotList, setResultSpotList] = useState(null);
  const [map, setMap] = useState(null);
  const [popupOn, setPopupOn] = useState(false);
  const [popupValue, setPopupValue] = useState(null);

  const mapStart = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        33.41133915114478,
        126.33676192021225
      ),
      level: 9,
    };
    setMap(new window.kakao.maps.Map(container, options));
  };

  const inputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const loadSpotList = () => {
    axios
      .get("/api/spots")
      .then((response) => {
        setSpotList(response.data.spots);
        setResultSpotList(response.data.spots);
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
    mapStart();
    loadSpotList();
  }, []);

  useEffect(() => {
    if (!spotList) {
      return;
    }
    const result = spotList.filter((spot) => spot.name_ko.includes(inputValue));
    setResultSpotList(result);
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener("keydown", () => setPopupOn(false));
    return () => {
      document.removeEventListener("keydown", () => setPopupOn(false));
    };
  }, []);

  return (
    <div className={styles.body}>
      {popupOn && (
        <div
          className={styles.filter}
          data-filter="true"
          onClick={onFilterClickHandler}
        >
          <MapPopup
            popupValue={popupValue}
            onCloseButtonHandler={onCloseButtonHandler}
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
            resultSpotList.map((item) => (
              <MapMenuItem
                key={item.id}
                item={item}
                onItemClickHandler={() => onItemClickHandler(item)}
              />
            ))}
        </div>
      </div>
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Map;
