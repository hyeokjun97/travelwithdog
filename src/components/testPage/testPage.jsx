import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDefault from "../card/cardDefault/cardDefault";
import axios from "axios";
import ReviewUploadPopup from "../reviewUploadPopup/reviewUploadPopup";

const TestPage = (props) => {
  function onClickPayment() {
    const userCode = process.env.REACT_APP_IAMPORT_KEY;

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: `1000`, // 결제금액
      name: `트래블위드독-테스트`, // 주문명
      buyer_name: "홍길동", // 구매자 이름 (보류)
      buyer_tel: "01012341234", // 구매자 전화번호 (보류)
      buyer_email: "example@example", // 구매자 이메일 (보류)
    };

    if (isReactNative()) {
      /* 5. 리액트 네이티브 환경에 대응하기 */
      const params = {
        userCode, // 가맹점 식별코드
        data, // 결제 데이터
        type: "payment", // 결제와 본인인증 구분을 위한 필드
      };
      const paramsToString = JSON.stringify(params);
      window.ReactNativeWebView.postMessage(paramsToString);
    } else {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init(userCode);
      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, callback);
    }
    function isReactNative() {
      if (
        window.navigator.userAgent ===
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
      ) {
        return true;
      }
      return false;
    }
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

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
      <button onClick={onClickPayment} style={{ marginBottom: 200 }}>
        결제하기
      </button>
    </div>
  );
};

export default TestPage;
