import React, { useState, useRef, forwardRef, useEffect } from "react";
import styles from "./productDetail.module.css";
import ReactStars from "react-rating-stars-component";
import ProductOption from "./productOption/productOption";
import ArticleSlick from "../slick/articleSlick/articleSlick";
import ReviewSlick from "../slick/reviewSlick/reviewSlick";
import ProductReview from "./productReview/productReview";
import ItemSlickThree from "../slick/itemSlickThree/itemSlickThree";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageViewSlick from "../slick/imageViewSlick/imageViewSlick";
import HelmetComponent from "../helmetComponent/helmetComponent";
import LoadingPage from "../loadingPage/loadingPage";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { subDays } from "date-fns";
import { useGoogleMaps } from "react-hook-google-maps";

const ProductDetail = ({ deviceSize }) => {
  const { path } = useParams();
  const introRef = useRef();
  const mapRef = useRef();
  const optionRef = useRef();
  const articleRef = useRef();
  const reviewRef = useRef();
  const [reviewList, setReviewList] = useState(null);
  const [reviewTotal, setReviewTotal] = useState(null);
  const [bestReview, setBestReview] = useState(null);
  const [reviewShowCount, setReviewShowCount] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [dateShow, setDateShow] = useState(null);
  const [priceList, setPriceList] = useState([]);
  const [markerList, setMarkerList] = useState(null);
  const [viewDetailOn, setViewDetailOn] = useState(false);
  //transfer는 rentcar 컴포넌트에서 사용 / 만약 여기서 분류가 더 추가된다면 방법 생각해야됨
  const [product, setProduct] = useState(null);
  const [imageViewOn, setImageViewOn] = useState(false);
  //추천상품 임시데이터
  const [jejuBest, setJejuBest] = useState([
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
      title: "올 오브 피렌체",
      type: "숙소",
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

  const imageViewOnHandler = () => {
    setImageViewOn(!imageViewOn);
  };

  const detailViewChangeHandler = () => {
    setViewDetailOn(true);
  };

  //영문 달을 숫자로 바꾸어 줌
  const monthTranslator = (selectedMonth) => {
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 0; i < monthList.length; i++) {
      if (monthList[i] === selectedMonth) {
        return i + 1;
      }
    }
  };

  //영문 요일을 한글로 바꾸어 줌
  const dayTranslator = (selectedDay) => {
    const dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const korDayList = ["월", "화", "수", "목", "금", "토", "일"];
    for (let i = 0; i < dayList.length; i++) {
      if (dayList[i] === selectedDay) {
        return korDayList[i];
      }
    }
  };

  const loadReviewList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/tours/${product.id}/reviews?limit=10&page=1`
      )
      .then((response) => {
        setReviewList(response.data.data);
        setReviewTotal(response.data.total);
        const result = response.data.data.slice(0);
        result.sort((a, b) => {
          return b.rating - a.rating;
        });
        if (response.data.total <= 10) {
          setReviewShowCount(-1);
        }
      })
      .catch((err) => console.error(err));
  };

  const loadMoreReview = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/tours/${product.id}/reviews?limit=10&page=${reviewShowCount}`
      )
      .then((response) => {
        const newList = [...reviewList, ...response.data.data];
        setReviewList(newList);
        if (newList.length === reviewTotal) {
          setReviewShowCount(-1);
        }
      })
      .catch((err) => console.error(err));
  };

  const loadBestReview = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/tours/${product.id}/reviews?limit=6&page=1&order=rating`
      )
      .then((response) => setBestReview(response.data.data))
      .catch((err) => console.error(err));
  };

  const loadPriceList = (date) => {
    setPriceList(null);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/tours/${product.id}/items?date=${date}`
      )
      .then((response) => setPriceList(response.data))
      .catch((err) => console.error(err));
  };

  const onReviewShowCountChangeHandler = () => {
    if (reviewShowCount === -1) {
      return;
    }
    setReviewShowCount(reviewShowCount + 1);
  };

  useEffect(() => {
    const loadProductInfo = () => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/products/${path}`)
        .then((response) => {
          //product_cd === "transfer" 인 경우 보류
          if (response.data.product_cd === "tour") {
            setProduct(response.data.tour);
          }
        })
        .catch((err) => console.error(err));
    };
    loadProductInfo();
  }, []);

  useEffect(() => {
    if (!product) {
      return;
    }
    loadReviewList();
    loadBestReview();
  }, [product]);

  useEffect(() => {
    if (reviewShowCount < 2) {
      return;
    }
    loadMoreReview();
  }, [reviewShowCount]);

  const CustomInput = forwardRef(({ value, onClick }, dateRef) => (
    <button
      className={styles.date_select_button}
      onClick={onClick}
      ref={dateRef}
    >
      {dateShow || "날짜 선택"}
    </button>
  ));

  const dateShowChangeHandler = (date) => {
    const dateSplit = date.toString().split(" ");
    setDateShow(
      `${dateSplit[3]}년 ${monthTranslator(dateSplit[1])}월 ${
        dateSplit[2]
      }일 (${dayTranslator(dateSplit[0])})`
    );
  };

  useEffect(() => {
    if (!product) {
      return;
    }
    const dateSplit = startDate.toString().split(" ");
    const translatedDate = `${dateSplit[3]}-${monthTranslator(dateSplit[1])
      .toString()
      .padStart(2, "0")}-${dateSplit[2].toString().padStart(2, "0")}`;
    loadPriceList(translatedDate);
    dateShowChangeHandler(startDate);
  }, [startDate]);

  const keyHandler = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    setImageViewOn(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [keyHandler]);

  //google map api
  const { ref, map, google } = useGoogleMaps(
    process.env.REACT_APP_GOOGLE_KEY,

    {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    }
  );

  //google map marker
  useEffect(() => {
    if (!map) return;

    if (!product) return;

    if (product.locations.length === 0) return;

    new google.maps.Marker({
      position: {
        lat: product.locations[0].position.coordinates[1],
        lng: product.locations[0].position.coordinates[0],
      },
      map: map,
      // icon: "/travelWithDog/images/dog_face.svg",
    });

    map.setCenter(
      new google.maps.LatLng(
        product.locations[0].position.coordinates[1],
        product.locations[0].position.coordinates[0]
      )
    );
  }, [map, product]);

  return (
    <>
      <div className={styles.body}>
        {product && (
          <HelmetComponent
            title={product.html_title}
            desc={product.html_description}
            url={`https://www.travelwithdog.co.kr/product/${path}`}
            keyword={product.html_keyword}
            image={product.images[0].url}
          />
        )}

        <div className={styles.container}>
          {imageViewOn && (
            <div className={styles.image_view_container}>
              <ImageViewSlick
                imageList={product.images}
                onCloseHandler={imageViewOnHandler}
              />
            </div>
          )}
          {product && (
            <div className={styles.top}>
              <div
                className={styles.image_container}
                onClick={imageViewOnHandler}
              >
                <div className={styles.image_left_container}>
                  <img
                    src={product.images[0].url}
                    alt="product_image"
                    className={styles.image_left}
                  />
                </div>
                <div className={styles.image_right_container}>
                  <div className={styles.image_right_sub_container}>
                    <img
                      src={
                        product.images[1]
                          ? product.images[1].url
                          : "/travelWithDog/images/no_image.jpeg"
                      }
                      alt="product_image"
                      className={styles.image_right}
                    />
                    <img
                      src={
                        product.images[2]
                          ? product.images[2].url
                          : "/travelWithDog/images/no_image.jpeg"
                      }
                      alt="product_image"
                      className={styles.image_right}
                    />
                  </div>
                  <div className={styles.image_right_sub_container}>
                    <img
                      src={
                        product.images[3]
                          ? product.images[3].url
                          : "/travelWithDog/images/no_image.jpeg"
                      }
                      alt="product_image"
                      className={styles.image_right}
                    />
                    <img
                      src={
                        product.images[4]
                          ? product.images[4].url
                          : "/travelWithDog/images/no_image.jpeg"
                      }
                      alt="product_image"
                      className={styles.image_right}
                    />
                  </div>
                </div>
                {product && product.images.length > 5 && (
                  <div className={styles.image_container_button}>{`+${
                    deviceSize
                      ? product.images.length - 5
                      : product.images.length
                  }개 더 보기`}</div>
                )}
              </div>
              <div className={styles.top_data_container}>
                <p className={styles.product_title}>{product.name_en}</p>
                <div className={styles.top_rating_container}>
                  <div className={styles.star_container}>
                    <ReactStars
                      count={5}
                      edit={false}
                      size={20}
                      value={product.rating}
                      activeColor="#000000"
                      isHalf={true}
                      emptyIcon={<i className="fas fa-paw"></i>}
                      halfIcon={<i className="fas fa-paw"></i>}
                      filledIcon={<i className="fas fa-paw"></i>}
                    />
                    <p
                      className={styles.rating_text}
                    >{`${product.rating}점`}</p>
                  </div>
                  <p className={styles.rating_review_number}>{`${
                    reviewTotal || 0
                  }개의 리뷰`}</p>
                </div>
              </div>
            </div>
          )}
          <nav className={styles.menu_bar}>
            <ul className={styles.menu_list}>
              <li
                onClick={() =>
                  introRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                상품소개
              </li>
              <li
                onClick={() =>
                  optionRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                옵션선택
              </li>
              <li
                onClick={() =>
                  mapRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                위치정보
              </li>
              <li
                onClick={() =>
                  articleRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                여행기(8)
              </li>
              <li
                onClick={() =>
                  reviewRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                {`리뷰(${reviewTotal || 0})`}
              </li>
            </ul>
          </nav>
          {product && (
            <div
              ref={introRef}
              className={`${
                viewDetailOn
                  ? `${styles.part_intro}`
                  : `${styles.part_intro_off}`
              }`}
            >
              <div
                className={`${
                  viewDetailOn
                    ? `${styles.bottom_filter_off}`
                    : `${styles.bottom_filter}`
                }`}
              >
                <button
                  className={styles.view_detail_button}
                  onClick={detailViewChangeHandler}
                >
                  상세 보기
                </button>
              </div>
              <div className={styles.part_title_container}>
                <p className={styles.part_title}>상품 소개</p>
              </div>
              <div
                className={styles.intro_main}
                dangerouslySetInnerHTML={{ __html: product.comment }}
              ></div>
              <div
                className={styles.intro_main}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          )}
          <div ref={optionRef} className={styles.part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>옵션 선택</p>
            </div>

            <div className={styles.date_select}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={subDays(new Date(), 0)}
                customInput={<CustomInput />}
                locale={ko}
              />
            </div>

            <div className={styles.option_main}>
              {priceList ? (
                priceList.length > 0 ? (
                  priceList.map((item) => (
                    <ProductOption
                      key={item.id}
                      item={item}
                      productId={item.id}
                    />
                  ))
                ) : (
                  <p className={styles.nothing}>
                    선택하신 날짜에 예약 가능한 상품이 없습니다.
                  </p>
                )
              ) : (
                <LoadingPage />
              )}
            </div>
          </div>
          <div ref={mapRef} className={styles.part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>위치 정보</p>
            </div>
            <div className={styles.map_main}>
              <div className={styles.map_top}>
                <div ref={ref} className={styles.map}></div>
                <div className={styles.map_attraction_list}>
                  <p className={styles.map_attraction_title}>주변 관광지</p>
                  <div className={styles.map_attraction_item}>
                    <p className={styles.map_attraction_name}>
                      주문진 수산시장
                    </p>
                    <p className={styles.map_attraction_dist}>270m</p>
                  </div>
                  <div className={styles.map_attraction_item}>
                    <p className={styles.map_attraction_name}>
                      주문진 수산시장
                    </p>
                    <p className={styles.map_attraction_dist}>270m</p>
                  </div>
                  <div className={styles.map_attraction_item}>
                    <p className={styles.map_attraction_name}>
                      주문진 수산시장
                    </p>
                    <p className={styles.map_attraction_dist}>270m</p>
                  </div>
                </div>
              </div>
              <div className={styles.map_bottom}>
                <i className={`${styles.map_icon} fas fa-map-marker-alt`}></i>
                <p className={styles.map_location}>
                  부산 해운대구 해운대해변로296
                </p>
              </div>
            </div>
          </div>
          <div ref={articleRef} className={styles.part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>여행기(8)</p>
            </div>
            <div className={styles.article_main}>
              <ArticleSlick viewItems={jejuBest} />
            </div>
          </div>

          <div ref={reviewRef} className={styles.review_part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>{`리뷰(${reviewTotal || 0})`}</p>
            </div>
            <div className={styles.review_main}>
              {bestReview && bestReview.length > 2 && (
                <div>
                  <p className={styles.slick_title}>BEST 리뷰</p>
                  <ReviewSlick viewItems={bestReview} />
                </div>
              )}
              {reviewList && reviewList.length > 0 && (
                <div className={styles.part_title_container}>
                  <p className={styles.part_title}>{`${
                    reviewTotal || 0
                  }개의 리뷰`}</p>
                </div>
              )}
              <div className={styles.all_review_container}>
                {reviewList &&
                  (reviewList.length > 0 ? (
                    reviewList.map((review) => (
                      <ProductReview key={review.id} review={review} />
                    ))
                  ) : (
                    <p className={styles.no_review}>리뷰가 없습니다.</p>
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
            <div className={styles.part_title_container_bottom}>
              <p className={styles.part_title}>함께 즐기기 좋은 상품</p>
            </div>
            <div className={styles.with_main}>
              <ItemSlickThree viewItems={jejuBest} />
            </div>
          </div>
          <div
            className={styles.go_up_button}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className={`${styles.go_up_icon} fas fa-arrow-up`}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
