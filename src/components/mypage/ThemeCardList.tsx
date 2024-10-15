import React from "react";
import ThemeCard from "./ThemeCard";

import temp1 from "../../../public/images/temp1_image.png";
import temp2 from "../../../public/images/temp2_image.png";
import temp3 from "../../../public/images/temp3_image.png";

export default function ThemeCardList() {
  const themeList = [
    {
      image: temp1,
      name: "sony",
      reviewCount: 129,
      favoriteCount: 34,
      rating: "4.7",
    },
    {
      image: temp2,
      name: "canon",
      reviewCount: 130,
      favoriteCount: 35,
      rating: "4.3",
    },
    {
      image: temp3,
      name: "huawei",
      reviewCount: 150,
      favoriteCount: 20,
      rating: "3.5",
    },
  ];

  return (
    <section>
      <h3 className="mb-[30px] text-brand-white text-lg font-semibold">
        리뷰 남긴 상품
      </h3>
      <div className="grid grid-cols-2 gap-[15px] xl:grid-cols-3 xl:gap-5">
        {themeList.map((theme) => (
          <ThemeCard data={theme} />
        ))}
      </div>
    </section>
  );
}
