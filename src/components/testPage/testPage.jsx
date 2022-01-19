import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDefault from "../card/cardDefault/cardDefault";

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

  return (
    <div style={{ marginTop: "200px" }}>
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
    </div>
  );
};

export default TestPage;
