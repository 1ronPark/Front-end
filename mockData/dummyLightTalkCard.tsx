import type { TalkCardProps } from "../src/types/LightTalkProps";
import sampleImage from "../src/assets/icons/mypage/sample_profile.png";
import sampleImage2 from "../src/assets/icons/mypage/sample_image3.png";

export const dummyLightTalkCard: TalkCardProps[] = [
  {
    id: 1,
    name: "강혜준",
    profile_image: `${sampleImage}`,
    role: "디자이너",
    univ: "길동대학",
    createAt: new Date("2025-07-18T13:00:00"),
    content: `2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
    
        `,
    num_hearts: 32,
    num_comments: 32,
  },
  {
    id: 2,
    name: "user2",
    profile_image: `${sampleImage2}`,
    role: "디자이너",
    univ: "길동대학",
    createAt: new Date("2025-07-18T13:00:00"),
    content: `2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템
https://toss.tech/article/toss-bank-interns
    
        `,
    num_hearts: 32,
    num_comments: 32,
  },
  {
    id: 3,
    name: "user3",
    profile_image: `${sampleImage}`,
    role: "디자이너",
    univ: "피식대학",
    createAt: new Date("2025-07-18T13:00:00"),
    content: `
    나는 피식대학
    2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
        ![uploaded-image](${sampleImage})
        `,
    num_hearts: 32,
    num_comments: 32,
  },
  {
    id: 4,
    name: "user4",
    profile_image: `${sampleImage}`,
    role: "디자이너",
    univ: "고려대학",
    createAt: new Date("2025-07-18T13:00:00"),
    content: `
    나는 고대
    2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템
        `,
    num_hearts: 32,
    num_comments: 32,
  },
  {
    id: 5,
    name: "user5",
    profile_image: `${sampleImage}`,
    role: "디자이너",
    univ: "연세대학",
    createAt: new Date("2025-07-18T13:00:00"),
    content: `
    나는 연대
    2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템
        `,
    num_hearts: 32,
    num_comments: 32,
  },
  {
    id: 6,
    name: "user6",
    profile_image: `${sampleImage}`,
    role: "디자이너",
    univ: "피식대학",
    createAt: new Date("2025-07-18T13:00:00"),
    content: `
    나는 샤대
    2개월 걸리던 개발을 2주에 끝낸 스타트업 개발자 이야기
        MVP는 빨리 나왔는데, 다음 기능 추가가 왜 이렇게 느릴까요?
        저도 똑같았어요.
        버그 하나 고치면 둘이 생기고, 코드 통합에만 일주일.
        4주간 시스템을 바꿨더니: 
        - 개발 기간: 2개월 → 2주 
        - 버그: 주 20개 → 2개 
        - 매일 야근 → 6시 칼퇴
        비결? 읽기 좋은 코드 시스템
        `,
    num_hearts: 32,
    num_comments: 32,
  },
];
