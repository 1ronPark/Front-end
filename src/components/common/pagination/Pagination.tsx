import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
  page: number;                          // 1-based
  onPageChange: (page: number) => void;
  hasPrev?: boolean;                     // totalPages 없을 때 사용 (기본: page>1)
  hasNext?: boolean;                     // totalPages 없을 때 사용
  totalPages?: number;                   // 있으면 숫자 버튼 렌더
  className?: string;
};

export default function Pagination({
  page,
  onPageChange,
  hasPrev,
  hasNext,
  totalPages,
  className = "",
}: PaginationProps) {
  const canPrev = totalPages ? page > 1 : (hasPrev ?? page > 1);
  const canNext = totalPages ? page < (totalPages ?? 1) : (hasNext ?? true);

  const go = (p: number) => {
    if (p === page) return;
    if (totalPages) {
      if (p < 1 || p > totalPages) return;
    } else if (p < 1) return;
    onPageChange(p);
  };

  // 숫자 버튼 생성 (현재 페이지 기준 윈도우)
  const pages = totalPages ? getPages(page, totalPages) : [];

  return (
    <nav
      aria-label="Pagination"
      className={`mt-8 flex justify-center ${className}`}
    >
      <ul className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur px-2 py-2 shadow-sm border border-gray-200">
        {/* Prev */}
        <li>
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={!canPrev}
            className="inline-flex items-center gap-1 px-3 h-9 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">이전</span>
          </button>
        </li>

        {/* Numbers (totalPages 있을 때만) */}
        {totalPages &&
          pages.map((p, i) =>
            p === "..." ? (
              <li key={`dots-${i}`} className="px-2 text-gray-400">
                <MoreHorizontal className="w-4 h-4" aria-hidden />
              </li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => go(p)}
                  className={`w-9 h-9 rounded-lg border text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                    ${
                      p === page
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {p}
                </button>
              </li>
            )
          )}

        {/* Page indicator (totalPages 없을 때만) */}
        {!totalPages && (
          <li className="mx-2 hidden sm:block text-sm text-gray-600">
            페이지 <span className="font-semibold">{page}</span>
          </li>
        )}

        {/* Next */}
        <li>
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-1 px-3 h-9 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
          >
            <span className="hidden sm:inline">다음</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

// 숫자 버튼 생성 로직 (1 … window … last)
function getPages(current: number, total: number): (number | "...")[] {
  const windowSize = 1; // 현재 양옆 1칸 (필요하면 2로)
  const pages: (number | "...")[] = [];

  const start = Math.max(2, current - windowSize);
  const end = Math.min(total - 1, current + windowSize);

  pages.push(1);
  if (start > 2) pages.push("...");

  for (let p = start; p <= end; p++) pages.push(p);

  if (end < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  // 현재가 1/마지막 근처일 때 보정
  if (current <= 2 && total >= 3) pages.splice(1, 0, 2);
  if (current >= total - 1 && total >= 3) pages.splice(pages.length - 1, 0, total - 1);

  // 중복 제거
  return Array.from(new Set(pages));
}
