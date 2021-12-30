import React, { useEffect, useState } from "react";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./mapPopup.module.css";
import ReactStars from "react-rating-stars-component";

const MapPopup = ({ popupValue, onCloseButtonHandler }) => {
  console.log(popupValue);
  const [instaUrl, setInstaUrl] = useState(null);
  const [blogUrl, setBlogUrl] = useState(null);

  useEffect(() => {
    const links = popupValue.links;
    if (!links) {
      return;
    }
    links.forEach((link) => {
      if (link.media_cd === "instagram") {
        setInstaUrl(link.url);
      } else if (link.media_cd === "blog") {
        setBlogUrl(link.url);
      }
    });
  }, []);
  return (
    <div className={styles.popup}>
      <div
        className={styles.close_icon_container}
        onClick={onCloseButtonHandler}
      >
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      {popupValue && <CustomPaging imageList={popupValue.images.slice(0, 4)} />}
      <div className={styles.data_container}>
        <div className={styles.name_and_type}>
          <p className={styles.name}>{popupValue.name_ko}</p>
          <p className={styles.type}>{popupValue.spot_category_name}</p>
        </div>
        <div className={styles.rating_and_sns}>
          <div className={styles.rating}>
            <ReactStars
              count={5}
              edit={false}
              size={14}
              value={4}
              activeColor="#000000"
              isHalf={true}
              emptyIcon={<i className="fas fa-paw"></i>}
              halfIcon={<i className="fas fa-paw"></i>}
              filledIcon={<i className="fas fa-paw"></i>}
            />
            <p className={styles.rating_text}>4.0점</p>
          </div>
          {instaUrl && (
            <a href={instaUrl} rel="noreferrer" target="_blank">
              <img
                src="/travelWithDog/images/insta.png"
                alt="instagram"
                className={styles.insta}
              />
            </a>
          )}
          {blogUrl && (
            <a href={blogUrl} rel="noreferrer" target="_blank">
              <img
                src="/travelWithDog/images/naver_blog.png"
                alt="naver_blog"
                className={styles.insta}
              />
            </a>
          )}
        </div>
        <div className={styles.sort_container}>여기에 분류</div>
        <p className={styles.desc}>{popupValue.description}</p>
        <div className={styles.sub_data_container}>
          {popupValue.address && (
            <span className={styles.sub_data_title}>
              주소 <span className={styles.sub_data}>{popupValue.address}</span>
            </span>
          )}
          {popupValue.telephone_no && (
            <span className={styles.sub_data_title}>
              전화번호{" "}
              <span className={styles.sub_data}>{popupValue.telephone_no}</span>
            </span>
          )}
          {popupValue.opening_hours && (
            <span className={styles.sub_data_title}>
              영업시간{" "}
              <span className={styles.sub_data}>
                {popupValue.opening_hours}
              </span>
            </span>
          )}
          {popupValue.admission_fee && (
            <span className={styles.sub_data_title}>
              입장료{" "}
              <span className={styles.sub_data}>
                {popupValue.admission_fee}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
