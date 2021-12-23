import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./carSlick.css";
import "slick-carousel/slick/slick-theme.css";

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
        top: 220,
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
        top: 220,
        left: -30,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class CarSlick extends Component {
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
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        variableWIdth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rows: 2,
        slidesPerRow: 2,
      };
    } else {
      settings = {
        accessibility: false,
        dots: false,
        infinite: false,
        centerMode: true,
        centerPadding: "40px",
        swipeToSlide: true,
        arrows: true,
        variableWIdth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rows: 2,
        slidesPerRow: 2,
      };
    }

    return (
      <div className="car_slick_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.idx} className="item">
              <div className="box">
                <div className="image_container">
                  <img
                    src="/travelWithDog/images/car_example.png"
                    alt="thumbnail"
                    className="thumbnail"
                  />
                </div>
                <div className="data_container">
                  <div className="title_container">
                    <p className="title">5인승 중형</p>
                    <p className="title_big">올뉴 말리부(휘)</p>
                  </div>
                  <div className="option_container">
                    <div className="option">
                      <p className="option_title">무보험</p>
                      <div className="price_container">
                        <p className="price_number">96,000</p>
                        <p className="price_unit">원</p>
                      </div>
                    </div>
                    <div className="option">
                      <p className="option_title">일반자차</p>
                      <div className="price_container">
                        <p className="price_number">125,000</p>
                        <p className="price_unit">원</p>
                      </div>
                    </div>
                    <div className="option">
                      <p className="option_title">완전자차</p>
                      <div className="price_container">
                        <p className="price_number">147,000</p>
                        <p className="price_unit">원</p>
                      </div>
                    </div>
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
