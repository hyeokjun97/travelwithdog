import React from "react";
import styles from "./newsView.module.css";

const NewsView = (props) => {
  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <h2 className={styles.main_title}>이벤트/뉴스</h2>
        <div className={styles.title_and_date}>
          <p className={styles.title}>
            [예약취소 100% 환불] 트래블포레스트는 여행자와 함께합니다.
          </p>
          <p className={styles.date}>2021/12/02</p>
        </div>
        <div className={styles.content}>
          {`
            안녕하세요. 트래블포레스트입니다. 
            조금씩 조금씩 위드코로나가 안정화 되고, 전세계의 하늘길이 하나 둘씩 열려가고 있는 중에 
            안타깝게도 새로운 오미크론 변이 바이러스가 발생을 했습니다. 
            
            이로 인해 대한민국 질병관리본부는 당분간 해외에서 입국하는 모든 내외국인의 10일간 자가격리를 하는것을 공지하였습니다.
              
            
            - 내용은 아래와 같습니다. -

              해외에서 입국하는 모든 내외국인 10일간 격리 (백신접종무관) 
              - 기간 : 2021년 12월 3일 00시 ~ 2021년 12월 16일 24시 
              - 사유 : 오미크론 변이 바이러스 유입 차단 
              - 예외 : 격리면제서 소지자 (백신 접종 여부와 관계없이 백신미접종자용 격리면제서 한정)
            `}
        </div>
      </main>
    </div>
  );
};

export default NewsView;
