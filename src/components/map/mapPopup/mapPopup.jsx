import React, { useEffect, useState } from "react";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./mapPopup.module.css";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import HelmetComponent from "../../helmetComponent/helmetComponent";
import MapPopupReviewItem from "./mapPopupReviewItem/mapPopupReviewItem";
import MapRecommendSlick from "../../slick/mapRecommendSlick/mapRecommendSlick";

const MapPopup = ({
  popupValue,
  onCloseButtonHandler,
  deviceSize,
  reviewPopupOnChangeHandler,
  loadSpotReview,
  reviewList,
  totalReviewCount,
  reviewShowCount,
  onReviewShowCountChangeHandler,
}) => {
  // 주변 관광지 임시데이터
  const [chabak, setChabak] = useState([
    {
      idx: 0,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "스코틀랜드 아일랜드 8일간의 여행",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 1,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "제주도 차박",
      type: "패키지",
      price: 20000,
    },
    {
      idx: 2,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/7511/296672_medium_1544173662.jpg?1544173662",
      title: "바티칸투어",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 3,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/70816/595376_medium_1638331669.jpg?1638331669",
      title: "롯데월드 입장권",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 4,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/42185/262013_medium_1536304187.jpg?1536304187",
      title: "올 오브 피렌체",
      type: "투어패키지",
      price: 20000,
    },
    {
      idx: 5,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/68004/592612_medium_1636105470.jpg?1636105470",
      title: "제주도차박",
      type: "교통편",
      price: 20000,
    },
    {
      idx: 6,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/53556/592873_medium_1636329887.jpg?1636329887",
      title: "제주 아쿠아플라넷 입장권",
      type: "입장권",
      price: 20000,
    },
    {
      idx: 7,
      image:
        "https://d2ur7st6jjikze.cloudfront.net/offer_photos/100746/548935_medium_1608107406.jpg?1608107406",
      title:
        "[바티칸 공인가이드] 이것이 베테랑 클라쓰! 에너지 넘치는 바티칸 반일 투어!",
      type: "투어패키지",
      price: 20000,
    },
  ]);
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

  useEffect(() => {
    loadSpotReview(popupValue.id);
  }, [spotData]);

  return (
    <div className={styles.popup}>
      {spotData && (
        <HelmetComponent
          title={spotData.html_title}
          desc={spotData.html_description}
          url={`https://www.travelwithdog.co.kr/map`}
          keyword={spotData.html_keyword}
        />
      )}

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
              <p
                className={styles.go_review}
                onClick={() => reviewPopupOnChangeHandler(popupValue)}
              >
                리뷰 작성
              </p>
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
          <div className={styles.nearby_main}>
            {chabak.map((item) => (
              <div
                key={item.idx ? item.idx : item.product_id}
                className={styles.item}
              >
                <img
                  src={item.image}
                  alt="thumbnail"
                  className={styles.thumbnail}
                />
                <div className={styles.data_container}>
                  <p className={styles.name}>{item.title}</p>
                  <div className={styles.star_container}>
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
                  <p className={styles.price}>{`${item.price.toLocaleString(
                    "ko-KR"
                  )}원`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.review_container}>
          <p className={styles.review_title}>
            리뷰{" "}
            <span className={styles.review_count}>{totalReviewCount || 0}</span>
          </p>
          <div className={styles.review_main}>
            {reviewList &&
              reviewList.map((review) => (
                <MapPopupReviewItem review={review} />
              ))}
            {reviewShowCount !== -1 && (
              <div
                className={styles.show_more_button}
                onClick={onReviewShowCountChangeHandler}
              >
                <span>더보기</span>
                <i
                  className={`${styles.show_more_icon} fas fa-chevron-down`}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
