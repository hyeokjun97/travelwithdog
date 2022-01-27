import React, { useState } from "react";
import Popup from "../popup/popup";
import styles from "./reservationPage.module.css";

const ReservationPage = (props) => {
  //여행자 수에 따라 달라지는 여행자 정보 입력 란 처리 방법 생각
  const [agreeValue, setAgreeValue] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const { one, two, three, four } = agreeValue;

  const onAgreeChangeHandler = (e) => {
    const target = e.target.name;
    if (target === "four" && e.target.checked) {
      setAgreeValue({
        ...agreeValue,
        two: true,
        three: true,
        four: true,
      });
    } else if (target === "four" && !e.target.checked) {
      setAgreeValue({
        ...agreeValue,
        two: false,
        three: false,
        four: false,
      });
    } else if (
      (target === "two" && !e.target.checked) ||
      (target === "three" && !e.target.checked)
    ) {
      setAgreeValue({
        ...agreeValue,
        [target]: e.target.checked,
        four: false,
      });
    } else {
      setAgreeValue({
        ...agreeValue,
        [target]: e.target.checked,
      });
    }
  };

  //팝업 설정 부분 모두 임시
  const [popupValue, setPopupValue] = useState(false);
  const onPopupValueChangeHandler = () => {
    setPopupValue({
      title: "상품 정보 및 규정",
      content: `어렵다고만 생각했던 애완견 동반 여행! 
    이제 누구보다 쉽고, 편하게 여행할 수 있습니다.  
    
    더 이상 팻호텔에 맡겨놓거나, 지인에게 사랑하는 댕댕이를 맡기지 마세요. 
    
    동물병원 원장님들과 애견인들이 모여 만든 프리미엄 애견여행 서비스 
    애견여행에 필요한 핵심이.. 그리고 세심한 서비스가 준비되어있습니다. 
    
    - 더 이상 남의 눈치보지 말고
    - 우리들만의 편안한 휴가를 
    - 애견전용 랜트카
    - 애견을 위한 다양한 트래블키트
    
    이제 댕댕이와 함께 여행하세요. 
    
    이제부터 우리는 ... 댕댕이와 함께 여행합니다. 
    
    이제 누구보다 쉽고, 편하게 여행할 수 있습니다.  
    
    더 이상 팻호텔에 맡겨놓거나, 지인에게 사랑하는 댕댕이를 맡기지 마세요. 
    
    동물병원 원장님들과 애견인들이 모여 만든 프리미엄 애견여행 서비스 
    애견여행에 필요한 핵심이.. 그리고 세심한 서비스가 준비되어있습니다. 
    
    - 더 이상 남의 눈치보지 말고
    - 우리들만의 편안한 휴가를 
    - 애견전용 랜트카
    - 애견을 위한 다양한 트래블키트
    
    이제 댕댕이와 함께 여행하세요. 
    
    이제부터 우리는 ... 댕댕이와 함께 여행합니다. 
    `,
    });
  };

  const onPopupCloseHandler = () => {
    setPopupValue(false);
  };

  return (
    <div className={styles.body}>
      {popupValue && (
        <Popup data={popupValue} onPopupCloseHandler={onPopupCloseHandler} />
      )}
      <main className={styles.main}>
        <div className={styles.top}>
          <h2 className={styles.top_title}>상품 예약</h2>
          <div className={styles.product_data_container}>
            <img
              src="/travelWithDog/images/example.png"
              alt="상품이미지"
              className={styles.image}
            />
            <div className={styles.product_data}>
              <p className={styles.product_name}>
                [디럭스트윈 펫룸]강릉 씨베이 호텔 반려견 여행 1박 2일
              </p>
              <div className={styles.product_detail_data_container}>
                <div className={styles.product_detail_data}>
                  <p className={styles.product_detail_text_left}>체크인</p>
                  <p className={styles.product_detail_text}>2021/12/10</p>
                </div>
                <div className={styles.product_detail_data}>
                  <p className={styles.product_detail_text_left}>체크아웃</p>
                  <p className={styles.product_detail_text}>2021/12/13</p>
                </div>
                <div className={styles.product_detail_data}>
                  <p className={styles.product_detail_text_left}>반려인</p>
                  <p className={styles.product_detail_text}>2명</p>
                </div>
                <div className={styles.product_detail_data}>
                  <p className={styles.product_detail_text_left}>반려견</p>
                  <p className={styles.product_detail_text}>1마리</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.part}>
          <h2 className={styles.part_title}>여행자 핸드폰 인증</h2>
          <div className={styles.auth_container}>
            <div className={styles.auth_form}>
              <p className={styles.auth_text}>휴대폰 번호</p>
              <div className={styles.auth_input_container}>
                <input
                  type="text"
                  className={styles.auth_input}
                  spellCheck="false"
                  placeholder="휴대폰 번호"
                />
                <button className={styles.auth_button}>인증번호 받기</button>
              </div>
            </div>
            <div className={styles.auth_form}>
              <p className={styles.auth_text}>인증 번호</p>
              <div className={styles.auth_input_container}>
                <input
                  type="text"
                  className={styles.auth_input}
                  spellCheck="false"
                  placeholder="인증번호"
                />
                <button className={styles.auth_button}>인증번호 받기</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.part}>
          <h2 className={styles.part_title}>여행자 정보</h2>
          <div className={styles.tourist_data_container}>
            <div className={styles.tourist_data_input_container}>
              <div className={styles.tourist_data_input_form}>
                <p className={styles.tourist_data_text}>한글 성명</p>
                <input type="text" className={styles.tourist_data_input} />
              </div>
              <div className={styles.tourist_data_input_form}>
                <p className={styles.tourist_data_text}>한글 성명</p>
                <input type="text" className={styles.tourist_data_input} />
              </div>
              <div className={styles.tourist_data_input_form}>
                <p className={styles.tourist_data_text}>한글 성명</p>
                <input type="text" className={styles.tourist_data_input} />
              </div>
              <div className={styles.tourist_data_select_form}>
                <p className={styles.tourist_data_text}>성별</p>
                <select className={styles.tourist_select}>
                  <option value="">선택</option>
                  <option value="남">남</option>
                  <option value="여">여</option>
                </select>
              </div>
              <div className={styles.tourist_data_input_form}>
                <p className={styles.tourist_data_text}>한글 성명</p>
                <input type="text" className={styles.tourist_data_input} />
              </div>
            </div>
          </div>
          <div className={styles.checkbox_container_top}>
            <input
              type="checkbox"
              name="one"
              checked={one}
              onChange={onAgreeChangeHandler}
              className={styles.checkbox}
            />
            <p className={styles.checkbox_text}>
              <span className={styles.green}>상품 정보 및 규정</span>에
              동의합니다.
            </p>
          </div>
        </div>
        <div className={styles.part}>
          <h2 className={styles.part_title}>추가 요청사항</h2>
          <textarea
            className={styles.requirement}
            spellCheck="false"
            placeholder="추가 요청사항을 입력해주세요"
          ></textarea>
        </div>
        <div className={styles.part_checkbox}>
          <div className={styles.checkbox_container}>
            <input
              type="checkbox"
              name="two"
              checked={two}
              onChange={onAgreeChangeHandler}
              className={styles.checkbox}
            />
            <p className={styles.checkbox_text}>
              <span
                className={styles.green}
                onClick={onPopupValueChangeHandler}
              >
                개인정보처리방침
              </span>
              에 동의합니다.
            </p>
          </div>
          <div className={styles.checkbox_container}>
            <input
              type="checkbox"
              name="three"
              checked={three}
              onChange={onAgreeChangeHandler}
              className={styles.checkbox}
            />
            <p className={styles.checkbox_text}>
              <span className={styles.green}>여행약관</span>에 동의합니다.
            </p>
          </div>
          <div className={styles.checkbox_container}>
            <input
              type="checkbox"
              name="four"
              checked={four}
              onChange={onAgreeChangeHandler}
              className={styles.checkbox}
            />
            <p className={styles.checkbox_text}>전체약관에 동의합니다.</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price_container}>
            <p className={styles.price_text}>결제 금액</p>
            <p className={styles.price}>201,000원</p>
          </div>
          <div className={styles.button_container}>
            <button className={styles.button}>돌아가기</button>
            <button className={styles.button_purchase}>결제하기</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationPage;
