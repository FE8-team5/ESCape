import {ArticleComment} from "@/dtos/ArticleDto";
import KebabIcon from "../../../public/icons/kebab_icon.svg"
import ProfileIcon from "../../../public/icons/profile_icon.svg"
import Image from "next/image";
import timeAgo from "@/utils/timeAgo";
import Dropdown from "@/components/board/DropDown";
import {useState} from "react";
import CommentDeleteModal from "@/components/board/CommentDeleteModal";
import CommentPatchModal from "@/components/board/CommentPatchModal";

export interface DetailCommentProps {
  data?: ArticleComment;
  currentPage: number;
  dataId: string | string[] | undefined;
}

export default function CommentCard({ data, currentPage, dataId }: DetailCommentProps) {
  const [isPatchOpen, setIsPatchOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const togglePatchModal = () => setIsPatchOpen((prevState) => !prevState);
  const toggleDeleteModal = () => setIsDeleteOpen((prevState) => !prevState);

  // 댓글 수정하기를 클릭할 시 수정 모달을 열어주는 이벤트 핸들러
  const handlePatchModal = () => {
    setIsPatchOpen(!isPatchOpen);
  }

  // 댓글 삭제하기를 클릭할 시 삭제 모달을 열어주는 이벤트 핸들러
  const handleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
  }

  return (
    <>
      <div className="bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light py-5 px-6">
        <div className="flex justify-between">
          <p className="text-[16px] leading-[19px] font-normal text-brand-white break-words line-clamp-[10]">
            {data?.content ? data.content : "댓글이 들어가는 영역입니다."}
          </p>
          <div>
            <Dropdown width="w-[120px]"
                      buttonChildren={<div className="w-6 h-6 ml-4"><Image src={KebabIcon} alt="수정 & 삭제하기" width={24}
                                                                           height={24}/></div>}>
              <button onClick={handlePatchModal}>
                수정하기
              </button>
              <button onClick={handleDeleteModal}>
                삭제하기
              </button>
            </Dropdown>
          </div>
        </div>
        <div className="flex mt-12 items-center justify-between">
          <div className="flex gap-3 items-center">
            <Image src={data?.writer.image && data?.writer.image !== "string" ? data.writer.image : ProfileIcon}
                   alt="작성자 이미지"/>
            <p
              className="max-w-[260px] text-[14px] leading-[17px] text-brand-white font-medium break-words line-clamp-1 pr-1">
              {data?.writer.nickname ? data.writer.nickname : "알 수 없음"}
            </p>
            <p
              className="text-[14px] leading-[17px] font-medium text-brand-gray-dark pl-4 border-l-[1px] border-solid border-brand-black-light">
              {timeAgo(data?.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <CommentPatchModal id={data?.id} content={data?.content} isOpen={isPatchOpen} onClick={togglePatchModal} currentPage={currentPage} dataId={dataId} />
      <CommentDeleteModal id={data?.id} isOpen={isDeleteOpen} onClick={toggleDeleteModal} currentPage={currentPage} dataId={dataId} />
    </>
  )
}