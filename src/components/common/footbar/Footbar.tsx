export const Footbar = () => {
  return (
    <footer className="w-full mt-[30px] pt-[24px] pb-[150px] flex flex-col justify-center items-center gap-[24px]">
      {/* 상단 링크 */}
      <div className="flex flex-wrap justify-center items-center opacity-60">
        {[
          { label: "개인정보 처리방침", bold: true },
          "고객센터 1588-8282",
          "공지사항",
          "자주 묻는 질문",
          "커뮤니티 이용 수칙",
          "프로젝트 참여 시 유의사항",
          "라이텁(주)",
        ].map((item, idx) => (
          <div
            key={idx}
            className={`px-[16px] flex items-center gap-[10px] ${
              idx !== 6 ? "border-r border-[#79747E]/20" : ""
            }`}
          >
            <span
              className={`text-[#49454E] text-[14px] font-pretendard lowercase text-center ${
                typeof item === "string" || !item.bold
                  ? "font-medium"
                  : "font-bold"
              }`}
            >
              {typeof item === "string" ? item : item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 하단 텍스트 */}
      <div className="w-[646px] flex flex-col items-center gap-[8px] opacity-60">
        <p className="text-[#49454E] text-[12px] font-medium font-pretendard leading-[16px] text-center whitespace-nowrap">
          사업자 등록 번호 : 123-45-67891 &nbsp; 대표 : 박종인 &nbsp; 주소 :
          경기도 안산시 상록구 한양대학로 55 (한양대학교 ERICA캠퍼스)
        </p>
        <p className="text-[#49454E] text-[12px] font-medium font-pretendard leading-[16px] text-center whitespace-nowrap">
          라이텁에서 제공하는 종합 정보는 사용자의 창업 및 프로젝트 진행을 위한 단순 참고용일 뿐,
          투자 제안 및 권유를 위해 작성된 것이 아닙니다.
        </p>
      </div>
    </footer>
  );
};
