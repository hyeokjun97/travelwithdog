import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./buttonSlick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ButtonSlick extends Component {
  render() {
    const { buttonList, selected, onSelectChangeHandler } = this.props;

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
          {buttonList.map((item) => (
            <div key={item.id} className="">
              <div
                className={`${
                  item.route === selected.route ? "item on" : "item"
                }`}
                onClick={() => {
                  onSelectChangeHandler(item);
                }}
              >
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
