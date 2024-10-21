import Modal from "@/components/@shared/modal/Modal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteComments} from "@/libs/axios/board/deleteComments";

export interface CommentDeleteModalProps {
  id: number | undefined;
  isOpen: boolean;
  onClick: () => void;
  currentPage: number;
  dataId: string | string[] | undefined;
}

export default function CommentDeleteModal({id, isOpen, onClick, currentPage, dataId}: CommentDeleteModalProps) {
  const queryClient = useQueryClient();

  // 댓글 삭제를 위한 deleteMutation
  // 댓글 삭제 성공 후, 댓글의 쿼리를 다시 불러와서 화면을 재렌더링
  const deleteMutation = useMutation({
    mutationFn: () => deleteComments(id),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articleDetailComments', dataId, currentPage] });
      } catch (e) {
        console.error(e);
      }
    }
  })

  // 댓글 삭제를 전달하기 위한 이벤트 핸들러
  const handleSubmit = () => {
    deleteMutation.mutate();
    onClick();
  };

  return (
    <>
      {isOpen && (
        <Modal onClick={onClick} classNames="">
          <form onSubmit={handleSubmit}>
            <div className="px-4 pt-4">
              <p className="font-bold text-[20px] leading-6 text-brand-white">댓글을 삭제하시겠습니까?</p>
              <div className="mt-4 grid-cols-2 grid gap-2">
                <button type="submit" className="py-4 rounded-xl hover:bg-brand-black-dark border-[1px] border-solid border-brand-black-light">
                  예
                </button>
                <button onClick={onClick}
                        className="py-4 rounded-xl hover:bg-brand-black-dark border-[1px] border-solid border-brand-black-light">
                  아니오
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}