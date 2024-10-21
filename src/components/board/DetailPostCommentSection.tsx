import {ChangeEvent} from "react";

interface DetailPostCommentSectionProps {
  comment: string | undefined;
  setComment: (value: string) => void;
  type?: string;
  value: string;
}

export default function DetailPostCommentSection({ comment, setComment, type, value }: DetailPostCommentSectionProps) {

  // 댓글 전송값을 부모 요소로 올려주기 위한 이벤트 핸들러
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className={`${type === "modal" ? "pb-[24px] md:pb-[104px]" : "border-b-[1px] border-solid border-brand-black-light pb-[104px]" } relative`}>
      <h2 className="font-bold text-[20px] text-brand-white leading-6">
        {value}
      </h2>
      <div className="relative">
        <textarea
          placeholder="댓글을 입력해주세요."
          className="h-[180px] bg-brand-black-medium w-full rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6 text-brand-white mt-6"
          value={comment}
          onChange={handleChange}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-brand-white">
          {comment?.length} / 300
        </p>
      </div>
      <button type="submit" className={`${type === "modal" ? "w-full" : "w-[184px]"} absolute right-0 h-12 rounded-xl py-[14px] shadow-xl font-semibold text-[16px] leading-[19px] bg-gradation text-brand-white mt-4`}>
        등록
      </button>
    </div>
  )
}