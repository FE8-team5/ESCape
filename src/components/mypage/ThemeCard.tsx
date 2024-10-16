import React from "react";
import Image, { StaticImageData } from "next/image";
import starIcon from "../../../public/icons/star_icon.svg";
import commentIcon from "../../../public/icons/comment_icon.svg";
import heartIcon from "../../../public/icons/heart_icon.svg";

interface Temp {
  image: string | StaticImageData;
  name: string;
  reviewCount: number;
  favoriteCount: number;
  rating: string;
}

interface ThemeCardProps {
  data: Temp;
}

export default function ThemeCard({ data }: ThemeCardProps) {
  const { image, name, rating, reviewCount, favoriteCount } = data;
  const cardDetailContents = [
    {
      icon: commentIcon,
      alt: "후기",
      value: reviewCount,
    },
    {
      icon: heartIcon,
      alt: "좋아요",
      value: favoriteCount,
    },
    {
      icon: starIcon,
      alt: "별점",
      value: rating,
    },
  ];

  return (
    <div className="flex flex-col justify-start items-start gap-[10px] max-w-[300px] p-[10px] bg-[#252530] rounded-lg border border-unactive">
      <Image
        className="m-auto"
        src={image}
        alt={`${name} 이미지`}
        width={140}
        height={98}
      />
      <div className="flex flex-col justify-start items-start gap-[5px]">
        <h4 className="text-brand-white text-sm font-medium">{name}</h4>
        <div className="flex justify-start items-start gap-[10px] ">
          {cardDetailContents.map((cardDetailContent) => (
            <div className="flex justify-center items-center gap-[5px]">
              <Image
                src={cardDetailContent.icon}
                alt={`${cardDetailContent.alt} 아이콘`}
                width={12}
                height={12}
              />
              <p className="text-brand-gray-light text-xs font-light">
                {cardDetailContent.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
