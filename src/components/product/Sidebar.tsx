import { getCategories } from "@/libs/axios/product/category";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {}

export default function Sidebar() {
  const { data: categoryData } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  return (
    <div className="md:flex hidden flex-col pt-[45px] pl-[30px] xl:w-[220px] md:w-[180px]  gap-[35px]">
      <span>카테고리</span>
      {categoryData &&
        !!categoryData.length &&
        categoryData.map((menu) => (
          <span key={menu.id} className="text-brand-gray-dark">
            {menu.name}
          </span>
        ))}
    </div>
  );
}
