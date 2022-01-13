import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./menuSlick.css";
import "slick-carousel/slick/slick-theme.css";

export default class MenuSlick extends Component {
  render() {
    const { viewItems, category, onCategoryChangeHandler } = this.props;
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
    console.log(viewItems, category);
    return (
      <div className="menu_slick_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div
              key={item.id}
              className="item"
              onClick={() => {
                onCategoryChangeHandler(item);
              }}
            >
              <p
                className={`${
                  category.name === item.name ? "title selected" : "title"
                }`}
              >
                {item.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
