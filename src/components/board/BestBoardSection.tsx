import BestBoardCard from "@/components/board/BestBoardCard";
import {Article} from "@/dtos/ArticleDto";
import React from "react";

interface BestBoardSectionProps {
  data: Article[] | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export default function BestBoardSection({ data, onClick, disabled }: BestBoardSectionProps) {
  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-bold text-[20px] leading-6 text-brand-white">
          베스트 게시글
        </h2>
        <button className="font-normal text-[14px] leading-[17px] text-brand-gray-dark" onClick={onClick} disabled={disabled}>
          더보기 {'>'}
        </button>
      </div>
      <div className="relative py-10 border-b-[1px] border-solid border-brand-black-light grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data && data.length > 0 ?  (
          data?.map((data) => (
            <BestBoardCard key={data.id} like={data} />
          ))
        ) : (
          // 임시 예외 처리
          <div className="text-brand-white">내용이 없습니다.</div>
        )}
      </div>
    </>
  )
}