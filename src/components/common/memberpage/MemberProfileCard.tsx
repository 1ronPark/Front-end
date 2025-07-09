const MemberProfileCard = () => (
    
  <section className="bg-white rounded-xl shadow border border-[#E2D6EE] px-4 py-8 w-full">
    {/* 상단: 마지막 업데이트, 제안 상태 */}
    <span className="text-xs text-gray-500">마지막 업데이트 : 2025-07-01, 23:00:20</span>
    <div className="flex justify-between items-center mb-4.5">
        {/* 제목 */}
        <h2 className="headline-medium-emphasis">
        기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너
        </h2>
        <span className="label-large text-[#68548E]">제안 받는 중</span>
    </div>
    
    {/* 구분선 */}
    <hr className="border-t px-4 border-gray-200 mb-6" />

    {/* 본문: 3단 그리드 */}
    <div className="grid grid-cols-3 gap-16 min-w-0">

      {/* 왼쪽: 로그인 안내 */}
      <div className="flex items-center justify-center bg-[#F2ECF4] rounded-lg min-h-[240px] text-center title-small text-[#000000]">
        로그인 후<br />프로젝트 등록 시<br />열람 가능
      </div>

      {/* 가운데: 프로필 정보 */}
      <div className="flex flex-col justify-center gap-1 text-sm">
        <div className="flex gap-2 items-center mb-2">
          <span className="title-medium mr-6">UXUI Designer</span>
          <span className="font-bold text-lg">강**</span>
          <span>23세</span>
          <span>남</span>
          <span>ISFJ</span>
        </div>
        <div className="flex">
          <div className="w-20 text-gray-500">위치</div>
          <div>가천대학교 글로벌 캠퍼스, 서울 강남구, 성남 전체</div>
        </div>
        <div className="flex">
          <div className="w-20 text-gray-500">파트</div>
          <div>UXUI Design</div>
        </div>
        <div className="flex">
          <div className="w-20 text-gray-500">사용 가능 툴</div>
          <div>Figma, Adobe XD, Notion</div>
        </div>
        <div className="flex">
          <div className="w-20 text-gray-500">블로그</div>
          <div>깃허브 링크 임베드, 블로그 링크 임베드 최대 2개</div>
        </div>
      </div>
      {/* 오른쪽: 연락처 안내 */}
      <div className="flex items-center justify-center bg-[#FDF6FB] rounded-lg min-h-[160px] text-center text-gray-500 text-sm px-2">
        <div>
          <div className="mb-2">Email / 휴대폰</div>
          <div>제안 수락 시,<br />연락처가 공개됩니다.</div>
        </div>
      </div>
    </div>
    {/* 하단 버튼 */}
    <div className="flex gap-4 justify-center">
      <button className="flex items-center gap-2 px-8 py-2 rounded-full border border-[#BFA5E6] text-[#7C5CBF] bg-white font-medium text-base">
        <span>➤</span> 제안 보내기
      </button>
      <button className="flex items-center gap-2 px-8 py-2 rounded-full bg-[#7C5CBF] text-white font-medium text-base">
        <span>♡</span> 관심 목록 추가
      </button>
    </div>
  </section>
);

export default MemberProfileCard;