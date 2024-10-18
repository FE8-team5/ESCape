import {Article} from "@/dtos/ArticleDto";
import MedalIcon from "../../../public/icons/medal_icon.svg"
import ProfileIcon from "../../../public/icons/profile_icon.svg"
import HeartIcon from "../../../public/icons/heart_icon.svg"
import Image from "next/image";
import timeAgo from "@/utils/timeAgo";
import Link from "next/link";

export interface BoardCardProps {
  like: Article;
}

export default function BestBoardCard({like }: BoardCardProps) {

  return (
      <div
        className="h-[220px] bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6">
        <div className="flex gap-1">
          <Image src={MedalIcon} alt="Best"/>
          <p className="font-semibold text-[16px] leading-4 text-brand-white">
            Best
          </p>
        </div>
        <Link href={`/board/${like?.id}`}>
          <div className="flex gap-2.5">
            <p
              className="h-[56px] text-[18px] leading-7 font-medium text-brand-white w-full break-words line-clamp-2 mt-3">
              {like?.title ? like.title : "제목이 들어가는 영역입니다."}
            </p>
            {like?.image && like?.image !== "string" && like?.image !== "image test" && like?.image !== "null" ? (
              <Image className="w-[72px] h-[72px] rounded-lg border-[1px] border-solid border-brand-black-light"
                     src={like.image} alt="게시물 이미지" width={72} height={72}/>) : null}
          </div>
        </Link>
        <p className="text-[14px] leading-[17px] font-medium text-brand-gray-dark mt-3">
          {timeAgo(like?.createdAt)}
        </p>
        <div className="flex mt-10 items-center justify-between">
          <div className="flex gap-3 items-center">
            <Image src={ProfileIcon} alt="작성자 이미지"/>
            <p
              className="max-w-[260px] text-[14px] leading-[17px] text-brand-white font-medium break-words line-clamp-1">
              {like?.writer.nickname ? like.writer.nickname : "알 수 없음"}
            </p>
          </div>
          <div className="text-[14px] leading-[17px] font-medium text-brand-gray-dark">
            <div className="flex gap-1"><Image src={HeartIcon} alt="heart"/>{like?.likeCount}</div>
          </div>
        </div>
      </div>
  )
}