import React from "react";
import { useNavigate } from "react-router-dom";

const TestPage = (props) => {
  const nav = useNavigate();
  return (
    <div style={{ marginTop: "200px" }}>
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
    </div>
  );
};

export default TestPage;
