import ProductMain from "@/components/product/ProductMain";
import ReviewerRanking from "@/components/product/ReviewerRanking";
import Sidebar from "@/components/product/Sidebar";

export default function ProductPage() {
  return (
    <main className="flex justify-center ">
      <Sidebar />
      <div className="flex xl:flex-grow-0 flex-grow flex-col xl:pr-0 md:pl-[25px] md:pr-[30px] xl:justify-end pt-[30px] xl:pt-0 px-5 md:pt-10 xl:flex-row-reverse gap-[60px]">
        <ReviewerRanking />
        <ProductMain />
      </div>
    </main>
  );
}
