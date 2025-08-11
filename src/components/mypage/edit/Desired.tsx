import { useEffect, useState } from "react";
import { CheckSquare, Square, Plus, Minus } from "lucide-react";
import { locationData } from "../../../data/locationData";
import SplitButton from "../../common/buttons/SplitButton";
import CustomDropdown from "../../common/dropdowns/CustomDropdown";
import { useGetPositions } from "../../../hooks/usePositions";
import { useGetProfile } from "../../../hooks/useProfile";
import { useProfileStore } from "../../../store/useProfileStore";

const Desired = () => {
  const { data: allPositions } = useGetPositions(); // 포지션 옵션
  const { data: profile } = useGetProfile(); // 프로필(positions, regions 포함)

  // 포지션 (단일 선택)
  const positions = useProfileStore((s) => s.positions);
  const setPositions = useProfileStore((s) => s.setPositions);
  const setInitialPositions = useProfileStore((s) => s.setInitialPositions);
  const togglePosition = useProfileStore((s) => s.togglePosition);

  // 지역 (스토어만 사용)
  const regions = useProfileStore((s) => s.regions); // [{id?, siDo, siGunGu}]
  const setInitialRegions = useProfileStore((s) => s.setInitialRegions);
  const setRegions = useProfileStore((s) => s.setRegions);

  // 드롭다운 open 상태
  const [cityDropdownOpen, setCityDropdownOpen] = useState<
    Record<number, boolean>
  >({});
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState<
    Record<number, boolean>
  >({});

  // 최초 포지션 동기화
  useEffect(() => {
    const serverPositions = profile?.result?.positions ?? [];
    setInitialPositions(serverPositions);
    setPositions(serverPositions);
  }, [profile, setInitialPositions, setPositions]);

  // 최초 지역 동기화 (id 포함)
  useEffect(() => {
    const server = profile?.result?.regions ?? []; // [{id, siDo, siGunGu}]
    setInitialRegions(
      server.map((r) => ({ id: r.id, siDo: r.siDo, siGunGu: r.siGunGu }))
    );
    setRegions(
      server.map((r) => ({ id: r.id, siDo: r.siDo, siGunGu: r.siGunGu }))
    );
  }, [profile, setInitialRegions, setRegions]);

  // 렌더용 행: regions가 비어있으면 1행을 가상으로 보여줌
  const rows = regions.length > 0 ? regions : [{ siDo: "", siGunGu: "" }];

  const allCities = Object.keys(locationData);

  const handleAddLocation = () => {
    if (regions.length >= 3) return;
    setRegions([...regions, { siDo: "", siGunGu: "" }]);
  };

  const handleRemoveLocation = (index: number) => {
    if (regions.length === 0) return; // 가상행일 땐 삭제 없음
    setRegions(regions.filter((_, i) => i !== index));
  };

  const handleLocationChange = (
    index: number,
    field: "city" | "district",
    value: string
  ) => {
    // 빈 배열(가상행) 상태에서 선택되면 실데이터 생성
    const base =
      regions.length > 0 ? [...regions] : [{ siDo: "", siGunGu: "" }];
    while (base.length <= index) base.push({ siDo: "", siGunGu: "" });

    if (field === "city") {
      base[index] = { siDo: value, siGunGu: "" }; // 시/도 변경 시 군구 초기화
      setCityDropdownOpen((prev) => ({ ...prev, [index]: false }));
    } else {
      base[index] = { ...base[index], siGunGu: value };
      setDistrictDropdownOpen((prev) => ({ ...prev, [index]: false }));
    }
    setRegions(base.slice(0, 3)); // 즉시 스토어 동기화
  };

  const toggleCityDropdown = (index: number) => {
    setCityDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    setDistrictDropdownOpen((prev) => ({ ...prev, [index]: false }));
  };

  const toggleDistrictDropdown = (index: number) => {
    setDistrictDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    setCityDropdownOpen((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">희망 조건</h2>
        <hr className="my-4 border-[#EAE9EA]" />
      </div>

      {/* 지역 */}
      <div className="grid grid-cols-[240px_auto] gap-8">
        <div>
          <h3 className="text-lg font-semibold">지역</h3>
          <p className="text-sm text-gray-500">
            선호 하는 지역을 선택해 주세요
          </p>
        </div>
        <div className="space-y-4 min-w-[550px]">
          <p className="text-sm font-semibold text-gray-600">
            지역선택 {regions.length > 0 ? regions.length : 1} / 3
          </p>

          {rows
            .slice()
            .reverse()
            .map((row, reversedIndex) => {
              const index = rows.length - 1 - reversedIndex; // 실제 index
              const selectedCity = row.siDo;
              const districtOptions = selectedCity
                ? locationData[selectedCity] || []
                : [];

              return (
                <div key={index} className="flex items-center gap-4">
                  {/* 시/도 */}
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={row.siDo || "시/도"}
                      onClickLeading={() => toggleCityDropdown(index)}
                      onClickTrailing={() => toggleCityDropdown(index)}
                    />
                    <CustomDropdown
                      options={allCities}
                      onSelect={(value) =>
                        handleLocationChange(index, "city", value)
                      }
                      isOpen={cityDropdownOpen[index] || false}
                      setIsOpen={(isOpen) =>
                        setCityDropdownOpen((prev) => ({
                          ...prev,
                          [index]: isOpen,
                        }))
                      }
                      selectedValue={row.siDo}
                    />
                  </div>

                  {/* 시/군/구 */}
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={row.siGunGu || "시/군/구"}
                      onClickLeading={() => toggleDistrictDropdown(index)}
                      onClickTrailing={() => toggleDistrictDropdown(index)}
                      disabled={!row.siDo}
                    />
                    <CustomDropdown
                      options={districtOptions}
                      onSelect={(value) =>
                        handleLocationChange(index, "district", value)
                      }
                      isOpen={districtDropdownOpen[index] || false}
                      setIsOpen={(isOpen) =>
                        setDistrictDropdownOpen((prev) => ({
                          ...prev,
                          [index]: isOpen,
                        }))
                      }
                      selectedValue={row.siGunGu}
                      searchable
                    />
                  </div>

                  {/* 추가/삭제 버튼 */}
                  {index === rows.length - 1 && regions.length < 3 ? (
                    <button
                      className="flex w-32 cursor-pointer items-center justify-center gap-1 rounded-md bg-[#68548E] py-3 text-white transition-all hover:scale-105 hover:bg-[#59407e]"
                      onClick={handleAddLocation}
                    >
                      <Plus size={16} />
                      <span>추가</span>
                    </button>
                  ) : (
                    rows.length > 1 && (
                      <button
                        className="flex w-32 cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-300 bg-white py-3 text-gray-500 transition-all hover:scale-105 hover:bg-gray-100"
                        onClick={() => handleRemoveLocation(index)}
                        disabled={regions.length === 0} // 가상행일 땐 삭제 불가
                      >
                        <Minus size={16} />
                        <span>삭제</span>
                      </button>
                    )
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <hr className="my-4 border-[#EAE9EA]" />

      {/* 포지션 */}
      <div className="grid grid-cols-[210px_1fr] gap-8">
        <div>
          <h3 className="text-lg font-semibold">파트</h3>
          <p className="text-sm text-gray-500">맡을 파트를 선택해 주세요</p>
        </div>
        <div className="grid grid-cols-5 gap-8 text-sm">
          {allPositions?.result.positions.map((pos) => (
            <div key={pos} className="flex items-center gap-2">
              <button
                onClick={() => togglePosition(pos)}
                className="flex cursor-pointer items-center gap-2 text-gray-500 transition-all hover:scale-105"
              >
                {positions.includes(pos) ? <CheckSquare /> : <Square />}
                <span className="whitespace-nowrap">{pos}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Desired;
