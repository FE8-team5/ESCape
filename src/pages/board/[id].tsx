import DetailContentSection from "@/components/board/DetailContentSection";
import DetailPostCommentSection from "@/components/board/DetailPostCommentSection";
import DetailCommentSection from "@/components/board/DetailCommentSection";
import {Router, useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import {getArticleDetail} from "@/libs/axios/board/getArticleDetail";
import BoardStatusScreen from "@/components/board/BoardStatusScreen";
import React from "react";

export default function BoardDetailPage() {
  const router = useRouter() as Router;
  const { id } = router.query;

  const { data : articleDetailData, isLoading, isError } = useQuery({
    queryKey: ['articleDetail', id],
    queryFn: () => getArticleDetail(id),
  })

  // 임시 로딩 & 에러 처리
  if (isLoading) return <BoardStatusScreen>Loading...</BoardStatusScreen>;
  if (isError) return <BoardStatusScreen>Error!</BoardStatusScreen>;

  return (
    <div className="mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
      <DetailContentSection data={articleDetailData} />
      <DetailPostCommentSection />
      <DetailCommentSection />
    </div>
  );
}
