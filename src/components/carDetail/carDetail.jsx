import React from "react";
import styles from "./carDetail.module.css";

const CarDetail = (props) => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.top}>
            <p className={styles.top_title}>렌터카 예약</p>
            <div className={styles.top_data_container}>
              <div className={styles.image_container}>
                <img
                  src="/travelWithDog/images/car_example.png"
                  alt="car_image"
                  className={styles.image}
                />
              </div>
              <div className={styles.top_text_data_container}>
                <div className={styles.top_name_container}>
                  <p className={styles.name}>LF 쏘나타 뉴라이즈(LPG)</p>
                  <p className={styles.type}>중형 5인승</p>
                </div>
                <div className={styles.top_option_container}>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                  <div className={styles.top_option}>
                    <i className={`${styles.check_icon} fas fa-check`}></i>
                    <p className={styles.option_name}>운전석 에어백</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.part}>
            <h2 className={styles.part_title}>대여 기간</h2>
            <div className={styles.range_container}>
              <div className={styles.range_item}>
                <p className={styles.range_text}>대여 일시</p>
                <p className={styles.range}>2021년 12월 15일 (수) 12:30</p>
              </div>
              <div className={styles.range_item}>
                <p className={styles.range_text}>반납 일시</p>
                <p className={styles.range}>2021년 12월 17일 (금) 10:30</p>
              </div>
              <div className={styles.range_item}>
                <p className={styles.range_text}>대여 시간</p>
                <p className={styles.range}>46시간</p>
              </div>
            </div>
          </div>
          <div className={styles.part}>
            <h2 className={styles.part_title}>보험 선택</h2>
            <div className={styles.insurance_container}>
              <div className={styles.insurance_item}>
                <div className={styles.insurance_checkbox_container}>
                  <input
                    type="checkbox"
                    className={styles.insurance_checkbox}
                  />
                </div>
                <p className={styles.insurance_name}>무보험</p>
                <div className={styles.insurance_option_container}>
                  <div className={styles.insurance_option}>
                    <p className={styles.insurance_option_name}>운전자 조건</p>
                    <p className={styles.insurance_option_desc}>
                      만 21세 이상, 경력 1년 이상
                    </p>
                  </div>
                  <div className={styles.insurance_option}>
                    <p className={styles.insurance_option_name}>면책 금액</p>
                    <p className={styles.insurance_option_desc}>300,000원</p>
                  </div>
                </div>
                <p className={styles.price}>468,000원</p>
              </div>
            </div>
          </div>
          <div className={styles.part}>
            <h2 className={styles.part_title}>보험 선택</h2>
          </div>
          <div className={styles.bottom}>
            <h2 className={styles.part_title}>보험 선택</h2>
          </div>
        </main>
        <aside className={styles.side_menu}>
          <div className={styles.number_container}>
            <div className={styles.select_form}>
              <p className={styles.select_title}>탑승 인원 (운전자 포함)</p>
              <select className={styles.select}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className={styles.select_form}>
              <p className={styles.select_title}>동반 반려견 수</p>
              <select className={styles.select}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className={styles.side_menu_price_container}>
            <div className={styles.side_menu_price_item}>
              <p className={styles.side_menu_price_text}>기본 요금</p>
              <p className={styles.side_menu_price}>468,000원</p>
            </div>
            <div className={styles.side_menu_price_item_total}>
              <p className={styles.side_menu_price_text}>총 요금</p>
              <p className={styles.side_menu_price_total}>542,000원</p>
            </div>
          </div>
          <button className={styles.reservation_button}>예약하기</button>
        </aside>
      </div>
    </div>
  );
};

export default CarDetail;
