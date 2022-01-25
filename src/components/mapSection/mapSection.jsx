import React, { useEffect, useState } from "react";
import styles from "./mapSection.module.css";
import { useGoogleMaps } from "react-hook-google-maps";
import MapSectionItem from "./mapSectionItem/mapSectionItem";
import axios from "axios";

//마커 찍을건지, 마커나 아이템 클릭하면 어떻게 할건지 정해야 함
const MapSection = (props) => {
  const [spotList, setSpotList] = useState(null);
  const { ref, map, google } = useGoogleMaps(
    process.env.REACT_APP_GOOGLE_KEY,

    {
      center: { lat: 33.41133915114478, lng: 126.53676192021225 },
      zoom: 10,
    }
  );

  const loadSpotList = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/spots`)
      .then((response) => setSpotList(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadSpotList();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }
    if (!spotList) {
      return;
    }
    spotList.forEach((spot) => {
      const marker = new google.maps.Marker({
        position: {
          lat: spot.position.coordinates[1],
          lng: spot.position.coordinates[0],
        },
        map: map,
        //icon: "/travelWithDog/images/icons.svg#rentcar",
      });

      //google.maps.event.addListener(marker, "click", () => {
      //  setPopupValue(spot);
      //  setPopupOn(true);
      //});
    });
  }, [map, spotList]);

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
