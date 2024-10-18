import SearchSection from "@/components/board/SearchSection";
import BestBoardSection from "@/components/board/BestBoardSection";
import BoardSection from "@/components/board/BoardSection";
import AddBoardButton from "@/components/board/AddBoardButton";
import {keepPreviousData, useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getArticles} from "@/libs/axios/board/getArticles";
import {getArticlesByLike} from "@/libs/axios/board/getArticlesByLike";
import React, {useEffect, useState} from "react";
import BoardStatusScreen from "@/components/board/BoardStatusScreen";
import BoardPaginationButton from "@/components/board/BoardPaginationButton";
import PaginationSection from "@/components/board/PaginationSection";

export default function BoardsPage() {
  const [selectedOption, setSelectedOption] = useState("최신순");
  const [searchValue, setSearchValue] = useState("");
  const [pageLimit, setPageLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 받아온 검색 내용을 반영하기 위한 이벤트 핸들러
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  }

  // 모바일, 테블릿에서는 베스트 게시글이 2개씩 보이고 PC 에서는 3개씩 보이기 위한 useEffect
  useEffect(() => {
    const updatePageLimit = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        setPageLimit(3)
      } else {
        setPageLimit(2)
      }
    };

    window.addEventListener('resize', updatePageLimit)
    updatePageLimit();

    return() => {
      window.removeEventListener("resize", updatePageLimit)
    }
  }, []);

  // 페이지네이션을 위한 useInfiniteQuery
  // API Responses 로 오는 값들 중 총 리스트 갯수인 totalCount 를 활용
  // 더보기 버튼을 클릭 시 3개씩 불러오도록 설정, 마지막 페이지 이후에는 버튼 비활성화
  const { data: likeArticlesData, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['likes', pageLimit],
    queryFn: ({ pageParam }) => getArticlesByLike(pageParam, pageLimit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.totalCount;
      const loadedCount = allPages.flatMap(page => page.articleList).length;
      if ( loadedCount < totalCount ) {
        return allPages.length + 1;
      }
      return undefined;
    }
  })

  // 더보기 버튼을 누를 시 데이터를 호출하기 위한 이벤트 핸들러
  const handleLoadMore = () => {
    fetchNextPage().catch(() => alert("다음 데이터를 가져오는데 오류가 있습니다."));
  };

  // 검색 및 정렬을 위한 useQuery
  // placeholderData 속성을 활용하여 데이터 수정 시 화면이 깜빡이는 문제 해결
  const { data: articlesData, isLoading, isError } = useQuery({
    queryKey: ['articles', selectedOption, searchValue, currentPage],
    queryFn: () => getArticles({selectedOption, searchValue, currentPage}),
    placeholderData: keepPreviousData,
  });

  // 페이지네이션 이동을 위한 이벤트 핸들러
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  }

  // 전체 페이지 갯수에서 4개씩 나눠 동적으로 페이지 갯수를 표현하기 위한 함수
  const renderPagination = () => {
    const pages = [];
    const totalPageCount = Math.ceil((articlesData?.totalCount || 1) / 4)
    for (let i = 1; i <= totalPageCount; i++) {
      pages.push(
        <BoardPaginationButton key={i} onClick={() => handlePageClick(i)} isActive={currentPage === i}>
          {i}
        </BoardPaginationButton>
      );
    }
    return pages;
  }

  // 임시 로딩 & 에러 처리
  if (isLoading) return <BoardStatusScreen>Loading...</BoardStatusScreen>;
  if (isError) return <BoardStatusScreen>Error!</BoardStatusScreen>;

  // 받아온 likeArticlesData 의 pages 가 객체 형태이기 때문에 1차원 배열로 변경
  const likesList = likeArticlesData?.pages?.flatMap(page => page.articleList)

  return (
      <div className="relative mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
        <SearchSection onSearchChange={handleSearchChange} />
        <div className={`${searchValue !== "" ? "hidden" : "" }`}>
          <BestBoardSection data={likesList} onClick={handleLoadMore} disabled={!hasNextPage || isFetchingNextPage} />
        </div>
        <BoardSection data={articlesData?.articleList} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <PaginationSection>
          {renderPagination()}
        </PaginationSection>
        <AddBoardButton/>
      </div>
  );
}
