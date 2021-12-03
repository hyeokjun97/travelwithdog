import React, { useEffect, useState } from "react";
import styles from "./map.module.css";
import axios from "axios";
import MapMenuItem from "./mapMenuItem/mapMenuItem";

const Map = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [spotList, setSpotList] = useState(null);
  const [resultSpotList, setResultSpotList] = useState(null);
  const [map, setMap] = useState(null);

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
    console.log(result);
  }, [inputValue]);

  return (
    <div className={styles.body}>
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
              <MapMenuItem key={item.id} item={item} />
            ))}
        </div>
      </div>
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Map;
