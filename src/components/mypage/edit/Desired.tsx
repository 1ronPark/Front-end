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

  // 🔹 추가 버튼용 드래프트(선택만 저장, 추가 누르면 regions에 반영)
  const [draft, setDraft] = useState<{ siDo: string; siGunGu: string }>({
    siDo: "",
    siGunGu: "",
  });

  // 드롭다운 open 상태(행의 "실인덱스" 기준 키 사용; 드래프트는 -1)
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

  // rows = 완료된 지역 + (드래프트 1개; 단, 3개 미만일 때만)
  const rows: RowMeta[] =
    completedCount < 3
      ? [
          ...completedEntries,
          { siDo: draft.siDo, siGunGu: draft.siGunGu, _i: -1, _virtual: true },
        ]
      : completedEntries;

  // 🔹 추가 버튼: 드래프트를 regions에 반영(스토어만 갱신). API는 Save에서 동작.
  const handleAddLocation = () => {
    if (completedCount >= 3) return;
    if (!draft.siDo || !draft.siGunGu) return;

    // 중복 방지
    const isDup = regions.some(
      (r) => r.siDo === draft.siDo && r.siGunGu === draft.siGunGu
    );
    if (isDup) return;

    setRegions(
      [...regions, { siDo: draft.siDo, siGunGu: draft.siGunGu }].slice(0, 3)
    );
    setDraft({ siDo: "", siGunGu: "" }); // 드래프트 리셋
    setCityDropdownOpen((p) => ({ ...p, [-1]: false }));
    setDistrictDropdownOpen((p) => ({ ...p, [-1]: false }));
  };

  const handleRemoveLocation = (realIndex: number) => {
    if (realIndex < 0) {
      // 드래프트 삭제 동작 (원하면 지원)
      setDraft({ siDo: "", siGunGu: "" });
      return;
    }
    if (regions.length === 0) return;
    setRegions(regions.filter((_, i) => i !== realIndex));
  };

  // 🔹 선택 변경: 드래프트면 draft만 수정, 기존 행 수정은 즉시 스토어 반영(원하면 이것도 저장 버튼식으로 바꿀 수 있음)
  const handleLocationChange = (
    realIndex: number,
    field: "city" | "district",
    value: string
  ) => {
    if (realIndex === -1) {
      if (field === "city") {
        setDraft({ siDo: value, siGunGu: "" });
        setCityDropdownOpen((prev) => ({ ...prev, [-1]: false }));
      } else {
        setDraft((d) => ({ ...d, siGunGu: value }));
        setDistrictDropdownOpen((prev) => ({ ...prev, [-1]: false }));
      }
      return;
    }

    // 기존 완료 행 수정은 즉시 반영 (선택 사항)
    const base = [...regions];
    if (field === "city") {
      base[realIndex] = { siDo: value, siGunGu: "" };
      setCityDropdownOpen((prev) => ({ ...prev, [realIndex]: false }));
    } else {
      base[realIndex] = { ...base[realIndex], siGunGu: value };
      setDistrictDropdownOpen((prev) => ({ ...prev, [realIndex]: false }));
    }
    setRegions(base.slice(0, 3));
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
              const rowIndex = rows.length - 1 - reversedIndex;
              const isDraftRow = row._virtual === true; // 드래프트
              const realIndex = row._i;
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
                  {isDraftRow && completedCount < 3 ? (
                    <button
                      className="flex w-32 items-center justify-center gap-1 rounded-md bg-[#68548E] py-3 text-white transition-all hover:scale-105 hover:bg-[#59407e] disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleAddLocation}
                      disabled={!draft.siDo || !draft.siGunGu}
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
