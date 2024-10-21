import {Article} from "@/dtos/ArticleDto";
import KebabIcon from "@icons/kebab_icon.svg"
import ProfileIcon from "@icons/profile_icon.svg"
import HeartIcon from "@icons/heart_icon.svg"
import Image from "next/image";
import timeAgo from "@/utils/timeAgo";
import Dropdown from "@/components/board/DropDown";
import Link from "next/link";
import {useState} from "react";
import BoardPatchModal from "@/components/board/BoardPatchModal";
import BoardDeleteModal from "@/components/board/BoardDeleteModal";

export interface BoardCardProps {
  article: Article;
}

export default function BoardCard({ article }: BoardCardProps) {
  const [isPatchOpen, setIsPatchOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const togglePatchModal = () => setIsPatchOpen((prevState) => !prevState);
  const toggleDeleteModal = () => setIsDeleteOpen((prevState) => !prevState);

  // 게시물 수정하기를 클릭할 시 수정 모달을 열어주는 이벤트 핸들러
  const handlePatchModal = () => {
    setIsPatchOpen(!isPatchOpen);
  }

  // 게시물 삭제하기를 클릭할 시 삭제 모달을 열어주는 이벤트 핸들러
  const handleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
  }

  return (
    <>
      <div
        className="h-[176px] bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6">
        <div className="flex gap-2.5 justify-between">
          <Link href={`/board/${article?.id}`} className="w-full">
            <p className="h-[72px] text-[18px] leading-7 font-medium text-brand-white w-full break-words line-clamp-2">
              {article?.title ? article.title : "제목이 들어가는 영역입니다."}
            </p>
          </Link>
          {article?.image && article?.image !== "string" && article?.image !== "image test" && article?.image !== "null" ? (
            <Image className="w-[72px] h-[72px] rounded-lg border-[1px] border-solid border-brand-black-light]"
                   src={article.image} alt="게시물 이미지" width={72} height={72}/>) : null}
          <Dropdown width="w-[120px]"
                    buttonChildren={<div className="w-6 h-6"><Image src={KebabIcon} alt="수정 & 삭제하기" width={24} height={24}/></div>}>
            <button onClick={handlePatchModal}>
              수정하기
            </button>
            <button onClick={handleDeleteModal}>
              삭제하기
            </button>
          </Dropdown>
        </div>
        <div className="flex mt-8 items-center justify-between">
          <div className="flex gap-3 items-center">
            <Image src={ProfileIcon} alt="작성자 이미지"/>
            <p
              className="max-w-[260px] text-[14px] leading-[17px] text-brand-white font-medium break-words line-clamp-1 pr-1">
              {article?.writer.nickname ? article.writer.nickname : "알 수 없음"}
            </p>
            <p
              className="text-[14px] leading-[17px] font-medium text-brand-gray-dark pl-4 border-l-[1px] border-solid border-brand-black-light">
              {timeAgo(article?.createdAt)}
            </p>
          </div>
          <div className="text-[14px] leading-[17px] font-medium text-brand-gray-dark">
            {article?.likeCount ? (
              <div className="flex gap-1"><Image src={HeartIcon} alt="heart" width={16} height={16}/>{article.likeCount}
              </div>) : (<div className="flex gap-1"><Image src={HeartIcon} alt="heart"/>{"0"}</div>)}
          </div>
        </div>
      </div>
      <BoardPatchModal id={article.id} isOpen={isPatchOpen} onClick={togglePatchModal} value="게시글 수정" />
      <BoardDeleteModal id={article.id} isOpen={isDeleteOpen} onClick={toggleDeleteModal} />
    </>
  )
}