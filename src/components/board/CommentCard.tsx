import {ArticleComment} from "@/dtos/ArticleDto";
import KebabIcon from "../../../public/icons/kebab_icon.svg"
import ProfileIcon from "../../../public/icons/profile_icon.svg"
import Image from "next/image";
import timeAgo from "@/utils/timeAgo";
import Dropdown from "@/components/@shared/DropDown";

export interface DetailCommentProps {
  data?: ArticleComment;
}

export default function CommentCard({ data }: DetailCommentProps) {

  return (
    <div className="bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light py-5 px-6">
      <div className="flex justify-between">
        <p className="text-[16px] leading-[19px] font-normal text-brand-white break-words line-clamp-[10]">
          {data?.content ? data.content : "제목이 들어가는 영역입니다."}
        </p>
        <div>
          <Dropdown width="w-[120px]" buttonChildren={<div className="w-6 h-6 ml-4"><Image src={KebabIcon} alt="수정 & 삭제하기" width={24} height={24} /></div>}>
            <button>
              수정하기
            </button>
            <button>
              삭제하기
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="flex mt-12 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image src={data?.writer.image ? data.writer.image : ProfileIcon} alt="작성자 이미지"/>
          <p className="max-w-[260px] text-[14px] leading-[17px] text-brand-white font-medium break-words line-clamp-1 pr-1">
            {data?.writer.nickname ? data.writer.nickname : "알 수 없음"}
          </p>
          <p className="text-[14px] leading-[17px] font-medium text-brand-gray-dark pl-4 border-l-[1px] border-solid border-brand-black-light">
            {timeAgo(data?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}