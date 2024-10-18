import {ArticleDetail} from "@/dtos/ArticleDto";
import Dropdown from "@/components/@shared/DropDown";
import Image from "next/image";
import KebabIcon from "../../../public/icons/kebab_icon.svg";
import CommentIcon from "../../../public/icons/comment_icon.svg"
import HeartIcon from "../../../public/icons/heart_icon.svg"
import timeAgo from "@/utils/timeAgo";

export interface DetailContentProps {
  data?: ArticleDetail;
}

export default function DetailContentSection({ data }: DetailContentProps) {
  return (
    <>
      <div className="flex justify-between items-center pb-6 border-b-[1px] border-solid border-brand-black-light">
        <h1 className="font-medium text-[18px] text-brand-white leading-[21px] break-words">
          {data?.title ? data.title : "제목이 들어가는 영역입니다."}
        </h1>
        <Dropdown width="w-[120px]" buttonChildren={<div className="w-6 h-6 ml-4"><Image src={KebabIcon} alt="수정 & 삭제하기" width={24} height={24}/></div>}>
          <button>
            수정하기
          </button>
          <button>
            삭제하기
          </button>
        </Dropdown>
      </div>
      <div className="flex justify-between items-center pt-6">
        <div className="flex">
          <p className="font-medium text-[14px] text-brand-white leading-[17px] pr-4">
            {data?.writer.nickname ? data.writer.nickname : "알 수 없음"}
          </p>
          <p
            className="text-[14px] leading-[17px] font-medium text-brand-gray-dark pl-4 border-l-[1px] border-solid border-brand-black-light">
            {timeAgo(data?.createdAt)}
          </p>
        </div>
        <div className="flex">
          <Image src={CommentIcon} alt="리뷰 갯수"/>
          <p className="font-medium text-[14px] text-brand-white leading-[17px] pl-2 pr-4">
            {data?.commentCount ? data.commentCount : "0"}
          </p>
          <Image src={HeartIcon} alt="좋아요 갯수"/>
          <p className="font-medium text-[14px] text-brand-white leading-[17px] pl-2 pr-4">
            {data?.likeCount ? data.likeCount : "0"}
          </p>
        </div>
      </div>
      <div className="py-20">
        <p className="font-medium text-[16px] text-brand-white leading-[28px]">
          {data?.content ? data.content : "본문이 들어가는 영역입니다."}
        </p>
      </div>
    </>
  )
}