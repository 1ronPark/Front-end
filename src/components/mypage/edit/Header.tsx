import { FilePenLine, Camera } from 'lucide-react';

const Header = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">프로필 수정</h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow shawdow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너</h2>
          <button className="flex items-center text-sm gap-1 text-gray-500 hover:underline">
            <FilePenLine size={15} />
            <span>수정하기</span>
          </button>
        </div>
        <hr className="my-4 border-[#EAE9EA]" />
        <div className="flex items-start gap-8">
          <div className="relative h-40 w-40 rounded-full bg-gray-200 flex items-center justify-center">
            {/* 프로필 이미지 영역 */}
            <button className="absolute bottom-2 right-2 rounded-full bg-[#E9DEF8] p-2 text-black">
              <Camera size={20} />
            </button>
          </div>
          <div className="flex-1 mt-3 space-y-8">
            <div className="flex items-center gap-4 ">
              <span className="text-xl">강혜준</span>
              <span className="text-gray-600">23세</span>
              <span className="text-gray-600">남</span>
              <span className="text-gray-600">ISFJ</span>
            </div>
            <div className="space-y-6 text-sm text-gray-800">
              <div className="flex gap-6">
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">대학교</p>
                  <p>가천대학교 글로벌 캠퍼스</p>
                </div>
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">이메일</p>
                  <p>harrysjun@gachon.ac.kr</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">블로그</p>
                  <p>깃허브 링크 임베드,<br/>블로그 링크 임베드 최대 2개</p>
                </div>
                <div className="flex gap-8 flex-[2]">
                  <p className="text-gray-500 shrink-0">휴대폰</p>
                  <p>010 - 4076 - 6631</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
