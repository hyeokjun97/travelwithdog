import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./buttonSlick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ButtonSlick extends Component {
  render() {
    const { buttonList, selected, onSelectChangeHandler, where } = this.props;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      swipeToSlide: true,
      arrows: false,
      variableWIdth: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="button_slick_container">
        <Slider {...settings}>
          {(where === "carSearch" || where === "search") && (
            <div>
              <div
                className={`${selected === "전체" ? "item on" : "item"}`}
                onClick={() => {
                  onSelectChangeHandler({
                    cd: "all",
                    name: "전체",
                  });
                }}
              >
                <p>전체</p>
              </div>
            </div>
          )}
          {buttonList.map((item) => (
            <div key={item.cd || item.id}>
              <div
                className={`${item.name === selected ? "item on" : "item"}`}
                onClick={() => {
                  onSelectChangeHandler(item);
                }}
              >
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
