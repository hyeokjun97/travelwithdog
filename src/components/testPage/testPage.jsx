import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDefault from "../card/cardDefault/cardDefault";
import axios from "axios";
import ReviewUploadPopup from "../reviewUploadPopup/reviewUploadPopup";

const TestPage = (props) => {
  const nav = useNavigate();

  //테스트데이터
  const [a, setA] = useState({
    title: "반려견과 함께하는 제주패지키",
    subtitle: null,
    description: "항공+호텔+전용차량+요트투어",
    image_url:
      "https://public.travelforest.co.kr/image/jeju/traveldog/petpackage/dogincar.jpg",
    link_url: "https://www.travelwithdog.co.kr/korea/jeju%20tours/tour/17326",
    link_target_cd: "self",
  });

  const tourReviewTest = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/tours/118/reviews`, {
        rating: 5,
        content:
          "신비밀보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 신비밀보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 신비밀보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 신비밀보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 신비밀보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 신비밀보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 ",
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const [reviewUploadPopupOn, setReviewUploadPopupOn] = useState(false);

  const reviewPopupOnChangeHandler = () => {
    setReviewUploadPopupOn(!reviewUploadPopupOn);
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <button
        style={{ marginBottom: "100px" }}
        onClick={reviewPopupOnChangeHandler}
      >
        리뷰팝업
      </button>
      {reviewUploadPopupOn && (
        <ReviewUploadPopup
          where="tours"
          id="115"
          name="속초 오션투유 리조트 반려견여행 1박2일"
          reviewPopupOnChangeHandler={reviewPopupOnChangeHandler}
        />
      )}
      <CardDefault item={a} />
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/product/16701")}
      >
        상품상세
      </div>
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/res")}
      >
        상품예약
      </div>
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/article/6")}
      >
        여행기보기
      </div>
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/articlew")}
      >
        여행기쓰기
      </div>
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/carsearch")}
      >
        렌터카검색
      </div>
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/cardetail")}
      >
        렌터카상세
      </div>
      <div
        style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => nav("/rentcar")}
      >
        렌터카
      </div>

      <button onClick={tourReviewTest}>리뷰 테스트</button>
    </div>
  );
};

export default TestPage;
