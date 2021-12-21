import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./itemSlickFive.css";
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
        top: 117,
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
        top: 117,
        left: -30,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class ItemSlickTwo extends Component {
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
        centerPadding: "40px",
        swipeToSlide: true,
        arrows: true,
        variableWIdth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    }

    return (
      <div className="slick_five_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.idx} className="item">
              <img src={item.image} alt="thumbnail" className="thumbnail" />
              <div className="data_container">
                <p className="title">{item.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
