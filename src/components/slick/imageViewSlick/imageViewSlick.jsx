import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./imageViewSlick.css";
import "slick-carousel/slick/slick-theme.css";

//모바일되면 arrow 없애고 슬라이드 형식으로 전환
//모바일에서 원하는 곳에 멈추지 않고 항상 두 엘리먼트 사이에서 강제로 멈추게 됨

//기본 arrow 아이콘 크기조절 하는 법?
function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} arrow_right`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 417,
        zIndex: 999999,
        textAlign: "end",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} arrow_left`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 417,
        zIndex: 9999999,
      }}
      onClick={onClick}
    />
  );
}

export default class ImageViewSlick extends Component {
  render() {
    const { imageList, onCloseHandler } = this.props;
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      swipeToSlide: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      variableWIdth: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          },
        },
      ],
    };
    console.log(imageList);
    return (
      <div className="image_view_slick_container">
        <div className="close_icon_container" onClick={onCloseHandler}>
          <i className="fas fa-times close_icon"></i>
        </div>
        <Slider {...settings}>
          {imageList.map((image) => (
            <div key={image.id} className="item">
              <img src={image.url} alt="thumbnail" className="thumbnail" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
