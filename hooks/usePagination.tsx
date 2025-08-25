import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 12;
export const MAX_VISIBLE_PAGES = 5;

function usePagination(totalItems: number) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const term = searchParams.get("term");
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 현재 페이지 그룹 계산 (ex. 7page -> 2번째 그룹)
  const currentGroup = Math.ceil(currentPage / MAX_VISIBLE_PAGES);

  // 그룹 시작 페이지 (ex. 2번째 그룹 -> 6page)
  const startPage = (currentGroup - 1) * MAX_VISIBLE_PAGES + 1;
  // 그룹 끝 페이지 (ex. 2번째 그룹 -> 10page)
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 이전 페이지 묶음의 첫 페이지 (ex. 2번째 그룹 -> 1page)
  const prevGroupFirstPage = Math.max(1, startPage - MAX_VISIBLE_PAGES);
  // 다음 페이지 묶음의 첫 페이지 (ex. 2번째 그룹 -> 11page)
  const nextGroupFirstPage = startPage + MAX_VISIBLE_PAGES;

  return {
    currentPage,
    term,
    pageNumbers,
    prevGroupFirstPage,
    nextGroupFirstPage,
    currentGroup,
    totalPages,
  };
}

export default usePagination;
