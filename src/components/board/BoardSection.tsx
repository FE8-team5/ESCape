import Dropdown from "@/components/@shared/DropDown";
import Image from "next/image";
import ToggleIcon from "../../../public/icons/toggle_icon.svg"
import {useState} from "react";
import BoardCard from "@/components/board/BoardCard";
import {Article} from "@/dtos/ArticleDto";

interface BoardSectionProps {
  data: Article[] | undefined;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

export default function BoardSection({ data, selectedOption, setSelectedOption }: BoardSectionProps) {
  const [localSelectedOption, setLocalSelectedOptions] = useState(selectedOption);

  const handleOptionChange = (option: string) => {
    setLocalSelectedOptions(option);
    setSelectedOption(option);
  }

  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-bold text-[20px] leading-6 text-brand-white">
          게시글
        </h2>
        <Dropdown width="w-[120px]" buttonChildren={<div
          className="w-[120px] bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light text-brand-white py-2.5 px-[14px] flex justify-between items-center">{localSelectedOption}<Image
          src={ToggleIcon} alt="메뉴 열기"/></div>}>
          <button onClick={() => handleOptionChange("최신순")}>
            최신순
          </button>
          <button onClick={() => handleOptionChange("인기순")}>
            인기순
          </button>
        </Dropdown>
      </div>
      <div className="relative py-9 grid gap-4 grid-cols-1 xl:grid-cols-2">
        {data && data.length > 0 ? (
          data?.map((data) => (
            <BoardCard key={data.id} article={data} />
          ))
          ) : (
            // 임시 예외 처리
          <div className="text-brand-white">내용이 없습니다.</div>
        )}
      </div>
    </>
  )
}