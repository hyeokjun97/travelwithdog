import React, { useState } from "react";
import styles from "./productDetail.module.css";
import ReactStars from "react-rating-stars-component";
import ProductOption from "./productOption/productOption";
import ArticleSlick from "../slick/articleSlick/articleSlick";
import ReviewSlick from "../slick/reviewSlick/reviewSlick";
import ProductReview from "./productReview/productReview";
import ItemSlickThree from "../slick/itemSlickThree/itemSlickThree";

const ProductDetail = (props) => {
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
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.image_container}>
            <div className={styles.image_left_container}>
              <img
                src="/travelWithDog/images/example.png"
                alt="product_image"
                className={styles.image_left}
              />
            </div>
            <div className={styles.image_right_container}>
              <div className={styles.image_right_sub_container}>
                <img
                  src="/travelWithDog/images/example.png"
                  alt="product_image"
                  className={styles.image_right}
                />
                <img
                  src="/travelWithDog/images/example.png"
                  alt="product_image"
                  className={styles.image_right}
                />
              </div>
              <div className={styles.image_right_sub_container}>
                <img
                  src="/travelWithDog/images/example.png"
                  alt="product_image"
                  className={styles.image_right}
                />
                <img
                  src="/travelWithDog/images/example.png"
                  alt="product_image"
                  className={styles.image_right}
                />
              </div>
            </div>
          </div>
          <div className={styles.top_data_container}>
            <p className={styles.product_title}>파라다이스 호텔 부산</p>
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
          <nav className={styles.menu_bar}>
            <ul className={styles.menu_list}>
              <li>상품소개</li>
              <li>옵션선택</li>
              <li>위치정보</li>
              <li>여행기(8)</li>
              <li>리뷰(32)</li>
            </ul>
          </nav>
          <div className={styles.part}>
            <div className={styles.part_title_container}>
              <p className={styles.part_title}>상품 소개</p>
            </div>
            <div className={styles.intro_main}></div>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.part_title_container}>
            <p className={styles.part_title}>옵션 선택</p>
          </div>
          <div className={styles.option_main}>
            <ProductOption />
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.part_title_container}>
            <p className={styles.part_title}>여행기(8)</p>
          </div>
          <div className={styles.article_main}>
            <ArticleSlick viewItems={jejuBest} />
          </div>
        </div>
        <div className={styles.review_part}>
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
      </div>
    </div>
  );
};

export default ProductDetail;
