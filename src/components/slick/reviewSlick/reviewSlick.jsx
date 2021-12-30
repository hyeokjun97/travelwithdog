import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./reviewSlick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-rating-stars-component";

//모바일되면 arrow 없애고 슬라이드 형식으로 전환
//모바일에서 원하는 곳에 멈추지 않고 항상 두 엘리먼트 사이에서 강제로 멈추게 됨

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/travelWithDog/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow_right`}
      style={{
        ...style,
        display: "block",
        width: 20,
        height: 20,
        top: 80,
        right: -30,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/travelWithDog/images/arrow-left.png"
      alt="arrow"
      className={`${className} arrow_left`}
      style={{
        ...style,
        display: "block",
        width: 20,
        height: 20,
        top: 80,
        left: -30,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class ReviewSlick extends Component {
  render() {
    const { viewItems } = this.props;
    const width = window.innerWidth;
    let settings;
    if (width > 1050) {
      settings = {
        dots: false,
        infinite: false,
        speed: 500,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        variableWIdth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    } else {
      settings = {
        accessibility: false,
        dots: false,
        infinite: false,
        centerMode: true,
        centerPadding: "25px",
        swipeToSlide: true,
        slidesToShow: 1,
        arrows: false,
        variableWIdth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    }

    return (
      <div className="review_slick_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.idx} className="item">
              <div className="container">
                <p className="desc">
                  이 호텔은 정말 강력 추천합니다! 제가 본 호텔 중 최고였어요 이
                  호텔은 정말 강력 추천합니다! 제가 본 호텔 중 최고였어요 이
                  호텔은 정말 강력 추천합니다! 제가 본 호텔 중 최고였어요
                </p>
                <div className="data_container">
                  <p className="name">김**</p>
                  <div className="star_container">
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
                    <p className="rating_text">4.0</p>
                    <p className="rating_text_sub">점</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
