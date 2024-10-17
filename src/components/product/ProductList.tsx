import { PropsWithChildren } from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  productList: ProductListType[];
}

export default function ProductList({
  children,
  productList,
}: PropsWithChildren<ProductListProps>) {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="text-2xl font-semibold">{children}</div>
      <div className="grid grid-cols-2 gap-[15px] xl:gap-5 md:grid-cols-3">
        {productList.length > 0 &&
          productList.map((product) => <ProductCard product={product} />)}
        <div className="min-w-[150px] min-h-[150px] xl:w-[300px] xl:h-[300px]"></div>
        <div className="min-w-[150px] min-h-[150px] xl:w-[300px] xl:h-[300px]"></div>
        <div className="min-w-[150px] min-h-[150px] xl:w-[300px] xl:h-[300px]"></div>
        <div className="min-w-[150px] min-h-[150px] xl:w-[300px] xl:h-[300px]"></div>
        <div className="min-w-[150px] min-h-[150px] xl:w-[300px] xl:h-[300px]"></div>
        <div className="min-w-[150px] min-h-[150px] xl:w-[300px] xl:h-[300px]"></div>
      </div>
    </section>
  );
}
