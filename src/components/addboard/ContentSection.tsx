import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import PlusIcon from "@icons/plus_icon.svg";

interface ContentSectionProps {
  title: string | undefined;
  content: string | undefined;
  onFormDataChange: (value: { image: File | null; title: string | undefined; content: string | undefined }) => void;
}

export default function ContentSection({ title, content, onFormDataChange }: ContentSectionProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onFormDataChange({ title, content, image: file });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value;
    onFormDataChange({ title: result, content, image: null });
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const result = e.target.value;
    onFormDataChange({ title, content: result, image: null });
  };

  return (
    <div className="pt-6">
      <h2 className="flex gap-1.5 font-medium text-[16px] text-brand-white leading-[19px]">
        <span className="text-brand-indigo">*</span>제목
      </h2>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="bg-brand-black-medium w-full rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6 text-brand-white mt-6"
        value={title}
        onChange={handleTitleChange}
      />
      <h2 className="flex gap-1.5 font-medium text-[16px] text-brand-white leading-[19px] mt-10">
        <span className="text-brand-indigo">*</span>내용
      </h2>
      <div className="relative">
        <textarea
          placeholder="내용을 입력해주세요."
          className="h-[240px] bg-brand-black-medium w-full rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6 text-brand-white mt-6"
          value={content}
          onChange={handleContentChange}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-brand-white">
          {content?.length} / 300
        </p>
      </div>
      <h2 className="flex gap-1.5 font-medium text-[16px] text-brand-white leading-[19px] mt-10">
        <span className="text-brand-indigo">*</span>이미지
      </h2>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="text-brand-gray-dark flex justify-center items-center flex-col gap-3 w-[240px] h-[240px] bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light py-4 px-6 mt-6"
        >
          <Image src={PlusIcon} alt="이미지 등록" />
          이미지 등록
        </button>
        {imagePreview && (
          <div className="absolute bottom-0 w-[240px] h-[240px]">
            <Image
              src={imagePreview}
              alt="등록한 이미지"
              fill
              className="rounded-xl cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
