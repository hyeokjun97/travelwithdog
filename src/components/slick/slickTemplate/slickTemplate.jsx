import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./slickTemplate.css";
import "slick-carousel/slick/slick-theme.css";
import CardDefault from "../../card/cardDefault/cardDefault";
import CardProduct from "../../card/cardProduct/cardProduct";

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
        top: 120,
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
        top: 120,
        left: -30,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class SlickTemplate extends Component {
  render() {
    const { sectionInfo } = this.props;
    const itemList = sectionInfo.items;
    const sectionCode = sectionInfo.section_template_cd;

    let settings = {
      dots: false,
      infinite: false,
      speed: 20,
      swipeToSlide: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            accessibility: false,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 330,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    //각각의 디자인에 맞는 카드 컴포넌트들을 만들어서 이곳에 끼워넣는 방식, 만약 style에
    //어려움이 있다면 그냥 여기에 직접 하기
    return (
      <div className="slick_template">
        <Slider {...settings}>
          {sectionCode === "rentcar" //
            ? itemList.map((item) => <div className="">s</div>) //
            : sectionCode === "showroom-a" //
            ? itemList.map((item) => <div className="">s</div>) //
            : sectionCode === "showroom-b"
            ? itemList.map((item) => <div className="">s</div>) //
            : sectionCode === "showroom-c"
            ? itemList.map((item) => <div className="">s</div>) //
            : //
              itemList.map((item) =>
                item.item_template_cd ? (
                  <CardProduct key={item.product_id} item={item} />
                ) : (
                  <CardDefault key={item.title} item={item} />
                )
              )}
        </Slider>
      </div>
    );
  }
}
