import type { MemberFiltersParams } from '../types/MemberProps';

// 선택 안 한 값은 제거, MBTI는 undefined만 제거(=true/false는 의미가 있으니 유지)
export const buildMemberParams = (f?: MemberFiltersParams) => {
    if (!f) return undefined;

    const p: Record<string, string | number | boolean> = {};

    // 항상 보내고 싶은 값
    if (f.page !== undefined)  p.page = f.page;
    if (f.limit !== undefined) p.limit = f.limit;

    // positions/regions: 빈 문자열이나 '전체'만 있으면 제거
    if (f.positions) {
        const cleaned = f.positions
        .split(',')
        .map(s => s.trim())
        .filter(s => s && s !== '전체');
        if (cleaned.length) p.positions = cleaned.join(','); // 서버가 콤마 분리 지원 시
    }

    if (f.regions) {
        const cleaned = f.regions
        .split(',')
        .map(s => s.trim())
        .filter(s => s && s !== '전체');
        if (cleaned.length) p.regions = cleaned.join(',');
    }

    // MBTI 축: true/false는 의미 있음, undefined만 제거
    if (f.mbtiE !== undefined) p.mbtiE = f.mbtiE; // true=E, false=I
    if (f.mbtiN !== undefined) p.mbtiN = f.mbtiN; // true=N, false=S
    if (f.mbtiF !== undefined) p.mbtiF = f.mbtiF; // true=F, false=T
    if (f.mbtiP !== undefined) p.mbtiP = f.mbtiP; // true=P, false=J

    // 좋아요: true일 때만 필터로 전송 (false=필터X)
    if (f.onlyLiked) p.onlyLiked = true;

    // page/limit 외에 진짜 필터가 하나도 없는지 체크
    const keys = Object.keys(p).filter(k => k !== 'page' && k !== 'limit');
    if (keys.length === 0) {
        // 오직 page/limit만 존재 → 그대로 리턴 (= 전체조회 + 페이지네이션)
        return p;
    }
    return p;
};