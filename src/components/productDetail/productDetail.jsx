import React, { useState, useRef, useEffect } from "react";
import styles from "./productDetail.module.css";
import ReactStars from "react-rating-stars-component";
import ProductOption from "./productOption/productOption";
import ArticleSlick from "../slick/articleSlick/articleSlick";
import ReviewSlick from "../slick/reviewSlick/reviewSlick";
import ProductReview from "./productReview/productReview";
import ItemSlickThree from "../slick/itemSlickThree/itemSlickThree";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
  const { path } = useParams();
  const introRef = useRef();
  const mapRef = useRef();
  const optionRef = useRef();
  const articleRef = useRef();
  const reviewRef = useRef();

  //transfer는 rentcar 컴포넌트에서 사용 / 만약 여기서 분류가 더 추가된다면 방법 생각해야됨
  const [product, setProduct] = useState(null);

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

  useEffect(() => {
    const loadProductInfo = () => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/products/${path}`)
        .then((response) => setProduct(response.data.tour))
        .catch((err) => console.error(err));
    };
    loadProductInfo();
  }, []);

  return (
    <div className={styles.body}>
      {product && (
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.image_container}>
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
              {product.images.length > 5 && (
                <div className={styles.image_container_button}>{`+${
                  product.images.length - 5
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
                    value={4}
                    activeColor="#000000"
                    isHalf={true}
                    emptyIcon={<i className="fas fa-paw"></i>}
                    halfIcon={<i className="fas fa-paw"></i>}
                    filledIcon={<i className="fas fa-paw"></i>}
                  />
                  <p className={styles.rating_text}>4.0점</p>
                </div>
                <p className={styles.rating_review_number}>32개의 리뷰</p>
              </div>
            </div>
          </div>
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
                리뷰(32)
              </li>
            </ul>
          </nav>
          <div ref={introRef} className={styles.part_intro}>
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
          <div ref={optionRef} className={styles.part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>옵션 선택</p>
            </div>
            <div className={styles.option_main}>
              {product.items.map((item) => (
                <ProductOption key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div ref={mapRef} className={styles.part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>위치 정보</p>
            </div>
            <div className={styles.map_main}>
              <div className={styles.map_top}>
                <img
                  src="/travelWithDog/images/map_example.png"
                  alt="map"
                  className={styles.map_image}
                />
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
              <p className={styles.part_title}>리뷰(32)</p>
            </div>
            <div className={styles.review_main}>
              <p className={styles.slick_title}>BEST 리뷰</p>
              <ReviewSlick viewItems={jejuBest} />
              <div className={styles.part_title_container}>
                <p className={styles.part_title}>32개의 리뷰</p>
              </div>
              <div className={styles.all_review_container}>
                <ProductReview />
                <ProductReview />
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
      )}
    </div>
  );
};

export default ProductDetail;
