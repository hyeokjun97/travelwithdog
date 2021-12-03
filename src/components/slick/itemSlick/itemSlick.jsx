import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./itemSlick.css";
import "slick-carousel/slick/slick-theme.css";

//모바일되면 arrow 없애고 슬라이드 형식으로 전환

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow_right`}
      style={{
        ...style,
        display: "block",
        width: 30,
        height: 30,
        top: 170,
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
      src="/images/arrow-left.png"
      alt="arrow"
      className={`${className} arrow_left`}
      style={{
        ...style,
        display: "block",
        width: 30,
        height: 30,
        top: 170,
        left: -30,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class ItemSlick extends Component {
  render() {
    const { viewItems } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      swipeToSlide: true,
      slidesToShow: 4,
      slidesToScroll: 4, //위의 두개 지워주면 반응형 슬라이드 가능
      arrows: true,
      variableWIdth: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="slick_service_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.idx} className="item">
              <img src={item.image} alt="thumbnail" className="thumbnail" />
              <div className="data_container">
                <p className="type">{item.type}</p>
                <p className="title">{item.title}</p>
                <p className="price">{`${item.price.toLocaleString(
                  "ko-KR"
                )}원`}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
