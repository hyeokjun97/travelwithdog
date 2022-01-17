import React, { useEffect, useState } from "react";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./mapPopup.module.css";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

const MapPopup = ({ popupValue, onCloseButtonHandler, deviceSize }) => {
  const [instaUrl, setInstaUrl] = useState(null);
  const [blogUrl, setBlogUrl] = useState(null);
  const [spotData, setSpotData] = useState(null);

  const loadSpotData = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/spots/${popupValue.id}`)
      .then((response) => setSpotData(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    //데이터 로드
    loadSpotData();

    //블로그, 인스타그램 링크 설정
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
      {popupValue && popupValue.images && (
        <CustomPaging imageList={popupValue.images.slice(0, 4)} />
      )}
      <div className={styles.data_container}>
        <div className={styles.top}>
          <div className={styles.name_and_type_and_sns}>
            <div className={styles.name_and_type}>
              <p className={styles.name}>{popupValue.name}</p>
              <p className={styles.type}>{popupValue.categories[0].name}</p>
            </div>
            <div className={styles.sns_container}>
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
                    className={styles.blog}
                  />
                </a>
              )}
            </div>
          </div>

          <div className={styles.rating_and_sns}>
            <div className={styles.rating}>
              <ReactStars
                count={5}
                edit={false}
                size={deviceSize ? 22 : 16}
                value={4}
                activeColor="#000000"
                isHalf={true}
                emptyIcon={<i className="fas fa-paw"></i>}
                halfIcon={<i className="fas fa-paw"></i>}
                filledIcon={<i className="fas fa-paw"></i>}
              />
            </div>
          </div>
          <p className={styles.desc}>{popupValue.description}</p>
        </div>

        <div className={styles.sort_container}>
          <div className={styles.sort_item}>
            <img
              src="/travelWithDog/images/dog_face.svg"
              alt="dog_sort"
              className={styles.sort_image}
            />
            <p className={styles.sort_text}>대</p>
            <p className={styles.sort_title}>대형견</p>
          </div>

          <div className={styles.sort_item}>
            <img
              src="/travelWithDog/images/dog_face.svg"
              alt="dog_sort"
              className={styles.sort_image}
            />
            <p className={styles.sort_text}>중</p>
            <p className={styles.sort_title}>중형견</p>
          </div>
          <div className={styles.sort_item}>
            <img
              src="/travelWithDog/images/dog_face.svg"
              alt="dog_sort"
              className={styles.sort_image}
            />
            <p className={styles.sort_text}>소</p>
            <p className={styles.sort_title}>소형견</p>
          </div>
          <div className={styles.sort_item}>
            <div className={styles.circle}>
              <img
                src="/travelWithDog/images/sort_menu.svg"
                alt="dog_sort"
                className={`${styles.sort_image} ${styles.sort_image_circle}`}
              />
            </div>

            <p className={styles.sort_title}>반려견 메뉴</p>
          </div>
          <div className={styles.sort_item}>
            <div className={styles.circle}>
              <img
                src="/travelWithDog/images/sort_in.svg"
                alt="dog_sort"
                className={styles.sort_image_in}
              />
            </div>

            <p className={styles.sort_title}>실내</p>
          </div>
          <div className={styles.sort_item}>
            <div className={styles.circle}>
              <img
                src="/travelWithDog/images/sort_out.svg"
                alt="dog_sort"
                className={`${styles.sort_image} ${styles.sort_image_circle}`}
              />
            </div>
            <p className={styles.sort_title}>실외</p>
          </div>
          <div className={styles.sort_item}>
            <div className={styles.circle}>
              <img
                src="/travelWithDog/images/sort_park.svg"
                alt="dog_sort"
                className={`${styles.sort_image_park} ${styles.sort_image_circle}`}
              />
            </div>
            <p className={styles.sort_title}>주차장</p>
          </div>
        </div>
        <div className={styles.sub_data_container}>
          {spotData && spotData.address && (
            <div className={styles.sub_data_item}>
              <p className={styles.sub_data_title}>주소</p>
              <span className={styles.sub_data}>{spotData.address}</span>
            </div>
          )}
          {spotData && spotData.telephone && (
            <div className={styles.sub_data_item}>
              <p className={styles.sub_data_title}>전화번호</p>
              <span className={styles.sub_data}>{spotData.telephone}</span>
            </div>
          )}
          {spotData && spotData.business_hours && (
            <div className={styles.sub_data_item}>
              <p className={styles.sub_data_title}>영업시간</p>
              <span className={styles.sub_data}>{spotData.business_hours}</span>
            </div>
          )}
          {spotData && spotData.tariff && (
            <div className={styles.sub_data_item}>
              <p className={styles.sub_data_title}>입장료</p>
              <span className={styles.sub_data}>{spotData.tariff}</span>
            </div>
          )}
        </div>
        <div className={styles.nearby_container}>
          <p className={styles.nearby_title}>주변 관광지</p>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
