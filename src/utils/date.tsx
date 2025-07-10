{/* 날짜를 상대적인 형식으로 표시하는 유틸리티 함수 */}
export const getRelativeDate = (dateString: string): string => {
  const now = new Date();
  const givenDate = new Date(dateString);

  const diffTime = now.getTime() - givenDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "오늘";
  if (diffDays === 1) return "1일전";
  if (diffDays < 7) return `${diffDays}일전`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1주전";
  if (diffWeeks < 5) return `${diffWeeks}주전`;

  const diffMonths =
    now.getMonth() -
    givenDate.getMonth() +
    12 * (now.getFullYear() - givenDate.getFullYear());

  if (diffMonths === 1) return "1달전";
  if (diffMonths < 12) return `${diffMonths}달전`;

  const diffYears = now.getFullYear() - givenDate.getFullYear();
  if (diffYears === 1) return "1년전";
  return `${diffYears}년전`;
};
