import Modal from "@/components/@shared/modal/Modal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import DetailPostCommentSection from "@/components/board/DetailPostCommentSection";
import {useState} from "react";
import {patchComments} from "@/libs/axios/board/patchComments";

export interface CommentPatchModalProps {
  id: number | undefined;
  content: string | undefined;
  isOpen: boolean;
  onClick: () => void;
  currentPage: number;
  dataId: string | string[] | undefined;
}

export default function CommentPatchModal({id, content, isOpen, onClick, currentPage, dataId}:CommentPatchModalProps) {
  const [comment, setComment] = useState(content);
  const queryClient = useQueryClient();

  // 댓글 수정을 위한 useMutation
  // 쿼리 무효화 작업이 완료된 후 페이지를 이동하기 위해 async await 를 사용하여 기다림
  const uploadPatchMutation = useMutation({
    mutationFn: () => patchComments({id, content:comment}),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetailComments', dataId, currentPage] });
      } catch (e) {
        console.error(e);
      }
    }
  })

  // 댓글 수정 값을 전송하기 위한 이벤트 핸들러
  const handleSubmit = () => {
    uploadPatchMutation.mutate();
    onClick();
  }

  return (
    <>
      {isOpen && (
        <Modal onClick={onClick} classNames="max-h-[90vh] w-[320px] md:w-[520px] overflow-scroll scrollbar-hidden scrollbar-hide">
          <div className="relative mx-4 md:6 xl:mx-auto pt-[50px] pb-[100px] md:pb-0">
            <form onSubmit={handleSubmit}>
              <DetailPostCommentSection comment={comment} setComment={setComment} type="modal" value="댓글 수정" />
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}