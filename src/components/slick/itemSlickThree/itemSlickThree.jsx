import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./itemSlickThree.css";
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
        top: 90,
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
        top: 90,
        left: -30,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class ItemSlickThree extends Component {
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
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        variableWIdth: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    } else if (width > 700) {
      settings = {
        accessibility: false,
        dots: false,
        infinite: false,

        swipeToSlide: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
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
    console.log(viewItems);
    return (
      <div className="slick_three_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.idx} className="item">
              <img src={item.image} alt="thumbnail" className="thumbnail" />
              <div className="data_container">
                <p className="title">{item.title}</p>
                <div className="star_container">
                  <ReactStars
                    count={5}
                    edit={false}
                    size={14}
                    value={4}
                    activeColor="#000000"
                    isHalf={true}
                    emptyIcon={<i className="fas fa-paw"></i>}
                    halfIcon={<i className="fas fa-paw"></i>}
                    filledIcon={<i className="fas fa-paw"></i>}
                  />
                  <p className="rating_text">4.0점</p>
                </div>
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
