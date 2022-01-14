import React, { useEffect, useState } from "react";
import styles from "./mapSection.module.css";
import { useGoogleMaps } from "react-hook-google-maps";
import MapSectionItem from "./mapSectionItem/mapSectionItem";
import axios from "axios";

const MapSection = (props) => {
  const [spotList, setSpotList] = useState(null);
  const { ref, map, google } = useGoogleMaps(
    process.env.REACT_APP_MAP_KEY,

    {
      center: { lat: 33.41133915114478, lng: 126.53676192021225 },
      zoom: 10,
    }
  );

  const loadSpotList = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/spots`)
      .then((response) => {
        console.log(response.data);
        setSpotList(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadSpotList();
  }, []);

  return (
    <div className={styles.map_main}>
      <div ref={ref} className={styles.map}></div>
      <div className={styles.map_list}>
        {spotList &&
          spotList.map((spot) => <MapSectionItem key={spot.id} item={spot} />)}
      </div>
    </div>
  );
};

export default MapSection;
