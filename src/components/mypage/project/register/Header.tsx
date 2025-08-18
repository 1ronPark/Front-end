import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import CloseIcon from "../../../../assets/icons/ic_close.svg";
import addPhotoIcon from "../../../../assets/icons/mypage/ic_camera.svg";
import TopicDropdown from "../../../common/dropdowns/strength/TopicDropdown";
import PlatformIcon from "../../../../assets/icons/ic_platform.svg";
import LifeIcon from "../../../../assets/icons/ic_life.svg";
import FinenceIcon from "../../../../assets/icons/ic_finence.svg";
import CommunityIcon from "../../../../assets/icons/ic_community.svg";
import MediaIcon from "../../../../assets/icons/ic_media.svg";
import EduIcon from "../../../../assets/icons/ic_edu.svg";
import WorkflowIcon from "../../../../assets/icons/ic_workflow.svg";
import BlockchainIcon from "../../../../assets/icons/ic_blockchain.svg";
import NocodeIcon from "../../../../assets/icons/ic_nocode.svg";
import AiIcon from "../../../../assets/icons/ic_ai.svg";
import AnalyticsIcon from "../../../../assets/icons/ic_analytics.svg";
import DesignIcon from "../../../../assets/icons/ic_design.svg";
import MarketingIcon from "../../../../assets/icons/ic_marketing.svg";
import GameIcon from "../../../../assets/icons/ic_game.svg";
import ShoppingIcon from "../../../../assets/icons/ic_shopping.svg";
import HealthIcon from "../../../../assets/icons/ic_health.svg";
import BioIcon from "../../../../assets/icons/ic_bio.svg";
import MetabusIcon from "../../../../assets/icons/ic_metabus.svg";
import SalesIcon from "../../../../assets/icons/ic_sales.svg";
import SecurityIcon from "../../../../assets/icons/ic_security.svg";
import EsgIcon from "../../../../assets/icons/ic_esg.svg";
import RobotIcon from "../../../../assets/icons/ic_robot.svg";


const categories = [
  { name: "플랫폼", icon: PlatformIcon },
  { name: "라이프스타일", icon: LifeIcon },
  { name: "금융", icon: FinenceIcon },
  { name: "커뮤니티", icon: CommunityIcon },
  { name: "미디어", icon: MediaIcon },
  { name: "교육", icon: EduIcon },
  { name: "생산성", icon: WorkflowIcon },
  { name: "블록체인", icon: BlockchainIcon },
  { name: "노코드", icon: NocodeIcon },
  { name: "인공지능", icon: AiIcon },
  { name: "데이터 분석", icon: AnalyticsIcon },
  { name: "디자인", icon: DesignIcon },
  { name: "마케팅", icon: MarketingIcon },
  { name: "게임", icon: GameIcon },
  { name: "이커머스", icon: ShoppingIcon },
  { name: "헬스케어", icon: HealthIcon },
  { name: "바이오", icon: BioIcon },
  { name: "메타버스", icon: MetabusIcon },
  { name: "세일즈", icon: SalesIcon },
  { name: "보안", icon: SecurityIcon },
  { name: "ESG", icon: EsgIcon },
  { name: "로보틱스", icon: RobotIcon },
];

interface HeaderProps {
  name: string;
  introduce: string;
  itemProfileImage: File | null;
  itemCategories: { itemCategory: string }[];
  onChange: (field: string, value: string | File | { itemCategory: string }[] ) => void;
}

const Header = ({ name, introduce, itemProfileImage, itemCategories, onChange }: HeaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(() =>
    itemProfileImage ? URL.createObjectURL(itemProfileImage) : null,
  );

  // itemProfileImage가 바뀔 때마다 미리보기 URL 재생성
  useEffect(() => {
    if (itemProfileImage) {
      setPreviewUrl(URL.createObjectURL(itemProfileImage));
    }
  }, [itemProfileImage]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange('itemProfileImage', file); // store에 저장
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기 즉시 반영
    }
  };

  const handleAddCategory = (categoryName: string) => {
    if (
      itemCategories.length < 3 &&
      !itemCategories.some((c) => c.itemCategory === categoryName)
    ) {
      onChange('itemCategories', [
        ...itemCategories,
        { itemCategory: categoryName },
      ]);
    }
  };

  const handleRemoveCategory = (nameToRemove: string) => {
    onChange(
      'itemCategories',
      itemCategories.filter((c) => c.itemCategory !== nameToRemove),
    );
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-2xl font-semibold">기본 정보</h2>
        <hr className="my-4 border-[#EAE9EA]" />
      </div>

      {/* 썸네일 이미지 */}
      <div className="flex gap-5">
        <div className="relative h-[104px] w-[104px] rounded-lg border-1 border-gray-300 bg-gray-50">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="썸네일"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full cursor-pointer items-center justify-center text-sm text-gray-400"
              onClick={handleUploadClick}
            >
              이미지 추가
            </div>
          )}
          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-[40px] w-[40px] translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[#E9DEF8] hover:bg-[#D8CEF0]"
            onClick={handleUploadClick}
          >
            <img src={addPhotoIcon} alt="사진 추가 아이콘" />
          </button>
        </div>
        <div className="flex flex-col flex-1 py-2 ml-3">
          <div className="flex items-center">
            <p className="text-sm font-semibold">썸네일 이미지</p>
            <p className="text-lg font-semibold text-orange-500">*</p>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            추천 사이즈 : 240 x 240
            <br />
            JPG PNG GIF 최대 10MB
          </p>
        </div>
      </div>

      {/* 프로젝트 정보 */}
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm font-semibold">프로젝트 명</p>
              <p className="text-lg font-semibold text-orange-500">*</p>
            </div>
          </div>
          <textarea
            className="w-full rounded-lg text-sm border border-gray-300 p-2 text-gray-700 focus:border-primary-500 focus:outline-none"
            rows={1}
            placeholder="프로젝트 명을 입력해주세요."
            value={name}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onChange('name', e.target.value)
            }
          ></textarea>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm font-semibold">한줄 소개</p>
              <p className="text-lg font-semibold text-orange-500">*</p>
            </div>
          </div>
          <textarea
            className="w-full rounded-lg text-sm border border-gray-300 p-2 text-gray-700 focus:border-primary-500 focus:outline-none"
            rows={1}
            placeholder="프로젝트에 대한 간단한 설명을 해주세요."
            value={introduce}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onChange('introduce', e.target.value)
            }
          ></textarea>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm font-semibold">대표 주제</p>
              <p className="text-lg font-semibold text-orange-500">*</p>
            </div>
            <span className="text-xs text-gray-500">{itemCategories.length} / 3</span>
          </div>
          <TopicDropdown onSelect={handleAddCategory} />
          <div className="flex flex-wrap gap-3">
            {itemCategories.map(({ itemCategory }) => {
              const category = categories.find((c) => c.name === itemCategory);
              return (
                <div
                  key={itemCategory}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 mt-2"
                >
                  {category && (
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-4 w-4"
                    />
                  )}
                  <span className="text-sm font-semimedium text-gray-700">
                    {itemCategory}
                  </span>
                  <button onClick={() => handleRemoveCategory(itemCategory)}>
                    <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
