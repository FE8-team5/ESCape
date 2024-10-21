import DetailContentSection from "@/components/board/DetailContentSection";
import DetailPostCommentSection from "@/components/board/DetailPostCommentSection";
import DetailCommentSection from "@/components/board/DetailCommentSection";
import {Router, useRouter} from "next/router";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getArticleDetail} from "@/libs/axios/board/getArticleDetail";
import BoardStatusScreen from "@/components/board/BoardStatusScreen";
import React, {FormEvent, useState} from "react";
import {getArticleDetailComments} from "@/libs/axios/board/getArticleDetailComments";
import {postComments} from "@/libs/axios/board/postComments";
import {CommentFormData} from "@/dtos/ArticleDto";
import PaginationSection from "@/components/board/PaginationSection";

interface postCommentsProps {
  id: string | string[] | undefined;
  comment: CommentFormData;
}

export default function BoardDetailPage() {
  const [userId, setUserId] = useState(1);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter() as Router;
  const { id } = router.query;
  const queryClient = useQueryClient()

  // 상세 페이지를 보기위한 useQuery
  // useRouter 가 클라이언트 사이드에서만 제대로 작동하기 때문에 준비가 완료되었을 때 호출하기 위해 enabled 사용
  const { data : articleDetailData} = useQuery({
    queryKey: ['articleDetail', id],
    queryFn: () => getArticleDetail(id),
    enabled: !!id,
  })

  // 페이지네이션을 위한 댓글 useQuery
  const {data: articleDetailCommentsData, isLoading, isError} = useQuery({
    queryKey: ['articleDetailComments', id, currentPage],
    queryFn: () => getArticleDetailComments({id, currentPage}),
    enabled: !!id,
    placeholderData: keepPreviousData,
  })

  // 페이지네이션 이동을 위한 이벤트 핸들러
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  }

  // 댓글 전송을 위한 useMutation
  const commentPostMutation = useMutation({
    mutationFn: (newComment: postCommentsProps) => postComments(newComment),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetailComments', id, currentPage] });
      } catch (e) {
        console.error(e);
      }
    }
  })

  // comment 를 전송하기 위한 이벤트 핸들러
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newComment = { id, comment: {userId, content: comment}};
    commentPostMutation.mutate(newComment)
    setComment("");
  }

  // 임시 로딩 & 에러 처리
  if (isLoading) return <BoardStatusScreen>Loading...</BoardStatusScreen>;
  if (isError) return <BoardStatusScreen>Error!</BoardStatusScreen>;

  return (
    <div className="relative mx-4 md:mx-6 xl:mx-auto xl:w-[1200px] py-[100px]">
      <DetailContentSection data={articleDetailData} />
      <form onSubmit={handleCommentSubmit}>
        <DetailPostCommentSection comment={comment} setComment={setComment} value="댓글 쓰기" />
      </form>
      <DetailCommentSection data={articleDetailCommentsData?.articleComments} dataId={id} currentPage={currentPage} />
      <PaginationSection totalPageCount={articleDetailCommentsData?.totalCount} currentPage={currentPage} onPageClick={handlePageClick} />
    </div>
  );
}