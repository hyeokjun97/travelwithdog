import React, { useEffect, useState } from "react";

//Article 댓글구현
// article[]{
//     ...
//     comments <<- 클래스
//     ...
// }
// example of comment

// comment[number].[
//     user_id: value
//     time: time(date)
//     text: value
// ]
//시간순으로 정렬이 되어있습니다.
const sampleComments = 
[
    {
        "user_id": "asthea",
        "name": "김철수",
        "time": "2021-12-03 12:42",
        "text": "멋진 장소입니다!",
    },
    {
        "user_id": "star87",
        "name": "박미숙",
        "time": "2021-12-05 12:42",
        "text": "저도 다음에 꼭 가보고 싶어요!",
    },
];
export default sampleComments;
