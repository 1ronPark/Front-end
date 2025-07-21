const RecruitPart = () => {
  return (
    <div>
      <p className="title-large-emphasis mb-4">현재 모집 중인 파트</p>
      <div className="flex flex-col items-start bg-white rounded-lg border border-[rgba(121,116,126,0.08)] py-6 px-12 w-full">
        {/* 모집 파트 제목 */}
        <div className=" flex items-start justify-center mt-6">
          <div className="flex items-center">
            <span className="headline-medium-emphasis text-[#1C1B21]">
              디자인
            </span>
            <span className="ml-4 title-medium-emphasis text-[#6C63FF]">
              3명&nbsp;
            </span>
            <span className="title-medium-emphasis text-[#1C1B21]">
              모집 중
            </span>
          </div>
        </div>
        {/* 모집 파트 설명 */}
        <div className="flex flex-col items-start justify-center py-6 gap-4">
          <div className="title-large text-black">
            합류하면 함께 할 작업이예요
          </div>
          <span className="ml-6 body-large text-[#47464F]">
            라잇업 서비스의 UX, 인터랙션 설계 및 UI 디자인
            <br />
            PO, 엔지니어 등과 협업하여 신규 기능 기획 및 화면 설계 참여
            <br />
            사용자 피드백, 인터뷰, 리서치 결과를 기반으로 문제 정의 및 개선안
            도출
            <br />
            제품 사용성 개선을 위한 반복 테스트 및 A/B 실험 설계
            <br />
            디자인 시스템 관리 및 일관성 있는 UI 적용
            <br />
            복잡한 디지털 트윈 기반 인터페이스를 직관적이고 단순하게 표현하는 UX
            설계
          </span>
        </div>
        <div className="flex flex-col items-start justify-center py-6 gap-4">
          <div className="title-large text-black">
            이런 분과 함께하고 싶어요
          </div>
          <span className="ml-6 body-large text-[#47464F]">
            웹 또는 모바일 기반 디지털 제품 디자인 실무 경험 3년 이상
            <br />
            기획자, 개발자와 협업하며 디자인을 실제 제품에 반영해 본 경험
            <br />
            사용자 경험 중심의 사고방식, 문제 정의와 개선안 도출 역량
            <br />
            Figma 등 디자인 툴을 능숙하게 다루고, 디자인 시스템에 대한 이해
            <br />
            다양한 직군과 원활한 커뮤니케이션이 가능한 분<br />
            스스로 업무를 정의하고 끝까지 책임질 수 있는 오너십
          </span>
        </div>
        <div className="flex flex-col items-start justify-center py-6 gap-4">
          <div className="title-large text-black">
            아래 MBTI와 궁합이 좋아요
          </div>
          <span className="ml-6 body-large text-[#47464F]">ISFJ, ENTJ</span>
        </div>

              {/*구분선*/}
      <hr className="border-t w-full border-[rgba(121,116,126,0.16)]" />

        {/* 모집 파트 제목 */}
        <div className=" flex items-start justify-center mt-6">
          <div className="flex items-center">
            <span className="headline-medium-emphasis text-[#1C1B21]">
              디자인
            </span>
            <span className="ml-4 title-medium-emphasis text-[#6C63FF]">
              3명&nbsp;
            </span>
            <span className="title-medium-emphasis text-[#1C1B21]">
              모집 중
            </span>
          </div>
        </div>
        {/* 모집 파트 설명 */}
        <div className="flex flex-col items-start justify-center py-6 gap-4">
          <div className="title-large text-black">
            합류하면 함께 할 작업이예요
          </div>
          <span className="ml-6 body-large text-[#47464F]">
            라잇업 서비스의 UX, 인터랙션 설계 및 UI 디자인
            <br />
            PO, 엔지니어 등과 협업하여 신규 기능 기획 및 화면 설계 참여
            <br />
            사용자 피드백, 인터뷰, 리서치 결과를 기반으로 문제 정의 및 개선안
            도출
            <br />
            제품 사용성 개선을 위한 반복 테스트 및 A/B 실험 설계
            <br />
            디자인 시스템 관리 및 일관성 있는 UI 적용
            <br />
            복잡한 디지털 트윈 기반 인터페이스를 직관적이고 단순하게 표현하는 UX
            설계
          </span>
        </div>
        <div className="flex flex-col items-start justify-center py-6 gap-4">
          <div className="title-large text-black">
            이런 분과 함께하고 싶어요
          </div>
          <span className="ml-6 body-large text-[#47464F]">
            웹 또는 모바일 기반 디지털 제품 디자인 실무 경험 3년 이상
            <br />
            기획자, 개발자와 협업하며 디자인을 실제 제품에 반영해 본 경험
            <br />
            사용자 경험 중심의 사고방식, 문제 정의와 개선안 도출 역량
            <br />
            Figma 등 디자인 툴을 능숙하게 다루고, 디자인 시스템에 대한 이해
            <br />
            다양한 직군과 원활한 커뮤니케이션이 가능한 분<br />
            스스로 업무를 정의하고 끝까지 책임질 수 있는 오너십
          </span>
        </div>
        <div className="flex flex-col items-start justify-center py-6 gap-4">
          <div className="title-large text-black">
            아래 MBTI와 궁합이 좋아요
          </div>
          <span className="ml-6 body-large text-[#47464F]">ISFJ, ENTJ</span>
        </div>
      
      </div>



      
    </div>
  );
};

export default RecruitPart;
