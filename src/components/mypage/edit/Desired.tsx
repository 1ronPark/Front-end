import { useEffect, useState } from "react";
import { CheckSquare, Square, Plus, Minus } from "lucide-react";
import { locationData } from "../../../data/locationData";
import SplitButton from "../../common/buttons/SplitButton";
import CustomDropdown from "../../common/dropdowns/CustomDropdown";
import { useGetPositions } from "../../../hooks/usePositions";
import { useGetProfile } from "../../../hooks/useProfile";
import { useProfileStore } from "../../../store/useProfileStore";

type RowMeta = {
  siDo: string;
  siGunGu: string;
  _i: number;
  _virtual?: boolean;
};

const Desired = () => {
  const { data: allPositions } = useGetPositions();
  const { data: profile } = useGetProfile();

  // 포지션 (단일 선택)
  const positions = useProfileStore((s) => s.positions);
  const setPositions = useProfileStore((s) => s.setPositions);
  const setInitialPositions = useProfileStore((s) => s.setInitialPositions);
  const togglePosition = useProfileStore((s) => s.togglePosition);

  // 지역 (스토어)
  const regions = useProfileStore((s) => s.regions); // [{id?, siDo, siGunGu}]
  const setInitialRegions = useProfileStore((s) => s.setInitialRegions);
  const setRegions = useProfileStore((s) => s.setRegions);

  // 드롭다운 open 상태(행의 "실인덱스" 기준 키 사용)
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
    const mapped = server.map((r) => ({
      id: r.id,
      siDo: r.siDo,
      siGunGu: r.siGunGu,
    }));
    setInitialRegions(mapped);
    setRegions(mapped);
  }, [profile, setInitialRegions, setRegions]);

  const allCities = Object.keys(locationData);

  // 완료된 지역만 카운트
  const completedEntries: RowMeta[] = regions
    .map((r, i) => ({ siDo: r.siDo, siGunGu: r.siGunGu, _i: i }))
    .filter((r) => r.siDo && r.siGunGu);

  const completedCount = completedEntries.length;

  // regions 안의 "미완성" 항목 1개(있다면)
  const firstIncomplete: RowMeta | undefined = regions
    .map((r, i) => ({ siDo: r.siDo, siGunGu: r.siGunGu, _i: i }))
    .find((r) => !r.siDo || !r.siGunGu);

  // rows = 완료된 지역 + (미완성 1개 or 가상빈행 1개; 단, 3개 미만일 때만)
  const rows: RowMeta[] =
    completedCount < 3
      ? [
          ...completedEntries,
          firstIncomplete ?? {
            siDo: "",
            siGunGu: "",
            _i: regions.length,
            _virtual: true,
          },
        ]
      : completedEntries;

  const handleAddLocation = () => {
    // 3개 이상이면 추가 X, 이미 미완성 행이 있으면 또 추가 X
    if (completedCount >= 3) return;
    if (regions.some((r) => !r.siDo || !r.siGunGu)) return;
    setRegions([...regions, { siDo: "", siGunGu: "" }]);
  };

  const handleRemoveLocation = (realIndex: number) => {
    // 실제 인덱스 기준 삭제
    if (regions.length === 0) return;
    setRegions(regions.filter((_, i) => i !== realIndex));
  };

  const handleLocationChange = (
    realIndex: number,
    field: "city" | "district",
    value: string
  ) => {
    // 빈 배열(가상행) 상태에서 선택되면 실데이터 생성
    const base =
      regions.length > 0 ? [...regions] : [{ siDo: "", siGunGu: "" }];
    while (base.length <= realIndex) base.push({ siDo: "", siGunGu: "" });

    if (field === "city") {
      base[realIndex] = { siDo: value, siGunGu: "" }; // 시/도 변경 시 군구 초기화
      setCityDropdownOpen((prev) => ({ ...prev, [realIndex]: false }));
    } else {
      base[realIndex] = { ...base[realIndex], siGunGu: value };
      setDistrictDropdownOpen((prev) => ({ ...prev, [realIndex]: false }));
    }
    setRegions(base.slice(0, 3)); // 최대 3개
  };

  const toggleCityDropdown = (realIndex: number) => {
    setCityDropdownOpen((prev) => ({ ...prev, [realIndex]: !prev[realIndex] }));
    setDistrictDropdownOpen((prev) => ({ ...prev, [realIndex]: false }));
  };

  const toggleDistrictDropdown = (realIndex: number) => {
    setDistrictDropdownOpen((prev) => ({
      ...prev,
      [realIndex]: !prev[realIndex],
    }));
    setCityDropdownOpen((prev) => ({ ...prev, [realIndex]: false }));
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
            지역선택 {Math.max(1, completedCount)} / 3
          </p>

          {rows
            .slice()
            .reverse()
            .map((row, reversedIndex) => {
              const rowIndex = rows.length - 1 - reversedIndex; // rows 기준 인덱스
              const isLast = rowIndex === rows.length - 1; // 마지막 행(=추가 행)
              const realIndex = rows[rowIndex]._i; // 실제 regions 인덱스
              const selectedCity = row.siDo;
              const districtOptions = selectedCity
                ? locationData[selectedCity] || []
                : [];

              return (
                <div
                  key={`${realIndex}-${rowIndex}`}
                  className="flex items-center gap-4"
                >
                  {/* 시/도 */}
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={row.siDo || "시/도"}
                      onClickLeading={() => toggleCityDropdown(realIndex)}
                      onClickTrailing={() => toggleCityDropdown(realIndex)}
                    />
                    <CustomDropdown
                      options={allCities}
                      onSelect={(value) =>
                        handleLocationChange(realIndex, "city", value)
                      }
                      isOpen={cityDropdownOpen[realIndex] || false}
                      setIsOpen={(isOpen) =>
                        setCityDropdownOpen((prev) => ({
                          ...prev,
                          [realIndex]: isOpen,
                        }))
                      }
                      selectedValue={row.siDo}
                    />
                  </div>

                  {/* 시/군/구 */}
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={row.siGunGu || "시/군/구"}
                      onClickLeading={() => toggleDistrictDropdown(realIndex)}
                      onClickTrailing={() => toggleDistrictDropdown(realIndex)}
                      disabled={!row.siDo}
                    />
                    <CustomDropdown
                      options={districtOptions}
                      onSelect={(value) =>
                        handleLocationChange(realIndex, "district", value)
                      }
                      isOpen={districtDropdownOpen[realIndex] || false}
                      setIsOpen={(isOpen) =>
                        setDistrictDropdownOpen((prev) => ({
                          ...prev,
                          [realIndex]: isOpen,
                        }))
                      }
                      selectedValue={row.siGunGu}
                      searchable
                    />
                  </div>

                  {/* 추가/삭제 버튼 */}
                  {isLast && completedCount < 3 ? (
                    <button
                      className="flex w-32 items-center justify-center gap-1 rounded-md bg-[#68548E] py-3 text-white transition-all hover:scale-105 hover:bg-[#59407e]"
                      onClick={handleAddLocation}
                    >
                      <Plus size={16} />
                      <span>추가</span>
                    </button>
                  ) : (
                    rows.length > 0 && (
                      <button
                        className="flex w-32 items-center justify-center gap-1 rounded-md border border-gray-300 bg-white py-3 text-gray-500 transition-all hover:scale-105 hover:bg-gray-100"
                        onClick={() => handleRemoveLocation(realIndex)}
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
