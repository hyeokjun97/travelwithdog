import React, { useEffect } from "react";
import styles from "./contact.module.css";
import { useGoogleMaps } from "react-hook-google-maps";

const Contact = (props) => {
  const { ref, map, google } = useGoogleMaps(process.env.REACT_APP_GOOGLE_KEY, {
    center: { lat: 37.55438841337693, lng: 126.93111696915291 },
    zoom: 15,
  });

  useEffect(() => {
    if (!google) {
      return;
    }
    const marker = new google.maps.Marker({
      position: { lat: 37.55438841337693, lng: 126.93111696915291 },
      map: map,
      text: "트래블위드독",
    });
  }, [map]);

  return (
    <main className={styles.main}>
      <div className={styles.part}>
        <h4 className={styles.title}>Address</h4>
        <p className={styles.content}>서울특별시 마포구 서강로9길48 4층</p>
      </div>
      <div className={styles.part}>
        <h4 className={styles.title}>Phone</h4>
        <p className={styles.content}>+82-2-6053-7270</p>
      </div>
      <div className={styles.part}>
        <h4 className={styles.title}>Email</h4>
        <p className={styles.content}>info@travelforest.co.kr</p>
      </div>
      <div className={styles.part}>
        <h4 className={styles.title}>SNS</h4>
        <div className={styles.sns_container}>
          <div className={styles.sns_container}>
            <a
              href="https://www.facebook.com/travelforest"
              target="_blank"
              rel="noopenner"
            >
              <img
                src="/travelWithDog/images/facebook_black.png"
                alt="sns_icon"
                className={styles.sns_icon}
              />
            </a>
            <a
              href="https://www.facebook.com/travelforest"
              target="_blank"
              rel="noopenner"
            >
              <img
                src="/travelWithDog/images/kakaotalk_black.png"
                alt="sns_icon"
                className={styles.sns_icon}
              />
            </a>{" "}
            <a
              href="https://www.facebook.com/travelforest"
              target="_blank"
              rel="noopenner"
            >
              <img
                src="/travelWithDog/images/naver_blog_black.png"
                alt="sns_icon"
                className={styles.sns_icon}
              />
            </a>
          </div>
        </div>
      </div>
      <div ref={ref} className={styles.map}></div>
    </main>
  );
};
export default Contact;
