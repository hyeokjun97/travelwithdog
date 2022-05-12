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
      src="./images/arrow-right.png"
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
      src="./images/arrow-left.png"
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
    console.log(viewItems);
    const width = window.innerWidth;
    let settings = {
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
      responsive: [
        {
          breakpoint: 800,
          settings: {
            accessibility: false,
            centerMode: true,
            centerPadding: "40px",
            rows: 1,
            slidesPerRow: 1,
          },
        },
      ],
    };

    return (
      <div className="car_slick_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.rentcar.id} className="item">
              <div className="box">
                <div className="image_container">
                  <img
                    src={
                      item.rentcar.images.length > 0
                        ? item.rentcar.images[0].url
                        : "/travelWithDog/images/no_image.jpeg"
                    }
                    alt="thumbnail"
                    className="thumbnail"
                  />
                </div>
                <div className="data_container">
                  <div className="title_container">
                    <p className="title">{`${item.rentcar.seat_count}인승 ${item.rentcar.rentcar_class_code.name}`}</p>
                    <p className="title_big">{item.rentcar.name}</p>
                  </div>
                  <div className="option_container">
                    {item.rentcar.insurances.map((ins) => (
                      <div key={ins.id} className="option">
                        <p className="option_title">{ins.name}</p>
                        <div className="price_container">
                          <p className="price_number">
                            {ins.price.toLocaleString("ko-kr")}
                          </p>
                          <p className="price_unit">원</p>
                        </div>
                      </div>
                    ))}
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
