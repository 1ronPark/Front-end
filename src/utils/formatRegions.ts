// regions 형태 가져다 쓸 때 사용
export const formatRegions = (
  regions?: { siDo: string; siGunGu: string }[] // 실제 타입에 맞춰 변경
) => {
    if (!regions || regions.length === 0) return '위치 정보 없음';
    return regions
        .map(r => (r.siGunGu === '전체' ? r.siDo : `${r.siDo} ${r.siGunGu}`))
        .join(', ');
};