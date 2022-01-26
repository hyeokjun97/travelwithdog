import React, { Component } from "react";
import Slider from "react-slick";
import "./customPaging.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src="/travelWithDog/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "none",
        top: 370,
        right: 0,
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
      className={`${className} arrow`}
      style={{
        ...style,
        display: "none",
        top: 370,
        left: 0,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class CustomPaging extends Component {
  render() {
    const { imageList } = this.props;
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img
              src={imageList[i - 1 + 1].url}
              alt="select_image"
              className="dot_image"
            />
          </a>
        );
      },
      //autoplaySpeed: 5000,
      //autoplay: true,
      //pauseOnHover: true,
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="custom_paging_container">
        <Slider {...settings}>
          {imageList.map((item) => (
            <div key={item}>
              <img src={item.url} alt="slide_image" className="image" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
